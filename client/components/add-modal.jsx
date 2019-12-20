import React from 'react';

export default class AddModal extends React.Component {
  render() {
    return (
      <div className="modal fade" id="addmodal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Successfully Added Items</h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                data-dismiss='modal'>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss='modal'
                onClick={() => this.props.history.push('/cart')}>View Cart
              </button>
              <button
                type="button"
                className="btn btn-warning ml-2"
                data-dismiss='modal'
                onClick={() => this.props.history.push('/')}>Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
