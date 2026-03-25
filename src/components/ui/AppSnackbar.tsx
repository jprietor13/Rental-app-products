import { Alert, Snackbar } from "@mui/material";

type AppSnackbarProps = {
  openSnackbar: boolean;
  message: string;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
};

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
    >
      <Alert severity="success" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
