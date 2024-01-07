"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./../Shared/firebaseConfig";
import { Button } from "antd";
import Link from "next/link";

function Header() {
  const { data: session, status } = useSession();
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

  return (
    <div className="flex justify-between gap-3 md:gap-2 items-center px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 fixed top-0 right-0 left-0 z-10 border-solid border-0 border-b border-green-400">
      <Link className="no-underline cursor-pointer" href="/" prefetch>
        <span className="font-bold text-2xl md:text-3xl text-blue-100">
          Not a Vinfast
        </span>
      </Link>
      <div className="flex items-center gap-4">
        {status !== "loading" &&
          (session?.user ? (
            <>
              <Link href="/post" prefetch>
                <Button type="default" className="font-semibold rounded-full">
                  Đăng bài
                </Button>
              </Link>
              <Link
                href={`/${session.user.email || session.user.name}`}
                prefetch
              >
                <Image
                  src={session.user.image}
                  alt="user-image"
                  width={36}
                  height={36}
                  className="hover:bg-gray-300 rounded-full cursor-pointer"
                />
              </Link>
            </>
          ) : (
            <Button
              className="font-semibold rounded-full"
              onClick={() => signIn()}
            >
              Đăng nhập
            </Button>
          ))}
      </div>
    </div>
  );
}

export default Header;
