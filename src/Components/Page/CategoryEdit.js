import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import axios from 'axios'

class CategoryEdit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataUpdateCategory:{
        name:''
      },
      token: localStorage.getItem("jwt")
    }
    this.handlerChange = this.handlerChange.bind(this);
    this.onSubmitUpdate = this.onSubmitUpdate.bind(this);
  }

  componentDidMount(){
    let id = this.props.match.params.id
    axios.get('http://localhost:3030/category/'+id,{headers: {"x-access-token":this.state.token}})
    .then( res => {
      if (this.state.token === null){
        console.log("Dont Have Access Login");
      } else {
      this.setState({
        dataUpdateCategory:{
          name : res.data.data[0].name
        }
      })}
    });
  }

  onSubmitUpdate(){
    let id = this.props.match.params.id
    axios.put('http://localhost:3030/category/'+id, this.state.dataUpdateCategory,{headers: {"x-access-token":this.state.token}})
      .then((res) => {
        if (this.state.token === null){
          console.log("Dont Have Access Login");
        } else {
          console.log(res);
        }
      })
  }

  handlerChange(e){
    let newDataUpdate = {...this.state.dataUpdateCategory}
    newDataUpdate[e.target.name] = e.target.value;

    this.setState({
      dataUpdateCategory : newDataUpdate
    }, () => console.log(this.state.dataUpdateCategory))
  }

  render(){
    return (
      <div>
      <h2>Edit Category</h2>
      <Divider />
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
              margin="dense"
              variant="outlined"
              name="name"
              type="text"
              onChange={this.handlerChange}
              value={this.state.dataUpdateCategory.name}
            />
          </td>

          <td>&emsp;&emsp;</td>
          <td>
          <Button style={{ background: 'linear-gradient(120deg, #fe924e 30%, #f96504 90%)' }} variant="contained" onClick={this.onSubmitUpdate}  color="primary">
            Submit
          </Button>
          </td>
        </tr>
      </table>
        </div>
    );
  }
}


export default CategoryEdit;
