import React from 'react'
import { Link } from 'gatsby'
import userData from '../info/settings.json'

import Layout from '../components/layout'
import { Button, Input } from 'antd'

class Create extends React.Component {
  getToken() {
    let token = userData['token']
    if (token != '') {
      let tokenField = document.getElementById('tokenField')
      // console.log(element)
      tokenField.value = token
    }
  }

  setToken() {
    console.log('button clicke')
    let tokenField = document.getElementById('tokenField')
    userData['token'] = tokenField.value
    //TODO: FIX THIS SO IT SAVES TOKEN BASED OFF OF SETTINGS
  }

  componentDidMount() {
    this.getToken()
  }

  render() {
    return (
      <Layout>
        <h1>Settings</h1>
        {/* <input onLoadedData={this.getToken(this)} type="text" id="tokenField" ></input> */}
        <Input placeholder="Bot Token" id="tokenField" />
        <br />
        <br />
        <Button onClick={this.setToken}>Save Token</Button>
      </Layout>
    )
  }
}

export default Create
