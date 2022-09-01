import { useState, createContext, useContext } from 'react';
import { produce } from 'immer';
import { Typography, LinearProgress, Grid, Button } from '@mui/material';
import { Snackbar, Header, Drawer, CreateListBtn } from '../../components';
import { Link } from "react-router-dom";
import { CurrencyBitcoin as CurrencyBitcoinIcon } from '@mui/icons-material';
import { MANAGE_LIST_PATH } from '../../constants';
import { StoreContext } from '../../store';

export const MainLayoutContext = createContext('main-layout');

export const INITIAL_SNACKBAR = {
  isOpen: false,
  message: null,
  severity: 'info',
};

export const MainLayout = ({ children }) => {
  const { store } = useContext(StoreContext);
  const [pageTitle, setPageTitle] = useState();
  const [showProgressBar, setShowProgressBar] = useState();
  const [feedback, setFeedback] = useState({
    isLoading: false,
    alert: {
      isOpen: false,
      message: null,
    },
    snackbar: INITIAL_SNACKBAR,
  });

  const openSnackbar = (message, severity = 'info') => {
    const newState = produce(feedback, (draft) => {
      // draft.snackbar = {
      //   isOpen: true,
      //   message: message,
      //   severity: severity,
      // }
      draft.snackbar.isOpen = true;
      draft.snackbar.message = message;
      draft.snackbar.severity = severity;
    })
    setFeedback(newState);
  }

  const closeSnackbar = () => {
    const newState = produce(feedback, (draft) => {
      draft.snackbar = INITIAL_SNACKBAR;
      return draft;
    })
    setFeedback(newState);
  }

  return (
    <div className="main-layout">
      <MainLayoutContext.Provider value={{
        pageTitle,
        setPageTitle,
        openSnackbar,
        closeSnackbar,
        setShowProgressBar
      }}
      >
        { showProgressBar && <LinearProgress /> }
        <Header/>
        <Grid container direction="column" gap="32px" sx={{ padding: "32px" }}>
          <Grid container justifyContent="space-between" >
            <Typography variant="h3" component="h1">{pageTitle}</Typography>
            <div className="save-list__action">
              <Button
                variant="contained"
                color="primary"
                size="large"
                className="save-list__add-btn"
                component={Link}
                to={MANAGE_LIST_PATH}
                disableElevation
              >
                <CurrencyBitcoinIcon sx={{ mr: 1 }} />
                Administrar Listas
              </Button>
              <CreateListBtn disabled={!store.selectedCoins.length} />
            </div>
          </Grid>
          <Grid item>
            {children}
          </Grid>
        </Grid>
        <Drawer/>
        <Snackbar
          {...feedback.snackbar}
          onClose={closeSnackbar}
        />
      </MainLayoutContext.Provider>
    </div>
  );
}

export default MainLayout;
