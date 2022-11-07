import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';
import Pagination from '../../compoments/admin/Pagination';
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Wallet = () => {
    const initialValue = { wallet: "" };
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [wallets, setWallet] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(null);
    const token = JSON.parse(localStorage.getItem('tokens'));
    const [errorInsertion, setErrorInsertion] = useState(null);
    const [modif, setModif] = useState(null);
    const [url, setUrl] = useState("/wallets?limit=10"); 
    const [itemOffset, setItemOffset] = useState(1);




    const handleChange = (e) => {
        const { wallet, value } = e.target;
        console.log(value);
        formValues['wallet'] = value;
        verification(formValues);
    }






    const verification = (values) => {
        const errors = {};
        console.log("verification");
        console.log(values)
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}#/i;
        if (!values.wallet) {
            errors.wallet = "Veuillez donner le nom du wallet";
        }
        return errors;
    }


    const insertionWallet = (e) => {
        e.preventDefault();//empeche page de recharger
        console.log("vopotsitra");
        setFormErrors(verification(formValues));
        setIsSubmit(true);
    }


    async function insertion() {
        const options = {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                'TREETRACKER-API-KEY': 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
            },
        };
        setIsLoading(true);

        await fetch(baseURI('/wallets'), options).then(res => {
            if (!res.ok) { // error coming back from server
                throw Error('Erreur insertion !');
            }
            return res.json();
        }).then(data => {
            setIsLoading(false);
            console.log(data);
            setWallet([...wallets, data]);
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

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            setIsLoading(true);
            insertion();
            console.log("atoooooo pr");
            console.log(formValues);
            setWallet(wallets, formValues)
        }
    }, [formErrors])

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
                    setWallet(data.wallets);
                    setError(null);
                    setIsPending(false);
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
        getbe();
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
                                            <h5 className="m-b-10">Wallet</h5>
                                        </div>
                                        <ul className="breadcrumb">
                                            <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                            <li className="breadcrumb-item"><a href="#!">Wallet list</a></li>
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
                                                <h5>Wallet</h5>
                                                <button style={{ "float": "right" }} type="button" className="btn btn-outline-dark" title="" data-toggle="modal" data-target="#exampleModal"
                                                    data-original-title="Ajout nouveau type">
                                                    <i className="feather icon-plus"></i> Create new Wallet
                                                </button>
                                            </div>
                                            <div className="card-block table-border-style">
                                                {error && <p> {error}</p>}
                                                {isPending && <p> Loading ... </p>}
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th>id</th>
                                                                <th width="50%">Name</th>
                                                                <th>Number of tokens in the wallet</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {wallets &&
                                                                <>
                                                                    {wallets.map((wal) =>
                                                                        <tr>
                                                                            <th scope="row">{wal.id}</th>
                                                                            <td>{wal.name}</td>
                                                                            <td>{wal.tokens_in_wallet}</td>
                                                                        </tr>
                                                                    )}
                                                                </>
                                                            }
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </div>
                                            <Pagination pages={5} change={handlePageClick}  ></Pagination> 
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
                            <h5 className="modal-title" id="exampleModalLabel">Add a wallet</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={insertionWallet}>
                                <div class="form-group">
                                    <label for="recipient-name" class="col-form-label">Name:</label>
                                    <input type="text" class="form-control" id="type-name" name="wallet" value={formValues.name} onChange={handleChange} />
                                </div>
                                <p style={{ color: "red" }}>{formErrors.name}</p>

                                <div class="modal-footer">
        
                                    {!isLoading && <button type='submit' className="btn btn-primary shadow-2 mb-4">Validate</button>}
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

export default Wallet;