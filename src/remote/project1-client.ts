import axios from 'axios';

export const project1Client = axios.create({
    //baseURL: 'http://aselenkeproject1api-env.eba-cdvh8tyx.us-east-2.elasticbeanstalk.com/',
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }, 
    withCredentials: true
});