import React from 'react';
import ReactPaginate from 'react-paginate';
import Pagination from './Pagination'
import baseURI from '../../utilitaire/baseURI';
import { Link } from "react-router-dom"

const TableSignalement = ({title,signalement,error,isPending,changePage,indice,funct}) => {

    return (
        <>
            <div className="main-body">
                        <div className="page-wrapper">
                            {/* <!-- [ Main Content ] start --> */}
                            <div className="row">
                                {/* <!-- [ basic-table ] start --> */}
                                <div className="col-xl-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>{title}</h5>
                                        </div>
                                        <div className="card-block table-border-style">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                           
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Auteur</th>
                                                            <th>Region</th>
                                                            <th>Type</th>
                                                            <th>Status</th>
                                                            <th>Date et Heure</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                            { signalement &&
                                                    <>
                                                    {signalement.content.map((sig) => 
                                                        <tr key={sig.id}>
                                                            <td>{ sig.utilisateur.username }</td>
                                                            <td>{ sig.region.nom }</td>
                                                            <td>{ sig.type.nom } </td>
                                                            <td>{ sig.etat.type }</td>
                                                            <td>{ sig.dateSignalement }</td>
                                                            <td><Link to={`/fiche/`+sig.id}>Detailler</Link></td>
                                                            { indice==='new' && <td><button type="button" className="btn btn-secondary" 
                                                                    onClick={() => 
                                                                        funct(sig.id)
                                                                    }
                                                            >Basculer vers en cours</button></td>
                                                            }
                                                            { indice==='cours' && <td><button type="button" className="btn btn-secondary" 
                                                                     onClick={() => 
                                                                        funct(sig.id)
                                                                    }
                                                            >Basculer vers en terminer</button></td>}
                                                        </tr>
                                                    )}
                                                   </> 
                                            } 
                                                    </tbody>
                                                </table>
                                            </div>
                                            { signalement && 
                                            <Pagination pages={signalement.totalPages} change={changePage} current={signalement.pageNumber} />}
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- [ basic-table ] end --> */}

                            </div>
                            {/* <!-- [ Main Content ] end --> */}
                        </div>
                    </div>
        </>
    );
};

export default TableSignalement;