"use client";
import React from "react";
import Image from "next/image";
import moment from "moment";

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
          <div className="flex justify-between flex-1">
            <h2 className="text-[14px] font-medium mb-0">{user.name}</h2>
            <span className="text-gray-500 text-sm">
              {moment(user.createdAt).format("DD/MM/YY HH:mm")}
            </span>
            {/* <h2 className="text-[12px]">{user.email}</h2> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default UserTag;
