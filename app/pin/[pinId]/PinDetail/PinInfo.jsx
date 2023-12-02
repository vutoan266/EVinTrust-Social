import React from "react";
import UserTag from "../../../components/UserTag";
import { HiOutlineMapPin, HiOutlineShoppingBag } from "react-icons/hi2";
import { Tag } from "antd";
import { ETagEnum } from "../../../hooks/useTags";

function PinInfo({ pinDetail }) {
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };
  return (
    <div>
      <UserTag user={user} />
      <div className="p-4 rounded-md bg-gray-50 mt-6 flex flex-col gap-4">
        <p>{pinDetail.desc}</p>
        <p>
          {pinDetail.tags?.map((tag) => (
            <Tag
              key={tag}
              color={tag === ETagEnum.tuTap ? "volcano" : undefined}
            >
              {tag}
            </Tag>
          ))}
        </p>
        {pinDetail.link && (
          <div className="text-base rounded-full hover:underline transition-all flex items-center">
            <div className="mr-4">
              <HiOutlineShoppingBag size={24} />
            </div>
            <a href={pinDetail.link}>{pinDetail.link}</a>
          </div>
        )}
        {pinDetail.ggLink && (
          <div className="text-base rounded-full hover:underline transition-all flex items-center">
            <div className="mr-4">
              <HiOutlineMapPin size={26} />
            </div>
            <a href={pinDetail.ggLink}>{pinDetail.ggLink}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PinInfo;
