import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

class Report extends Component{
  render(){
    return(
      <div>
      <Grid item style={{textAlign: "center"}}>
      <Typography style={{color:"#9e9e9e"}} variant="h5">
        Report Under Construction
      </Typography>
        <img src="http://www.agoradebate.ro/img/build.png" style={{width:"47%"}}/>
      </Grid>
      </div>
    )
  }
}

export default Report;
