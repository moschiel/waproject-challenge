import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import './SimpleModal.scss';

export default function SimpleModal(props) {
  const body = (
    <div className="modal">
      <h2 id="simple-modal-title">{props.title}</h2>
      <div className='modal-buttons'>
        <button onClick={ props.onClickBtn1 }>{ props.nameBtn1 }</button>
        <button onClick={ props.onClickBtn2 }>{ props.nameBtn2 }</button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        disableBackdropClick={false}
        onClose={props.onClose}
      >
        {body}
      </Modal>
    </div>
  );
}
