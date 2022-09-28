import React from 'react';
import { Link } from "react-router-dom"
import Slider from "./../slider/Slider"


const FicheSignalement = ({sig,images,loading}) => {
    console.log(images);
    return (
        <>
         <div className="pcoded-main-container">
        <div className="pcoded-wrapper">
            <div className="pcoded-content">
                <div className="pcoded-inner-content">
                    {/* <!-- [ breadcrumb ] start --> */}
                    <div className="page-header">
                        <div className="page-block">
                            <div className="row align-items-center">
                                <div className="col-md-12">
                                    <div className="page-header-title">
                                        <h5 className="m-b-10">Details Signalement</h5>
                                    </div>
                                    <ul className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/admin"><i className="feather icon-home"></i></Link></li>
                                        <li className="breadcrumb-item"><a href="javascript:">Fiche</a></li>
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
                                <div className="col-sm-12">
                                    { sig &&
                                    <div className="card">
                                        <div className="card-header">
                                            <h5>Region de { sig.region.nom }</h5>
                                            <br/>
                                            <br/>
                                            <b id="helpId" className="text-muted"><i className="feather icon-box"></i> {sig.type.nom } </b>
                                            <br/>
                                            <br/>
                                            <b id="helpId" className="text-muted"><i className="feather icon-calendar"></i> Le {sig.dateSignalement} </b>
                                            <br/>
                                            <br/>
                                            <b id="helpId" className="text-muted"><i className="feather icon-user"></i> { sig.utilisateur.username }</b>


                                        </div>
                                        <div className="card-block">
                                            <p>" {sig.description} "</p>
                                            <hr/>
                                            { loading && <p>Chargement des images...</p> }
                                            { images && 
                                                    <Slider data={images}/>
                                            }
                                        </div>

                                    </div>
                                    }
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            
        </>
    );
};

export default FicheSignalement;