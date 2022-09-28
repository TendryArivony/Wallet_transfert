import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';
import ModifierType from '../ModifierType';

const Type = () => {
        const initialValue = {nom:""};
        const [formValues, setFormValues] = useState(initialValue);
        const [formErrors, setFormErrors] = useState({});
        const [types, setTypes] = useState(null);
        const [isPending, setIsPending] = useState(true);
        const [isLoading,setIsLoading] = useState(false);
        const [isSubmit,setIsSubmit] = useState(false);
        const [error, setError] = useState(null);
        const [isRefresh, setIsRefresh] = useState(false);
        const [isUpdate, setIsUpdate] = useState(false);
        const token = JSON.parse(localStorage.getItem('tokens'));

        const [errorInsertion, setErrorInsertion] = useState(null);
        const [modif,setModif] = useState(null);

        const [url,setUrl] = useState("/type");
        
        const handleDelete = (id) => {
            supprimer(id);
            const newTyp = types.filter(types => types.id !== id);
            setTypes(newTyp);
        }

        const handleChange = (e) => {
            const {name , value} = e.target;
            setFormValues({...formValues,[name]:value});
            verification(formValues);
        }

        const handleUpdate = (e) =>{
            const {name , value} = e.target;
            setFormValues({...modif,[name]:value});
            verification(modif);
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

        const verification = (values) =>{
            const errors = {};
            console.log("verification");
            // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}#/i;
            if(!values.nom){
                errors.nom = "Veuillez donner le nom du type";
            }
            return errors;
        }

        const modification = (e) =>{
            e.preventDefault();
            setFormErrors(verification(modif));
            setIsSubmit(true);
            setIsUpdate();
        }

        const insertionType = (e) =>{
            e.preventDefault();//empeche page de recharger
            setFormErrors(verification(formValues));
            setIsSubmit(true);
        }

        async function modificationType(){
            const headers = new Headers();
            headers.append('Content-type','application/json');
    
            const options ={
                method : 'PUT',
                body: JSON.stringify(modif),
                headers
            };
            setIsLoading(true);
            
            await fetch(baseURI('/type/'+modif.id),options).then(res => {
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
            
            await fetch(baseURI('/type'),options).then(res => {
                if (!res.ok) { // error coming back from server
                    throw Error('Erreur insertion !');
                } 
                return res.json();
            }).then(data => {
                setIsLoading(false);
                console.log(data);
                setTypes([...types,data]);
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
            if(Object.keys(formErrors).length === 0 && isSubmit){
                insertion();
                setTypes(types,formValues)
            }
        }, [formErrors])

        useEffect(() => {
            if(Object.keys(formErrors).length === 0 && isSubmit && isUpdate){
                modificationType()
            }
        }, [formErrors])
        
    
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
                    setTypes(data);
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
                                        <h5 className="m-b-10">Types signalement</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="#!">Liste Type</a></li>
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
                                            <h5>Type</h5>
                                            <button style={{"float":"right"}} type="button" className="btn btn-outline-dark" title=""  data-toggle="modal" data-target="#exampleModal"
                                            data-original-title="Ajout nouveau type">
                                                <i className="feather icon-plus"></i> Nouveau type
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
                                                            <th width="50%">Nom</th>
                                                            <th>Modifier</th>
                                                            <th>Supprimer</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { types &&
                                                    <>
                                                    {types.map((typ) =>
                                                        <tr>
                                                            <th scope="row">{ typ.id }</th>
                                                            <td>{ typ.nom }</td>
                                                            <td><i className="feather icon-edit"
                                                                    data-toggle="modal" data-target="#exampleModal1"
                                                                    data-original-title="Modification type" 
                                                                    onClick={() => 
                                                                        setModif(typ)
                                                                    }
                                                                    >
                                                                </i>
                                                            </td>
                                                            <td><i class="feather icon-trash-2" 
                                                             onClick={() =>
                                                                {
                                                                    if(window.confirm('Voulez vous vraiement supprimer le type '+typ.nom)){
                                                                       handleDelete(typ.id);          
                                                                    };
                                                                }
                                                            }
                                                            ></i></td>
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
                <h5 className="modal-title" id="exampleModalLabel">Ajouter un nouveau type</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <form onSubmit={insertionType}>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Nom:</label>
                        <input type="text" class="form-control" id="type-name" name="nom" value={formValues.nom} onChange={handleChange}/>
                    </div>
                    <p style={{color: "red"}}>{formErrors.nom}</p>

                    <div class="modal-footer">
                        <button type="submit" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        <button type="submit" class="btn btn-primary">Valider</button>
                    </div>
                </form>
            </div>
            
            </div>
        </div>
        </div>
        <ModifierType type={modif} update={modificationType} error={formErrors} isLoading ={isLoading} listnerChange={handleUpdate}/>
</section>
    );
};

export default Type;