import Grid from './Grid';
import React from 'react';
import { mount, shallow } from 'enzyme';

const header = 'Loan Amount';
const gridData = {
  data: 10000,
  is_money: true
};

describe('Grid', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Grid header={header} gridData={gridData} />);
    expect(wrapper).toMatchSnapshot();
  })
})

test('GridComponent renders correct text inside it', () => {
  const wrapper = mount(
    <Grid header={header} gridData={gridData} />
  );
  const headerDiv = wrapper.find('.header');
  expect(headerDiv.text()).toBe('Loan Amount');

  const mainDiv = wrapper.find('.main');
  expect(mainDiv.text()).toBe('$10,000.00');
})