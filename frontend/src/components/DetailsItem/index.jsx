import Avatar from 'components/Avatar';
import Hashtag from 'components/Hashtag';
import React from 'react';
import { BsPencilSquare, BsThreeDotsVertical, BsTrashFill } from "react-icons/bs";
import './DetailsItem.scss';

function DetailsItem(props) {
  const { item, action } = props;
  const date = new Date(item.updatedAt);

  return (
    <div className="details">
      <h1 className="details__title">
        {item.title}
      </h1>

      {item.author ?
        <div className="details__row">
          <Avatar width={50} />
          <div>
            <h6>
              {item.author.displayName}
            </h6>
            <div className="details__subtext">
              {date.toUTCString()}
            </div>
          </div>
          {action.auth &&
            <div className="details__menu">
              <BsThreeDotsVertical className="details__menu--icon" />
              <ul className="details__list">
                <li onClick={action.handleEdit} className="details__item">
                  <BsPencilSquare />
                  <div>Sửa bài viêt</div>
                </li>

                <li onClick={action.handleDelete} className="details__item">
                  <BsTrashFill />
                  <div>Xóa bài viêt</div>
                </li>
              </ul>
            </div>
          }
        </div>
        : <div className="details__row">
          <Avatar width={50} />
          <div>
            <h2 className="details__loading details__loading--short">
            </h2>
            <div className="details__loading details__loading--long">
            </div>
          </div>
        </div>
      }

      {item.hashtags &&
        <div div className="details__row my-3">
          {item.hashtags.map((hashtag, index) =>
            <Hashtag key={index} text={hashtag} />
          )}
        </div>
      }
      <div className="details__description" >
        {item.description}
      </div>

      <div className="details__content" dangerouslySetInnerHTML={{ __html: item.content }}>
      </div>
    </div >
  );
}

export default DetailsItem;