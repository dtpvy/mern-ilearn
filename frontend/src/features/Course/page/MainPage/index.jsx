import { unwrapResult } from '@reduxjs/toolkit';
import { SORT_TYPE, SORT_TYPE_COURSES } from 'constants/globle';
import ListCourses from 'features/Course/components/ListCourses';
import GridCourses from 'features/Course/components/GridCourses';
import { show } from 'features/Course/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { BsGridFill, BsSearch, BsViewList } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import './MainPage.scss';

MainPage.propTypes = {

};

function MainPage(props) {
  const dispatch = useDispatch();
  const [type, setType] = useState(0);
  const [sort, setSort] = useState(0);
  const [view, setView] = useState('grid');
  const [focus, setFocus] = useState(false);
  const [courses, setCourses] = useState([]);
  const { hashtags } = useSelector(state => state.course);

  const handleChangeSortType = (value) => {
    setType(value);
  }

  const handleChangeSort = (value) => {
    setSort(value);
  }

  const handleChangeSearch = (value) => {
    console.log(value);
  }

  const handleFocusSearch = () => {
    setFocus(true);
  }

  const handleBlurSearch = () => {
    setFocus(false);
    console.log("blur");
  }

  const handleChangeView = (view) => {
    setView(view);
  }

  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(show(1, 1));
    const currentUser = unwrapResult(actionResult);

    setCourses(currentUser.courses);
  }, [dispatch]);

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
      <div className="container courses__hashtags courses__sort">
        <div className="courses__hashtag">
          hi
        </div>
        {hashtags.map((hashtag, index) =>
          <div key={index} className="courses__hashtag">
            {hashtag}
          </div>
        )}
      </div>
      <div className="container my-5">
        <div className="d-flex justify-content-between">
          <div>

          </div>

          <div className="courses__form-group">
            <div className="d-flex">
              <select className="courses__form" onChange={(e) => handleChangeSortType(e.target.value)}>
                {SORT_TYPE_COURSES.map((type) =>
                  <option key={type.key} value={type.key} > {type.value} </option>
                )}
              </select>

              <select className="courses__form" onChange={(e) => handleChangeSort(e.target.value)}>
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

        <div className="container my-5">
          {view == 'grid' ?
            <GridCourses courses={courses} />
            : <ListCourses courses={courses} />
          }

        </div>
      </div>
    </div>
  );
}

export default MainPage;