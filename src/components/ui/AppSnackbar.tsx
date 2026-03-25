import { Alert, Snackbar } from "@mui/material";
import type { AppSnackbarProps } from "../../models/ui";

export const AppSnackbar = ({
  openSnackbar,
  message,
  setOpenSnackbar,
}: AppSnackbarProps) => {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity="success"
        variant="filled"
        className="bg-brand-600! text-white! font-medium! rounded-lg! shadow-lift! transition-all duration-300"
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
