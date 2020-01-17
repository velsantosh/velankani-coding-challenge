import React from 'react';
import ReactDOM from 'react-dom';
import DefaultAside from '../RecruitDefaultAside';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DefaultAside />, div);
  ReactDOM.unmountComponentAtNode(div);
});
