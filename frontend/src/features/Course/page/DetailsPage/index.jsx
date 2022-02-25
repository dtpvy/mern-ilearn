import { unwrapResult } from '@reduxjs/toolkit';
import DetailsItem from 'components/DetailsItem';
import Loading from 'components/Loading';
import { showOne } from 'features/Course/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { BiBookmark } from "react-icons/bi";
import { BsChatText, BsFillBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCourse } from 'features/Course/CourseSlice';
import './DetailsPage.scss';

function DetailsPage(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [course, setCourse] = useState(undefined);
  const { user } = useSelector(state => state.auth);

  const handleClickEdit = () => {
    navigate(`/courses/${id}/edit`);
  }

  const handleClickDelete = async () => {
    const actionResult = await dispatch(deleteCourse(id));
    const res = unwrapResult(actionResult);
    alert(res.error ? 'Xóa thất bại!' : 'Xóa thành công! Bài viết đã chuyển vào thùng rác');
    navigate(`/courses`);
  }

  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(showOne(id));
    const currentCourse = unwrapResult(actionResult);

    setCourse(currentCourse.courses);
  }, [dispatch, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {course === undefined ?
        <Loading />
        :
        <div className="detailsCourse">
          <div className="detailsCourse__col">
            <h5>{course.author.displayName}</h5>
            <hr />
            <div className="detailsCourse__row">
              <div className="detailsCourse__icon">
                {course.saved.find(id => id === user._id) ?
                  <BsFillBookmarkFill color="#f2c63d" />
                  : <BiBookmark />}
                <div className="detailsCourse__icon--text">{course.saved.length}</div>
              </div>
              <div className="detailsCourse__icon">
                <BsChatText />
                <div className="detailsCourse__icon--text">{course.comments.length}</div>
              </div>
            </div>
          </div>
          <div className="detailsCourse__col detailsCourse__content">
            <DetailsItem
              item={course}
              action={course.author._id === user._id ?
                {
                  auth: true,
                  handleEdit: handleClickEdit,
                  handleDelete: handleClickDelete
                } :
                {
                  auth: false
                }
              }
            />
          </div>

          <div className="detailsCourse__col">
            <h5>{course.author.username}</h5>
            <hr />
          </div>
        </div>
      }
    </div>
  );
}

export default DetailsPage;