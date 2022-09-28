import React from 'react';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import AffectationModal from '../AffectationModal';
import baseURI from '../../utilitaire/baseURI';
import Pagination from './Pagination'

const AffectationComponent = () => {

    const initialValue = {region:""};
    const [formValues, setFormValues] = useState(initialValue);
    const [regions, setRegions] = useState(null);
    const [signalementNonAffecte, setSignalementsNonAffecte] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const token = JSON.parse(localStorage.getItem('tokens'));

    const [modif,setModif] = useState(null);

    const [urlSign, setUrlSign] = useState("/signalement?hadRegion=false");

    const changePage= (data) => {
        setUrlSign("/signalement?hadRegion=false&&pageNumber="+data.selected);
    };

    const change = (e) => {
        const {name , value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const affecter = (e) => {
        e.preventDefault();
        let idR = formValues.region.split("/")[0];
        let idS = formValues.region.split("/")[1];
        affectationSign(idS,idR);
    }

    async function affectationSign(idS,idR){
        setIsLoading(true);
        await fetch(baseURI('/signalement/'+idS+'?region='+idR),{
            method: 'PUT',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json',
            }
        }).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur affectation region !');
            } 
        }).then(data => {
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
            }
        })
        await listeAffectation();
    }

    async function listeAffectation(){
        console.log("listteeeeee afffffff");
        const abortCont = new AbortController();
            fetch(baseURI(urlSign),
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
                setSignalementsNonAffecte(data);
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
        listeAffectation();
    }, [urlSign])


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
            // abort the fetch
            return () => abortCont.abort();
        }, [])


    

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
                                        <h5 className="m-b-10">Signalements non affectés</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><Link to="/signalement">Signalements</Link></li>
                                        <li className="breadcrumb-item"><a href="#!">Non affectés</a></li>
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
                                            <h5>Non Affectés</h5>
                                        </div>
                                        <div className="card-block table-border-style">
                                            <div className="table-responsive">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Description</th>
                                                            <th>Latitude</th>
                                                            <th>Longitude</th>
                                                            <th>Etat</th>
                                                            <th>Type</th>
                                                            <th>DateSignalement</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { signalementNonAffecte && <> { signalementNonAffecte.content.map((sign) => 
                                                        <tr>
                                                            <th scope="row">{sign.id}</th>
                                                            <td>{sign.description}</td>
                                                            <td>{sign.latitude}</td>
                                                            <td>{sign.longitude}</td>
                                                            <td>{sign.etat.type}</td>
                                                            <td>{sign.type.nom}</td>
                                                            <td>{sign.dateSignalement}</td>
                                                            <td><i  className="feather icon-edit"
                                                                    data-toggle="modal" data-target="#exampleModal"
                                                                    data-original-title="Ajout nouveau region"  
                                                                    onClick={() => 
                                                                        setModif(sign)
                                                                    }>
                                                                </i></td>
                                                        </tr>
                                                        )}
                                                        </>
                                                    }  
                                                    </tbody>
                                                </table>
                                                { signalementNonAffecte 
                                                    && 
                                                    <Pagination pages={signalementNonAffecte.totalPages} change={changePage} current={signalementNonAffecte.pageNumber} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- [ basic-table ] end --> */}

                            </div>
                            {/* <!-- [ Main Content ] end --> */}
                        </div>
                    </div>

                { signalementNonAffecte 
                    && regions && modif
                        && 
                        <AffectationModal regions={regions} signalement={modif} isLoading={isLoading} fonction={affecter} formValues={formValues} change={change}/>
                }
                </div>
            </div>
        </div>
</section>
    );
};

export default AffectationComponent;