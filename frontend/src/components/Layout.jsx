import React from 'react'
import { styles } from "../assets/dummyStyles.js";
import Navbar from './Navbar.jsx';


const Layout = ({ onLogout, user }) => {
  return (
    <div className={styles.layout.root}>
        <Navbar onLogout={onLogout} user={user} />
    </div>
  )
}

export default Layout