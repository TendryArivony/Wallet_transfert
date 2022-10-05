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

  // async function getdetail(id) {
  //   const abortCont = new AbortController();
  //   setTimeout(() => {
  //     fetch(baseURI(url + "/" + id),
  //       {
  //         method: 'GET',
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'Content-type': 'application/json',
  //           'TREETRACKER-API-KEY': 'ybvrLbs5iCRRx9Jul5naIStisG3qjIXT',
  //         }
  //       }
  //     )
  //       .then(res => {
  //         if (!res.ok) { // error coming back from server
  //           throw Error('could not fetch the data for that resource');
  //         }
  //         return res.json();
  //       })
  //       .then(data => {
  //         setIsPending(false);
  //         setDetail(data);
  //         setError(null);
  //       })
  //       .catch(err => {
  //         if (err.name === 'AbortError') {
  //           console.log('fetch aborted')
  //         } else {
  //           // auto catches network / connection error
  //           setIsPending(false);
  //           setError(err.message);
  //         }
  //       })
  //   }, 10);

  //   // abort the fetch
  //   return () => abortCont.abort();
  // }

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(baseURI(url + "?limit=5"),
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
                                      <td><button style={{ "float": "right" }} type="button" className="btn btn-outline-dark" title="" data-toggle="modal" data-target="#exampleModal" data-original-title="Voir detail token">
                                        Voir detail
                                      </button></td>
                                      <td><button style={{ "float": "right" }} type="button" className="btn btn-outline-dark" title="" data-toggle="modal" data-target="#transaction" data-original-title="Voir transaction token">
                                        Voir historique de transaction
                                      </button></td>
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
                  {/* <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Details du token</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="col-lg-6">
                            {detail !== null &&
                              <ul>
                                <li><i class="bi bi-rounded-right"></i> <dt>Id:</dt><dd>{detail.id} </dd></li>
                                <li><i class="bi bi-rounded-right"></i> <dt>Capture_id:</dt><dd>{detail.capture_id} </dd></li>
                                <li><i class="bi bi-rounded-right"></i> <dt>Wallet_id:</dt><dd>{detail.wallet_id} </dd></li>
                                <li><i class="bi bi-rounded-right"></i> <dt>Cree le:</dt><dd>{detail.created_at} </dd></li>
                                <li><i class="bi bi-rounded-right"></i> <dt>Modifie le:</dt><dd>{detail.updated_at} </dd></li>
                              </ul>
                            }
                          </div>
                          <div class="modal-footer">
                            <button type="submit" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="modal fade" id="transaction" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">Historiques des transaction</h5>
                          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div className="page-header">
                            <div className="page-block">
                              <div className="row align-items-center">
                                <div>
                                  {error && <p> {error}</p>}
                                  {isPending && <p> Chargement ... </p>}
                                </div>
                                {transaction &&
                                  <>
                                    {transaction.map((tok) =>
                                      <div className="mt-12 col-md-12 col-xl-12">
                                        <div className="card card-social">
                                          <div className="card-block border-bottom">
                                            <h6 className="mb-4"><i className="feather icon-map-pin text-c-green f-20 m-r-10"></i>Transaction</h6>
                                            <div className="row d-flex align-items-center">
                                              <div className="col-9">
                                                <ul>
                                                  <li><i class="bi bi-rounded-right"></i> <dt>Traitée le::</dt><dd>{tok.processed_at}</dd></li>
                                                  <li><i class="bi bi-rounded-right"></i> <dt>Sender_wallet:</dt><dd>{tok.sender_wallet}</dd></li>
                                                  <li><i class="bi bi-rounded-right"></i> <dt>Receiver_wallet:</dt><dd>{tok.receiver_wallet}</dd></li>
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
                            <button type="submit" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
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