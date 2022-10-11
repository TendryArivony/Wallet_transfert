import React, { useRef } from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect, Alert } from 'react'; 
import baseURI from '../../utilitaire/baseURI';
import { Button } from "rsuite";
// Default CSS
import "rsuite/dist/rsuite.min.css";

const TransfersComponent = () => {
  const token = JSON.parse(localStorage.getItem('tokens'));
  // const [url, setUrl] = useState("/wallets?limit=10");

  const initialValue = { bundle: { bundle_size: "" }, sender_wallet: "", receiver_wallet: "" };
  const [formValues, setFormValues] = useState(initialValue);
  const tokenTab = [];
  const [tokenCsv, setTokenCsv] = useState(null);
  const inputRef = useRef("");
  const [erreur, setErreur] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorInsertion, setErrorInsertion] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const multipleTokenInitialValue = { tokens: [], sender_wallet: "", receiver_wallet: "" };
  const [multipleFormValues, setMultipleFormValues] = useState(multipleTokenInitialValue);
  const [CsvFormValues, setCsvFormValues] = useState(multipleTokenInitialValue);

  const [csvFile, setCsvFile] = useState();

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
    setFormErrors(verification(formValues));
    setIsPending(true);
    console.log(formValues);
  }

  const addToList = (e) => {
    e.preventDefault();
    tokenTab.push(inputRef.current.value);
    inputRef.current.value = "";
    console.log(tokenTab);
  }

  const verification = (values) => {
    const errors = {};
    console.log("verification");
    // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}#/i;
    if (!values.sender_wallet) {
        errors.sender_wallet = "Please give the sender wallet";
    }
    if (!values.receiver_wallet) {
      errors.receiver_wallet = "Please give the receiver wallet";
  }

    return errors;
}

  const handleChangeMultipleSender = (e) => {
    const { value } = e.target;
    multipleFormValues["sender_wallet"] = value;
  }

  const handleChangeMultipleReceiver = (e) => {
    const { value } = e.target;
    multipleFormValues["tokens"] = tokenTab;
    if (csvFile) submit();
    multipleFormValues["receiver_wallet"] = value;
  }

  const doTransferMultiple = (e) => {
    e.preventDefault();
    console.log(multipleFormValues);
  }

  const doTransferFile = (e) => {
    e.preventDefault();
    if (csvFile) submit();
    setFormErrors(verification(multipleFormValues));
    setIsSubmit(true);
    console.log(multipleFormValues);
  }
  

  async function insertionCSV(){
    const options ={
        method : 'POST',
        body: JSON.stringify(multipleFormValues),
        headers:{
            "Content-Type" : "application/json",
            "Accept" : "application/json",
            'TREETRACKER-API-KEY': 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
            "Authorization": `Bearer ${token}`
        },
    };
    setIsLoading(true);
  const response = await fetch(baseURI('/transfers'), options);
  if (response.ok) {
    console.log('Successful transfer');
    setIsLoading(false);
    alert('Successful transfer');

  }
  else {
      console.log(response);
      if (response.status === 401) console.log('401 pr');
      else if (response.status === 500) console.log('500 pr');
      else if (response.status === 400) console.log('400 pr'); 
      else if (response.status === 404) console.log('404 pr');
      setIsLoading(false);
  }
  const data = await response.json();
  if(data.message) alert(data.message);
  
  console.log(data);
  console.log(erreur);

}

