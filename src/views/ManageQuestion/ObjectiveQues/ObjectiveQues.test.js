import React from 'react';
import ReactDOM from 'react-dom';
import ObjectiveQues from './ObjectiveQues';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ObjectiveQues />, div);
  ReactDOM.unmountComponentAtNode(div);
});