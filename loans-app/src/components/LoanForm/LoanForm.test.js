import React from 'react';
import { shallow } from 'enzyme';
import LoanForm from './LoanForm';

describe('LoanForm', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<LoanForm />);
    expect(wrapper).toMatchSnapshot();
  })
})