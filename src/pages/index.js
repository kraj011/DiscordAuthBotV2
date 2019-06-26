import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

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
