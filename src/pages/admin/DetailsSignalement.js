import React from 'react';
import Navigation from '../../compoments/admin/Navigation';
import Header from '../../compoments/admin/Header';
import FicheSignalement from '../../compoments/admin/FicheSignalement';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';



const DetailsSignalement = () => {
    const { id } = useParams();
    const token = JSON.parse(localStorage.getItem('tokens'));
    const [sig, setSig] = useState();
    const [img, setImg] = useState();
    const [url, setUrl] = useState("/signalement/"+id);
    const [imgUrl, setImgUrl] = useState("/images/"+id);
    const [loading, setLoading] = useState(false);

    async function fiche(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            // console.log(data);
            setSig(data);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                // setLoginErrors(err.message);
            }
        })
    }

    async function images(url){
        setLoading(true)
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        
        await fetch(baseURI(imgUrl),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setLoading(false)
            // console.log(data);
            setImg(data);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                setLoading(false)
                console.log(err.message);
                // auto catches network / connection error
                // setLoginErrors(err.message);
            }
        })
    }


    useEffect(() => {
       fiche(url);
    },[url]);

    useEffect(() => {
        images(imgUrl);
     },[imgUrl]);

    return (
        <>
            <Navigation/>
            <Header/>
            <FicheSignalement sig={sig} images={img} loading={loading} />
        </>
    );
};

export default DetailsSignalement;