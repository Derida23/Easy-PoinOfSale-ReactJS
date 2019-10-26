import React from 'react';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom'

class Logout extends React.Component{
  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout(){
    this.setState({
      token: localStorage.clear()
    })
  }

  render(){
    return (
      <div>
        <ListItem button>
          <ListItemIcon>
          <Link to='/' onClick={this.logout}>
            <PowerSettingsNewIcon />
            </Link>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </div>
    );
  }
}


export default (Logout);
