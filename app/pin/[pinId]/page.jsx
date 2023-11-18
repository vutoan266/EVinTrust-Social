"use client";
import React, { useEffect, useState } from "react";
import PinImage from "./../../components/PinDetail/PinImage";
import PinInfo from "./../../components/PinDetail/PinInfo";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "@/app/Shared/firebaseConfig";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
function PinDetail({ params }) {
  const router = useRouter();
  const db = getFirestore(app);
  const [pinDetail, setPinDetail] = useState([]);

  useEffect(() => {
    getPinDetail();
  }, []);

  const getPinDetail = async () => {
    const docRef = doc(db, "pinterest-post", params.pinId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setPinDetail(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  return (
    <>
      {pinDetail ? (
        <div className="p-3 !pt-0 md:p-12 md:px-24 lg:px-36">
          <div
            className="flex gap-3 md:gap-4 flex-col
            rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 "
          >
            <div className="flex items-center ">
              <HiArrowSmallLeft
                className="text-4xl md:text-4xl font-bold -ml-1 mr-4
              cursor-pointer hover:bg-gray-200 rounded-full"
                onClick={() => router.back()}
              />
              <h2 className="text-xl md:text-[30px] font-bold mb-0">
                {pinDetail.title}
              </h2>
            </div>

            <PinImage pinDetail={pinDetail} />
            <div className="">
              <PinInfo pinDetail={pinDetail} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PinDetail;
