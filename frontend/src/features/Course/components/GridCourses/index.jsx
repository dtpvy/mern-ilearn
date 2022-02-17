import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Course from '../Course';
import './GridCourses.scss';

function GridCourses(props) {
  const { courses } = props;
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate(`/courses/${id}`);
  }

  return (
    <div className="gridcourses">
      {courses.map((course, index) =>
        <div
          key={index}
          className="gridcourses__col"
          onClick={() => handleOnClick(course._id)}
        >
          <Course
            view="col"

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

export default GridCourses;