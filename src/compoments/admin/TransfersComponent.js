import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';

const TransfersComponent = () => {
  const token = JSON.parse(localStorage.getItem('tokens'));
  // const [url, setUrl] = useState("/wallets?limit=10");

  const initialValue = { bundle: { bundle_size: "" }, sender_wallet: "", receiver_wallet: "" };
  const [formValues, setFormValues] = useState(initialValue);

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

  const doTransfer = (e) => {
    e.preventDefault();
    console.log(formValues);
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
                        <form class="form-inline" onSubmit={doTransfer}>
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