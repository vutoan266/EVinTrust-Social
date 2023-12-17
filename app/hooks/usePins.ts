"use client";
import { getFirestore, collection, where, query } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
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

export const usePins = ({ tag }: { tag?: string }) => {
  const [pins, loading] = useCollectionData(
    query(
      collection(getFirestore(app), "pinterest-post"),
      ...(tag ? [where("tags", "array-contains", tag)] : [])
    ),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return {
    pins: pins as IPin[],
    loading,
  };
};
