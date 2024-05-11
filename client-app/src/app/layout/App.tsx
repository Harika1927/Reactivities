import { Fragment,  useEffect, useState } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
// import DuckItem from './DuckItem'
// import { ducks } from './demo'

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setselectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(()=> {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      console.log(response);
      setActivities(response.data)
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
    activity.id ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
                  : setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setselectedActivity(activity);
  }

  function handleDeleteActivity(id: string){
    setActivities([...activities.filter(x=>x.id !== id)])
  }
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
        />
      </Container>

      {/* {ducks.map(duck => (
      <DuckItem key = {duck.name} duck = {duck}/>
    ))} */}
   </Fragment>
  )

}

export default App
