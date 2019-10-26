import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import FiberNewRoundedIcon from '@material-ui/icons/FiberNewRounded';
import { withStyles } from '@material-ui/core/styles';

import MainProduct from './MainProduct'
import NameProduct from './NameProduct'
import CategoryProduct from './CategoryProduct'
import NewProduct from './NewProduct'

const styles = theme => ({
  card: {
    maxWidth: 210,
  },
});

class Product extends Component{

  constructor(props){
    super(props);
    this.state={
      dataApiProduct:[],
      token: localStorage.getItem("jwt")
    }
  }

  componentDidMount(){
    axios.get('http://localhost:3030/product/',{headers: {"x-access-token":this.state.token}})
      .then(res => {
        if (this.state.token === null){
          console.log("Dont Have Access Login");
        } else {
            this.setState({
            dataApiProduct:res.data.data.data
          })
        }
    });
  }

  render(){
    return(
      <div>
        <div>
            <Grid container justify="center">
              <Link  to="/dashboard/product/name" style={{textDecoration: 'none'}}>
                <Fab style={{ background: '#02aefe'}} variant="medium" color="primary" aria-label="add">
                  <RestaurantIcon />&nbsp;
                    Name
                </Fab>
              </Link> &emsp;&emsp;

              <Link  to="/dashboard/product/category" style={{textDecoration: 'none'}}>
                <Fab style={{ background: '#02aefe' }} variant="medium" color="primary" aria-label="add">
                  <AppsRoundedIcon />&nbsp;
                  Category
                </Fab>
              </Link> &emsp;&emsp;

              <Link  to="/dashboard/product/new" style={{textDecoration: 'none'}}>
                <Fab style={{ background: '#02aefe' }} variant="medium" color="primary" aria-label="add">
                  <FiberNewRoundedIcon />&nbsp;
                  New
                </Fab>
              </Link>
              </Grid>
        </div><br/>
        <div className="dashboard-panel-container">
          <Route exact path="/dashboard/product" component={MainProduct} />
          <Route path="/dashboard/product/name" component={NameProduct} />
          <Route path="/dashboard/product/category" component={CategoryProduct} />
          <Route path="/dashboard/product/new" component={NewProduct} />
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Product);
