import React from 'react';
import Modal from '@material-ui/core/Modal';
import './SimpleModal.scss';

export default function SimpleModal(props) {
  let btn1 = <></>;
  let btn2 = <></>;

  //só aparece os botoes se for dado um nome
  if(props.nameBtn1)
    btn1 = <button onClick={ props.onClickBtn1 }>{ props.nameBtn1 }</button>;
  if(props.nameBtn2)
    btn2 = <button onClick={ props.onClickBtn2 }>{ props.nameBtn2 }</button>;

  const body = (
    <div className="modal">
      <h2 id="simple-modal-title">{props.title}</h2>
      <div className='modal-buttons'>
        {btn1}
        {btn2}
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
