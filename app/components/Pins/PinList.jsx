import React, { useState } from "react";
import PinItem from "./PinItem";
import { usePins } from "@/app/hooks/usePins";
import { useTags } from "@/app/hooks/useTags";
import CheckableTag from "antd/es/tag/CheckableTag";
import { Spin } from "antd";

function PinList() {
  const [selectedTag, setSelectedTag] = useState();
  const { pins, loading: pinsLoading } = usePins({ tag: selectedTag });
  const { tags } = useTags();

  return (
    <div className="mt-8 px-2 md:px-5">
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
      {pinsLoading && <Spin className="m-auto" />}
    </div>
  );
}

export default PinList;
