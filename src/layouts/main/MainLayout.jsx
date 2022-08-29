import { useState, createContext } from 'react';
import { Snackbar } from '../../components';
import { produce } from 'immer';
import { Typography } from '@mui/material';

export const MainLayoutContext = createContext('main-layout');

export const INITIAL_SNACKBAR = {
  isOpen: false,
  message: null,
  severity: 'info',
};

export const MainLayout = ({ children }) => {
  const [pageTitle, setPageTitle] = useState();
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
          pageTitle: pageTitle,
          setPageTitle: setPageTitle,
          openSnackbar: openSnackbar,
          closeSnackbar: closeSnackbar,
        }}
      >
        <Typography variant="h3" component="h1">{pageTitle}</Typography>
        {children}
        <Snackbar
          {...feedback.snackbar}
          onClose={closeSnackbar}
        />
      </MainLayoutContext.Provider>
    </div>
  );
}

export default MainLayout;
