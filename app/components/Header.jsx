"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./../Shared/firebaseConfig";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import Link from "next/link";

function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const db = getFirestore(app);

  useEffect(() => {
    const saveUserInfo = async () => {
      if (session?.user) {
        await setDoc(doc(db, "user", session.user.email), {
          userName: session.user.name,
          email: session.user.email,
          userImage: session.user.image,
        });
      }
    };
    saveUserInfo();
  }, [session]);

  const onCreateClick = () => {
    if (session) {
      router.push("/post");
    } else {
      signIn();
    }
  };

  return (
    <div className="flex justify-between gap-3 md:gap-2 items-center px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 fixed top-0 right-0 left-0 z-10 border-solid border-0 border-b border-green-400">
      {/* <Image
        src="/logo-no-background.png"
        alt="logo"
        width={0}
        height={0}
        sizes="100vw"
        onClick={() => router.push("/")}
        className="hover:bg-gray-300 cursor-pointer rounded-[4px] h-8 w-auto"
      /> */}
      <Link className="no-underline" href="/">
        <span className="font-bold text-3xl text-blue-100">Not a Vinfast</span>
      </Link>
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
