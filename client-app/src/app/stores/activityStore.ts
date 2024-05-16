import {makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore{
    
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)     //aumatically make properties observable and manage reactions when modified
    }
   // sort the activities based on date
    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a, b) => Date.parse(a.date)-Date.parse(b.date));
    }

    loadActivities = async () => {
        try {
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date= activity.date.split('T')[0];
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
//it will select the activity based on id and store it in setselectedActivity function (we can use this to View activity)
    selectActivity = (id: string) => {
        //this.selectedActivity = this.activities.find(a=> a.id ===id);
        this.selectedActivity = this.activityRegistry.get(id);
    }
// doesnot show anyform 
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
//if edit, pass id and if create no need of id
//shows perticular activity with id otherwise details form
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
// if editing the activity and click on cancel, simply go back to activity details, open components
// if create, and click on cancel then the activity close that form
    closeForm = () => {
        this.editMode = false;
    }
// when we create activity, click on submit it will show on all the activity list
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(()=>{
                //this.activities.push(activity);
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
// when we edit activity, click on submit it will show on all the activity list
    updateActivity = async(activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity);
            runInAction(()=>{
                //this.activities = [...this.activities.filter(a => a.id !== activity.id), activity]; // removes the activity based on id and pushes the updated activity to new array
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    // Deletes the activity
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                //this.activities = [...this.activities.filter(a => a.id !== id)]; // removes the activity based on id from the list
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error); 
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
}