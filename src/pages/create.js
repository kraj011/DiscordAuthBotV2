import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import { Button, Input } from 'antd';

const Create = () => (
  <Layout>
    <h1>Generate Keys</h1>
    <Input placeholder="Key Amount"></Input>
    <br/>
    <br/>
    
    <Button>Generate</Button>
    <br/>
    <br/>

    <p>Status</p>
  </Layout>
)

export default Create
