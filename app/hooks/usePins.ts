"use client";
import {
  getFirestore,
  collection,
  where,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
// import { useCollectionData } from "react-firebase-hooks/firestore";
import app from "../Shared/firebaseConfig";
import { useEffect, useRef, useState } from "react";

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

interface IProps {
  tag?: string;
}

const LIMIT = 20;

export const usePins = ({ tag }: IProps) => {
  const [pins, setPins] = useState<IPin[]>([]);
  const [loading, setLoading] = useState(false);
  const lastCursorRef = useRef();

  // const [pins, loading] = useCollectionData(
  //   query(
  //     collection(getFirestore(app), "pinterest-post"),
  //     ...(tag ? [where("tags", "array-contains", tag)] : []),
  //     orderBy("createdAt", "desc"),
  //     limit(20)
  //   ),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  const getMore = async (firstLoad?: boolean) => {
    if (!firstLoad && !lastCursorRef.current) return;
    setLoading(true);
    try {
      const q = query(
        collection(getFirestore(app), "pinterest-post"),
        ...(tag ? [where("tags", "array-contains", tag)] : []),
        orderBy("createdAt", "desc"),
        ...(firstLoad ? [] : [startAfter(lastCursorRef.current)]),
        limit(LIMIT)
      );
      const querySnapshot = await getDocs(q);

      lastCursorRef.current = querySnapshot.docs[
        querySnapshot.docs.length - 1
      ] as any;
      // set data
      const newData: IPin[] = [];
      querySnapshot.forEach((doc) => {
        newData.push(doc.data() as IPin);
      });
      if (firstLoad) setPins(newData);
      else setPins((prev) => [...prev, ...newData]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMore(true);
  }, [tag]);

  return {
    pins: pins as IPin[],
    getMore,
    loading,
    hasMore: !!lastCursorRef.current,
  };
};
