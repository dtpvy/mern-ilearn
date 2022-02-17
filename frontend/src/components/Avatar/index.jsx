import UserImg from 'assets/img/user.png';
import React from 'react';
import './Avatar.scss';

function Avatar(props) {
  const { width } = props;
  return (
    <img className="avatar" width={width} height={width} src={UserImg} />
  );
}

export default Avatar;