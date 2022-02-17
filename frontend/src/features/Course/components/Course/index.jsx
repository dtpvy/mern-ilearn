import Hashtag from 'components/Hashtag';
import React from 'react';
import './Course.scss';
import { BsFillBookmarkFill, BsChatLeftTextFill } from "react-icons/bs";
import BackgroundCourse from 'assets/img/backgroundcourse.jpg';
import { courses } from 'features/DashBoard/DashboardSlice';

function Course(props) {
  const { view, title, date, description, hashtags, comment, saved, author } = props
  const updatedAt = new Date(date);

  return (
    <div className={`course course--${view}`}>
      <div className="course__img">
        <img width={(view === 'col') ? "100%" : 200} src={BackgroundCourse} />
        <div className="course__icons course_row">
          <div className={`course__icon ${saved.active ? "course__icon--active" : ""}`} >
            <BsFillBookmarkFill />
            <div className="course__title mx-1">{saved.length}</div>
          </div>
          <div className="course__icon" >
            <BsChatLeftTextFill />
            <div className="course__title mx-1">{comment}</div>
          </div>
        </div>
      </div>
      <div className={`course__content--${view}`}>
        <h5 className="course__header" >
          {title}
        </h5>
        <div className="course__date">
          {updatedAt.toUTCString()}
        </div>
        <div className="course__description">
          {description}
        </div>

        <div>
          <div className="course__title">Hashtags</div>
          <div className="course__row">
            {hashtags.map((hashtag, index) =>
              <div className="course__hashtag" key={index} >
                {hashtag}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="course__title">Author</div>
          <div>
            {author}
          </div>
        </div>
      </div >
    </div >
  );
}

export default Course;