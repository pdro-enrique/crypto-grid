import { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import slugify from 'slugify';
import { TextField, List, ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, Typography, Grid, Chip } from '@mui/material';
import { Close as CloseIcon, Check as CheckIcon } from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { MainLayoutContext } from '../../../layouts';
import { useNavigate } from 'react-router-dom';
import successAnimation from './animations/success-animation.json';
import { Lottie } from '../../../components';
import { MANAGE_LIST_PATH } from '../../../constants';
import '../styles.css';
import { getList, saveList } from '../../../utils';
import { produce } from 'immer';
import { StoreContext } from '../../../store';

let schema = yup.object().shape({
  name: yup.string()
  .min(3, 'Debe contener al menos 3 caracteres.')
  .max(25, 'No puede superar los 25 caracteres.')
  .required('Este campo es requerido.')
  .matches(/[a-z]/, 'Debe contener al menos una minúscula.')
  .matches(/[A-Z]/, 'Debe contener al menos una mayúscula.')
});

export const CreateListForm = () => {
  const navigate = useNavigate();
  const { store, setStore } = useContext(StoreContext);
  const { openSnackbar } = useContext(MainLayoutContext);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: schema,
    onSubmit: ({ name }) => {
      const slug = slugify(name, { lower: true });
      const coinList = getList();

      if (coinList[slug]) {
        openSnackbar('La lista ya existe, intente con otro nombre', 'error');
      } else {
        setWasSubmitted(true);
        const coins = store?.selectedCoins;
        const newCoinList = produce(coinList, (draft) => {
          draft[slug] = { name, coins }
        });
        saveList(newCoinList);
      }
    }
  })

  const handleDelete = (index) => {
    const newState = produce(store, (draft) => {
      draft.selectedCoins.splice(index, 1);
    });
    setStore(newState);
  }

  const ValidationIcon = ({ isValid }) => {
    if (isValid) {
      return (
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: green[500] }}>
            <CheckIcon />
          </Avatar>
        </ListItemAvatar>
      );
    }
    return (
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: red[500] }}>
          <CloseIcon />
        </Avatar>
      </ListItemAvatar>
    );
  }

  if (wasSubmitted) {
    return (
      <Lottie
        animationFile={successAnimation}
        callback={() => navigate(MANAGE_LIST_PATH)}
      />
    )
  }
  
  return (
    <div className="create-list-form">
      <form onSubmit={formik.handleSubmit}>
        <Grid container flexDirection="column" gap={3}>
          <Grid item>
            <TextField
              id="nameInput"
              label="Nombre de la lista"
              variant="outlined"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Selected Coins:</Typography>
            <Grid container gap={1}>
              {store.selectedCoins.map((coin, index) => (
                <Chip
                  key={`coin-${index}`}
                  label={coin}
                  color="primary"
                  onDelete={() => handleDelete(index)}
                />
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <Card>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                  <ValidationIcon isValid={formik.values.name.length >= 3 && formik.values.name.length <= 25} />
                  <ListItemText
                    primary="Mínimo / máximo de caracteres"
                    secondary="Puede ingresar entre 3 y 25 caracteres"
                  />
                </ListItem>
                <ListItem>
                  <ValidationIcon isValid={formik.values.name.match(/[A-Z]/) && formik.values.name.match(/[a-z]/)} />
                  <ListItemText
                    primary="Mayúscula / Minúscula"
                    secondary="Se requiere al menos 1 de cada una"
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              size="large"
              type="submit"
              disableElevation
              fullWidth
            >
              Guardar Lista
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CreateListForm;
