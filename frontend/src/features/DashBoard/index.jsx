import React from 'react';
import { Button } from 'reactstrap';
import Slider from './components/Slider';
import './DashBoard.scss';
import ListItem from './components/ListItem';

Dashboard.propTypes = {

};

function Dashboard(props) {
  return (
    <div className="dashboard">
      <div className="dashboard--intro">
        <div className="dashboard__container">
          <div className="dashboard__content dashboard__content--description">
            <h1>iLearn - Cùng nhau học, cùng nhau phát triển</h1>
            <h5>"Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning" - Albert Einstein</h5>
            <Button color='warning'>Read me</Button>
          </div>

          <div className="dashboard__content dashboard__content--list">
            <div className='mb-3'>
              <Slider type="courses" title="Khóa học mới nhất" />
            </div>

            <div>
              <Slider type="courses" title="Bài viết mới nhất" />
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard--courses">
        <div className="dashboard__container">
          <div className="container dashboard--animation">
            <ListItem type="courses" title="Khóa học mới nhất" />
          </div>
        </div>
      </div>

      <div className="dashboard--posts">
        <div className="dashboard__container">
          <div className="container dashboard--animation">
            <ListItem type="courses" title="Bài viết mới nhất" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;