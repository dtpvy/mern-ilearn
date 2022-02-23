import React from 'react';
import PropTypes from 'prop-types';
import { BsFillBookmarkFill, BsFillChatSquareTextFill, BsFillHeartFill, BsStarFill, BsFillForwardFill } from "react-icons/bs";
import './Item.scss';
import Hashtag from 'components/Hashtag';
import { useNavigate } from 'react-router-dom';

function Item(props) {
  const { date, author, title, saved, hashtags, comment, rate, id, type } = props;
  const createdAt = new Date(date);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${type}/${id}`)
  }

  const handleSave = () => {
    console.log("save");
  }

  return (
    <div className="item">
      <h2 className="item__header">
        {`${createdAt.getDate()} ${createdAt.getMonth() + 1} ${createdAt.getFullYear()}`}
      </h2>
      <hr className="item__line"></hr>
      <div className="item__col">
        <div className="item__subtitle">
          {createdAt.toLocaleString()}
        </div>

        <div className="item__subtitle">
          Author: {author}
        </div>
      </div>

      <div onClick={handleClick} className="item__row item__title">
        {title}
      </div>

      <div className="item__row item__hashtags">
        {hashtags.map((hashtag, index) =>
          <Hashtag key={index + 1} text={hashtag} />
        )}
      </div>

      <div className="item__row">
        <div className="mr-3">
          <BsFillBookmarkFill onClick={handleSave} className={`item__icon ${(saved.active) ? "item__icon--active" : ""} `} />
          {saved.length}
        </div>

        {rate ?
          <div className="mr-3">
            <BsStarFill />
            {rate}
          </div>
          : <></>
        }

        <div className="mx-2">
          <BsFillChatSquareTextFill className="item__icon" />
          {comment}
        </div>

      </div>
    </div>
  );
}

export default Item;