/* eslint-disable no-throw-literal */
import {API_HOST} from '../utils/constants';
import {getTokenApi} from './auth';

export function getUserApi(id) {
    const url=`${API_HOST}/verPerfil?id=${id}`;
    const params={
        method:"GET",
        headers:{
            "Content--Type":"application/json",
            Authorization:`Bearer${getTokenApi()}`
        }
    };

    return fetch(url,params).then(response => {
        if (response.status >=400) throw null; 
        return response.json();
    }).then(result => {
        return result;
    }).catch(err => {
        return err;
    });
}

export function uploadBannerApi(file) {
    const url=`${API_HOST}/subirBanner`;
    const formData=new FormData();
    formData.append("banner",file);

    const params={
        method:"POST",
        headers:{
            "Content--Type":"application/json",
            Authorization:`Bearer${getTokenApi()}`
        },
        body:formData
    };

    return fetch(url,params)
    .then(response=>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        return err;
    });
}

export function uploadAvatarApi(file) {
    const url=`${API_HOST}/subirAvatar`;
    const formData=new FormData();
    formData.append("avatar",file);

    const params={
        method:"POST",
        headers:{
            "Content--Type":"application/json",
            Authorization:`Bearer${getTokenApi()}`
        },
        body:formData
    };

    return fetch(url,params)
    .then(response=>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        return err;
    });
}

export function updateInfoApi(data) {
    const url=`${API_HOST}/modificarPerfil`;

    const params={
        method:"PUT",
        headers:{
            "Content--Type":"application/json",
            Authorization:`Bearer${getTokenApi()}`
        },
        body:JSON.stringify(data)
    }

    return fetch(url,params)
    .then(response=>{
        return response;
    })
    .catch(err=>{
        return err;
    });
}