import React, { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Image, Upload } from "antd";
import ImgCrop from "antd-img-crop";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadAnt = ({ filelst, setFileList, edit }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileListState] = useState([]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileListState(newFileList);
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <AttachFileIcon className="text-base-content" />
      <p className="text-xs font-secondary font-medium text-base-content">
        Upload
      </p>
    </div>
  );

  return (
    <>
      {edit ? (
        <ImgCrop quality={1} rotationSlider showReset showGrid aspect={4 / 5}>
          <Upload
            listType="picture-circle"
            fileList={filelst}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
            accept="image/png, image/jpeg"
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false}
          accept="image/png, image/jpeg"
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      )}
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadAnt;
