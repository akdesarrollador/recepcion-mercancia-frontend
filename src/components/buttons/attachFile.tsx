import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { X } from "lucide-react";
import useGlobalStore from "../../store/useGlobalStore";
import Box from "@mui/material/Box";
import { sxIconBox, sxImgBox } from "../../styles/sxAttachFile";
import { AttachFileProps } from "../../utils/interfaces/componentsProps";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PreviewBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const FilePreview = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 10px;
  font-size: 11px;
`;

const AttachFile: React.FC<AttachFileProps> = ({
  icon,
  text,
  fontColor,
  backgroundColor,
  borderColor,
  borderRadius,
  width,
  height,
  fontSize,
  padding,
  onSubmit,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { setBillImage } = useGlobalStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (!files.length) return;

    const newFiles = [...selectedFiles, ...files].slice(0, 3);

    setSelectedFiles(newFiles);
    setBillImage(newFiles.length > 0 ? newFiles[0] : null);
    if (onSubmit) onSubmit(newFiles.length > 0 ? newFiles : null);

    event.target.value = "";
  };

  const handleRemove = (idx: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== idx);
    setSelectedFiles(newFiles);
    setBillImage(newFiles.length > 0 ? newFiles[0] : null);
    if (onSubmit) onSubmit(newFiles.length > 0 ? newFiles : null);
  };

  const handleButtonClick = () => {
    if (selectedFiles.length < 3) {
      inputRef.current?.click();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        tabIndex={-1}
        startIcon={selectedFiles.length ? undefined : icon}
        sx={{
          fontFamily: "Roboto, sans-serif",
          fontWeight: "bold",
          color: fontColor,
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          width: width,
          height: height,
          fontSize: fontSize,
          padding: padding,
          border: `1.5px solid ${borderColor || "transparent"}`,
          borderStyle: "dashed",
          textTransform: "none",
          boxShadow: selectedFiles.length
            ? "none"
            : "3px 3px 3px rgba(0, 0, 0, 0.1)",
          opacity: selectedFiles.length >= 3 ? 0.5 : 1,
        }}
        onClick={handleButtonClick}
      >
        {selectedFiles.length > 0 ? (
          <PreviewBox>
            <FilePreview>
              {selectedFiles.map((file, idx) => (
                <Box
                  key={file.name + idx}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginRight: "8px",
                  }}
                >
                  <Box
                    component="img"
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    sx={sxImgBox}
                  />

                  <Box
                    sx={sxIconBox}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <X size={18} color="#d32f2f" />
                  </Box>
                </Box>
              ))}
            </FilePreview>
          </PreviewBox>
        ) : (
          <>{text}</>
        )}
      </Button>
      <VisuallyHiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        disabled={selectedFiles.length >= 1}
        max={1}
        maxLength={1}
      />
    </>
  );
};

export default AttachFile;
