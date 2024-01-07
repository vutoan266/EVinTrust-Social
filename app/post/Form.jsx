"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import app from "../Shared/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button, Form, Input } from "antd";
import { Uploader } from "./Uploader/Uploader";
import { HiOutlineMapPin, HiOutlineShoppingBag } from "react-icons/hi2";
import moment from "moment";
import { HiArrowSmallLeft } from "react-icons/hi2";
import pickBy from "lodash/pickBy";
import { TagSelect } from "./TagSelect/TagSelect";

function ShareForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const db = getFirestore(app);

  const onFinish = async ({ images, ...values }) => {
    const postId = moment().unix().toString();
    setLoading(true);
    const postData = pickBy({
      ...values,
      images: images.map((item) => item.url),
      userName: session.user.name,
      email: session.user.email || "",
      userImage: session.user.image,
      createdAt: moment().toISOString(),
      id: postId,
    });
    try {
      await setDoc(doc(db, "pinterest-post", postId), postData).then(() => {
        console.log("Saved");
        router.push("/" + session.user.email);
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md max-w-2xl m-auto">
      <div className="flex items-center mb-6">
        <HiArrowSmallLeft
          className="text-4xl md:text-4xl font-bold -ml-1 mr-4
              cursor-pointer hover:bg-gray-200 rounded-full"
          onClick={() => router.back()}
        />

        <h2 className="text-xl md:text-[30px] font-bold mb-0">Đăng bài</h2>
      </div>
      <Form layout="vertical" autoComplete="off" onFinish={onFinish}>
        <Form.Item
          name="images"
          rules={[{ required: true, message: "Tải hình ảnh" }]}
        >
          <Uploader />
        </Form.Item>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Nhập tiêu đề" }]}
        >
          <Input
            placeholder="Nhập tiêu đề"
            className="text-base font-semibold w-full"
          />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="desc"
          rules={[{ required: true, message: "Nhập mô tả" }]}
        >
          <Input.TextArea
            placeholder="Mô tả"
            className="w-full text-sm"
            autoSize={{ minRows: 3 }}
          />
        </Form.Item>
        <Form.Item
          label="Thẻ"
          name="tags"
          rules={[{ required: true, message: "Nhập thẻ" }]}
        >
          <TagSelect placeholder="Chủ đề" className="w-full text-sm" />
        </Form.Item>
        <Form.Item label="Đường dẫn" name="link">
          <Input
            placeholder="Link mua hàng"
            className="w-full"
            addonBefore={<HiOutlineShoppingBag />}
          />
        </Form.Item>
        <Form.Item label="Địa chỉ/Vị trí" name="ggLink">
          <Input
            placeholder="Nhập link Google map"
            className="w-full"
            addonBefore={<HiOutlineMapPin />}
          />
        </Form.Item>
        <Button type="primary" loading={loading} htmlType="submit">
          Đăng bài
        </Button>
      </Form>
    </div>
  );
}

export default ShareForm;
