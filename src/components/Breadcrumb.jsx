import * as React from 'react'
import { Link, useLocation } from 'react-router-dom'

import Breadcrumbs from '@mui/material/Breadcrumbs';
import './Bread.css'
import { Typography } from '@mui/material';
const Breadcrumb = () => {
  const location = useLocation()
  let currentLink =''
  const crumbs = location.pathname.split('/').filter(crumbs => crumbs !=='').map(crumbs => {
    currentLink +=`/${crumbs}`

    return(
      <div className='crumbs' key={crumbs}>
      <Link to={currentLink}>{crumbs}</Link></div>
    )
  })

  return (
    <div className=' h-[80px]  bg-white   ml-0 pl-2 mt-2  w-full'>
    <Breadcrumbs separator="›" aria-label="breadcrumb"><Typography variant='h5'><div className='breadcrumbs'>{crumbs}</div></Typography></Breadcrumbs></div>
  )
}

export default Breadcrumb