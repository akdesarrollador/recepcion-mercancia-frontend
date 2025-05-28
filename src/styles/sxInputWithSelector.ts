export const sxPaper = {
  display: "flex",
  alignItems: "center",
  borderRadius: "10px",
  overflow: "hidden",
  height: "45px",
  border: "1px solid #DADADA",
  backgroundColor: "#fff",
  "&:hover": {
    borderColor: "#bdbdbd",
  },
  "&:focus-within": {
    borderColor: "#0054A6",
    borderWidth: "1px",
  },
};

export const sxUnitSelectorBox = {
  display: "flex",
  fontFamily: "Roboto, sans-serif",
  alignItems: "center",
  padding: "18px 8px",
  backgroundColor: "#F4F4F4",
  borderRight: "1px solid #e0e0e0",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
};

export const sxInputBase = {
  flex: 1,
  padding: "5px 8px",
  fontSize: "12px",
  "& input": {
    padding: 0,
  },
  "& input::placeholder": {
    color: "#9e9e9e",
    fontSize: "12px",
    opacity: 1,
  },
};

export const sxPaperPropsMenu = {
  borderRadius: "8px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  minWidth: "120px",
  marginTop: "4px",
};

export const sxMenuItem = {
  fontSize: "14px",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
  "&.Mui-selected": {
    backgroundColor: "#e3f2fd",
    "&:hover": {
      backgroundColor: "#bbdefb",
    },
  },
};
