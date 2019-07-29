import MUISnackbar from "@material-ui/core/Snackbar";
import { get } from "lodash";
import React from "react";
import { theme } from "../theme";

export interface SnackbarProps {
  message: string | null;
  type?: string;
  open: boolean;
}

export const Snackbar = ({ snackbar, onClose }: { snackbar: SnackbarProps; onClose: any }) => {
  const getBgColor = () => {
    switch (snackbar.type) {
      case "error":
        return theme.palette.error.main;
      default:
        return theme.palette.background.default;
    }
  };

  return (
    <MUISnackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={onClose}
      ContentProps={{
        "aria-describedby": "message-id",
        style: { backgroundColor: getBgColor() },
      }}
      message={<span id="message-id">{snackbar.message}</span>}
    />
  );
};

export const closeSnackbar = (): SnackbarProps => ({ message: null, open: false });
export const displaySnackbar = ({ message, type }: Partial<SnackbarProps>): SnackbarProps => ({
  message,
  open: true,
  type,
});

export const displaySnackbarError = (error: any): SnackbarProps => ({
  message:
    get(error, ["response", "data", "error"]) ||
    get(error, ["response", "data", "message"]) ||
    get(error, ["response", "data", "mensaje"]) ||
    get(error, ["mensaje"]) ||
    get(error, ["error"]) ||
    get(error, ["message"]) ||
    "",
  open: true,
  type: "error",
});
