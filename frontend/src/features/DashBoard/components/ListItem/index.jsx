import { unwrapResult } from '@reduxjs/toolkit';
import Loading from 'components/Loading';
import { dashboard } from 'features/Course/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { BsStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item';
import './ListItem.scss';


function ListItem(props) {
  const { type, title } = props;
  const dispatch = useDispatch();
  const [items, setItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector(state => state.auth);

  const caclRate = (arr) => {
    const total = arr.reduce((sum, element) => {
      return sum + element.rate;
    });
    return total / arr.length;
  }

  const fetchData = useCallback(async () => {
    const actionResult = await dispatch(dashboard());
    const currentUser = unwrapResult(actionResult);

    setItems(currentUser.items);;
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="listitem">
          <h1 className="listitem__title">{title}</h1>

          <div className="listitem__row my-3">
            <hr className="listitem__line"></hr>
            <BsStarFill />
            <hr className="listitem__line"></hr>
          </div>

          <div className="listitem__row">
            {items.map((item, index) =>
              <div
                key={index}
                className="listitem__col"
              >

                <Item
                  id={item._id}
                  type={type}

                  date={item.createdAt}
                  author={item.author.displayName}
                  title={item.title}
                  hashtags={item.hashtags}

                  comment={item.comments.length}
                  rate={(type === 'courses' && item.comments.length) ? caclRate(item.comments) : 0}
                  saved={{
                    active: item.saved.find(id => id === user._id),
                    length: item.saved.length
                  }}
                />
              </div>
            )}

          </div>

        </div>
      )
      }
    </>
  );
}

export default ListItem;