import React from 'react';
import PropTypes from 'prop-types';
import './Hashtag.scss';

function Hashtag({ text }) {
  return (
    <div className="hashtag">
      {text}
    </div>
  );
}

export default Hashtag;