import React from 'react';
import UserDetails from './UserDetails';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<UserDetails />);
});
