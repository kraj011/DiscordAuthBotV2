import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Image from '../components/image'

const IndexPage = () => (
  <Layout>
    <h1>Welcome</h1>
    <div>
      <Link to="/manage/">Manage Users</Link>
      <br />
      <Link to="/create/">Create Keys</Link>
      <br />
      <Link to="/settings/">Settings</Link>
    </div>
    
  </Layout>
)

export default IndexPage
