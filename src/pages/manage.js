import React from 'react'
import { Table, Button } from 'antd'
import 'antd/dist/antd.css'
import userInfo from '../info/users.json'
import Layout from '../components/layout'
import axios from 'axios'

const columns = [
  {
    title: 'Key',
    dataIndex: 'identifier',
  },
  {
    title: 'Discord',
    dataIndex: 'discord',
  },
]

const data = []

for (var i = 0; i < Object.keys(userInfo).length; i++) {
  data.push({
    key: Object.keys(userInfo)[i],
    discord: userInfo[Object.keys(userInfo)[i]],
    identifier: Object.keys(userInfo)[i],
  })
}

class Manage extends React.Component {
  state = {
    selectedRowKeys: [],
  }
  selectRow = record => {
    const selectedRowKeys = [...this.state.selectedRowKeys]
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1)
    } else {
      selectedRowKeys.push(record.key)
    }
    this.setState({ selectedRowKeys })
  }
  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  unbindKeys = () => {
    for (let i = 0; i < this.state['selectedRowKeys'].length; i++) {
      var body = {
        key: this.state['selectedRowKeys'][i],
      }
      axios
        .post('http://127.0.0.1:8001/unbind', body)
        .catch(function(error) {
          console.log(error)
        })
        .then(res => console.log(res))
    }
  }

  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
    }
    // const json = JSON.parse(userInfo);

    return (
      <Layout>
        <h1>Manage Users</h1>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          onRow={record => ({
            onClick: () => {
              this.selectRow(record)
            },
          })}
        />
        <Button onClick={this.unbindKeys}>Unbind Selected</Button>
      </Layout>
    )
  }
}

export default Manage
