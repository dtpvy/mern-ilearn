import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddEditPage from './page/AddEditPage';
import DetailsPage from './page/DetailsPage';
import MainPage from './page/MainPage';

function Course(props) {
  return (
    <div>
      <Routes>
        <Route path='/add' element={<AddEditPage />} />
        <Route path='/:id/edit' element={<AddEditPage />} />
        <Route path='/:id' element={<DetailsPage />} />
        <Route path='/' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default Course;