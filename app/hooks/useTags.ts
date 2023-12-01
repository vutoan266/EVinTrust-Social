"use client";
import { useEffect, useState } from "react";
import { getDocs, getFirestore, collection } from "firebase/firestore";
import app from "@/app/Shared/firebaseConfig";

interface ITag {
  name: string;
  count: number;
  label: string;
  value: string;
}

export const useTags = () => {
  const [options, setOptions] = useState<ITag[]>([]);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

  const getOptions = async () => {
    try {
      setLoading(true);
      const docRef = collection(db, "tags");
      const docSnap = await getDocs(docRef);
      const optionList: ITag[] = [];
      docSnap.forEach((item) => {
        const doc = item.data() as { name: string; count: number };
        optionList.push({ ...doc, label: doc.name, value: doc.name });
      });
      setOptions(optionList);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOptions();
  }, []);

  return {
    options,
    loading,
  };
};
