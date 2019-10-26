import React from 'react';
import axios from 'axios';
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

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state={
      dataApiSignup:[],
      dataPost:{
        username:'',
        password:''
      }
    };
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  inputChange(e){
    let newDataPost = {...this.state.dataPost}
    newDataPost[e.currentTarget.name] = e.currentTarget.value;

    this.setState({
      dataPost : newDataPost
    });
  }

  onSubmitForm(){
    axios.post(`http://localhost:3030/user/register`, this.state.dataPost)
      .then((res) => {
        console.log(res);
      })
    }

  render(){
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paperLogin}>
          <Avatar alt="Remy Sharp" src="https://i.pinimg.com/originals/2f/fa/c6/2ffac600bf44b92fb9a3dde19f603ada.jpg" className={classes.bigAvatar} />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            name="username"
            type="text"
            onChange={this.inputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            onChange={this.inputChange}
          />
            <Button
              style={{ background: 'linear-gradient(45deg, #4abd89 30%, #3ac46e 90%)' }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.onSubmitForm}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
              <br/>
                  Already have a account? <Link to = '/'>Login</Link>
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

export default withStyles(styles)(SignUp);
