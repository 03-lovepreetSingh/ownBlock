import React, { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
export function TokenMarketData() {
  const [timeframe, setTimeframe] = useState("7D");
  const [tokenAmount, setTokenAmount] = useState(1);
  const handleIncrement = () => {
    setTokenAmount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    if (tokenAmount > 1) {
      setTokenAmount((prev) => prev - 1);
    }
  };
  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-3xl font-bold">$500</span>
            <span className="text-green-500 ml-2">+2.4%</span>
            <div className="text-xs text-muted-foreground">per token</div>
          </div>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={timeframe === "7D" ? "default" : "outline"}
              onClick={() => setTimeframe("7D")}
            >
              7D
            </Button>
            <Button
              size="sm"
              variant={timeframe === "1M" ? "default" : "outline"}
              onClick={() => setTimeframe("1M")}
            >
              1M
            </Button>
            <Button
              size="sm"
              variant={timeframe === "1Y" ? "default" : "outline"}
              onClick={() => setTimeframe("1Y")}
            >
              1Y
            </Button>
          </div>
        </div>
        {/* Chart */}
        <div className="h-64 relative">
          <div className="absolute right-0 flex flex-col justify-between h-full text-xs text-muted-foreground">
            <span>518.31</span>
            <span>505.5</span>
            <span>497.5</span>
            <span>489.5</span>
          </div>
          <svg viewBox="0 0 600 200" className="w-full h-full">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(16, 185, 129)"
                  stopOpacity="0.5"
                />
                <stop
                  offset="100%"
                  stopColor="rgb(16, 185, 129)"
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path
              d="M0,150 C50,140 100,100 150,120 C200,140 250,60 300,40 C350,20 400,80 450,100 C500,120 550,110 600,130"
              fill="none"
              stroke="rgb(16, 185, 129)"
              strokeWidth="2"
            />
            <path
              d="M0,150 C50,140 100,100 150,120 C200,140 250,60 300,40 C350,20 400,80 450,100 C500,120 550,110 600,130 L600,200 L0,200 Z"
              fill="url(#chartGradient)"
            />
          </svg>
          <div className="absolute bottom-0 w-full flex justify-between text-xs text-muted-foreground">
            <span>2025-09-20</span>
            <span>2025-09-21</span>
            <span>2025-09-22</span>
            <span>2025-09-23</span>
            <span>2025-09-24</span>
            <span>2025-09-25</span>
            <span>2025-09-26</span>
          </div>
        </div>
      </div>
      {/* Market Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Market Cap</div>
          <div className="font-bold">$8,500,000</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">24h Volume</div>
          <div className="font-bold">$125,000</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Total Supply</div>
          <div className="font-bold">25,000</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Holders</div>
          <div className="font-bold">83</div>
        </div>
        <div className="bg-card border rounded-lg p-4">
          <div className="text-sm text-muted-foreground">Funding</div>
          <div className="flex items-center">
            <div className="w-full bg-muted rounded-full h-2 mr-2">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{
                  width: 0,
                }}
                animate={{
                  width: "68%",
                }}
                transition={{
                  duration: 1,
                }}
              />
            </div>
            <span className="font-bold">68%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Order Book */}
        <div className="bg-card border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Order Book</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-muted">
                  <th className="text-left py-2">Price ($)</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-right py-2">Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    price: 502.0,
                    amount: 23,
                    total: 31626.0,
                    color: "text-red-500",
                  },
                  {
                    price: 504.0,
                    amount: 33,
                    total: 40320.0,
                    color: "text-red-500",
                  },
                  {
                    price: 506.0,
                    amount: 72,
                    total: 17204.0,
                    color: "text-red-500",
                  },
                  {
                    price: 508.0,
                    amount: 14,
                    total: 11176.0,
                    color: "text-red-500",
                  },
                  {
                    price: 510.0,
                    amount: 54,
                    total: 6120.0,
                    color: "text-red-500",
                  },
                  {
                    price: 512.0,
                    amount: 57,
                    total: 4608.0,
                    color: "text-red-500",
                  },
                  {
                    price: 514.0,
                    amount: 7,
                    total: 47288.0,
                    color: "text-red-500",
                  },
                  {
                    price: 516.0,
                    amount: 34,
                    total: 52116.0,
                    color: "text-red-500",
                  },
                ].map((order, i) => (
                  <tr
                    key={i}
                    className="border-b border-muted/50 hover:bg-muted/50"
                  >
                    <td className={`py-1 ${order.color}`}>
                      {order.price.toFixed(2)}
                    </td>
                    <td className="py-1 text-right">{order.amount}</td>
                    <td className="py-1 text-right">
                      {order.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Recent Trades */}
        <div className="bg-card border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Recent Trades</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-muted">
                  <th className="text-left py-2">Time</th>
                  <th className="text-right py-2">Price ($)</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-right py-2">Total ($)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    time: "00:43",
                    price: 503.52,
                    amount: 6,
                    total: 3021.14,
                    color: "text-green-500",
                  },
                  {
                    time: "00:38",
                    price: 504.12,
                    amount: 4,
                    total: 2016.5,
                    color: "text-green-500",
                  },
                  {
                    time: "00:33",
                    price: 500.6,
                    amount: 7,
                    total: 3504.21,
                    color: "text-green-500",
                  },
                  {
                    time: "00:28",
                    price: 500.24,
                    amount: 4,
                    total: 2000.96,
                    color: "text-green-500",
                  },
                  {
                    time: "00:23",
                    price: 496.31,
                    amount: 7,
                    total: 3474.16,
                    color: "text-red-500",
                  },
                  {
                    time: "00:18",
                    price: 498.62,
                    amount: 8,
                    total: 3996.92,
                    color: "text-red-500",
                  },
                  {
                    time: "00:13",
                    price: 502.31,
                    amount: 9,
                    total: 4520.82,
                    color: "text-green-500",
                  },
                  {
                    time: "00:08",
                    price: 497.12,
                    amount: 9,
                    total: 4474.05,
                    color: "text-red-500",
                  },
                ].map((trade, i) => (
                  <tr
                    key={i}
                    className="border-b border-muted/50 hover:bg-muted/50"
                  >
                    <td className="py-1">{trade.time}</td>
                    <td className={`py-1 text-right ${trade.color}`}>
                      {trade.price.toFixed(2)}
                    </td>
                    <td className="py-1 text-right">{trade.amount}</td>
                    <td className="py-1 text-right">
                      {trade.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Buy Tokens */}
      <div className="bg-card border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Buy Tokens</h3>
        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">Your Balance</div>
              <div className="text-sm">Current Value: $2500.00</div>
            </div>
            <div className="font-bold">5 Tokens</div>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-sm mb-2">Number of Tokens</div>
          <div className="flex">
            <button
              onClick={handleDecrement}
              className="w-10 h-10 flex items-center justify-center border rounded-l-md"
            >
              -
            </button>
            <div className="flex-1 flex items-center justify-center border-t border-b h-10">
              {tokenAmount}
            </div>
            <button
              onClick={handleIncrement}
              className="w-10 h-10 flex items-center justify-center border rounded-r-md"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm">Total Cost</div>
          <div className="font-bold">${(tokenAmount * 500).toFixed(2)}</div>
        </div>
        <Button className="w-full bg-[#d9fb6b] text-black hover:bg-[#c9eb5b]">
          Buy Tokens
        </Button>
        <div className="text-xs text-center mt-4 text-muted-foreground">
          All investments are subject to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
