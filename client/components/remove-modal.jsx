import React from 'react';

export default class RemoveModal extends React.Component {
  render() {
    return (
      <div className="modal fade" id="removemodal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Are you sure you want to remove this item from your cart?
              </h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                data-dismiss='modal'>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss='modal'>Remove
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                data-dismiss='modal'>Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
