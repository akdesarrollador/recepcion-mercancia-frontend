import Box from "@mui/material/Box";
import { SimpleFieldProps } from "../../utils/interfaces/component.props";
import SimpleTextInput from "../inputs/simpleTextInput";
import Typography from "@mui/material/Typography";

const SimpleField: React.FC<SimpleFieldProps> = ({
  boxWidth,
  labelFontSize,
  labelFontWeight,
  labelText,
  inputValue,
  setInputValue,
  inputHeight,
  inputFontSize,
  borderColor,
  placeholder,
  readonly = false,
}) => {
  return (
    <Box width={boxWidth}>
      <Typography sx={{ fontSize: labelFontSize, fontWeight: labelFontWeight }}>
        {labelText}
      </Typography>
      <SimpleTextInput
        value={inputValue}
        placeholder={placeholder}
        setValue={setInputValue}
        fontSize={inputFontSize}
        inputHeight={inputHeight}
        borderColor={borderColor}
        readonly={readonly}
      />
    </Box>
  );
};

export default SimpleField;
