"use client";
import React, { useEffect, useState } from "react";

export default function PriceDisplay() {
  interface Ticker {
    symbol: string;
    lastPrice: string;
  }
  const [price, setPrice] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [error, setError] = useState<string>("");

  /// Without websocket
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resp = await fetch(
  //         `https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT"]`
  //       );
  //       const data = await resp.json();
  //       console.log(data[0]);
  //       setPrice(data[0].lastPrice);
  //       setSymbol(data[0].symbol);
  //       //   setPrice(data[0].lastPrice);
  //       //   console.log(price);
  //     } catch (error: any) {
  //       setError(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  ////With websocket
  useEffect(() => {
    const webSocket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@ticker"
    );
    webSocket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      // setWebSocketData(data);
      console.log(data);
      setSymbol(data.s);
      setPrice(data?.w);
    };
  }, []);

  return (
    <div className="pt-4">
      <div className="flex items-center gap-4">
        <div>
          <p className="text-blue-400">Last Price</p>
        </div>
        <div></div>
        <div>
          <p>{symbol}</p>
        </div>
        <div>
          <p>{parseFloat(price).toFixed(2)}</p>
        </div>
      </div>
      {error && <p>Data load failed</p>}
    </div>
  );
}
