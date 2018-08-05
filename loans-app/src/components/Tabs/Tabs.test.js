import React from 'react';
import { shallow, mount } from 'enzyme';
import Tabs from './Tabs';

const TabList = ['Loan Application', 'Loan Repayment'];

describe('Tabs', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Tabs tabList={TabList} />);
    expect(wrapper).toMatchSnapshot();
  })
});

test('TabsComponent calls handleClick when Tab is clicked', () => {
  const handleClick = jest.fn();
  const wrapper = mount(
    <Tabs tabList={TabList} onTabChange={handleClick} /> 
  );
  const rightTab = wrapper.find('.right-tab');
  rightTab.simulate('click');
  expect(handleClick).toBeCalledWith(1);
});