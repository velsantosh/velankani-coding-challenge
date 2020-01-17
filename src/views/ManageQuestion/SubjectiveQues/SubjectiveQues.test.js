import React from 'react';
import ReactDOM from 'react-dom';
import SubjectiveQues from './SubjectiveQues';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SubjectiveQues />, div);
  ReactDOM.unmountComponentAtNode(div);
});
