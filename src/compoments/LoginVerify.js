import { useState } from 'react';
import baseURI from '../../src/utilitaire/baseURI';

export async function checkLogin(){
    const token = JSON.parse(localStorage.getItem('tokens'));
    if(token === null)  return false;
    else return true;
}

