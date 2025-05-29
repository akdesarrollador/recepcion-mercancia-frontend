import React, { useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { ImageUp, X } from 'lucide-react';
import useGlobalStore from "../../store/useGlobalStore";

export interface AttachFileProps {
  icon: React.ReactNode;
  text: string;
  onSubmit?: (file: File | null) => void;
  fontColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  padding?: string;
}

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
  align-items: center;
  width: 100%;
  gap: 10px;
  font-size: 11px;
`;

const ImagePreview = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 4px;
  border: 1px solid #e0e0e0;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const { setBillImage } = useGlobalStore()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setBillImage(file);
    if (onSubmit) onSubmit(file);

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    setPreview("");
    setBillImage(null);
    if (onSubmit) onSubmit(null);
  };

  return (
    <div>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={selectedFile ? undefined : icon}
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
          boxShadow: selectedFile ? "none" : "3px 3px 3px rgba(0, 0, 0, 0.1)",
          opacity: selectedFile ? 0.3 : 1,
        }}
      >
        {selectedFile ? (
          <PreviewBox>
            <FilePreview>
              {selectedFile.type.startsWith("image/") && preview ? (
                <ImagePreview src={preview} alt={selectedFile.name} />
              ) : (
                <ImageUp style={{ fontSize: 40, color: "#bdbdbd", marginBottom: "4px" }} />
              )}
              <span title={selectedFile.name}>
                {selectedFile.name.length > 15
                  ? selectedFile.name.slice(0, 12) + "..."
                  : selectedFile.name}
              </span>
              <X
                style={{ cursor: "pointer", marginLeft: 8 }}
                onClick={handleClear}
                size={18}
              />
            </FilePreview>
          </PreviewBox>
        ) : (
          <>
            {text}
            <VisuallyHiddenInput
              type="file"
              accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx,.txt"
              multiple={false}
              onChange={handleChange}
            />
          </>
        )}
      </Button>
    </div>
  );
};

export default AttachFile;