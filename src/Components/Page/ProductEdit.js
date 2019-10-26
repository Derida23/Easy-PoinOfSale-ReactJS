import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {MenuItem, FormControl, Select} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  textField: {
    width: 200,
  }
});

class ProductAdd extends React.Component{

  constructor(props){
    super(props);
    this.state={
      dataApiProductEdit:[],
      dataApiProductView:[],
      dataUpdateProduct:{
        name:'',
        description:'',
        quantity:'',
        image:'',
        price:'',
        category_id:'',
      },
      token: localStorage.getItem("jwt")
    };
    this.onChangeUpdate = this.onChangeUpdate.bind(this);
    this.onSubmitUpdateCategory = this.onSubmitUpdateCategory.bind(this);
  }

  onChangeUpdate(e){
    let newUpdateData = {...this.state.dataUpdateProduct}
    newUpdateData[e.target.name] = e.target.value;

    this.setState({
      dataUpdateProduct : newUpdateData
    }, () => console.log(this.state.dataUpdateProduct));
  }

  onSubmitUpdateCategory(){
    let id = this.props.match.params.id
    axios.put('http://localhost:3030/product/'+id, this.state.dataUpdateProduct,{headers: {"x-access-token":this.state.token}})
      .then((res) => {console.log(res)}
      )
  }

  getCategory(){
    axios.get('http://localhost:3030/category',{headers: {"x-access-token":this.state.token}})
    .then(res => {
      this.setState({
        dataApiProductEdit:res.data.data.data
      })
    });
  }

  getProduct(){
    let id = this.props.match.params.id
    axios.get('http://localhost:3030/product/'+id,{headers: {"x-access-token":this.state.token}})
    .then(res => { console.log(res.data.data[0]);
      this.setState({
        dataUpdateProduct:{
          name : res.data.data[0].name,
          quantity : res.data.data[0].quantity,
          image : res.data.data[0].image,
          price : res.data.data[0].price,
          description : res.data.data[0].description,
          category_id : res.data.data[0].category_id
        }
      })
    });
  }


  componentDidMount(){
    this.getCategory()
    this.getProduct()
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

  updateChange = (e) => {
    let category_idNew = {...this.state.dataUpdateProduct}

    category_idNew["category_id"] = e.target.value;

    this.setState({
      dataUpdateProduct : category_idNew
    }, () => console.log(this.state.dataUpdateProduct));
  };

  render(){
    const { classes } = this.props;
    return (
      <div>
      <h2>Edit Product</h2>
      <Divider />
        <table>
          <tr>
            <td><Typography variant="h6">
                  Name
                </Typography>
            </td>
            <td>&emsp;</td>
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
                onChange={this.onChangeUpdate}
                value={this.state.dataUpdateProduct.name}
              />
            </td>
          </tr>
          <tr>
            <td><Typography variant="h6">
                  Description
                </Typography>
            </td>
            <td>&emsp;</td>
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
                onChange={this.onChangeUpdate}
                value={this.state.dataUpdateProduct.description}
              />
            </td>
          </tr>
          <tr>
            <td><Typography variant="h6">
                  Image
                </Typography>
            </td>
            <td>&emsp;</td>
            <td>
              <TextField
                id="outlined-dense"
                placeholder="Image"
                margin="dense"
                variant="outlined"
                className={classes.textField}
                name="image"
                type="text"
                onChange={this.onChangeUpdate}
                value={this.state.dataUpdateProduct.image}
              />
            </td>
          </tr>
          <tr>
            <td><Typography variant="h6">
                  Price
                </Typography>
            </td>
            <td>&emsp;</td>
            <td>
              <TextField
                id="outlined-number"
                placeholder="Price"
                margin="dense"
                className={classes.textField}
                name="price"
                type="number"
                inputProps={{min: 0}}
                onChange={this.onChangeUpdate}
                value={this.state.dataUpdateProduct.price}
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
            <td>&emsp;</td>
            <td>
              <TextField
                id="outlined-number"
                placeholder="Quantity"
                className={classes.textField}
                name="quantity"
                type="number"
                inputProps={{min: 0}}
                onChange={this.onChangeUpdate}
                value={this.state.dataUpdateProduct.quantity}
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
            <td>&emsp;</td>
            <td>
            <FormControl
              variant="outlined"
              className={classes.formControl}>
              <Select margin="dense"
                name="name"
                type="text"
                value={this.state.dataUpdateProduct.category_id}
                onChange={this.updateChange}
              >
                {this.state.dataApiProductEdit.map((data, index) => {
                  return (
                    <MenuItem value={data.id}>{data.name}</MenuItem>
                  )
                })}
              </Select>
            </FormControl>
            </td>
          </tr>
        </table><br />
        <Button style={{ background: 'linear-gradient(120deg, #fe924e 30%, #f96504 90%)' }} variant="contained" onClick={this.onSubmitUpdateCategory} color="primary">
          Submit
        </Button>
      </div>
    );
  }
}


export default withStyles(styles)(ProductAdd);
