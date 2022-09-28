import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import ModifierModal from '../ModifierModal';
import baseURI from '../../utilitaire/baseURI';

const Region = () => {
    const initialValue = {nom:"",longitude:"",latitude:""};
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [regions, setRegions] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const token = JSON.parse(localStorage.getItem('tokens'));


    const [errorInsertion, setErrorInsertion] = useState(null);
    const [modif,setModif] = useState(null);

    const [url,setUrl] = useState("/region");

    const handleDelete = (id) => {
        supprimer(id);
        const newReg = regions.filter(regions => regions.id !== id);
        setRegions(newReg);
    }

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormValues({...formValues,[name]:value});
        verification(formValues);
    }

    const handleUpdate = (e) => {
        const {name , value} = e.target;
        setFormValues({...modif,[name]:value});
        verification(modif);
    }

    const modificationRegion = (e) =>{
        e.preventDefault();//empeche page de recharger
        setFormErrors(verification(modif));
        console.log("atoo ve");
        setIsSubmit(true);
        setIsUpdate();
    }

    const insertionRegion = (e) =>{
        e.preventDefault();//empeche page de recharger
        setFormErrors(verification(formValues));
        setIsSubmit(true);
    }

    async function modification(){
        const headers = new Headers();
        headers.append('Content-type','application/json');

        const options ={
            method : 'PUT',
            body: JSON.stringify(modif),
            headers
        };
        setIsLoading(true);
        
        await fetch(baseURI('/region/'+modif.id),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur insertion !');
            } 
        }).then(data => {
            setIsLoading(false);
            setFormValues(initialValue)
            setIsUpdate(false);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                setIsLoading(false);
                setIsUpdate(false)
                // console.log(err.mess)
                setErrorInsertion(err.message);
            }
        })
    }

    async function insertion(){
        const options ={
            method : 'POST',
            body: JSON.stringify(formValues),
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization": `Bearer ${token}`
            },
        };
        setIsLoading(true);
        
        await fetch(baseURI('/region'),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur insertion !');
            } 
            return res.json();
        }).then(data => {
            setRegions([...regions,data]);
            setIsLoading(false);
            setFormValues(initialValue)
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                setIsLoading(false);
                // console.log(err.mess)
                setErrorInsertion(err.message);
            }
        })
    }

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit && isUpdate){
            modification()
        }
    }, [formErrors])

    useEffect(() => {
        if(Object.keys(formErrors).length === 0 && isSubmit && !isUpdate){
            insertion()
        }
    }, [formErrors])

    const verification = (values) =>{
        const errors = {};
        if(!values.nom){
            errors.nom = "Veuillez donner le nom de la region";
        }else {
            setFormErrors({...formErrors,nom:""})
        }
        if(!values.longitude){
            errors.longitude = "Le champ longitude est obligatoire";
        }else {
            setFormErrors({...formErrors,longitude:""})
        }
        if(!values.latitude){
            errors.latitude = "Le champ latitude est obligatoire";
        }else {
            setFormErrors({...formErrors,latitude:""})
        }
        return errors;
    }

    async function supprimer(id){
        let result = await fetch(baseURI(url)+"/"+id,{
            method:'DELETE',
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        result = await result.json();
        if(result.status===500) {
            setError(result.message)
        }
    }

    const closeError = (e) => {
        setErrorInsertion("");
    }

    useEffect(() => {
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(baseURI(url),
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
                setRegions(data);
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
            }, 10);
        
            // abort the fetch
            return () => abortCont.abort();
        }, [url])
    

    return (
        <section className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    {/* <!-- [ breadcrumb ] start --> */}
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">Regions</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="#!">Liste Region</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- [ breadcrumb ] end --> */}
                    <div className="main-body">
                        <div className="page-wrapper">
                            {/* <!-- [ Main Content ] start --> */}
                            <div className="row">
                                {/* <!-- [ basic-table ] start --> */}
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Region</h5>
                                            <button style={{"float":"right"}} type="submit" className="btn btn-outline-dark" title=""  data-toggle="modal" data-target="#exampleModal"
                                            data-original-title="Ajout nouveau region">
                                                <i className="feather icon-plus"></i> Nouvelle region
                                            </button>
                                        </div>
                                        <div className="card-block table-border-style">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                           
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Nom</th>
                                                            <th>Longitude</th>
                                                            <th>Latitude</th>
                                                            <th>Modifier</th>
                                                            <th>Supprimer</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                            { regions &&
                                                    <>
                                                    {regions.map((reg) => 
                                                        <tr>
                                                            <th scope="row">{ reg.id }</th>
                                                            <td>{ reg.nom }</td>
                                                            <td>{ reg.longitude }</td>
                                                            <td>{ reg.latitude }</td>
                                                            <td><i className="feather icon-edit"
                                                                    data-toggle="modal" data-target="#exampleModal1"
                                                                    data-original-title="Ajout nouveau region" 
                                                                    onClick={() => 
                                                                        setModif(reg)
                                                                    }
                                                                    >
                                                                </i>
                                                            </td>
                                                            <td><i className="feather icon-trash-2"
                                                                onClick={() =>
                                                                    {
                                                                        if(window.confirm('Voulez vous vraiement supprimer la region de '+reg.nom)){
                                                                           handleDelete(reg.id);          
                                                                        };
                                                                    }
                                                                }
                                                                >
                                                                </i>
                                                            </td>
                                                        </tr>
                                                    )}
                                                    </>
                                            }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- [ basic-table ] end --> */}

                            </div>
                            {/* <!-- [ Main Content ] end --> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ajouter une nouvelle region</h5>
                <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {/* <pre>{JSON.stringify(formErrors,undefined)}</pre> */}
                { errorInsertion &&
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{errorInsertion}</strong> 
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeError}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                        }
                <form onSubmit={insertionRegion}>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Nom:</label>
                        <input type="text" className="form-control" id="region-name" name="nom" value={formValues.nom} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.nom}</p>
                    <div className="form-group">
                        <label for="message-text" className="col-form-label">Longitude:</label>
                        <input type="text" className="form-control" id="region-longitude" name='longitude' value={formValues.longitude} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.longitude}</p>
                    <div className="form-group">
                        <label for="message-text" className="col-form-label">Latitude:</label>
                        <input type="text" className="form-control" id="region-latitude" name='latitude' value={formValues.latitude} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.latitude}</p>

                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        { !isLoading && <button type='submit' className='btn btn-primary'>Valider</button> }
                        { isLoading && <button className='btn btn-secondary' type='button' disabled=''><span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span></button>}

                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
        <ModifierModal region={modif} update={modificationRegion} error={formErrors} isLoading ={isLoading} listnerChange={handleUpdate}/>
    </section>
    );
};

export default Region;