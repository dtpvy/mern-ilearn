import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Course from '../Course';
import './ListCourses.scss';

function ListCourses(props) {
  const { courses } = props;
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate(`/courses/${id}`);
  }

  return (
    <div className="listcourses">
      {courses.map((course, index) =>
        <div
          key={index}
          className="listcourses__row"
          onClick={() => handleOnClick(course._id)}
        >
          <Course
            view="row"

            title={course.title}
            date={course.updatedAt}
            description={course.description}
            author={course.author.username}

            hashtags={course.hashtags}
            comment={course.comments.length}
            saved={{
              active: course.saved.find(id => id === user._id),
              length: course.saved.length
            }}

          />
        </div>
      )}
    </div>
  );
}

export default ListCourses;