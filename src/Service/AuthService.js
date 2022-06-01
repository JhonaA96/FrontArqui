import axios from 'axios';

const url = 'http://localhost:8080/login/'

const getToken=()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin=(authRequest)=>{
    return axios({
        'method':'POST',
        'url':`${process.env.hostUrl||url}auth`,
        'data':authRequest
    })
}

export const fetchUserData=(authRequest)=>{
    return axios({
        method:'GET',
        url:`${process.env.hostUrl||url}userinfo`,
        headers:{
            'Authorization':'Bearer '+getToken()
        }
    })
}