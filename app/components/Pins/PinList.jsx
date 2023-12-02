import React from "react";
import PinItem from "./PinItem";
import { usePins } from "@/app/hooks/usePins";

function PinList() {
  const { pins, loading } = usePins();

  return (
    <div className="mt-8 px-2 md:px-5 columns-1 md:columns-2 lg:columns-3 mb-4 xl:columns-4 space-y-6 mx-auto">
      {pins.map((item) => (
        <PinItem key={item.createdAt} pin={item} />
      ))}
      {loading && <Spin className="m-auto" />}
    </div>
  );
}

export default PinList;
