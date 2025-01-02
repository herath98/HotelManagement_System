import { toast, ToastOptions, Id } from 'react-toastify';

interface AlertOptions extends ToastOptions {
  position?: ToastOptions['position'];
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: undefined;
  theme?: ToastOptions['theme'];
  pauseOnFocusLoss?: boolean;
}

const defaultOptions: AlertOptions = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  pauseOnFocusLoss: false,
};

const inputValidationOptions: AlertOptions = {
  ...defaultOptions,
  position: 'bottom-right',
  hideProgressBar: true,
  pauseOnHover: false,
};

const error = (msg: string, options?: Partial<AlertOptions>): Id => {
  return toast.error(msg, { ...defaultOptions, ...options });
};

const loading = (msg: string, options?: Partial<AlertOptions>): Id => {
  return toast.loading(msg, { ...defaultOptions, ...options });
};

const dismiss = (toastId: Id): void => {
  toast.dismiss(toastId);
};

const warn = (msg: string, options?: Partial<AlertOptions>): Id => {
  return toast.warn(msg, { ...defaultOptions, ...options });
};

const success = (msg: string, options?: Partial<AlertOptions>): Id => {
  return toast.success(msg, { ...defaultOptions, ...options });
};

const inputValidation = (msg: string, options?: Partial<AlertOptions>): Id => {
  return toast.info(msg, { ...inputValidationOptions, ...options });
};

const alert = {
  error,
  warn,
  success,
  inputValidation,
  loading,
  dismiss,
};

export default alert;
