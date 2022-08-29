import { useState, createContext } from 'react';
import { produce } from 'immer';
import { Typography, LinearProgress, Grid } from '@mui/material';
import { Snackbar, Header } from '../../components';

export const MainLayoutContext = createContext('main-layout');

export const INITIAL_SNACKBAR = {
  isOpen: false,
  message: null,
  severity: 'info',
};

export const MainLayout = ({ children }) => {
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
      draft.snackbar = {
        isOpen: true,
        message: message,
        severity: severity,
      }
      return draft;
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
          <Grid item>
            <Typography variant="h3" component="h1">{pageTitle}</Typography>
          </Grid>
          <Grid item>
            {children}
          </Grid>
        </Grid>
        <Snackbar
          {...feedback.snackbar}
          onClose={closeSnackbar}
        />
      </MainLayoutContext.Provider>
    </div>
  );
}

export default MainLayout;
