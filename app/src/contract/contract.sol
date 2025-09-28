// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * ERC3643-style PoC (T-REX protocol inspired) with holding cap
 * - Enforces KYC & maximum holding per account
 * - Roles: DEFAULT_ADMIN_ROLE, ISSUER_ROLE, COMPLIANCE_ROLE
 * - Asset Passport metadata
 */

contract ERC3643Token is ERC20, AccessControl, Pausable {
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant COMPLIANCE_ROLE = keccak256("COMPLIANCE_ROLE");

    mapping(address => bool) private _kycVerified;
    mapping(address => bool) private _transferExempt;

    // Maximum holding per account (fraction of total supply, e.g., 10%)
    uint256 public maxHoldingBps; // basis points (10000 = 100%)
    
    string public assetPassportCID;

    event KYCVerified(address indexed account, address indexed verifier);
    event KYCRevoked(address indexed account, address indexed verifier);
    event ExemptToggler(address indexed account, bool exempted);
    event MaxHoldingUpdated(uint256 newBps);

    constructor(
        string memory name_,
        string memory symbol_,
        string memory initialAssetPassportCID,
        uint256 initialMaxHoldingBps // e.g., 1000 = 10%
    ) ERC20(name_, symbol_) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
        _grantRole(COMPLIANCE_ROLE, msg.sender);

        assetPassportCID = initialAssetPassportCID;
        maxHoldingBps = initialMaxHoldingBps;
    }

    // ---------- KYC / Compliance ----------

    function verifyKYC(address account) external onlyRole(COMPLIANCE_ROLE) {
        require(account != address(0), "ERC3643: zero address");
        _kycVerified[account] = true;
        emit KYCVerified(account, msg.sender);
    }

    function revokeKYC(address account) external onlyRole(COMPLIANCE_ROLE) {
        require(account != address(0), "ERC3643: zero address");
        _kycVerified[account] = false;
        emit KYCRevoked(account, msg.sender);
    }

    function isKYCVerified(address account) public view returns (bool) {
        return _kycVerified[account];
    }

    function setTransferExempt(address account, bool exempt) external onlyRole(COMPLIANCE_ROLE) {
        _transferExempt[account] = exempt;
        emit ExemptToggler(account, exempt);
    }

    function isTransferExempt(address account) public view returns (bool) {
        return _transferExempt[account];
    }

    // ---------- Issuance / Redemption ----------

    function mint(address to, uint256 amount) external onlyRole(ISSUER_ROLE) whenNotPaused {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyRole(ISSUER_ROLE) whenNotPaused {
        _burn(from, amount);
    }

    // ---------- Asset Passport ----------

    function updateAssetPassportCID(string calldata newCID) external onlyRole(COMPLIANCE_ROLE) {
        assetPassportCID = newCID;
    }

    // Update maximum holding (in basis points)
    function updateMaxHolding(uint256 newBps) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newBps <= 10000, "ERC3643: cannot exceed 100%");
        maxHoldingBps = newBps;
        emit MaxHoldingUpdated(newBps);
    }

    // ---------- Transfer Gating with Max Holding ----------

    function _update(address from, address to, uint256 amount) internal virtual override {
        super._update(from, to, amount);

        // Allow minting and burning
        if (from == address(0) || to == address(0)) {
            return;
        }

        // Allow exempt addresses
        if (_transferExempt[from] || _transferExempt[to]) {
            return;
        }

        // Both parties must be KYC verified
        require(_kycVerified[from], "ERC3643: sender not KYC verified");
        require(_kycVerified[to], "ERC3643: recipient not KYC verified");

        // Enforce maximum holding for recipient
        uint256 maxAllowed = (totalSupply() * maxHoldingBps) / 10000;
        require(balanceOf(to) + amount <= maxAllowed, "ERC3643: exceeds max holding per account");
    }

    // ---------- Admin Controls ----------

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function addIssuer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(ISSUER_ROLE, account);
    }

    function removeIssuer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(ISSUER_ROLE, account);
    }

    function addComplianceOfficer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(COMPLIANCE_ROLE, account);
    }

    function removeComplianceOfficer(address account) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(COMPLIANCE_ROLE, account);
    }
}