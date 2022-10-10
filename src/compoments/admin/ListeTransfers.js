import React from 'react';
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react';
import baseURI from '../../utilitaire/baseURI';


const ListeTransfers = () => {
  const [transfers, setTransfers] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(localStorage.getItem('tokens'));
  const [url, setUrl] = useState("/transfers");

  const stringify = (state) => {
    if (state === true) {
      return "Yes";
    } else {
      return "No";
    }
  }
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(baseURI(url + "?limit=10"),
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
          setIsPending(false);
          setTransfers(data.transfers);
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
                      <h5 className="m-b-10">Transfers</h5>
                    </div>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item"><Link to="../wallets"><i className="feather icon-home"></i></Link></li>
                      <li className="breadcrumb-item"><a href="#!">Transfers List</a></li>
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
                        {error && <p> {error}</p>}
                        {isPending && <p> Chargement ... </p>}
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Id</th>
                                <th>Type</th>
                                <th>State</th>
                                <th>Active</th>
                                <th>Claim</th>
                                <th>Originating Wallet</th>
                                <th>Source Wallet</th>
                                <th>Destination Wallet</th>
                              </tr>
                            </thead>
                            <tbody>
                              {transfers &&
                                <>
                                  {transfers.map((transfer) =>
                                    <tr>
                                      <th scope="row">{transfer.id}</th>
                                      <td>{transfer.type}</td>
                                      <td>{transfer.state}</td>
                                      <td>{stringify(transfer.active)}</td>
                                      <td>{stringify(transfer.claim)}</td>
                                      <td>{transfer.originating_wallet}</td>
                                      <td>{transfer.source_wallet}</td>
                                      <td>{transfer.destination_wallet}</td>
                                     
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

export default ListeTransfers;