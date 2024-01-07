"use client";
import React from "react";
import Image from "next/image";
import { timeDuration } from "../utils/utils";

function UserTag({ user }) {
  //const {data:session}=useSession();
  return (
    <div className="">
      {user ? (
        <div className="flex gap-3 items-center w-full mt-1">
          <Image
            src={user.image}
            alt="userImage"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="">
            <h2 className="text-[14px] font-medium mb-0">{user.name}</h2>
            <span className="text-gray-500 text-[10px]">
              {timeDuration(user.createdAt)}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserTag;
