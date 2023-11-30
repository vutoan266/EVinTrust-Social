import React, { Suspense } from "react";
import Form from "./../components/Form";
import { Skeleton } from "antd";
function PinBuilder() {
  return (
    <Suspense loading={<Skeleton />}>
      <div className="min-h-screen p-3">
        <Form />
      </div>
    </Suspense>
  );
}

export default PinBuilder;
