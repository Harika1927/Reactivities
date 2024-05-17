//whatever we write in this page will expect on screen

import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
//import { Router } from '../router/Routes';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';


function App() {

  const location = useLocation(); //gives the path of whats inside the URL

  return (
    <>
    {location.pathname === '/' ? <HomePage/> :(
      <>
      <NavBar/>
      <Container style = {{marginTop: '7em'}}>
       <Outlet/>

      </Container>
    </>
    )}
    </>
  );
}


export default observer(App);
