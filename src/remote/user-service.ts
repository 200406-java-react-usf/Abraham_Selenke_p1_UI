import { project1Client } from "./project1-client";

export async function newUser(username: string, password: string, firstName: string, lastName: string, email: string) {
    let response = await project1Client.post('/register', {username, password, firstName, lastName, email});
    return await response.data;
}

export async function getAllUsers(){
    let resp = await project1Client.get('/users',{
        withCredentials: true
    });
    console.log(resp.data);
    return await resp.data;
}