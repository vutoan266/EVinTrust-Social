import app from "@/app/Shared/firebaseConfig";
import React, { useEffect } from "react";
import PinItem from "./PinItem";
function PinList({ listOfPins }) {
  return (
    <div className="mt-6 px-2 md:px-5 columns-1 md:columns-2 lg:columns-3 mb-4 xl:columns-4 space-y-6 mx-auto">
      {listOfPins.map((item, index) => (
        <PinItem pin={item} />
      ))}
    </div>
  );
}

export default PinList;
