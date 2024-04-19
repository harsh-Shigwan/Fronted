import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const SideBarLayout = () => {
  return (
    <div>
    <Outlet></Outlet>
    <Sidebar></Sidebar>
    </div>
  )
}

export default SideBarLayout