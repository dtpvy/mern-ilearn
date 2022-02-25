import { unwrapResult } from '@reduxjs/toolkit';
import DetailsItem from 'components/DetailsItem';
import CourseForm from 'features/Course/components/CourseForm';
import { addCourse, editCourse, showOne } from 'features/Course/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'reactstrap';
import './AddEditPage.scss';

function AddEditPage() {
  const { id } = useParams();
  const isAddMode = !id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [view, setView] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    hashtags: '',
    content: '',
    url: ''
  });

  const [newCourse, setNewCourse] = useState(initialValues);

  const handleChange = (value) => {
    setNewCourse({
      ...newCourse,
      [value.key]: value.value
    });
  }

  const handleView = () => {
    setView(!view);
    if (view) setInitialValues(newCourse);
  }

  const handleSubmit = async () => {
    let actionResult;
    const course = {
      ...newCourse,
      hashtags: newCourse.hashtags === '' ? [] : newCourse.hashtags.split(', ')
    }
    console.log("check add");
    if (isAddMode) {
      console.log("add");
      actionResult = await dispatch(addCourse(course));
    } else {
      actionResult = await dispatch(editCourse(course));
    }

    const currentCourse = unwrapResult(actionResult);
    navigate(`/courses/${currentCourse.courses._id}`);
  }

  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(showOne(id));
    const currentCourse = unwrapResult(actionResult);
    const { courses } = currentCourse;
    const init = {
      _id: courses._id,
      title: courses.title,
      description: courses.description,
      content: courses.content,
      url: courses.url,
      hashtags: courses.hashtags.join(', ')
    }

    setNewCourse(init);
    setInitialValues(init);
  }, [dispatch, id]);

  useEffect(() => {
    if (!isAddMode) fetchData();
  }, [fetchData, isAddMode]);

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
              onSubmit={handleSubmit}
              isAddMode={isAddMode}
            />
          </div>
        }

        {view &&
          <div className="addEditCourse__content">
            <DetailsItem
              item={{
                ...newCourse,
                hashtags: newCourse.hashtags === '' ? [] : newCourse.hashtags.split(', '),
                updatedAt: new Date()
              }}
              action={{ auth: false }}
            />
          </div>
        }
      </div>
    </div >
  );
}

export default AddEditPage;