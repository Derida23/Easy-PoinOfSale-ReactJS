import React from 'react';
import { Container, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 250,
    height: 250,
  },
});

export default function Order() {
  const classes = useStyles();

  return(
    <Container maxWidth="lg" className={classes.container}>
    <br/><br/><br/><br/><br/>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid container justify="center" alignItems="center" item xs={12} md={8} lg={12}>
        <Paper style={{ background: 'linear-gradient(45deg, #4abd89 30%, #3ac46e 90%)' }} className={classes.rootMessage}>
          <Avatar alt="Remy Sharp" src="https://cdn.dribbble.com/users/1588659/screenshots/5385747/dribbble_2x.png" className={classes.bigAvatar} />
        </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
