import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import {  Avatar, Button, CssBaseline, TextField,
          Grid, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paperLogin: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
});

class SignIn extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataPostLogin:{
        username:'',
        password:''
      },
      loginKey:false
    };
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  inputChange(e){
    let newDataPost = {...this.state.dataPostLogin}
    newDataPost[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      dataPostLogin : newDataPost
    }, () => console.log(this.state.dataPostLogin));
  }

  onSubmitForm(e){
    e.preventDefault()
    axios.post(`http://localhost:3030/user/login`, this.state.dataPostLogin)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status !== 400){
          localStorage.setItem("jwt", res.data.status.token)
          this.setState({
            loginKey: true
          })

        }
      }
    )
  }

  render(){
    if (this.state.loginKey){
      return(
        <Redirect to='/dashboard'/>
      )
    }
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paperLogin}>
          <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/2f/fa/c6/2ffac600bf44b92fb9a3dde19f603ada.jpg" className={classes.bigAvatar} />
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              type="text"
              autoFocus
              onChange={this.inputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              onChange={this.inputChange}
            />
            <Button
              style={{background: 'linear-gradient(45deg, #4abd89 30%, #3ac46e 90%)'}}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSubmitForm}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
              <br/>
                  Don't have an account? <Link to = '/signup'>Sign up</Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(SignIn);
