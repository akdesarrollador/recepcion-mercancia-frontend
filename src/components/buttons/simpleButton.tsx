import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { SimpleButtonProps } from "../../utils/interfaces/component.props";

const SimpleButton: React.FC<SimpleButtonProps> = ({
  backgroundColor = "#0054A6",
  fontColor = "#FFFFFF",
  label,
  onClick,
  disabled = false,
  loading = false,
  borderColor,
}) => {
  // Helper to set alpha to 60% for background color when disabled
  const getBackgroundColor = () => {
    if (!disabled) return backgroundColor;
    // If backgroundColor is in hex format, add alpha
    if (
      backgroundColor.startsWith("#") &&
      (backgroundColor.length === 7 || backgroundColor.length === 4)
    ) {
      // Convert hex to rgba
      let hex = backgroundColor.replace("#", "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((x) => x + x)
          .join("");
      }
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      return `rgba(${r},${g},${b},0.5)`;
    }
    // If already rgba or other, fallback
    return backgroundColor;
  };

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth
      sx={{
        color: fontColor,
        backgroundColor: getBackgroundColor(),
        boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        borderRadius: "10px",
        height: "53px",
        fontWeight: "600",
        border: borderColor ? `2px solid ${borderColor}` : "none",
      }}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: fontColor }} />
      ) : (
        label
      )}
    </Button>
  );
};

export default SimpleButton;
