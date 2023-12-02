"use client";
import { useMemo } from "react";
import { getFirestore, collection } from "firebase/firestore";
import app from "@/app/Shared/firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";

interface ITag {
  name: string;
  count: number;
  label: string;
  value: string;
}

export const useTags = () => {
  const [value, loading, error] = useCollection(
    collection(getFirestore(app), "tags"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const options = useMemo(
    () =>
      value?.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          label: data.name,
          value: data.name,
        };
      }) || [],
    [value]
  );

  return {
    options,
    loading,
  };
};
