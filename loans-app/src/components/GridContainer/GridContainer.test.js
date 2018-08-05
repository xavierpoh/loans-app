import GridContainer from './GridContainer';
import React from 'react';
import { shallow } from 'enzyme';

const Headers = ['Loan Amount', 'Loan Balance', 'Weekly Repayment', 'Remaining Term (Weeks)'];
const GridData = [
  {data: '120', is_money: true}, 
  {data: '100', is_money: true}, 
  {data: '20', is_money: true}, 
  {data: '5', is_money: false}
];

describe('GridContainer', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<GridContainer headers={Headers} gridData={GridData} />);
    expect(wrapper).toMatchSnapshot();
  })
})