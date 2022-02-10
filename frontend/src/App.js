import Loading from 'components/Loading';
import Course from 'features/Course';
import Dashboard from 'features/DashBoard';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

const Auth = React.lazy(() => import('features/Auth'));
const ProtectedRoute = React.lazy(() => import('components/ProtectedRoute'));

function App() {

  return (
    <div className="App">
      <Suspense fallback={<Loading />} >
        <BrowserRouter>
          <Routes>
            <Route path='/courses/*' element={
              <ProtectedRoute component={<Course />} />
            } />

            <Route path='/posts/*' element={
              <ProtectedRoute component={<Course />} />
            } />

            <Route path='/notes/*' element={
              <ProtectedRoute component={<Course />} />
            } />

            <Route path='/:username/*' element={
              <ProtectedRoute component={<Course />} />
            } />

            <Route path='/' element={
              <ProtectedRoute component={<Dashboard />} />
            } />
            <Route path='/*' element={<Auth />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
