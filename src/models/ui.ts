import type { useRental } from "../hooks/useRental";

export interface AppButtonProps {
  rental: ReturnType<typeof useRental>;
  showMessage: (msg: string) => void;
  isValidDates: boolean;
  isValidQuantity: boolean;
  canConfirm: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AppDialogProps {
  openDialog: boolean;
  rental: ReturnType<typeof useRental>;
  showMessage: (msg: string) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AppImageCarouselProps {
  images: string[];
  alt: string;
}

export interface AppSnackbarProps {
  openSnackbar: boolean;
  message: string;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AppTextFieldProps {
  calendarEnabled: boolean;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  today: string;
}
