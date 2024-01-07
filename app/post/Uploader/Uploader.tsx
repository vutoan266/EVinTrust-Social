/* eslint-disable no-unused-vars */
import { Upload, UploadFile, UploadProps, notification } from "antd";
import { FC } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../Shared/firebaseConfig";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RcFile } from "antd/es/upload";

interface IProps extends Omit<UploadProps, "onChange"> {
  value: UploadFile<{ url: string; name: string }>[];
  onChange?: (value: UploadFile<{ url: string; name: string }>[]) => void;
}

export const beforeImage5mbUpload = (file: any) => {
  const supportedFileType =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!supportedFileType) {
    notification.error({
      message: "Sorry, we can only accept JPG, PNG or JPEG files",
      placement: "topRight",
    });
    return false;
  }

  return true;
};

export const Uploader: FC<IProps> = ({ value, onChange }) => {
  const storage = getStorage(app);

  const uploadFile = ({
    file,
    onSuccess,
    filename,
    onError,
  }: UploadRequestOption<{ name?: string; url?: string }>) => {
    const storageRef = ref(storage, "pinterest/" + (file as RcFile).name);
    uploadBytes(storageRef, file as any)
      .then(() => {})
      .then(() => {
        getDownloadURL(storageRef).then(async (url) => {
          onSuccess?.({ url, name: filename });
        });
      })
      .catch((e) => {
        onError?.(e);
        notification.error({
          message: `Sorry ${filename} didn't upload, please try again.`,
          placement: "topRight",
        });
      });
  };

  const handleFileChange = (info: {
    file: UploadFile<{ url: string; name: string }>;
  }) => {
    const { status, uid } = info.file;
    console.log(status);
    if (status === "done") {
      onChange?.(
        value?.map((item) =>
          item.uid === uid ? { ...info.file, ...info.file.response } : item
        )
      );
      notification.success({
        message: `${info.file.name} file uploaded successfully.`,
        placement: "topRight",
      });
    } else if (status === "error") {
      const newList = value?.filter((file) => file.uid !== uid) || [];
      onChange?.(newList);
      notification.error({
        message: `Sorry ${info.file.name} didn't upload, please try again.`,
        placement: "topRight",
      });
    } else if (status === "removed") {
      const newList = value?.filter((file) => file.uid !== uid) || [];
      onChange?.(newList);
    } else {
      onChange?.([...(value || []), info.file]);
    }

    return true;
  };

  const uploadButton = (
    <div className="h-28 flex justify-center items-center flex-col">
      <AiOutlinePlus />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={true}
      customRequest={uploadFile}
      beforeUpload={beforeImage5mbUpload}
      onChange={handleFileChange}
      fileList={value}
    >
      {uploadButton}
    </Upload>
  );
};
