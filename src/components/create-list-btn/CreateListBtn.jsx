import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { CREATE_LIST_PATH } from '../../constants';

export const CreateListBtn = ({ children, ...rest }) => {
  return (
    <Button
      variant="contained"
      color="success"
      size="large"
      component={Link}
      to={CREATE_LIST_PATH}
      disableElevation
      {...rest}
    >
      <AddIcon sx={{ mr: 1 }} />
      {children || "Crear Lista"}
    </Button>
  );
}