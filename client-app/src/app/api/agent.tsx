// contains all the requests that go to API
import axios, { AxiosResponse } from 'axios';
import { Activity} from '../models/activity';

const sleep = (delay:number) => {
   return new Promise((resolve) =>{
      setTimeout(resolve, delay)
   })
}
 axios.defaults.baseURL = 'http://localhost:5000/api';

 axios.interceptors.response.use(async response =>{
   try {
       await sleep(1000);
       return response;
    } catch (error) {
       console.log(error);
       return await Promise.reject(error);
    }
 })
 //const responseBody = <T> (response: AxiosResponse<T>) => response.data;
const responseBody = <T extends any>(response: AxiosResponse<T>) => response.data;

 const requests  = {
    get : <T extends any> (url: string) => axios.get<T>(url).then(responseBody),
    post : <T extends any> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put : <T extends any> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del : <T extends any> (url: string) => axios.delete<T>(url).then(responseBody),
 }
// posting data to the server
 const Activities = {
    list : () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => axios.post<void>('/activities', activity),
    update: (activity: Activity) => axios.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => axios.delete<void>(`/activities/${id}`)
 }

 const agent = {
    Activities
 }

 export default agent;