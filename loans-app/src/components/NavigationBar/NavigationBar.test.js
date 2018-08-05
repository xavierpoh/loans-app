import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NavigationBar />);
    expect(wrapper).toMatchSnapshot();
  })
})