import Image from "next/image";
import React from "react";
import UserTag from "../UserTag";
import { useRouter } from "next/navigation";
import moment from "moment";

function PinItem({ pin }) {
  const router = useRouter();
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  return (
    <div
      className="relative hover:before:bg-gray-600 before:opacity-50 before:w-full before:h-full before:z-10 cursor-pointer flex flex-col overflow-auto"
      onClick={() => router.push("/pin/" + pin.id)}
    >
      <Image
        src={pin.images?.[0]}
        alt={pin.title}
        width={0}
        height={0}
        sizes="100vw"
        className="rounded-3xl cursor-pointer relative z-0 bg-gray-50 h-auto w-full"
      />
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[18px] mb-1 mt-2 line-clamp-2">
          {pin.title}
        </h2>
        <span className="text-gray-500 text-sm">
          {moment(pin.createdAt).format("DD/MM/YY HH:mm")}
        </span>
      </div>
      <UserTag user={user} />
    </div>
  );
}

export default PinItem;
