import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  header: {
    background: '#008c8c',
    padding: '10px'
  },
  colorButton: {
    background: 'black',
    color: 'white'
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const path = window.location.pathname;

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            // color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            OUTDOOR
          </Typography>

          <Link
            to={path === '/signup' ? '/login' : '/signup'}
            className="signupButton"
          >
            <Button className="header-button">
              {path === '/signup' ? 'LOGIN' : 'SIGNUP'}
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
