//import React, { act } from 'react';
import { Grid } from 'semantic-ui-react';
//import { Activity } from '../../../app/models/activity';
import ActivityList from './ActivityList';
import { useStore } from '../../../app/stores/store';
//import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default observer(function ActivityDashboard(){
    // activity store contains all the properties like selectActivity, closeForm,openForm
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
   

  
    useEffect(()=> {
        if(activityRegistry.size <= 1) loadActivities();  
    }, [loadActivities])

  

  if(activityStore.loadingInitial) return <LoadingComponent content = 'Loading app' />  //loading indicator from activity store
    return(
        <Grid>
            <Grid.Column width = '10'>
                <ActivityList />
            </Grid.Column>
            {/* if not in edit mode it will open details and send the below functions as props to activity details*/}
            <Grid.Column width = '6'>
                {/* {selectedActivity && !editMode &&
                <ActivityDetails />} */}
            {/* if it is in edit mode it will open activity Form and send the below functions as props to activity form*/}
            {/* {editMode && 
            <ActivityForm />} */}
            <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})

// x&&y => as long as x is true,null or undefined right side of the && code will execute