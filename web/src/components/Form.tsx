import MUICheckbox from "@material-ui/core/Checkbox";
import MUIFormControlLabel from "@material-ui/core/FormControlLabel";
import MUITextField from "@material-ui/core/TextField";
import { palette, spacing } from "@material-ui/system";
import styled from "styled-components";

export const Form = styled.form`
  ${palette}
`;

export const TextField = styled(MUITextField)`
  ${palette}
  ${spacing}
`;

export const FormControlLabel = styled(MUIFormControlLabel)`
  ${palette}
`;

export const Checkbox = styled(MUICheckbox)`
  ${palette}
`;
