"use client";

import { Suspense } from "react";
import PinList from "./components/Pins/PinList";
import { Skeleton } from "antd";

export default function Home() {
  return (
    <Suspense loading={<Skeleton />}>
      <PinList />
    </Suspense>
  );
}
