"use client";
import React, { useEffect, useState } from "react";
import app from "../Shared/firebaseConfig";
import UserInfo from "./UserInfo";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import PinList from "./../components/Pins/PinList";
import { getValidUserId } from "../utils/utils";
import { signOut } from "next-auth/react";
import { Skeleton, Spin } from "antd";

function Profile({ params }) {
  const db = getFirestore(app);
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);
  // signOut();
  useEffect(() => {
    if (params) {
      getUserInfo(getValidUserId(params.userId));
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    if (userInfo) {
      getUserPins();
    }
  }, [userInfo]);
  const getUserPins = async () => {
    setListOfPins([]);
    const q = query(
      collection(db, "pinterest-post"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
    });
  };
  return (
    <div className="py-14 text-center">
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinList listOfPins={listOfPins} />
        </div>
      ) : (
        <Spin className="m-auto" />
      )}
    </div>
  );
}

export default Profile;
