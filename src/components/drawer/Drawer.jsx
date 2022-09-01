import { useMemo } from 'react';
import { Drawer as DrawerMui, Typography, Grid, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ManageList from './components/ManageList'
import CreateListForm from './components/CreateListForm'
import { useParams, useNavigate } from "react-router-dom";
import './styles.css';
import { MANAGE_LIST, CREATE_LIST, UPDATE_LIST } from '../../constants';

const routeOptions = [MANAGE_LIST, CREATE_LIST, UPDATE_LIST];

export const Drawer = () => {
  const { action, listId } = useParams();
  const navigate = useNavigate();

  const drawerTitle = useMemo(() => {
    switch(action) {
      case MANAGE_LIST:
        return 'Administrar Listas';
      case CREATE_LIST:
        return 'Crear Lista';
      case UPDATE_LIST:
        return 'Actualizar Lista';
      default:
        break;
    }
  }, [action]);

  const DrawerBody = () => {
    if (action === MANAGE_LIST) {
      return <ManageList />;
    }
    
    if (action === 'crear-lista' || action === UPDATE_LIST) {
      return <CreateListForm />
    }
  }

  return (
    <div className="save-list">
      <DrawerMui
        anchor="right"
        open={routeOptions.includes(action)}
        onClose={() => navigate('/')}
        PaperProps={{
          sx: { width: "40%" },
        }}
      >
        <Grid container direction="column" className="save-list__drawer">
          <Grid container justifyContent="space-between" direction="row" className="save-list__drawer-title">
            <Typography variant="h4" component="h3">{drawerTitle}</Typography>
            <IconButton onClick={() => navigate('/')} >
              <CloseIcon/>
            </IconButton>
          </Grid>
          <Grid item className="save-list__drawer-body">
            <DrawerBody/>
          </Grid>
        </Grid>
      </DrawerMui>
    </div>
  );
}

export default Drawer;
