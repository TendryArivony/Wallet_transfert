import React from 'react';
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';
import { Button } from "rsuite";
// Default CSS
import "rsuite/dist/rsuite.min.css"; 

const Login = () => {

    const initialValue = { wallet: "", password: "" };
    const [formValues, setFormValues] = useState(initialValue);
    const [formErrors, setFormErrors] = useState({});
    const [loginErrors, setLoginErrors] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function login() {
        const headers = new Headers();
        headers.append('Content-type', 'application/json');

        const options = {
            method: 'POST',
            body: JSON.stringify(formValues),
            headers: {
                'TREETRACKER-API-KEY': 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
                'Content-type': 'application/json',
            }
        };
        setIsLoading(true);

        await fetch(baseURI('/auth'), options).then(res => {

            if (res.ok) return res.json();
            else {
                console.log(res);
                if (res.status === 404) throw Error('Wallet not found !');
                else if (res.status === 500) throw Error('Internal Server Error !');
                else if (res.status === 401) throw Error('Please check your password !');
            }
        }).then(data => {
            setIsLoading(false);
            localStorage.setItem('tokens', JSON.stringify(data.token));
            window.location.href = "wallets";
        })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsLoading(false);
                    setLoginErrors(err.message);
                }
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        verification(formValues);
    }

    const closeError = (e) => {
        setLoginErrors("");
    }

    const validerLogin = (e) => {
        e.preventDefault();//empeche page de recharger
        setFormErrors(verification(formValues));
        setIsSubmit(true);
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            login();
        }
    }, [formErrors])

    const verification = (values) => {
        const errors = {};
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}#/i;
        if (!values.wallet) {
            errors.wallet = "Veuillez entrer le nom du wallet";
        } else {
            setFormErrors({ ...formErrors, username: "" });
        }
        if (!values.password) {
            errors.password = "Veuillez entrer votre mot de passe";
        } else setFormErrors({ ...formErrors, password: "" });

        return errors;
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r"></span>
                    <span className="r s"></span>
                    <span className="r s"></span>
                    <span className="r"></span>
                </div>
                <div className="card">
                    {/* <pre>{JSON.stringify(formErrors,undefined)}</pre> */}
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-unlock auth-icon"></i>
                        </div>
                        <form onSubmit={validerLogin}>
                            <h3 className="mb-4">Login</h3>
                            {loginErrors.length > 0 &&
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>{loginErrors}</strong>
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeError}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            }

                            <div className="input-group mb-3">
                                <input type="text" name="wallet" className="form-control" placeholder="Nom du wallet" value={formValues.username} onChange={handleChange} />
                            </div>
                            <p style={{ color: "red" }}>{formErrors.username}</p>
                            <div className="input-group mb-4">
                                <input type="password" name="password" className="form-control" placeholder="password" value={formValues.password} onChange={handleChange} />
                            </div>
                            <p style={{ color: "red" }}>{formErrors.password}</p>

                            {!isLoading && <button className="btn btn-primary shadow-2 mb-4">Login</button>}
                            {isLoading &&  <Button loading appearance="primary" 
                               className="btn btn-primary shadow-2 mb-4">Loading Button 2</Button>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;