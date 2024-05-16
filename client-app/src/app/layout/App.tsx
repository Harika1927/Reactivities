//whatever we write in this page will expect on screen

import React, {  useEffect } from 'react'
import {  Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import activityStore from '../stores/activityStore';


function App() {
  const {activityStore} = useStore();

  // getting the axios data and storing the data
  useEffect(()=> {
    activityStore.loadActivities();  //passing the activity store as a dependancy
  }, [activityStore])

  

  if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading app' />  //loading indicator from activity store
  return (
   
    <>
      <NavBar />
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashboard
        />
      </Container>

      </>
  )
}


export default observer(App);
