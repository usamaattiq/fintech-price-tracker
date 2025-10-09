"use client";
import React from "react";
import PriceDisplay from "./components/PriceDisplay";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white px-4">
      <div className="flex flex-col items-center gap-6 w-full max-w-md p-6 border border-amber-700 rounded-2xl shadow-xl bg-gray-900">
        <h1 className="text-3xl font-extrabold text-amber-400 text-center">
          Real-Time Price Display
        </h1>
        <PriceDisplay />
      </div>
    </main>
  );
}
