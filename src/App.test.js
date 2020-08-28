import React from 'react';
import {shallow} from 'enzyme/build';
import ReactDOM from 'react-dom';
import App from './App';


it('mounts without crashing', () => {
  const wrapper = shallow(<App />);
  wrapper.unmount()
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});