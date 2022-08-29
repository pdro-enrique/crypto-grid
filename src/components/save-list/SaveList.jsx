import { useState } from 'react';
import { Button, Drawer, Typography, Grid, IconButton, TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';

import './styles.css';

export const SaveList = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(state => !state)
  };

  return (
    <div className="save-list">
      <div className="save-list__action">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className="save-list__add-btn"
          onClick={toggleDrawer}
          disableElevation
        >
          Ver Listas
        </Button>
        <Button
          variant="contained"
          color="success"
          size="large"
          className="save-list__add-btn"
          onClick={toggleDrawer}
          disableElevation
        >
          <AddIcon sx={{ mr: 1 }} />
          Agregar Lista
        </Button>
      </div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: { width: "40%" },
        }}
      >
        <Grid container direction="column" className="save-list__drawer">
          <Grid container justifyContent="space-between" direction="row" className="save-list__drawer-title">
            <Typography variant="h4" component="h3">Agregar Lista</Typography>
            <IconButton aria-label="delete">
              <CloseIcon onClick={toggleDrawer} />
            </IconButton>
          </Grid>
          <Grid item className="save-list__drawer-body">
            <TextField
              id="name"
              label="Nombre de la lista"
              variant="outlined"
              helperText="Complete los siguientes requerimientos para continuar..."
              fullWidth
            />
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: green[500] }}>
                    <CheckIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Mínimo / máximo de caracteres"
                  secondary="Puede ingresar entre 3 y 25 caracteres"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[500] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Mayúscula / Minúscula"
                  secondary="Se requiere al menos 1 de cada una"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: red[500] }}>
                    <CloseIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Repeticiones"
                  secondary="No se permite la repeticion de ningún caracter"
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item className="save-list__drawer-actions">
            <Button
              variant="contained"
              color="success"
              size="large"
              disableElevation
            >
              Guardar Lista
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  );
}

export default SaveList;
