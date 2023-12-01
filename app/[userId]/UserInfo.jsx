import Image from "next/image";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "antd";

function UserInfo({ userInfo }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onLogoutClick = async () => {
    try {
      setIsLoading(true);
      await signOut();
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
        src={userInfo.userImage}
        alt="userImage"
        width={100}
        height={100}
        className="rounded-full mb-4"
      />

      <h2
        className="text-[30px]
        font-semibold"
      >
        {userInfo.userName}
      </h2>
      <h2 className="text-gray-400">{userInfo.email}</h2>
      <div className="flex gap-4">
        <Button type="primary" className="font-semibold mt-5 rounded-full w-20">
          Share
        </Button>
        {session?.user.email == userInfo.email ? (
          <Button
            className="font-semibold mt-5 rounded-full w-20"
            onClick={() => onLogoutClick()}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export default UserInfo;
