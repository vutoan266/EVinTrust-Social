import { Spin, Upload, UploadProps, notification } from "antd";
import { FC, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../Shared/firebaseConfig";

interface IProps extends UploadProps {
  value: any;
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
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);

  const uploadFile = ({
    file,
    onSuccess,
    filename,
    onError,
    onProgress,
  }: any) => {
    const storageRef = ref(storage, "pinterest/" + file.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log("DownloadUrl", url);
          onSuccess({ imageUrl: url, filename });
        });
      })
      .catch(() => {
        notification.error({
          message: `Sorry ${filename} didn't upload, please try again.`,
          placement: "topRight",
        });
      });
  };

  const handleFileChange = (info: any) => {
    const { status, uid } = info.file;

    if (status === "done") {
      onChange?.(info.file.response?.imageUrl);
      setLoading(false);
      notification.success({
        message: `${info.file.name} file uploaded successfully.`,
        placement: "topRight",
      });
    } else if (status === "error") {
      // const newList = value?.filter((file: any) => file.uid !== uid) || [];
      // onChange?.(newList);
      setLoading(false);
      notification.error({
        message: `Sorry ${info.file.name} didn't upload, please try again.`,
        placement: "topRight",
      });
    } else {
      setLoading(true);
      // const newList =
      //   value?.map((file: any) => (file.uid === uid ? info.file : file)) || [];
      // onChange?.(newList);
    }

    return true;
  };

  const uploadButton = (
    <div className="h-28 flex justify-center items-center flex-col">
      {loading ? <Spin /> : <AiOutlinePlus />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      customRequest={uploadFile}
      beforeUpload={beforeImage5mbUpload}
      onChange={handleFileChange}
    >
      {value ? <img src={value} alt="avatar" className="h-28" /> : uploadButton}
    </Upload>
  );
};
