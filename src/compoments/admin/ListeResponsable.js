import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
// import ModifierModal from '../ModifierModal';
import baseURI from '../../utilitaire/baseURI';

const Responsable = () => {
    const initialValue = {username:"",mdp:"",confirmationMdp:"",region:""};
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [responsables, setResponsables] = useState(null);
    const [regions, setRegions] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isRefresh, setIsRefresh] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const token = JSON.parse(localStorage.getItem('tokens'));


    const [errorInsertion, setErrorInsertion] = useState(null);
    const [errorModification, setErrorModification] = useState(null);
    const [modif,setModif] = useState(null);

    const [url,setUrl] = useState("/responsable");
    const [urlReg, setUrlReg] = useState("/region");

    const handleDelete = (id) => {
        supprimer(id);
        const newRespo = responsables.filter(responsables => responsables.id !== id);
        setResponsables(newRespo);
    }

    const handleChange = (e) => {
        const {name , value} = e.target;
        setFormValues({...formValues,[name]:value});
        verification(formValues);
    }

    const modificationResponsable = (e) =>{
        e.preventDefault();//empeche page de recharger
        setFormErrors(verification(modif));
        setIsSubmit(true);
        setIsUpdate(true);
    }

    const insertionResponsable = (e) =>{
        e.preventDefault();//empeche page de recharger
        setFormErrors(verification(formValues));
        setIsSubmit(true);
    }

    async function modification(){

        var url = "/responsable/"+modif.id;
        if(formValues.region !== "") {
            url = url + "?region=" + formValues.region;
        } else {
            url = url + "?region=" + modif.region.id;
        }

        const options ={
            method : 'PUT',
            headers:{
                "Accept" : "application/json",
                "Authorization": `Bearer ${token}`
            },
        };
        setIsLoading(true);
        
        await fetch(baseURI(url),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur modification !');
            } 
            return res.json();
        }).then(data => {
            setIsLoading(false);
            setFormValues(initialValue)
            getResponsables();
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                setIsLoading(false);
                // console.log(err.mess)
                setErrorModification(err.message);
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
        
        await fetch(baseURI('/responsable'),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur insertion !');
            } 
            return res.json();
        }).then(data => {
            setIsLoading(false);
            console.log(data)
            setResponsables([...responsables,data]);
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

    async function getResponsables(){
        const options ={
            method : 'GET',
            headers:{
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization": `Bearer ${token}`
            },
        };
        setIsLoading(true);
        
        await fetch(baseURI('/responsable'),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Could not fetch data');
            } 
            return res.json();
        }).then(data => {
            setIsLoading(false);
            // console.log(data)
            setResponsables(data);
        })
            .catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                // auto catches network / connection error
                setIsLoading(false);
                // console.log(err.mess)
                setError(err.message);
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
        if(!values.username){
            errors.username = "Veuillez donner le nom du responsable";
        }else {
            setFormErrors({...formErrors,username:""})
        }
        if(!values.mdp){
            errors.mdp = "Veuillez donner le mot de passe du responsable";
        }else {
            setFormErrors({...formErrors,mdp:""})
        }
        if(!values.region){
            errors.region = "Veuillez choisir une region associé à ce responsable";
        }else {
            setFormErrors({...formErrors,region:""})
        }
        if(values.mdp != values.confirmationMdp) {
            errors.confirmationMdp = "Les mots de passes ne sont pas identiques";
        } else {
            setFormErrors({...formErrors,confirmationMdp:""})
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
                setResponsables(data);
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

            setTimeout(() => {
                fetch(baseURI(urlReg),
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
        }, [url, urlReg])
    

    return (
        <section className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    {/* <!-- [ breadcrumb ] start --> */}``
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">Responsables</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="#!">Liste Responsables</a></li>
                                    </ul>
                                    <div>
                                        { isRefresh && <button className='btn btn-secondary' style={{"float":"right"}} type='button' disabled=''><span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span></button>}
                                        <button style={{"float":"right"}} type="submit" className="btn btn-outline-dark" title=""  data-toggle="modal" data-target="#exampleModal"
                                        data-original-title="Ajout nouveau responsable">
                                            <i className="feather icon-plus"></i> Nouveau responsable
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    { error && <p> {error}</p> }
                                    { isPending && <p> Chargement ... </p> }
                                </div>
                                { responsables &&
                                    <>
                                    {responsables.map((respo) => 
                                        <div className="mt-4 col-md-6 col-xl-4">
                                            <div className="card card-social">
                                                <div className="card-block border-bottom">
                                                    <h6 className="mb-4"><i className="feather icon-map-pin text-c-green f-20 m-r-10"></i>{respo.region.nom}</h6>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-9">
                                                            <h4 className="f-w-300 d-flex align-items-center  m-b-0"><i className="feather icon-user text-c-green f-30 m-r-10"></i>{respo.username}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-block">
                                                    <div className="row align-items-center justify-content-center card-active">
                                                        <div className="col-6">
                                                            <h6 className="text-center"><button type="submit" data-toggle="modal" data-target="#ModifyModal" className="btn btn-outline-secondary"
                                                            onClick={() => 
                                                                setModif(respo)
                                                            }
                                                            >Modifier</button></h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <h6 className="text-center"><button className="btn btn-outline-danger" onClick={() =>
                                                                    {
                                                                        if(window.confirm('Voulez vous vraiment supprimer le responsable '+respo.username+' ?')){
                                                                           handleDelete(respo.id);          
                                                                        };
                                                                    }
                                                                }>Supprimer</button></h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ajouter un nouveau responsable</h5>
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
                <form onSubmit={insertionResponsable}>
                    {/* <pre>{JSON.stringify(formValues,undefined)}</pre> */}
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Nom:</label>
                        <input type="text" className="form-control" id="responsable-name" name="username" value={formValues.username} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.username}</p>
                    <div className="form-group">
                        <label for="message-text" className="col-form-label">Mot de passe:</label>
                        <input type="password" className="form-control" id="responsable-password" name='mdp' value={formValues.mdp} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.mdp}</p>
                    <div className="form-group">
                        <label for="message-text" className="col-form-label">Confirmer le mot de passe:</label>
                        <input type="password" className="form-control" id="responsable-password" name='confirmationMdp' value={formValues.confirmationMdp} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.confirmationMdp}</p>
                    <div className="form-group">
                        <label for="message-text" className="col-form-label">Region:</label>
                        <select className="form-control" id="exampleFormControlSelect1" name="region" value={formValues.region} onChange={handleChange}>
                            <option value="">Selectionner une region</option>
                            {regions && <> {regions.map((reg) => <option value={reg.id}>{reg.nom}</option>)}</>}
                        </select>
                    </div>
                    <p style={{color: "red"}}>{formErrors.region}</p>

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

        <div className="modal fade" id="ModifyModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier le responsable {modif && modif.username}</h5>
                <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {/* <pre>{JSON.stringify(formErrors,undefined)}</pre> */}
                <form onSubmit={modificationResponsable}>
                    {/* <pre>{JSON.stringify(formValues,undefined)}</pre> */}
                    <div className="form-group">
                        <label for="message-text" className="col-form-label">Region:</label>
                        <select className="form-control" id="exampleFormControlSelect2" name="region" value={formValues.region} onChange={handleChange}>
                            <option value="">Selectionner une region</option>
                            {regions && <> {regions.map((reg) => <option value={reg.id}>{reg.nom}</option>)}</>}
                        </select>
                    </div>
                    <p style={{color: "red"}}>{formErrors.region}</p>

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
    </section>
    );
};

export default Responsable;