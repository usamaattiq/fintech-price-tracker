"use client";
import Image from "next/image";
import { useEffect } from "react";
import PriceDisplay from "./components/PriceDisplay";

export default function Home() {
  return (
    <div className="flex justify-center items-center w-[400px] h-[100px] rounded-[12px] border-amber-800 border-[1px] ">
      <div className="">
        <h1 className="text-2xl font-bold">Real-Time Price Display</h1>
        <div className=" ">
          <PriceDisplay />
        </div>
      </div>
    </div>
  );
}
