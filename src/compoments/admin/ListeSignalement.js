/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';

import baseURI from '../../utilitaire/baseURI';
import TableSignalement from './TableSignalement';

const ListeSignalement = () => {

    const initialValue = {type:"",etat:"",region:"",date1:"",date2:""};
    const [formSearch,setFormSearch] = useState(initialValue);
    const [isLoading,setIsLoading] = useState(false);

    const [nouveau, setNouveau] = useState();
    const [uriNoveau, setUriNoveau] = useState("/signalement?etat=1");

    const [enCours, setEnCours] = useState();
    const [uriEnCours, setUriEnCours] = useState("/signalement?etat=2");

    const [terminer, setTerminer] = useState();
    const [uriTerminer, setUriTerminer] = useState("/signalement?etat=3");

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true);

    const [type, setType] = useState();
    const [etat, setEtat] = useState();
    const [region, setRegion] = useState();
    
    const [result, setResult] = useState();
    const [urlSearch, setUrlSearch] = useState();

    const token = JSON.parse(localStorage.getItem('tokens'));
    
    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormSearch({...formSearch,[name]:value});
    }

    const changePageNouveau = (data) => {
        setUriNoveau("/signalement?etat=1&&pageNumber="+data.selected);
    };

    const changePageRecherche = (data) => {
        if(urlSearch!=='/signalement'){
            recherche(urlSearch+"&&pageNumber="+data.selected)
        }else recherche(urlSearch+"?pageNumber="+data.selected)
    };

    const changePageEnCours = (data) => {
        setUriEnCours("/signalement?etat=2&&pageNumber="+data.selected);
    };

    const changePageTerminer = (data) => {
        setUriTerminer("/signalement?etat=3&&pageNumber="+data.selected);
    };

    async function versEnCours(idS){
        const options ={
            method : 'PUT',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI('/signalement/'+idS+'?etat=2'),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur insertion !');
            } 
        }).then(data => {
            setIsLoading(false);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                console.log(err.message);
                setIsLoading(false);
                setError(err.message);
            }
        })
        await listeNouveau();
    }


    async function versTerminer(idS){

        const options ={
            method : 'PUT',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);
        
        await fetch(baseURI('/signalement/'+idS+'?etat=3'),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur update !');
            } 
        }).then(data => {
            setIsLoading(false);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                console.log(err.message);
                setIsLoading(false);
                setError(err.message);
            }
        })
        await listeEnCours();
    }

    const find = (e) =>{
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
                console.log(url);
            }
        }

        setUrlSearch(url);
    }

    async function recherche(url){
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
            console.log(data);
            setResult(data);
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
    }

    useEffect(() => {
        recherche(urlSearch);
    },[urlSearch]);

    async function listeNouveau(){
        const abortCont = new AbortController();
            fetch(baseURI(uriNoveau),
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
                console.log(data);
                setNouveau(data);
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
    }


    async function listeEnCours(){
        const abortCont = new AbortController();
            fetch(baseURI(uriEnCours),
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
                console.log(data);
                setEnCours(data);
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
    }

    async function listeTerminer(){
        const abortCont = new AbortController();
            fetch(baseURI(uriTerminer),
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
                console.log(data);
                setTerminer(data);
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
    }


    useEffect(() => {
        listeNouveau();
    }, [uriNoveau])


    useEffect(() => {
        const abortCont = new AbortController();
            fetch(baseURI("/type"),
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
                setType(data);
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
    

    return (
        <>
        <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    {/* <!-- [ breadcrumb ] start --> */}
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">Signalement</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="javascript:">Liste des signalements</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- [ breadcrumb ] end --> */}
                            {/* <!-- [ Main Content ] start --> */}
                            <div className="row">
                                {/* <!-- [ tabs ] start --> */}
                                <div className="col-sm-12">
                                    {/* <h5>Basic Tabs</h5> */}
                                    <hr/>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active text-uppercase" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true"  onClick={() => 
                                                                        listeNouveau()
                                                                    }>Nouveau</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-uppercase" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false"  onClick={() => 
                                                                        listeEnCours()
                                                                    }>En cours</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-uppercase" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false"  onClick={() => 
                                                                        listeTerminer()
                                                                    }>Terminé</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-uppercase" id="recherche-tab" data-toggle="tab" href="#recherche" role="tab" aria-controls="recherche" aria-selected="false">Recherche</a>
                                        </li>
                                        
                                    </ul>
                                    <div className="tab-content" id="myTabContent" style={{"minHeight":"40em"}}>
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            { error && <p> {error}</p> }
                                            { isPending && <p>Chargement...</p>}

                                            { nouveau && <TableSignalement title="Nouveaux signalement" signalement={nouveau} error={error} isPending={isPending} changePage={changePageNouveau} indice='new' funct={versEnCours}/>}
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            { error && <p> {error}</p> }
                                            { isPending && <p>Chargement...</p>}

                                            { enCours && <TableSignalement title="Signalement en cours" signalement={enCours} error={error} isPending={isPending} changePage={changePageEnCours} indice='cours' funct={versTerminer} /> }
                                        </div>
                                        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                        { error && <p> {error}</p> }
                                        { isPending && <p>Chargement...</p>}

                                            { terminer && <TableSignalement title="Signalement terminé" signalement={terminer} error={error} isPending={isPending} changePage={changePageTerminer} indice='terminer' funct={versEnCours} />}
                                        </div>

                                        <div className="tab-pane fade" id="recherche" role="tabpanel" aria-labelledby="recherche-tab">
                                            
                                            <div className='row' style={{"marginBottom":"15px"}}>
                                            {/* <pre>{JSON.stringify(formSearch,undefined)}</pre> */}
                                                <form className="form-inline" onSubmit={find}>
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <select value={formSearch.type} onChange={handleChange} className="form-control" name="type" id="" style={{"marginRight":"10px"}}>
                                                                <option value={""}>Type</option>
                                                                { type && 
                                                                    type.map((t) =>
                                                                        <option key={t.id} value={t.id}> {t.nom} </option>
                                                                    )
                                                                }
                                                            </select>

                                                            <select  value={formSearch.etat} onChange={handleChange} className="form-control" name="etat" id="" style={{"marginRight":"10px"}}>
                                                                <option value={""}>Status</option>
                                                                { etat && 
                                                                    etat.map((t) =>
                                                                        <option key={t.id} value={t.id}> {t.type} </option>
                                                                    )
                                                                       
                                                                }
                                                            </select>

                                                            <select value={formSearch.region} onChange={handleChange} className="form-control" name="region" id="" style={{"marginRight":"10px"}}>
                                                                <option value={""}>Region</option>
                                                                { region && 
                                                                    region.map((t) =>
                                                                        <option key={t.id} value={t.id}> {t.nom} </option>
                                                                    )
                                                                       
                                                                }
                                                            </select>
                                                            
                                                            <input type="date" name="date1" value={formSearch.date1} onChange={handleChange}  className="form-control" style={{"marginRight":"9px"}}/>

                                                            <input type="date" name="date2" value={formSearch.date2} onChange={handleChange}  className="form-control" style={{"marginRight":"9px"}}/>

                                                            {/* <select className="form-control" name="" id="" style={{"marginRight":"10px"}}>
                                                                <option>Utilisateur</option>
                                                            </select> */}
                                                            { !isLoading && <button type="submit" className="btn btn-secondary" style={{"width":"6.5%"}}><i className="feather icon-search"></i></button>}
                                                            { isLoading && <button className='btn btn-secondary' type='button' disabled=''><span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span></button>}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                            { isPending && <p>Chargement...</p>}
                                            { error && <p> {error}</p> }
                                            { result && <TableSignalement title="Resultat de recherche" signalement={result} error={error} isPending={isPending} changePage={changePageRecherche} indice='terminer'/>}
                                        </div>
                                    </div>
                                </div>
                                
                                {/* <!-- [ tabs ] end --> */}
                            </div>
                            {/* <!-- [ Main Content ] end --> */}
                        </div>
                    </div>
                </div>
            </div>
    </>
    );
};

export default ListeSignalement;