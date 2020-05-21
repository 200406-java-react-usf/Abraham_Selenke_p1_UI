import { project1Client } from "./project1-client";

export async function newUser(username: string, password: string, firstName: string, lastName: string, email: string) {
    let response = await project1Client.post('/register', {username, password, firstName, lastName, email});
    return await response.data;
}

export async function getAllUsers(){
    let resp = await project1Client.get('/users',{
        withCredentials: true
    });
    return await resp.data;
}

export async function updateUser(user_id: number, username: string, password: string, firstName: string, lastName: string, email: string, roles: string){
    let response = await project1Client.put('/users', {user_id, username, password, firstName, lastName, email, roles});
    console.log(response);
    
    return await response.data;
}

export async function deleteUser(user_id: number){
    let resp = await project1Client.delete('/users',{
        data:{
            user_id: user_id
        }
    });
    return await resp.data;
}