import React, { useEffect, useState } from "react";
import PinItem from "./PinItem";
import { usePins } from "@/app/hooks/usePins";
import { useTags } from "@/app/hooks/useTags";
import CheckableTag from "antd/es/tag/CheckableTag";
import { Spin } from "antd";
import { SkeletonCard } from "../SkeletonCard";

function PinList() {
  const [selectedTag, setSelectedTag] = useState();
  const {
    pins,
    loading: pinsLoading,
    getMore,
    hasMore,
  } = usePins({ tag: selectedTag });
  const { tags } = useTags();

  const handleScroll = () => {
    if (
      document.scrollingElement.scrollHeight -
        (window.innerHeight + document.documentElement.scrollTop) <
        200 &&
      !pinsLoading
    ) {
      hasMore && getMore();
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pinsLoading, hasMore]);

  return (
    <div className="mt-3 px-4 md:px-5 pb-4 aa">
      <div className="">
        {tags?.map((tag) => (
          <CheckableTag
            key={tag.name}
            checked={tag.name === selectedTag}
            onChange={(checked) =>
              setSelectedTag(checked ? tag.name : undefined)
            }
            className="border-solid border border-green-400 min-w-[60px] py-1 text-center text-sm"
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
      <div className="mt-4 columns-1 md:columns-2 lg:columns-3 mb-4 xl:columns-4 space-y-6 mx-auto">
        {pins?.map((item) => (
          <PinItem key={item.createdAt} pin={item} />
        ))}
      </div>
      {pinsLoading &&
        (pins?.length ? (
          <Spin className="m-auto" />
        ) : (
          <div className="mt-4 columns-1 md:columns-2 lg:columns-3 mb-4 xl:columns-4 space-y-6 mx-auto">
            <SkeletonCard />
          </div>
        ))}
    </div>
  );
}

export default PinList;
