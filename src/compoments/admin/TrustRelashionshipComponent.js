import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';
import moment from "moment";  
import Pagination from '../../compoments/admin/Pagination';
import { Button } from "rsuite"; 

const TrustRelashionship = () => {
    const [trusts, setTrust] = useState(null);
    const initialValue = { trust_request_type: "", requester_wallet: "" ,requestee_wallet: "" };
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false); 
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('tokens'));
    console.log(token);
    const [errorInsertion, setErrorInsertion] = useState(null);
    const [modif, setModif] = useState(null);
    const [url, setUrl] = useState("/trust_relationships?limit=10");
    const [itemOffset, setItemOffset] = useState(1); 


    const handleChangerequest_type = (e) => {
        const { value } = e.target;
        formValues['trust_request_type'] =  value;
        verification(formValues);
      }
    
      const handleChangeRequester = (e) => {
        const { value } = e.target;
        formValues['requester_wallet'] = value;
        verification(formValues);
      }
    
      const handleChangeRequestee = (e) => {
        const { value } = e.target;
        formValues['requestee_wallet'] = value;
        verification(formValues);
      }

      const CreateTrust = (e) => {
        e.preventDefault();
        setFormErrors(verification(formValues));
        console.log(formValues);
      }

      const handlePageClick = (event) => {
        const newOffset = (event.selected * 10);
        console.log(
          `User requested page number ${event.selected + 1}, which is offset ${newOffset+1}`
        );
        if(newOffset===0){
            setItemOffset(1);
        } else  setItemOffset(newOffset);
       
        setIsSubmit(true);
      };

    const verification = (values) => {
        const errors = {};
        console.log("verification");
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}#/i;
        if (!values.trust_request_type) {
            errors.trust_request_type = "Veuillez donner le trust request type";
        }
        if (!values.requester_wallet) {
            errors.requester_wallet = "Veuillez donner le requester wallet";
        }
        if (!values.requestee_wallet) {
            errors.requestee_wallet = "Veuillez donner le requestee wallet";
        }
        return errors;
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
        
        await fetch(baseURI('/trust_relationships'),options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur insertion !');
            } 
            return res.json();
        }).then(data => {
            setIsLoading(false);
            console.log(data);
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
    async function getbe(){
        const abortCont = new AbortController();
        setTimeout(() => {
            fetch(baseURI(url+"&&start="+itemOffset),
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-type': 'application/json',
                        'TREETRACKER-API-KEY': 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
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
                    setIsPending(false);
                    setTrust(data.trust_relationships);
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

    useEffect(() => {
        getbe()
    }, [url])

    useEffect(() => {
        // Fetch items from another resources.
        console.log(`Loading items from ${itemOffset} `);
        setIsPending(true);
        getbe();
        // setCurrentItems(items.slice(itemOffset, endOffset));
        // setPageCount(Math.ceil(items.length / itemsPerPage));
        }, [itemOffset]);
    
        useEffect(() => {
            if (Object.keys(formErrors).length === 0 && isLoading) {
              insertion();
            }
          
          }, [formErrors])
    

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
                                            <h5 className="m-b-10">Trust Relationship</h5>
                                        </div>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                            <li className="breadcrumb-item"><a href="#!">Trust relationship list</a></li>
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
                                                <h5>Trust relationship</h5>
                                                <button style={{ "float": "right" }} type="button" className="btn btn-outline-dark" title="" data-toggle="modal" data-target="#exampleModal"
                                                    data-original-title="Ajout nouveau type">
                                                    <i className="feather icon-plus"></i> Request a new trust relationship
                                                </button>
                                            </div>
                                            <div className="card-block table-border-style">
                                                {error && <p> {error}</p>}
                                                {isPending && <p> Loading ... </p>}
                                                { !isPending &&  
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Type</th>
                                                                <th >Request type</th>
                                                                <th>State</th>
                                                                <th>Created at</th>
                                                                <th>Updated at</th>
                                                                <th>Originating wallet</th>
                                                                <th>Actor Wallet</th>
                                                                <th>Target Wallet</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {trusts &&
                                                                <>
                                                                    {trusts.map((tru) =>
                                                                        <tr>
                                                                            <th scope="row">{tru.type}</th>
                                                                            <td>{tru.request_type}</td>
                                                                            <td>{tru.state}</td>
                                                                            <td>{moment(tru.created_at).utc().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                                            <td>{moment(tru.updated_at).utc().format('DD/MM/YYYY HH:mm:ss')}</td>
                                                                            <td>{tru.originating_wallet}</td>
                                                                            <td>{tru.actor_wallet}</td>
                                                                            <td>{tru.target_wallet}</td>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            }
                                                        </tbody>

                                                    </table>
                                                </div>
                                                }
                                                <Pagination pages={10} change={handlePageClick}  ></Pagination>
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
                            <h5 className="modal-title" id="exampleModalLabel">New trust relationship</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={CreateTrust}>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Trust request type:</label>
                                    <input type="text" class="form-control" id="type-name" name="trust_request_type"  onChange={handleChangerequest_type} />
                                </div>
                                <p style={{ color: "red" }}>{formErrors.trust_request_type}</p>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Requester wallet:</label>
                                    <input type="text" class="form-control" id="type-name" name="requester_wallet"  onChange={handleChangeRequester} />
                                </div>
                                <p style={{ color: "red" }}>{formErrors.requester_wallet}</p>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Requestee wallet:</label>
                                    <input type="text" class="form-control" id="type-name" name="requestee_wallet" onChange={handleChangeRequestee} />
                                </div>
                                <p style={{ color: "red" }}>{formErrors.requestee_wallet}</p>

                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    {!isLoading && <button type='submit' className="btn btn-primary">Validate</button>}
                                     {isLoading && <Button loading appearance="primary" 
                                    className="btn btn-primary shadow-2 mb-4">Loading Button 2</Button>}
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustRelashionship;