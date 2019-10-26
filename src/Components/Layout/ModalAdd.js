import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import {MenuItem, FormControl, Select} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  textField: {
    width: 300,
  }
});

class ModalAdd extends React.Component{

  constructor(props){
    super(props);
    this.state={
      dataApiModalAdd:[],
      dataPostProduct:{
        name:'',
        description:'',
        quantity:'',
        image:'',
        price:'',
        category_id:'',
      },
      token: localStorage.getItem("jwt")
    };
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  inputChange(e){
    let newDataPost = {...this.state.dataPostProduct}
    newDataPost[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      dataPostProduct : newDataPost
    }, () => console.log(this.state.dataPostProduct));
  }

  onSubmitForm(){
    axios.post(`http://localhost:3030/product`, this.state.dataPostProduct,{headers: {"x-access-token":this.state.token}})
      .then((res) => { if (res.data.status === 200){
        this.setState({
          open: false
        })
      }
      })
  }

  componentDidMount(){
    axios.get('http://localhost:3030/category',{headers: {"x-access-token":this.state.token}})
    .then(res => {
      if (this.state.token === null){
        console.log("Dont Access Token");
      } else {
        this.setState({
          dataApiModalAdd:res.data.data.data
        })
      }
    });
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

  handleChange = (e) => {
    let category_idNew = {...this.state.dataPostProduct}

    category_idNew["category_id"] = e.target.value;

    this.setState({
      dataPostProduct : category_idNew
    }, () => console.log(this.state.dataPostProduct));
  };

  render(){
    const { classes } = this.props;
    return (
      <div>
        <ListItem button onClick={this.handleClickOpen}>
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Add Data Product" />
        </ListItem>
        <Dialog open={this.state.open } onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Data Product</DialogTitle>
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
                      inputProps={{maxLength: 13}}
                      name="name"
                      type="text"
                      onChange={this.inputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><Typography variant="h6">
                        Description
                      </Typography>
                  </td>
                  <td>&emsp;&emsp;</td>
                  <td>
                    <TextField
                      id="outlined-dense"
                      placeholder="Description"
                      margin="dense"
                      variant="outlined"
                      multiline
                      rowsMax="4"
                      className={classes.textField}
                      inputProps={{maxLength: 44}}
                      name="description"
                      type="text"
                      onChange={this.inputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><Typography variant="h6">
                        Image
                      </Typography>
                  </td>
                  <td>&emsp;&emsp;</td>
                  <td>
                    <TextField
                      id="outlined-dense"
                      placeholder="Image"
                      margin="dense"
                      variant="outlined"
                      className={classes.textField}
                      name="image"
                      type="text"
                      onChange={this.inputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td><Typography variant="h6">
                        Price
                      </Typography>
                  </td>
                  <td>&emsp;&emsp;</td>
                  <td>
                    <TextField
                      id="outlined-number"
                      placeholder="Price"
                      margin="dense"
                      className={classes.textField}
                      name="price"
                      type="number"
                      inputProps={{min: 0}}
                      onChange={this.inputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                    />
                  </td>
                </tr>
                <tr>
                  <td><Typography variant="h6">
                        Quantity
                      </Typography>
                  </td>
                  <td>&emsp;&emsp;</td>
                  <td>
                    <TextField
                      id="outlined-number"
                      placeholder="Quantity"
                      className={classes.textField}
                      name="quantity"
                      type="number"
                      inputProps={{min: 0}}
                      onChange={this.inputChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      margin="dense"
                      variant="outlined"
                    />
                  </td>
                </tr>
                <tr>
                  <td><Typography variant="h6">
                        Category
                      </Typography>
                  </td>
                  <td>&emsp;&emsp;</td>
                  <td>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}>
                    <Select margin="dense"
                      name="name"
                      type="text"
                      value={this.state.dataPostProduct.category_id}
                      onChange={this.handleChange}
                    >
                      {this.state.dataApiModalAdd.map((data, index) => {
                        return (
                          <MenuItem value={data.id}>{data.name}</MenuItem>
                        )
                      })}
                    </Select>
                  </FormControl>
                  </td>
                </tr>
              </table>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button style={{ background: 'linear-gradient(120deg, #fe924e 30%, #f96504 90%)' }} variant="contained" onClick={this.onSubmitForm} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


export default withStyles(styles)(ModalAdd);
