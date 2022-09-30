import React, { useRef } from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';

const TransfersComponent = () => {
  const token = JSON.parse(localStorage.getItem('tokens'));
  // const [url, setUrl] = useState("/wallets?limit=10");

  const initialValue = { bundle: { bundle_size: "" }, sender_wallet: "", receiver_wallet: "" };
  const [formValues, setFormValues] = useState(initialValue);
  const tokenTab = [];
  const inputRef = useRef("");
  const multipleTokenInitialValue = { tokens: [], sender_wallet: "", receiver_wallet: "" };
  const [multipleFormValues, setMultipleFormValues] = useState(multipleTokenInitialValue);

  const handleChangeBundle = (e) => {
    const { value } = e.target;
    formValues['bundle'] = { bundle_size: value };
  }

  const handleChangeSender = (e) => {
    const { value } = e.target;
    formValues['sender_wallet'] = value;
  }

  const handleChangeReceiver = (e) => {
    const { value } = e.target;
    formValues['receiver_wallet'] = value;
  }

  const doTransferSingle = (e) => {
    e.preventDefault();
    console.log(formValues);
  }

  const addToList = (e) => {
    e.preventDefault();
    tokenTab.push(inputRef.current.value);
    inputRef.current.value = "";
  }

  const handleChangeMultipleSender = (e) => {
    const { value } = e.target;
    multipleFormValues["sender_wallet"] = value;
  }

  const handleChangeMultipleReceiver = (e) => {
    const { value } = e.target;
    multipleFormValues["receiver_wallet"] = value;
  }

  const doTransferMultiple = (e) => {
    e.preventDefault();
    multipleFormValues["tokens"] = tokenTab;
    console.log(multipleFormValues);
  }

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
                      <h5 className="m-b-10">Transfers</h5>
                    </div>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="../wallets"><i className="feather icon-home"></i></Link></li>
                      <li className="breadcrumb-item"><a href="#!">Transférer des tokens</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="main-body">
              <div class="page-wrapper">
                {/*<!-- [ Main Content ] start -->*/}
                <div class="row">
                  {/*<!-- [ tabs ] start -->*/}
                  <div class="col-sm-12">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">
                        <a class="nav-link active text-uppercase" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Unique</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link text-uppercase" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Multiple</a>
                      </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                      <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <form class="form-inline" onSubmit={doTransferSingle}>
                          <div class="form-group mb-2">
                            <label for="staticEmail2" class="mr-2 sr-only">Sender Wallet</label>
                            <input type="text" class="form-control" id="staticEmail2" name="sender_wallet" onChange={handleChangeSender} placeholder="Sender" />
                          </div>
                          <div class="form-group ml-sm-3 mb-2">
                            <label for="inputPassword2" class="mr-2 sr-only">Receiver Wallet</label>
                            <input type="text" class="form-control" id="inputPassword2" name="receiver_wallet" onChange={handleChangeReceiver} placeholder="Receiver" />
                          </div>
                          <div class="form-group mx-sm-3 mb-2">
                            <label for="bundleNumber" class="sr-only">Number</label>
                            <input type="number" class="form-control" id="bundleNumber" name="bundle" onChange={handleChangeBundle} placeholder="Number" />
                          </div>
                          <button type="submit" class="btn btn-primary mb-2">Transferer</button>
                        </form>
                      </div>
                      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        {/* <div id="newList">
                          <p>{tokenTab.length}</p>
                          <ul>
                            {tokenTab.length !== 0 && <> {tokenTab.map((tokenUUID) =>
                              <li>{tokenUUID}</li>
                            )}</>}
                          </ul>
                        </div> */}
                        <div class="input-group mb-3">
                          <input type="text" class="form-control" ref={inputRef} value={inputRef.current.value} placeholder="Token UUID" name="uuid" aria-label="Token UUID" aria-describedby="basic-addon2" />
                          <div class="input-group-append">
                            <button class="btn btn-primary" type="submit" onClick={addToList}>Ajouter à la liste</button>
                          </div>
                        </div>
                        <form onSubmit={doTransferMultiple}>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputPassword1">Sender</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" name="sender" onChange={handleChangeMultipleSender} placeholder="Sender" />
                              </div>
                              <button type="submit" class="btn btn-primary">Transferer</button>
                            </div>
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="receiverInput">Receiver</label>
                                <input type="text" class="form-control" id="receiverInput" name="receiver" onChange={handleChangeMultipleReceiver} placeholder="Receiver" />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TransfersComponent;