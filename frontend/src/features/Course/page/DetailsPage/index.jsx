import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

DetailsPage.propTypes = {

};

function DetailsPage(props) {
  const { id } = useParams()
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export default DetailsPage;