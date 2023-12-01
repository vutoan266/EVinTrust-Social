"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./../Shared/firebaseConfig";
import { useRouter } from "next/navigation";
import { Button } from "antd";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  };

  const onCreateClick = () => {
    if (session) {
      router.push("/post");
    } else {
      signIn();
    }
  };

  return (
    <div className="flex justify-between gap-3 md:gap-2 items-center px-6 py-3 bg-white fixed top-0 right-0 left-0 z-10 border-solid border-0 border-b border-[#FD6C23]">
      <Image
        src="/logo-no-background.png"
        alt="logo"
        width={0}
        height={0}
        sizes="100vw"
        onClick={() => router.push("/")}
        className="hover:bg-gray-300 cursor-pointer rounded-[4px] h-8 w-auto"
      />
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <Button
              type="default"
              className="font-semibold rounded-full"
              onClick={() => onCreateClick()}
            >
              Đăng bài
            </Button>
            <Image
              src={session.user.image}
              onClick={() =>
                router.push(`/${session.user.email || session.user.name}`)
              }
              alt="user-image"
              width={36}
              height={36}
              className="hover:bg-gray-300 rounded-full cursor-pointer"
            />
          </>
        ) : (
          <Button
            className="font-semibold rounded-full"
            onClick={() => signIn()}
          >
            Đăng nhập
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
