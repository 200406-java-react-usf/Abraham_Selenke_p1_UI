import { project1Client } from "./project1-client";

export async function addNewReimbursement(amount: number, description: string, author_id :number, reimb_status: string, reimb_type: string) {
    let response = await project1Client.post('/reimbursement', {amount, description, author_id, reimb_status, reimb_type});
    return await response.data;
}

export async function getReimbursementById(id: number){  
    let resp = await project1Client.get(`/reimbursement/${id}`);
    return resp.data;
}

export async function getAllReimbursements(){
    let resp = await project1Client.get('/reimbursement',{
        withCredentials: true
    });
    return await resp.data;
}

export async function newUpdateReimbursement(reimb_id: number, amount: number, description: string, resolver_id :number, reimb_status: string, reimb_type: string){
    let response = await project1Client.put('/reimbursement', {reimb_id, amount, description, resolver_id, reimb_status, reimb_type});    
    return await response.data;
}

export async function deleteReimbursement(reimbId : number){
    let resp = await project1Client.delete('/reimbursement',{
        data:{
            reimb_id: reimbId
        }
    });
    return await resp.data;
}

export async function getByAuthor(id: number){
    let response = await project1Client.get(`/reimbursement/employee/${id}`);   
    return await response.data;
}