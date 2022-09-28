import React from 'react';
import { useState } from 'react/cjs/react.development';

const AffectationModal = ({regions,signalement,isLoading,fonction,formValues,change}) => {

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Affecter ce signalement avec ID {signalement.id}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {/* <pre>{JSON.stringify(formValues,undefined)}</pre> */}
                <form onSubmit={fonction}>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Region:</label>
                        <select value={formValues.region} className="form-control" id="region-id" name="region" onChange={change} required>
                            <option value="">Selectionner une region</option>
                            {regions && regions.map((reg) => (<option value={reg.id+"/"+signalement.id}>{reg.nom}</option>))}
                        </select>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        { !isLoading && <button type='submit' className='btn btn-primary'>Valider</button> }
                        { isLoading && <button className='btn btn-secondary' type='button' disabled=''><span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Loading... </button>}
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AffectationModal;