async function insertionBundle(){
  const options ={
      method : 'POST',
      body: JSON.stringify(formValues),
      headers:{
          "Content-Type" : "application/json",
          "Accept" : "application/json",
          'TREETRACKER-API-KEY': 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
          "Authorization": `Bearer ${token}`
      },
  };
  setIsLoading(true);
const response = await fetch(baseURI('/transfers'), options);
if (response.ok) {
  console.log('Successful transfer');
  setIsLoading(false);
  alert('Successful transfer');

}
else {
    console.log(response);
    if (response.status === 401) console.log('401 pr');
    else if (response.status === 500) console.log('500 pr');
    else if (response.status === 400) console.log('400 pr'); 
    else if (response.status === 404) console.log('404 pr');
    setIsLoading(false);
}
const data = await response.json();
if(data.message) alert(data.message);

console.log(data);
console.log(erreur);

}

  function removeItemAll(arr, value) {
    var i = 0; 
    while (i < arr.length) {
      if (arr[i] === value) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
  }


  const processCSV = (str) => {
    const header = str.slice(0, str.indexOf('\n'));
    const rows = str.slice(str.indexOf('\n') + 1).replaceAll('"', '').replaceAll('\r','').split("\n");
    console.log(removeItemAll(rows,''));
    setTokenCsv(removeItemAll(rows,''));
    multipleFormValues["tokens"] =  removeItemAll(rows,'');
    }
   

  const submit = () => {
    const file = csvFile;
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = e.target.result;
      processCSV(text);
      multipleFormValues["tokens"] = tokenCsv;
    }
    reader.readAsText(file);
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      insertionCSV();
    }

}, [formErrors])
useEffect(() => {
  if (Object.keys(formErrors).length === 0 && isPending) {
    insertionBundle();
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
                      <h5 className="m-b-10">Transfers</h5>
                    </div>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="../wallets"><i className="feather icon-home"></i></Link></li>
                      <li className="breadcrumb-item"><a href="#!">Transfering tokens</a></li>
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
                        <a class="nav-link active text-uppercase" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Random</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link text-uppercase" id="csvfile-tab" data-toggle="tab" href="#csvfile" role="tab" aria-controls="csvfile" aria-selected="false">By CSV file</a>
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
                         
                          {!isLoading && <button type='submit' className="btn btn-primary shadow-2 mb-4">Transfer</button>}
                            {isLoading && <Button loading appearance="primary" 
                               className="btn btn-primary shadow-2 mb-4">Loading Button 2</Button>}

                        </form>
                        <p style={{ color: "red" }}>{formErrors.sender_wallet}</p>
                          <p style={{ color: "red" }}>{formErrors.receiver_wallet}</p>
                        <p style={{ color: "red" }}>{erreur}</p>  
                      </div>
                      <div class="tab-pane fade" id="csvfile" role="tabpanel" aria-labelledby="csvfile-tab">
                        <form class="form-inline" onSubmit={doTransferFile}>
                        <div class="form-group mx-sm-3 mb-2">
                            <label for="bundleNumber" class="sr-only">File</label>
                            <input type="file" class="form-control" id="csvFile"  onChange={e => { setCsvFile(e.target.files[0]) }} placeholder="File" />
                          </div>
                          <div class="form-group mb-2">
                            <label for="staticEmail2" class="mr-2 sr-only">Sender Wallet</label>
                            <input type="text" class="form-control" id="staticEmail2" name="sender_wallet" onChange={handleChangeMultipleSender} placeholder="Sender" />
                          </div>
                          <div class="form-group ml-sm-3 mb-2">
                            <label for="inputPassword2" class="mr-2 sr-only">Receiver Wallet</label>
                            <input type="text" class="form-control" id="inputPassword2" name="receiver_wallet" onChange={handleChangeMultipleReceiver} placeholder="Receiver" />
                          </div>

                         
                          {!isLoading && <button type='submit' className="btn btn-primary shadow-2 mb-4">Transfer</button>}
                            {isLoading &&  <Button loading appearance="primary" 
                               className="btn btn-primary shadow-2 mb-4">Loading Button 2</Button>}

                        </form>
                        <p style={{ color: "red" }}>{formErrors.sender_wallet}</p>
                        <p style={{ color: "red" }}>{formErrors.receiver_wallet}</p>
                        <p style={{ color: "red" }}>{erreur}</p>  
                  
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
                          <input type="text" class="form-control" ref={inputRef} placeholder="Token UUID" name="uuid" aria-label="Token UUID" aria-describedby="basic-addon2" />
                          <div class="input-group-append">
                            <button class="btn btn-primary" type="submit" onClick={addToList}>Add to the list</button>
                          </div>
                          {tokenTab &&
                            <>
                              {tokenTab.map((tok) =>



                                <div className="card-block">
                                  <ul>
                                    <li><i class="bi bi-rounded-right"></i> <dd>{tok}</dd></li>

                                  </ul>
                                </div>


                              )}
                            </>
                          }
                        </div>
                        <form onSubmit={doTransferMultiple}>
                          <div class="row">
                            <div class="col-md-6">
                              <div class="form-group">
                                <label for="exampleInputPassword1">Sender</label>
                                <input type="text" class="form-control" id="exampleInputPassword1" name="sender" onChange={handleChangeMultipleSender} placeholder="Sender" />
                              </div>
                              <button type="submit" class="btn btn-primary">Transfer</button>
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