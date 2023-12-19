import React, { Suspense } from "react";
import Form from "./Form";
import { Skeleton } from "antd";
function PinBuilder() {
  return (
    <Suspense loading={<Skeleton />}>
      <div className="min-h-screen">
        <Form />
      </div>
    </Suspense>
  );
}

export default PinBuilder;
