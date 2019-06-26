import React from 'react'

import Layout from '../components/layout'
import { Button, InputNumber, Alert, List } from 'antd'

import axios from 'axios'

import recentKeys from '../info/recentlyGeneratedKeys.json'

let recentKeysArray = []

for (var i = 0; i < Object.keys(recentKeys).length; i++) {
  recentKeysArray.push(Object.keys(recentKeys)[i])
}

class Create extends React.Component {
  state = {
    loading: false,
    amount: 0,
    length: 0,
    errorMessage: '',
    hideError: true,
  }

  updateLength = val => {
    this.setState({ length: val })
  }

  updateAmount = val => {
    this.setState({ amount: val })
  }

  updateLoading = () => {
    this.setState({ loading: true })
  }

  clearError = () => {
    this.setState({
      errorMessage: '',
    })
    this.setState({ hideError: true })
  }

  generateTapped = () => {
    if (this.state.amount === 0 || this.state.length === 0) {
      this.setState({
        errorMessage:
          'Please enter an amount and length to properly generate your keys!',
      })
      this.setState({ hideError: false })
      this.setState({ loading: false })
    } else {
      this.setState({ loading: true })
      let body = {
        amount: this.state.amount,
        length: this.state.length,
      }
      axios
        .post('http://127.0.0.1:8001/generate', body)
        .catch(err => console.log(err))
        .then(() => {
          this.setState({ loading: false })
        })
    }
  }

  render() {
    return (
      <Layout>
        <h1>Generate Keys</h1>
        <InputNumber
          placeholder="Amount #"
          min={1}
          onChange={this.updateAmount}
        />
        <br />
        <br />
        <InputNumber
          placeholder="Length"
          min={5}
          onChange={this.updateLength}
        />
        <br />
        <br />
        {!this.state.hideError ? (
          <Alert
            message={this.state.errorMessage}
            type="error"
            showIcon
            closable
            onClose={this.clearError}
          />
        ) : null}

        <br hidden={this.state.hideError} />
        <br hidden={this.state.hideError} />
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.generateTapped}
        >
          Generate
        </Button>
        <br />
        <br />
        <h3 style={{ margin: '16px 0' }}>Previously Generated Keys:</h3>
        <List
          size="small"
          bordered
          dataSource={recentKeysArray}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </Layout>
    )
  }
}

export default Create
