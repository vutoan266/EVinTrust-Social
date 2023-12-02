"use client";
import { useMemo } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import app from "../Shared/firebaseConfig";

interface IPin {
  userName: string;
  userImage: string;
  email: string;
  images: string[];
  title: string;
  createdAt: string;
  tags: string[];
  link: string;
  ggLink: string;
}

export const usePins = () => {
  const [value, loading, error] = useCollection<IPin>(
    collection(getFirestore(app), "pinterest-post"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const pins = useMemo(
    () => (value?.docs.map((doc) => doc.data()) as IPin[]) || [],
    [value]
  );

  return {
    pins,
    loading,
  };
};
