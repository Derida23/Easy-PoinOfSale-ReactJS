import React, { Component } from 'react';
import axios from 'axios';
import NumberFormat from 'react-number-format';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    maxWidth: 210,
  },
});

class MainProduct extends Component{

  constructor(props){
    super(props);
    this.state={
      dataApiProduct:[],
      search:"",
      token: localStorage.getItem("jwt")
    }
    this.handleMainChange = this.handleMainChange.bind(this)
    this.onSubmitSearchMain = this.onSubmitSearchMain.bind(this)
  }

  handleMainChange(e){
    e.target.name= e.target.value
    this.setState({
      search: e.target.name
    }, console.log(this.state.search))
  }

  onSubmitSearchMain(){
    this.setState({
      search: this.state.search
    })
    setTimeout(() => {
      this.reloadMain()
    },0)
  }

  reloadMain(){
    axios.get('http://localhost:3030/product/',{
      headers: {
        "x-access-token":this.state.token
      },
        params: {
          search: this.state.search
        }
      })
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

  componentDidMount(){
    this.reloadMain()
  }

  render(){
    const { classes } = this.props;
    return(
      <div>
      <Grid container justify="center">
        <IconButton onClick={this.onSubmitSearchMain} fontSize="large">
          <SearchIcon />
        </IconButton> &nbsp;

        <InputBase
           placeholder = " Search Name..."
           inputProps={{ 'aria-label': 'naked' }}
           name= "search"
           onChange = {this.handleMainChange}
         /> &emsp;

         <IconButton onClick={this.ChangeDesc}size="large">
           <ArrowUpwardIcon />
         </IconButton>

         <IconButton onClick={this.ChangeAsc} size="large">
           <ArrowDownwardIcon />
         </IconButton>
      </Grid>
      <Grid container style={{justifyContent: 'center'}} className={classes.root} spacing={0}>
        <Grid item xs={11}>
          <Grid container justify="left" spacing={4}>
          {this.state.dataApiProduct.map((data, index) => {
            return(
              <Grid item justify="center">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={data.image}
                    title={data.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                      {data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {data.description}
                    </Typography>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <h3 style={{color: "#192a56"}}><NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></h3>
                      </Grid>
                      <Grid item>
                        <CheckCircleIcon style={{marginLeft:"1em",color: 'green'}}/>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
        </Grid>
        </Grid>
      </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(MainProduct);
