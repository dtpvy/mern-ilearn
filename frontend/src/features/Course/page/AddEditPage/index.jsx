import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { showOne } from 'features/Course/CourseSlice';
import DetailsItem from 'components/DetailsItem';
import CourseForm from 'features/Course/components/CourseForm';
import { Button } from 'reactstrap';
import './AddEditPage.scss'

function AddEditPage(props) {
  const { id } = useParams();
  const isAddMode = !id;
  const dispatch = useDispatch();

  const [view, setView] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    hashtags: '',
    content: '',
    auth: {}
  });

  const [newCourse, setNewCourse] = useState(initialValues);
  const [course, setCourse] = useState({});

  const handleChange = (course) => {
    setNewCourse(course)
  }

  const handleView = () => {
    setView(!view)
  }

  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(showOne(id));
    const currentCourse = unwrapResult(actionResult);
    const { courses } = currentCourse;

    setInitialValues({
      title: courses.title,
      description: courses.description,
      content: courses.content,
      hashtags: courses.hashtags.join(', ')
    });

    setNewCourse({
      title: courses.title,
      description: courses.description,
      content: courses.content,
      hashtags: courses.hashtags.join(', ')
    });

    setCourse(courses);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="addEditCourse">
      <div className="container">
        <div className="addEditCourse__content">
          <div className="addEditCourse__row">
            <h3 className='my-0'>{isAddMode ? "Thêm khóa học" : "Sửa khóa học"}</h3>
            <Button
              color='success'
              onClick={handleView}
            >
              {!view ? "Xem bài viết" : "Quay lại"}
            </Button>
          </div>
        </div>
        {!view &&
          <div className="addEditCourse__content">
            <CourseForm
              initialValues={initialValues}
              handleValues={handleChange}
            />
          </div>
        }

        {view &&
          <div className="addEditCourse__content">
            <DetailsItem
              item={{
                ...newCourse,
                hashtags: newCourse.hashtags === '' ? [] : newCourse.hashtags.split(', '),
                author: course.author,
                updatedAt: new Date
              }}
              action={{
                auth: false
              }}
            />
          </div>
        }
      </div>

    </div >
  );
}

export default AddEditPage;