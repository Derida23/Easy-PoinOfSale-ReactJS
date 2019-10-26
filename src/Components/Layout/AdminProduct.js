import React from 'react';
import { Route } from "react-router-dom";
import clsx from 'clsx';
import { Container, Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AdminProductPage from '../Page/AdminProductPage';

import ProductEdit from '../Page/ProductEdit'
import NoActivity from '../Page/NoActivity'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 1000,
  },
});

class AdminProduct extends React.Component{
  render(){
    const { classes } = this.props;
    return(
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={8}>
            <Paper style={{background:'#f5f5fb'}} className={clsx(classes.paper, classes.fixedHeight)}>
              <AdminProductPage />
            </Paper>
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={clsx(classes.paper, classes.fixedHeight)}>
            <div>
              <Route exact path="/dashboard/adminproduct" component={NoActivity} />
              <Route path="/dashboard/adminproduct/edit/:id" component={ProductEdit} />
            </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    );
  };
};

export default  withStyles(styles)(AdminProduct);
