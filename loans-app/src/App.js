import React, { Component } from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Tabs from './components/Tabs/Tabs';
import LoanForm from './components/LoanForm/LoanForm';
import Repayment from './components/Repayment/Repayment';
import './App.css';

const TabList = ['Loan Application', 'Loan Repayment'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      hasLoan: false
    }

    this.changeTab = this.changeTab.bind(this);
    this.hasLoan = this.hasLoan.bind(this);
  }

  changeTab(tabIndex) {
    this.setState({ currentTab: tabIndex });
  }

  // using this method to toggle hasLoan state to true only after user submits loan application, since there is no backend
  // in reality, will get state from backend API based on user_id
  hasLoan() {
    this.setState({ hasLoan: true });
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <div className="container app-container">
          <Tabs onTabChange={this.changeTab} tabList={TabList} currentTab={this.state.currentTab} />
          {
            this.state.currentTab === 0 &&
            <LoanForm onApplication={this.hasLoan} />
          }
          {
            this.state.currentTab === 1 &&
            <Repayment 
              showRepayment={this.state.hasLoan}
            />
          }
        </div>
      </div>
    )
  }
}

export default App;
