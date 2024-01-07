"use client";

import { Suspense } from "react";
import PinList from "./components/Pins/PinList";

export default function Home() {
  return (
    <Suspense
    // loading={
    //   <div className="mt-4 columns-1 md:columns-2 lg:columns-3 mb-4 xl:columns-4 space-y-6 mx-auto">
    //     Loafing
    //   </div>
    // }
    >
      <PinList />
    </Suspense>
  );
}
