import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import moment from "moment";   
import baseURI from '../../utilitaire/baseURI';
import Pagination from '../../compoments/admin/Pagination';


const Tokens = () => {
        const [tokens, setToken] = useState(null);
        const [transaction, setTransaction] = useState(null);
        const [detail, setDetail] = useState(null);    
        const [isPending, setIsPending] = useState(true);
        const [error, setError] = useState(null); 
        const token = JSON.parse(localStorage.getItem('tokens'));
        const [url,setUrl] = useState("/tokens");
        const [isSubmit, setIsSubmit] = useState(true);
         // We start with an empty list of items.
        const [currentItems, setCurrentItems] = useState(1);
        const [pageCount, setPageCount] = useState(0);
        // Here we use item offsets; we could also use page offsets
        // following the API or data you're working with.
        const [itemOffset, setItemOffset] = useState(1);

        const GetTransaction = (id) => {
    
            gettransaction(id);
        }
        const GetDetail = (id) => {
            getdetail(id);
        }


        async function gettransaction(id){
            const abortCont = new AbortController();
            setTimeout(() => {
                fetch(baseURI(url+"/"+id+"/transactions?limit=10"),
                    {
                        method: 'GET',
                        headers:{
                            'Authorization': `Bearer ${token}`,
                            'Content-type': 'application/json',
                            'TREETRACKER-API-KEY' : 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
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
                    setTransaction(data.history);
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
        }

        async function getdetail(id){
            const abortCont = new AbortController();
            setTimeout(() => {
                fetch(baseURI(url+"/"+id),
                    {
                        method: 'GET',
                        headers:{
                            'Authorization': `Bearer ${token}`,
                            'Content-type': 'application/json',
                            'TREETRACKER-API-KEY' : 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
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
                    setDetail(data);
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
        }
        
        const handlePageClick = (event) => {
            const newOffset = (event.selected * 100);
            console.log(
              `User requested page number ${event.selected + 1}, which is offset ${newOffset+1}`
            );
            if(newOffset===0){
                setItemOffset(1);
            } else  setItemOffset(newOffset);
           
            setIsSubmit(true);
          };


        async function getbe(){
            const abortCont = new AbortController();
            setTimeout(() => {
                fetch(baseURI(url+"?limit=100&&start="+itemOffset),
                    {
                        method: 'GET',
                        headers:{
                            'Authorization': `Bearer ${token}`,
                            'Content-type': 'application/json',
                            'TREETRACKER-API-KEY' : 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
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
                    setToken(data.tokens);
                    setError(null);
                    setIsSubmit(false);
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
        }

        useEffect(() => {
            console.log(isSubmit);
            if(isSubmit){
                getbe();
            }
            
            }, [url])

        useEffect(() => {
            // Fetch items from another resources.
            console.log(`Loading items from ${itemOffset} `);
            setIsPending(true);
            getbe();
            // setCurrentItems(items.slice(itemOffset, endOffset));
            // setPageCount(Math.ceil(items.length / itemsPerPage));
            }, [itemOffset]);
            
         
        
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
                                        <h5 className="m-b-10">List of tokens</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="#!">List of tokens</a></li>
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
                                            { isPending && <p> Loading ... </p> }
                                            { !isPending &&  
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th width="50%">Capture_id</th>
                                                            <th>Wallet_id</th>
                                                            <th>Created on</th>
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
                                                            <td>{ moment(tok.created_at).utc().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                            <td><button style={{ "float": "right" }} type="button" className="btn btn-outline-dark" title="" data-toggle="modal" data-target="#exampleModal" onClick={() => 
                                                                        GetDetail(tok.id)
                                                                    }
                                                                data-original-title="Voir detail token">
                                                                 See details
                                                            </button></td>
                                                            <td><button style={{ "float": "right" }} type="button" className="btn btn-outline-dark" title="" data-toggle="modal" data-target="#transaction" onClick={() => 
                                                                        GetTransaction(tok.id)
                                                                    }
                                                                data-original-title="Voir transaction token">
                                                                 See transaction history
                                                            </button></td>
                                                            
                                                        </tr>
                                                    )}
                                                    </>
                                                    }
                                                    </tbody>
                                                    
                                                </table>
                                            </div>
                                            } 
                                            <Pagination pages={10000} change={handlePageClick}  ></Pagination> 
                                        
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- [ basic-table ] end --> */}
                                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Token details</h5>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div class="modal-body">
                                        
                                            <div class="col-lg-12">
                                               {detail!==null &&
                                                    <ul>
                                                    <li><i class="bi bi-rounded-right"></i> <dt>Id:</dt><dd>{ detail.id} </dd></li>
                                                    <li><i class="bi bi-rounded-right"></i> <dt>Capture_id:</dt><dd>{ detail.capture_id} </dd></li>
                                                    <li><i class="bi bi-rounded-right"></i> <dt>Wallet_id:</dt><dd>{ detail.wallet_id} </dd></li>
                                                    <li><i class="bi bi-rounded-right"></i> <dt>Created on:</dt><dd>{ moment(detail.created_at).utc().format('DD/MM/YYYY HH:mm:ss')} </dd></li>
                                                    <li><i class="bi bi-rounded-right"></i> <dt>Modified on:</dt><dd>{ moment(detail.updated_at).utc().format('DD/MM/YYYY HH:mm:ss')} </dd></li>
                                                
                                                </ul>
                                                }
                                           
                                            
                                                        
                                                        </div>

                                                    <div class="modal-footer">
                                                        <button type="submit" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                
                                                    </div>
                                            
                                            </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal fade" id="transaction" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Transaction history</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                    
                                        <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
            
                                <div>
                                    { error && <p> {error}</p> }
                                    { isPending && <p> Chargement ... </p> }
                                </div>
                                { transaction &&
                                                    <>
                                                    {transaction.map((tok) =>
                                        <div className="mt-12 col-md-12 col-xl-12">
                                            <div className="card card-social">
                                                <div className="card-block border-bottom">
                                                    <h6 className="mb-4"><i className="feather icon-map-pin text-c-green f-20 m-r-10"></i>Transaction</h6>
                                                    <div className="row d-flex align-items-center">
                                                        <div className="col-9">
                                                        <ul>
                                                        <li><i class="bi bi-rounded-right"></i> <dt>Processed on:</dt><dd>{moment(tok.processed_at).utc().format('DD/MM/YYYY HH:mm:ss')}</dd></li>
                                                        <li><i class="bi bi-rounded-right"></i> <dt>Sender_wallet:</dt><dd>{ tok.sender_wallet }</dd></li>
                                                        <li><i class="bi bi-rounded-right"></i> <dt>Receiver_wallet:</dt><dd>{ tok.receiver_wallet }</dd></li>      
                                                      </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-block">
                                                    <div className="row align-items-center justify-content-center card-active">
                                                        
                                        
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

                                                <div class="modal-footer">
                                                    <button type="submit" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            
                                                </div>
                                        
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>

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