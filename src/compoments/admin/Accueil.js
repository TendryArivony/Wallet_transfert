import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';
import Chart from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

const Accueil = () => {
    const [nombres, setNombres] = useState();
    const [uriNombres, setUriNombres] = useState("/signalement/nombres");
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [nombrescours, setNombrescours] = useState();
    const [uriNombrescours, setUriNombrescours] = useState("/signalement/nombresEtat?id=2");
    const [nombrestermines, setNombrestermines] = useState();
    const [uriNombrestermines, setUriNombrestermines] = useState("/signalement/nombresEtat?id=3");
    const [nombresnouveau, setNombresnouveau] = useState();
    const [uriNombresnouveau, setUriNombresnouveau] = useState("/signalement/nombresEtat?id=1");
    const [region, setRegion] = useState();
    const initialValue = {type:"",etat:"",region:"",date1:"",date2:"",an:""};
    const [formSearch,setFormSearch] = useState(initialValue);
    const [isLoading,setIsLoading] = useState(false);
    const [jv, setjv] = useState(null);
    const [fv, setfv] = useState();
    const [ma, setma] = useState();
    const [av, setav] = useState();
    const [maa, setmai] = useState();
    const [ju, setju] = useState();
    const [jl, setjl] = useState();
    const [aou, setaou] = useState();
    const [sep, setsep] = useState();
    const [octo, setoct] = useState();
    const [nove, setnov] = useState();
    const [dece, setdec] = useState();
    const [annee, setAnnee] = useState();
    const [urlSearch, setUrlSearch] = useState();
    const [etat, setEtat] = useState();


 
    const token = JSON.parse(localStorage.getItem('tokens'));
    console.log(annee)

    var janvier="&&date1="+annee+"/01/01&&date2="+annee+"/01/31";
    var fevrier="&&date1="+annee+"/02/01&&date2="+annee+"/02/28";
    var mars="&&date1="+annee+"/03/01&&date2="+annee+"/03/31";
    var avril="&&date1="+annee+"/04/01&&date2="+annee+"/04/30";
    var mai="&&date1="+annee+"/05/01&&date2="+annee+"/05/31";
    var juin="&&date1="+annee+"/06/01&&date2="+annee+"/06/30";
    var juillet="&&date1="+annee+"/07/01&&date2="+annee+"/07/31"; 
    var aout="&&date1="+annee+"/08/01&&date2="+annee+"/08/31";
    var sept="&&date1="+annee+"/09/01&&date2="+annee+"/09/30";
    var oct="&&date1="+annee+"/10/01&&date2="+annee+"/10/31";
    var nov="&&date1="+annee+"/11/01&&date2="+annee+"/11/30";
    var dec="&&date1="+annee+"/12/01&&date2="+annee+"/12/31";
    

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormSearch({...formSearch,[name]:value}); 
    } 
    
    const changeAnnee = (e) => {
        setAnnee(e.target.value) 
    } 
    
    const stat = (e) => {
        e.preventDefault();//empeche page de recharger
        var condition = [];
        var url ="/signalement";

        if(formSearch.type !==""){
            condition.push("type="+formSearch.type);
        }
        if(formSearch.etat !==""){
            condition.push("etat="+formSearch.etat);
        }
        if(formSearch.region !==""){
            condition.push("region="+formSearch.region);
        }

        if(formSearch.date1 !==""){
            condition.push("date1="+formSearch.date1.replaceAll('-','/'));
        }
        if(formSearch.date2 !==""){
            condition.push("date2="+formSearch.date2.replaceAll('-','/'));
        }

        if(condition.length >0) url += "?"+condition[0]; 

        if(condition.length >1){
            for (let i = 1; i < condition.length; i++) {
                url +=  "&&"+condition[i];
               
            }
        }

        setUrlSearch(url);
    }

    useEffect(() => {
        const abortCont = new AbortController();
            fetch(baseURI(uriNombres),
                {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                        'signal': abortCont.signal
                    }
                }
            )
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                console.log("isany ity :  "+data);
                setNombres(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                console.log('fetch aborted')
                } else {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
                }
            })
        
            // abort the fetch
            return () => abortCont.abort();
    }, [uriNombres])

    async function jav(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setjv(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        jav(urlSearch+janvier);
    },[urlSearch]);


    async function december(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setdec(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        december(urlSearch+dec);
    },[urlSearch]); 
    
    async function fev(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
           
            setfv(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        fev(urlSearch+fevrier);
        console.log(urlSearch+fevrier);
    },[urlSearch]);

    async function marisa(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setma(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        marisa(urlSearch+mars);
    },[urlSearch]);

    async function april(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setav(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        april(urlSearch+avril);
    },[urlSearch]);

    async function may(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setmai(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        may(urlSearch+mai);
    },[urlSearch]);

    async function june(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setju(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        june(urlSearch+juin);
    },[urlSearch]);

    async function july(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setjl(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        july(urlSearch+juillet);
    },[urlSearch]);

    async function aug(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
           
            setaou(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        aug(urlSearch+aout);
    },[urlSearch]);

    async function septemb(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setsep(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        septemb(urlSearch+sept);
    },[urlSearch]);

    async function october(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setoct(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        october(urlSearch+oct);
    },[urlSearch]);

    async function november(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            
            setnov(data.totalElements);
            console.log(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        november(urlSearch+nov);
    },[urlSearch]);
    
    async function nouveau(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            setError(null);
            setNombresnouveau(data.totalElements);
            console.log(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        nouveau("/signalement?etat=1");
    },[uriNombresnouveau]);

    async function terminer(url){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'GET',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (res.status === 401) throw Error('Acces non autoriser au serveur!');
            else if(res.status === 500) throw Error('Internal Serveur Error !');
            return res.json();

        }).then(data => {
            setIsLoading(false);
            setIsPending(false);
            setError(null);
            setNombrestermines(data.totalElements);
            console.log(data.totalElements);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                console.log(err.message);
                // auto catches network / connection error
                setIsLoading(false);
                setIsPending(false);
                // setLoginErrors(err.message);
            }
        })
    }useEffect(() => {
        terminer("/signalement?etat=3");
    },[uriNombrestermines]);


    var nonaff=nombres-(nombrescours+nombresnouveau+nombrestermines);

    useEffect(() => {
        const abortCont = new AbortController();
            fetch(baseURI(uriNombrescours),
                {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                        'signal': abortCont.signal
                    }
                }
            )
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                setIsPending(false);
                console.log("isany ity  cours:  "+data);
                setNombrescours(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                console.log('fetch aborted')
                } else {
                // auto catches network / connection error
                setIsPending(false);
                setError(err.message);
                }
            })
        
            // abort the fetch
            return () => abortCont.abort();
    }, [uriNombrescours])

    useEffect(() => {
        const abortCont = new AbortController();
            fetch(baseURI("/region"),
                {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                        'signal': abortCont.signal
                    }
                }
            )
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                console.log(data);
                setRegion(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                console.log('fetch aborted')
                } else {
                // auto catches network / connection error
                setError(err.message);
                }
            })
        
            // abort the fetch
            return () => abortCont.abort();
    }, [])

    useEffect(() => {
        const abortCont = new AbortController();
            fetch(baseURI("/etat"),
                {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                        'signal': abortCont.signal
                    }
                }
            )
            .then(res => {
                if (!res.ok) { // error coming back from server
                throw Error('could not fetch the data for that resource');
                } 
                return res.json();
            })
            .then(data => {
                console.log(data);
                setEtat(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                console.log('fetch aborted')
                } else {
                // auto catches network / connection error
                setError(err.message);
                }
            })
        
            // abort the fetch
            return () => abortCont.abort();
    }, [])

    var enc = nombrescours;
    var nouv = nombresnouveau;
    var term = nombrestermines;
    const tay  = {
        labels: ["En cours","Terminee","Nouveau"],
        datasets: [
            {
                label: "Nombres",
                backgroundColor: [
                    '#A9598F',
                    '#5AAA5A',
                    '#5AAA8F'
                ],
                hoverBackgroundColor:[
                    '#A9528F',
                    '#5AAA2A',
                    '#2AAA8F'

                ],
                borderColor:"rgba(0, 0, 0, 1)",
                borderWidth:0.2,
                data: [enc,term,nouv]
            }
        ]
    }
    const options ={
        plugins: {
            legend: {
                display: true,
                position: "bottom"
            },
            title: {
                text: "Statistique",
                display: true,
                fontSize: 20
            }
        }
    }

    const hafa  = {
        labels: ["Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Decembre"],
        datasets: [
            {
                label: "Nombres des signalements",
                backgroundColor: [
                    '#A9598F',
                    '#5AAA5A',
                    '#5AAA8F'
                ],
                fill: 'origin',
                borderJoinStyle:'bevel',
                tension:0.2,
                pointHoverRadius:4,
                borderColor:"rgba(0, 0, 0, 1)",
                backgroundColor: "rgba(153,255,51,0.4)",
                borderWidth:0.2,
                data: [jv,fv,ma,av,maa,ju,jl,aou,sep,octo,nove,dece]
            }
        ]
    }

    console.log(formSearch.region)


   
    
    return (
        <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    {/* <!-- [ breadcrumb ] start --> */}

                    {/* <!-- [ breadcrumb ] end --> */}
                    <div className="main-body">
                        <div className="page-wrapper">
                            {/* <!-- [ Main Content ] start --> */}
                            <div className="row">
                                {/* <!--[ daily sales section ] start--> */}
                                <div className="col-md-6 col-xl-4">
                                <div class="card card-event">
                                        <div class="card-block">
                                            <div class="row align-items-center justify-content-center">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                                <div class="col">
                                                    <h5 class="m-0">Total</h5>
                                                </div>
                                                <div class="col-auto">
                                                     { nombres === 0 &&<label class="label theme-bg2 text-white f-14 f-w-400 float-right">0 %</label> }
                                                     { nombres !== 0 &&<label class="label theme-bg2 text-white f-14 f-w-400 float-right">{(nombres*100)/nombres}%</label> }
                                                </div>
                                            </div>
                                            <h2 class="mt-3 f-w-300">{nombres}<sub class="text-muted f-14">Signalement</sub></h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-4">
                                <div class="card card-event">
                                        <div class="card-block">
                                            <div class="row align-items-center justify-content-center">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                                <div class="col">
                                                    <h5 class="m-0">En cours</h5>
                                                </div>
                                                <div class="col-auto">
                                                    { nombres === 0 &&<label class="label theme-bg2 text-white f-14 f-w-400 float-right">0 %</label> }
                                                    { nombres !==0 &&<label class="label theme-bg2 text-white f-14 f-w-400 float-right">{Math.round(((nombrescours*100)/nombres)*100)/100}%</label> }
                                                </div>
                                            </div>
                                            <h2 class="mt-3 f-w-300">{nombrescours}<sub class="text-muted f-14">Signalement</sub></h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-xl-4">
                                <div class="card card-event">
                                        <div class="card-block">
                                            <div class="row align-items-center justify-content-center">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                                <div class="col">
                                                    <h5 class="m-0">Termines</h5>
                                                </div>
                                                <div class="col-auto">
                                                { nombres === 0 && <label class="label theme-bg2 text-white f-14 f-w-400 float-right">0 %</label> }
                                                { nombres !== 0 && <label class="label theme-bg2 text-white f-14 f-w-400 float-right">{Math.round(((nombrestermines*100)/nombres)*100)/100}%</label> }
                                                </div>
                                            </div>
                                            <h2 class="mt-3 f-w-300">{nombrestermines}<sub class="text-muted f-14">Signalement</sub></h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-xl-4">
                                <div class="card card-event">
                                        <div class="card-block">
                                            <div class="row align-items-center justify-content-center">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                                <div class="col">
                                                    <h5 class="m-0">Nouveaux</h5>
                                                </div>
                                                <div class="col-auto">
                                                { nombres === 0 && <label class="label theme-bg2 text-white f-14 f-w-400 float-right">0 %</label> }
                                                   { nombres !== 0 &&<label class="label theme-bg2 text-white f-14 f-w-400 float-right">{Math.round(((nombresnouveau*100)/nombres)*100)/100}%</label>}
                                                </div>
                                            </div>
                                            <h2 class="mt-3 f-w-300">{nombresnouveau}<sub class="text-muted f-14">Signalement</sub></h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-xl-4">
                                <div class="card card-event">
                                        <div class="card-block">
                                            <div class="row align-items-center justify-content-center">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                                <div class="col">
                                                    <h5 class="m-0">Non affecte</h5>
                                                </div>
                                                <div class="col-auto">
                                                     { nombres === 0 && <label class="label theme-bg2 text-white f-14 f-w-400 float-right">0 %</label> }
                                                     { nombres !== 0 && <label class="label theme-bg2 text-white f-14 f-w-400 float-right">{Math.round(((nonaff*100)/nombres)*100)/100}%</label> }
                                                </div>
                                            </div>
                                            <h2 class="mt-3 f-w-300">{nonaff}<sub class="text-muted f-14">Signalement</sub></h2>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-8">
                                    <div class="card">
                                        <div class="card-header">
                                            
                                        </div>
                                        <div class="card-block">

                                            <div className='radar'>
                                                <div>
                                                <form className="form-inline">
                                                    <div className="form-group">
                                                            <div className="form-group">
                                                                <select value={formSearch.region} onChange={handleChange} className="form-control" name="region" id="" style={{"marginRight":"5px", "with":"7px"}}>
                                                                                    <option value={""}>Region</option>
                                                                                    { region && 
                                                                                        region.map((t) =>
                                                                                            <option key={t.id} value={t.id}> {t.nom} </option>
                                                                                        )
                                                                                        
                                                                                    }
                                                            

                                                                            </select>
                                                                            <select  value={formSearch.etat} onChange={handleChange} className="form-control" name="etat" id="" style={{"marginRight":"5px"}}>
                                                                                <option value={""}>Status</option>
                                                                                { etat && 
                                                                                etat.map((t) =>
                                                                                    <option key={t.id} value={t.id}> {t.type} </option>
                                                                                     )
                                                                       
                                                                                }
                                                                            </select>
                                                                            <input placeholder='Annee' className="form-control" type='number' style={{ "marginRight":"5px"}} min={2015} max={2022} onChange={changeAnnee} />
                                                                            
                                                                            { !isLoading && <button onClick={stat} type="submit" className="btn btn-secondary" style={{"width":"10%" , "float": "center"}}><i className="feather icon-check"></i></button>}
                                                                            { isLoading && <button className='btn btn-secondary' type='button' disabled='' style={{"width":"10%" , "float": "center"}}><span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span></button>}
                                                            </div>
                                                    </div>
                                                </form>
                                                                <Line data={hafa}
                                                                options={options}
                                                                />
                                                                { error && <p> {error}</p> }
                                                                { isPending && <p> Chargement ... </p> }
                                                          
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-12 col-xl-4" style={{"float":"center"}}>
                                <div className="card yearly-sales">
                                        <div className="card-block">

                                            <div className='pie'>
                                                <Doughnut data={tay}
                                                options={options}
                                                />
                                                 { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default Accueil;

