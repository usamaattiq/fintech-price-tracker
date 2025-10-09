"use client";
import React, { useEffect, useState } from "react";

interface Ticker {
  symbol: string;
  lastPrice: string;
}

interface WebSocketTicker {
  s: string;
  c: string;
}

export default function PriceDisplay() {
  const [initialPrice, setInitialPrice] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("BTCUSDT");
  const [livePrice, setLivePrice] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(
          `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT"]`
        );
        const data: Ticker[] = await resp.json();
        setInitialPrice(data[0].lastPrice);
      } catch (err) {
        console.error(err);
        setError("Data load failed");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@ticker");

    ws.onmessage = (event) => {
      const data: WebSocketTicker = JSON.parse(event.data);
      setLivePrice(data.c);
    };

    ws.onerror = () => setError("WebSocket connection failed");
    return () => ws.close();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
        <p className="text-blue-400 font-medium">Initial Price (API)</p>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : initialPrice ? (
          <p className="text-xl font-semibold">
            {symbol}: ${parseFloat(initialPrice).toFixed(2)}
          </p>
        ) : (
          <p className="text-gray-400">Loading initial price...</p>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 bg-gray-800 p-4 rounded-xl shadow-md border border-gray-700">
        <p className="text-green-400 font-medium">Live Price (WebSocket)</p>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : livePrice ? (
          <p className="text-xl font-semibold">
            {symbol}: ${parseFloat(livePrice).toFixed(2)}
          </p>
        ) : (
          <p className="text-gray-400">Connecting to live updates...</p>
        )}
      </div>
    </div>
  );
}
