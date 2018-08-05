import React from 'react';
import { shallow } from 'enzyme';
import Repayment from './Repayment';

describe('Repayment', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Repayment />);
    expect(wrapper).toMatchSnapshot();
  })
})