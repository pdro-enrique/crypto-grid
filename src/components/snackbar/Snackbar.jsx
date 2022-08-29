import { Snackbar as MuiSnackbar, Alert, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export const Snackbar = ({
  isOpen,
  onClose,
  severity,
  message,
  ...rest
}) => (
  <MuiSnackbar
    open={isOpen}
    autoHideDuration={3000}
    onClose={onClose}
    action={<IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={onClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>}
    {...rest}
  >
    <Alert
      onClose={onClose}
      severity={severity}
      sx={{ width: '100%' }}
    >
      {message}
    </Alert>
  </MuiSnackbar>
);

export default Snackbar;
