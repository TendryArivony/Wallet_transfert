import React from 'react';

const ModifierType = ({type,update,error,isLoading,change}) => {
    return (
        <div className="modal fade" id="exampleModal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modification d'une type</h5>
                <button type="submit" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <pre>{JSON.stringify(type,undefined)}</pre>

                <form onSubmit={update}>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Nom:</label>
                        <input type="text" className="form-control" id="region-name" name="nom" value={type && type.nom} onChange={change}/>
                    </div>
                    <p style={{color: "red"}}>{error.nom}</p>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                        { !isLoading && <button type="submit" className="btn btn-primary">Modifier</button>}
                        { isLoading && <button className='btn btn-secondary' type='button' disabled=''><span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span></button>}
                    </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default ModifierType;