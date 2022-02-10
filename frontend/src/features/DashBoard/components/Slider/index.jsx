import { unwrapResult } from '@reduxjs/toolkit';
import Loading from 'components/Loading';
import { dashboard } from 'features/Course/CourseSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import Item from '../Item';
import './Slider.scss';


function Slider(props) {
  const { type, title } = props;
  const dispatch = useDispatch();
  const [items, setItems] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState([0, 1, 2, 3, 4, 5]);
  const { user } = useSelector(state => state.auth);

  const caclRate = (arr) => {
    const total = arr.reduce((sum, element) => {
      return sum + element.rate;
    });
    return total / arr.length;
  }

  const handleNext = () => {
    setSlide(slide.map(x => (x + 1) % slide.length));
  }

  const handlePrev = () => {
    setSlide(slide.map(x => (x - 1 + slide.length) % slide.length));
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
        <div className="slider">
          <h4 className="text-center">{title}</h4>
          <div className="slider__row">
            <div style={{ order: -1 }} className="slider__row" >
              <BsChevronDoubleLeft className="slider__button" onClick={handlePrev} />
            </div>

            <div style={{ order: slide.length }} className="slider__row">
              <BsChevronDoubleRight className="slider__button" onClick={handleNext} />
            </div>

            {items.map((item, index) =>
              <div
                key={index}
                style={{ order: slide[index] }}
                className={`slider__col ${(slide[index] > 2) ? 'slider__toggle--hide' : 'slider__toggle--show'}`}
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

export default Slider;