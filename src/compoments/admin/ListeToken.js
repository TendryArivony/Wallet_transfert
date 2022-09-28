import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';


const Tokens = () => {
        const [tokens, setToken] = useState(null);  
        const [isPending, setIsPending] = useState(true);
        const [error, setError] = useState(null); 
        const token = JSON.parse(localStorage.getItem('tokens'));
        const [url,setUrl] = useState("/tokens");
        

        useEffect(() => {
            const abortCont = new AbortController();
            setTimeout(() => {
                fetch(baseURI(url),
                    {
                        method: 'GET',
                        headers:{
                            'Authorization': `Bearer ${token}`,
                            'Content-type': 'application/json',
                            'TREETRACKER-API-KEY' : 'u1duqPKX4qct4DLzjgy7CkPkeyv1w0PV',
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
                    setToken(data);
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
                                        <h5 className="m-b-10">Liste des Tokens</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="#!">Liste des Tokens</a></li>
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
                                        
                                        <div className="card-block table-border-style">
                                            { error && <p> {error}</p> }
                                            { isPending && <p> Chargement ... </p> }
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th width="50%">Capture_id</th>
                                                            <th>Wallet_id</th>
                                                            <th>Cree le</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    { tokens &&
                                                    <>
                                                    {tokens.map((tok) =>
                                                        <tr>
                                                            <th scope="row">{ tok.id }</th>
                                                            <td>{ tok.capture_id }</td>
                                                            <td>{ tok.wallet_id }</td>
                                                            <td>{ tok.created_at }</td>
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
</section>
    );
};

export default Tokens;