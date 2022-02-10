import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import './Loading.scss';

function Loading(props) {
  return (
    <div className='loading'>
      <Spinner animation='border' variant='info' />
    </div>
  );
}

export default Loading;