import Image from "next/image";
import React from "react";

function PinImage({ pinDetail }) {
  return (
    <div>
      <Image
        src={pinDetail.image}
        alt={pinDetail.title}
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-md w-full h-auto"
      />
    </div>
  );
}

export default PinImage;
