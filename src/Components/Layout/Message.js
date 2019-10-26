import React from 'react';
import { useStyles } from '../Style/Style'
import { Container, Grid, Paper, Typography } from '@material-ui/core';

export default function Order() {
  const classes = useStyles();

  return(
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={12}>
          <Paper style={{ background: 'linear-gradient(45deg, #4abd89 30%, #3ac46e 90%)' }} className={classes.rootMessage}>
          <Typography variant="h5" style={{color:"white"}} component="h3">
            Welcome to Easy Point of Sale.
          </Typography><br/>
          <Typography component="p" style={{color:"white"}}>
            Point of Sale system that can handle retail inventory the easiest
          </Typography>
        </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
