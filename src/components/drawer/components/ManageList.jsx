import { useState, useEffect } from 'react';
import { produce } from 'immer';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, IconButton, Grid } from '@mui/material';
import { Folder as FolderIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getList, saveList } from '../../../utils';
import { CreateListBtn, Lottie } from '../..';
import emptyAnimation from './animations/empty-animation.json';
import '../styles.css';

export const CurrenciesList = () => {
  const [coinList, setCoinList] = useState({});

  const deleteList = (slug) => {
    const deleteAccepted = window.confirm(`Seguro desea eliminar la lista: ${slug}?`);

    if (deleteAccepted) {
      const newState = produce(coinList, (draft) => {
        delete draft[slug];
      })
      setCoinList(newState);
      saveList(newState);
    }
  }

  useEffect(() => {
    const data = getList();

    if (Object.values(data).length) {
      setCoinList(data);
    }
  }, []);

  if (!Object.entries(coinList).length) {
    return (
      <Grid container flexDirection="column" alignItems="center" gap={8}>
        <Lottie
          width="auto"
          options={{
            loop: true,
            animationData: emptyAnimation,
          }}
        />
        <CreateListBtn />
      </Grid>
    )
  }
  return (
    <div className="create-list-form">
      <Grid container flexDirection="column" gap={4}>
        <List dense={false}>
          {Object.entries(coinList).map(([slug, { name, coins }], index) => (
            <div key={`coin-${index}`}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => deleteList(slug)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={name}
                  secondary={coins.join(', ')}
                />
              </ListItem>
              <Divider/>
            </div>
          ))}
        </List>
        <CreateListBtn>Añadir Nueva</CreateListBtn>
      </Grid>
    </div>
  );
}

export default CurrenciesList;
