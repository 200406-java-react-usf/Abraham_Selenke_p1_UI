import { project1Client } from "./project1-client";

export async function authenticate(username: string, password: string) {
    let response = await project1Client.post('/auth', {username, password});
    return await response.data;
}