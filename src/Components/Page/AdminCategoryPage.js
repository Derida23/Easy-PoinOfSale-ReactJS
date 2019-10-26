import React from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  }
});


class AdminCategoryPage extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataCategory:[],
      token: localStorage.getItem("jwt")
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  reloadData(){
    axios.get('http://localhost:3030/category/',{headers: {"x-access-token":this.state.token}})
    .then( res => {
      if (this.state.token === null){
        console.log("Dont Have Access Login");
      } else {
        this.setState({
          dataCategory:res.data.data.data
        })
      }
    });
  }

  handleDelete(e){
    axios.delete(`http://localhost:3030/category/${e.currentTarget.value}`,{headers: {"x-access-token":this.state.token}})
      .then(res => {
        if (this.state.token === null){
          console.log("Dont Have Access Login");
        } else {
          this.reloadData()
        }
      })
  }

  componentDidMount(){
    this.reloadData()
  }
  
  render(){
    const { classes } = this.props;
    return(
      <div className={classes.root}>
      <h2>Category Admin Page</h2>
      <Divider />
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <TableCell align="center">Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          {this.state.dataCategory.map((data, index) => {
            return(
            <TableBody>
                <TableRow>
                  <TableCell align="center">{data.name}</TableCell>

                  <TableCell align="center">
                    <IconButton value={data.id} onClick={this.handleDelete} className={classes.button} aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <Link to={"/dashboard/admincategory/edit/" + data.id}>
                    <IconButton className={classes.button} onClick={this.updateChange} aria-label="delete">
                      <EditIcon />
                    </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
            </TableBody>
            )
          })}
        </Table>
      </Paper>
    </div>
    );
  };
};

export default withStyles(styles)(AdminCategoryPage);
