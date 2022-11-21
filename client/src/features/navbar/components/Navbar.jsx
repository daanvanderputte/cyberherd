// libraries
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

// components
import Search from '../../search/components/Search';

import { Context } from '../../../context/GlobalContext.jsx';

// style
import './_navbar.scss';


export default function Navbar() {
  // const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(Context);

  return (
  <div className={loggedIn ? "display-none" : "navbar" }>
  <Link className='get-yourself' to='/'>Get yourself a date</Link>
  <Search />
  <Link className='sign-up' to='/sign-up'>Sign up</Link>
  <Link className='login' to='/login'>Login</Link>
  </div>
  )
}