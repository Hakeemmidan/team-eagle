import React, { useCallback, useEffect, useContext } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Modal,
  TextField,
  Container,
  CircularProgress,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDropzone } from 'react-dropzone';
import { UserContext } from '../contexts/UserContext';

export default function PollImages(props) {
  const classes = useStyles();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length != 2) {
      alert('You can only upload only two files per poll.');
    } else {
      props.handleChange('images', acceptedFiles);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // If the user is editing the poll, they can't change the images
  if (props._id) {
    return (
      <Grid container className={classes.root}>
        {props.images.map((image, i) => {
          return (
            <Grid item>
              <img src={props.images[i].url} alt="Poll image" />
              <Grid container className={classes.votes}>
                <Grid item>
                  <FavoriteIcon color="secondary" />
                </Grid>
                <Grid item>{image.voteIds.length}</Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={classes.root}
      style={{
        border: props.imagesError ? '1px solid red' : 'none',
      }}
    >
      <input {...getInputProps()} />
      {props.images.length ? (
        <List className={classes.list}>
          {props.images.map((image, i) => {
            return (
              <ListItem key={i} dense={true}>
                <ListItemIcon>
                  <ImageIcon />
                </ListItemIcon>
                {image.name}
              </ListItem>
            );
          })}
        </List>
      ) : isDragActive ? (
        <p>Drop the files here</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select</p>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    height: theme.spacing(6),
  },
  root: {
    height: 300,
    maxHeight: '25vh',
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  votes: {
    justifyContent: 'center',
  },
}));
