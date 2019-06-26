import React from 'react'
import userData from '../info/settings.json'

import Layout from '../components/layout'
import { Button, Input } from 'antd'

import axios from 'axios'

class Settings extends React.Component {
  state = {
    token: '',
    roleToAdd: '',
    roleToRemove: '',
  }

  componentDidMount() {
    this.getInfo()
  }

  getInfo() {
    let token = userData['token']
    let roleToAdd = userData['roleToAdd']
    let roleToRemove = userData['roleToRemove']
    this.setState({
      token: token,
      roleToAdd: roleToAdd,
      roleToRemove: roleToRemove,
    })
  }

  setToken() {
    let tokenField = document.getElementById('tokenField')
    let json = {
      token: tokenField.value,
    }
    axios
      .post('http://127.0.0.1:8001/token', json)
      .catch(err => console.log(err))
  }

  setRoleToAdd() {
    let role = document.getElementById('roleToAddField')
    let json = {
      role: role.value,
    }
    axios
      .post('http://127.0.0.1:8001/roleToAdd', json)
      .catch(err => console.log(err))
  }

  setRoleToRemove() {
    let role = document.getElementById('roleToRemoveField')
    let json = {
      role: role.value,
    }
    axios
      .post('http://127.0.0.1:8001/roleToRemove', json)
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Layout>
        <h1> Settings </h1>{' '}
        <Input
          placeholder="Bot Token"
          id="tokenField"
          onChange={val =>
            this.setState({
              token: val,
            })
          }
          defaultValue={this.state.token}
        />{' '}
        <br />
        <br />
        <Button onClick={this.setToken}> Save Token </Button> <br />
        <br />
        <br />
        <br />
        <Input
          placeholder="Name of role to add to authenticated user (Case Sensitive)"
          defaultValue={this.state.roleToAdd}
          id="roleToAddField"
          onChange={val =>
            this.setState({
              roleToAdd: val,
            })
          }
        />{' '}
        <br />
        <br />
        <Button onClick={this.setRoleToAdd}> Save Role To Add </Button> <br />
        <br />
        <br />
        <br />
        <Input
          placeholder="Name of role to remove from authenticated user (Case Sensitive)"
          defaultValue={this.state.roleToRemove}
          id="roleToRemoveField"
          onChange={val =>
            this.setState({
              roleToRemove: val,
            })
          }
        />{' '}
        <br />
        <br />
        <Button onClick={this.setRoleToRemove}>
          {' '}
          Save Role To Remove{' '}
        </Button>{' '}
      </Layout>
    )
  }
}

export default Settings
