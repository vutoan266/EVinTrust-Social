"use client";
import { useMemo } from "react";
import { getFirestore, collection } from "firebase/firestore";
import app from "@/app/Shared/firebaseConfig";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";

interface ITag {
  name: string;
  count: number;
}

export enum ETagEnum {
  tuTap = "🔥Tụ tập",
}

export const useTags = () => {
  const [tags, loading, error] = useCollectionData<ITag>(
    collection(getFirestore(app), "tags"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return {
    tags,
    loading,
  };
};
