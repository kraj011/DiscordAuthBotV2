import React from 'react'
import { Link } from 'gatsby'
import { Table, Divider, Tag, Button } from 'antd'
import 'antd/dist/antd.css'
import userInfo from '../info/users.json'
import Layout from '../components/layout'

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

  constructor(props) {
    super(props)
  }

  unbindKeys = () => {
    // fs.readFile(__dirname + '/../info/users.json', function(err, body, data) {
    //   if (err) {
    //     console.log(err)
    //     return
    //   }
    //   let json = JSON.parse(data)
    //   for (let i = 0; i < this.state['selectedRowKeys'].length; i++) {
    //     for (let j = 0; j < Object.keys(json).length; j++) {
    //       if (Object.keys(json)[j] == this.state['selectedRowKeys'][i]) {
    //         Object.keys(json)[j] = 'none'
    //         break
    //       }
    //     }
    //   }
    // })
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
