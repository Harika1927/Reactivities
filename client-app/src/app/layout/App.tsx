//whatever we write in this page will expect on screen

import { Fragment,  useEffect, useState } from 'react'
//import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
// import DuckItem from './DuckItem'
// import { ducks } from './demo'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

// getting the axios data and storing the data
  useEffect(()=> {
    agent.Activities.list().then(response => {
      let activities: Activity[] = [];
      response.forEach(activity => {
        activity.date= activity.date.split('T')[0];
        activities.push(activity);
      })
      //console.log(response);
      setActivities(activities);
      setLoading(false);
    })
  }, [])

  function handleSelectActivity(id: string) {
    setselectedActivity(activities.find(x => x.id === id));
  }
  function handleCancelSelectActivity() {
    setselectedActivity(undefined);
  }
  //open perticular activity with id to edit
  function handleFormOpen(id?: string) {
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  // if editing the activity and click on cancel, simply go back to activity details, open components
  // if create, the activity close that form
  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    setSubmitting(true);
    if (activity.id){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x=>x.id !== activity.id), activity])
        setselectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else{
      activity.id = uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...activities, activity])
        setEditMode(false);
        setSubmitting(false);
      })
    }
    activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
                  : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setselectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...activities.filter(x=>x.id !== id)]);
      setSubmitting(false);

    })
    
  }

  if(loading) return <LoadingComponent content = 'Loading app' />
  return (
    // to allow different elements use fragment or div
    <Fragment> 
      <NavBar openForm = {handleFormOpen}/>
      <Container style = {{marginTop: '7em'}}>
        <ActivityDashboard 
          activities = {activities} 
          selectedActivity = {selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
          createOrEdit = {handleCreateOrEditActivity}
          deleteActivity = {handleDeleteActivity}
          submitting = {submitting}
        />
      </Container>

      {/* {ducks.map(duck => (
      <DuckItem key = {duck.name} duck = {duck}/>
    ))} */}
   </Fragment>
  )

}

export default App
