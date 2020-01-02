import React from 'react';

export default class NotificationModal extends React.Component {
  render() {
    return (
      <div className="position-fixed h-100 w-100 d-flex overlay">
        <div className="m-auto p-3">
          <div className="bg-white rounded p-3 modal-message">
            <h5 className="text-center">Please read the following disclaimer before continuing:</h5>
            <p className="text-center">
              This application is a LIVE DEMO ONLY. There are no actual products for sale, nor are any transactions being processed. In addition, please do not provide any real personal information. All product images and descriptions are from a third party source. Please confirm acknowledgement of this disclaimer below. Thank you for your cooperation!
            </p>
            <div className="btn-group w-100">
              <button className="btn btn-danger w-100"
                onClick={() => this.props.stats(false)}>I Understand</button>
            </div>
          </div>
        </div>
      </div>
      // <div className="modal fade" id="notificationmodal">
      //   <div className="modal-dialog modal-dialog-centered">
      //     <div className="modal-content">
      //       <div className="modal-header">
      //         <h5 className="modal-title">
      //           Please read the following disclaimer before continuing:
      //         </h5>
      //         <button
      //           type="button"
      //           className="close"
      //           aria-label="Close"
      //           data-dismiss='modal'>
      //           <span aria-hidden="true">&times;</span>
      //         </button>
      //       </div>
      //       <div className="modal-body">
      //         This application is a LIVE DEMO ONLY. There are no actual products for sale, nor are any transactions being processed. In addition, please do not provide any real personal information. All product images and descriptions are from a third party source. Please confirm acknowledgement of this disclaimer below. Thank you for your cooperation!
      //       </div>
      //       <div className="modal-footer">
      //         <button
      //           type="button"
      //           className="btn btn-danger"
      //           data-dismiss='modal'>I Understand
      //         </button>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
