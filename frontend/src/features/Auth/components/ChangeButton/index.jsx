import React from 'react';
import { BsFillArrowLeftCircleFill, BsPlusCircleFill } from "react-icons/bs";
import './ChangeButton.scss';

function ChangeButton(props) {
  const { mode, onClick } = props;
  const styleName = mode === 'login' ? 'btn-auth--login' : 'btn-auth--register';
  return (
    <button onClick={onClick} className={`btn-auth ${styleName}`}>
      {mode === 'login' ?
        <div className="d-flex align-items-center">
          <BsFillArrowLeftCircleFill style={{ marginRight: 5 }} />
          Login
        </div> :
        <div className="d-flex align-items-center">
          Register
          <BsPlusCircleFill style={{ marginLeft: 5 }} />
        </div>}
    </button>
  );
}

export default ChangeButton;