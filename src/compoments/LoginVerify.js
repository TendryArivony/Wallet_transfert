import { useState } from 'react';
import baseURI from '../../src/utilitaire/baseURI';

export async function checkLogin(){
    const token = JSON.parse(localStorage.getItem('tokens'));
    if(token === null)  return false;
    const options ={
        method : 'GET',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    };
    await fetch(baseURI('/auth'),options).then(res => {
        if (!res.ok) { // error coming back from server
            return false;
        } 
    })
    return true;
}

