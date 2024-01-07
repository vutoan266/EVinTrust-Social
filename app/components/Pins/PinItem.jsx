import Image from "next/image";
import React from "react";
import UserTag from "../UserTag";
import { useRouter } from "next/navigation";
import { Tag } from "antd";
import Link from "next/link";

function PinItem({ pin }) {
  const router = useRouter();
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
    createdAt: pin?.createdAt,
  };

  return (
    <Link href={`/pin/${pin.id}`} prefetch>
      <div
        className="relative hover:before:bg-gray-600 before:opacity-50 before:w-full before:h-full before:z-10 cursor-pointer flex flex-col overflow-auto"
        onClick={() => router.push("/pin/" + pin.id)}
      >
        <div className="relative">
          <Image
            src={pin.images?.[0]}
            alt={pin.title}
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg cursor-pointer relative z-0 bg-gray-50 h-auto w-full"
          />
          <div className="absolute bottom-1 left-2">
            {pin.tags?.map((tag) => (
              <Tag key={tag} className="bg-white/70 border-none">
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[18px] mb-1 mt-2 line-clamp-2">
            {pin.title}
          </h2>
        </div>
        <UserTag user={user} />
      </div>
    </Link>
  );
}

export default PinItem;
