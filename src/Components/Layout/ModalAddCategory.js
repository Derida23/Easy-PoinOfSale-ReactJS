import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ClassIcon from '@material-ui/icons/Class';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  textField: {
    width: 300,
  }
});

class ModalAddCategory extends React.Component{

constructor(props){
  super(props);
  this.state={
    dataPostCategory:{
      name:''
    },
    token: localStorage.getItem("jwt")
  };
  this.inputChange = this.inputChange.bind(this);
  this.onSubmitForm = this.onSubmitForm.bind(this);
}

inputChange(e){
  let newDataPost = {...this.state.dataPostCategory}
  newDataPost[e.currentTarget.name] = e.currentTarget.value;

  this.setState({
    dataPostCategory : newDataPost
  }, () => console.log(this.state.dataPostCategory));
}

  onSubmitForm(){
    axios.post(`http://localhost:3030/category`, this.state.dataPostCategory,{headers: {"x-access-token":this.state.token}})
      .then((res) => { if (res.data.status === 200){
        this.setState({
          open: false
        })
      }
      })
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  render(){
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <ClassIcon />
          </ListItemIcon>
          <ListItemText primary="Add Data Category" />
        </ListItem>
        <Dialog open={this.state.open } onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Data Category</DialogTitle>
            <Divider />
            <DialogContent>
              <table>
                <tr>
                  <td><Typography variant="h6">
                        Name
                      </Typography>
                  </td>
                  <td>&emsp;&emsp;</td>
                  <td>
                    <TextField
                      id="outlined-dense"
                      placeholder="Name"
                      margin="dense"
                      variant="outlined"
                      className={classes.textField}
                      name="name"
                      type="text"
                      onChange={this.inputChange}
                    />
                  </td>
                </tr>
              </table>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button style={{ background: 'linear-gradient(120deg, #fe924e 30%, #f96504 90%)' }} variant="contained" onClick={this.onSubmitForm}  color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default withStyles(styles)(ModalAddCategory);
