import { unwrapResult } from '@reduxjs/toolkit';
import { SORT_KEY_COURSES, SORT_TYPE } from 'constants/globle';
import GridCourses from 'features/Course/components/GridCourses';
import ListCourses from 'features/Course/components/ListCourses';
import { show } from 'features/Course/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { BsGridFill, BsSearch, BsViewList } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import './MainPage.scss';

function MainPage() {
  const dispatch = useDispatch();
  const [type, setType] = useState('desc');
  const [key, setKey] = useState(0);
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [focus, setFocus] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleChangeType = (value) => {
    setType(value);
  }

  const handleChangeKey = (value) => {
    setKey(value);
  }

  const handleChangeSearch = (value) => {
    setSearch(value);
  }

  const handleFocusSearch = () => {
    setFocus(true);
  }

  const handleBlurSearch = () => {
    setFocus(false);
  }

  const handleChangeView = (view) => {
    setView(view);
  }

  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(show({ type, key, search }));
    const currentCourse = unwrapResult(actionResult);

    setCourses(currentCourse.courses);
  }, [dispatch, key, type, search]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="courses">
      <div className={`courses__search ${focus ? "courses__search--focus" : ""}`}>
        <label htmlFor="courses-search" className="courses__icon">
          <BsSearch />
        </label>
        <input
          id="courses-search"
          type="text"
          className="courses__form courses__form--search"
          onChange={(e) => handleChangeSearch(e.target.value)}
          placeholder="Search"
          onFocus={handleFocusSearch}
          onBlur={handleBlurSearch}
        />
      </div>

      <div className="container my-5">
        <div className="d-flex justify-content-between">
          <div>

          </div>

          <div className="courses__form-group">
            <div className="d-flex">
              <select className="courses__form" onChange={(e) => handleChangeKey(e.target.value)}>
                {SORT_KEY_COURSES.map((type) =>
                  <option key={type.key} value={type.key} > {type.value} </option>
                )}
              </select>

              <select className="courses__form" onChange={(e) => handleChangeType(e.target.value)}>
                {SORT_TYPE.map((type) =>
                  <option key={type.key} value={type.key} > {type.value} </option>
                )}
              </select>
              <button
                onClick={() => handleChangeView('grid')}
                className={`courses__button 
                  ${(view === 'grid') ? "courses__button--active" : ""}`}
              >
                <BsGridFill />
              </button>
              <button
                onClick={() => handleChangeView('list')}
                className={`courses__button 
                ${(view === 'list') ? "courses__button--active" : ""}`}
              >
                <BsViewList />
              </button>
            </div>
          </div>
        </div>

        <div className="my-5">
          {view === 'grid' ?
            <GridCourses courses={courses} />
            : <ListCourses courses={courses} />
          }

        </div>
      </div>
    </div>
  );
}

export default MainPage;