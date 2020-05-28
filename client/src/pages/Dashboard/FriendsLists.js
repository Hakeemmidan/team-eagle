import React from 'react';
import { UserContext } from 'components/UserContext';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Container } from '@material-ui/core';

import HorizontalFeed from 'components/HorizontalFeed';
import FriendsListsItem from './FriendsListsItem';

// Temporary
const lists = [
  {
    _id: '124124124',
    title: 'Fashion',
    friends: [
      {
        _id: '12412423123124',
        name: 'David Smith',
      },
      {
        _id: '1222',
        name: 'James Walker',
      },
      {
        _id: '414142',
        name: 'Anna Devine',
      },
      {
        _id: '142124',
        name: 'Lucy Berger',
      },
    ],
  },
  {
    _id: '5152512',
    title: 'School',
    friends: [
      {
        _id: '414142',
        name: 'Anna Devine',
      },
      {
        _id: '142124',
        name: 'Lucy Berger',
      },
    ],
  },
  {
    _id: '1225125',
    title: 'Work',
    friends: [
      {
        _id: '1222',
        name: 'James Walker',
      },
      {
        _id: '142124',
        name: 'Lucy Berger',
      },
    ],
  },
];

export default function FriendsLists(props) {
  return (
    <HorizontalFeed
      title={'Friends Lists'}
      subtitle=""
      button={
        <Button
          variant="outlined"
          component={RouterLink}
          to="/create-friends-list"
        >
          Create List
        </Button>
      }
    >
      {lists.map((list, i) => {
        return (
          <Grid item key={i}>
            <FriendsListsItem {...list} />
          </Grid>
        );
      })}
    </HorizontalFeed>
  );
}