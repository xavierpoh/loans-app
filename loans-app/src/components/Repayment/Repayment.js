import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import GridContainer from './../GridContainer/GridContainer';
import './Repayment.css';

class Repayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repaymentDetails: null,
      isEnabled: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.showRepayment) {
      axios.get('http://demo3320252.mockable.io/1/repayment')
        .then(res => {
          this.setState({ repaymentDetails: res.data });
        })
        .catch(err => {
          console.log('error');
        })
    }
  }

  handleSubmit(e) {
    if(!!this.state.repaymentDetails.loan_balance) {
      const repaymentDetails = this.state.repaymentDetails;
      let newLoanBalance = this.state.repaymentDetails.loan_balance - this.state.repaymentDetails.weekly_repayment;
      repaymentDetails.loan_balance = newLoanBalance;
      let newRemainingTerm = this.state.repaymentDetails.remaining_term - 1;
      repaymentDetails.remaining_term = newRemainingTerm;
      
      this.setState({ repaymentDetails });
      axios.put('http://demo3320252.mockable.io/1/repayment', this.state.repaymentDetails)
        .then(res => {
          console.log('res', res);
        })
        .catch(err => {
          console.log('error', err);
        })
    } else {
      this.setState({ isEnabled: false });
    }
  }

  addComma(input) {
    return parseFloat(input).toLocaleString(undefined, {maximumFractionDigits:2});
  }

  render() {
    if (!this.props.showRepayment) {
      return (
        <div className="no-loans">You have no outstanding loans at the moment.</div>
      )
    } else if (this.state.repaymentDetails === null) {
      return (
        <div className="loader-container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="loading" />
        </div>
      )
    } else {
      const { loan_amount, loan_balance, weekly_repayment, remaining_term } = this.state.repaymentDetails;
      const Headers = ['Loan Amount', 'Outstanding Loan', 'Weekly Repayment', 'Remaining Term (Weeks)'];
      const GridData = [
        {data: loan_amount, is_money: true}, 
        {data: loan_balance, is_money: true}, 
        {data: weekly_repayment, is_money: true}, 
        {data: remaining_term, is_money: false}
      ];
      return (
        <div>
          <div className="repayment-text">
            <h2>Welcome back {this.state.repaymentDetails.username}.</h2>
            <h4>Details of your outstanding loans are shown below.</h4>
            <h4>Make your repayments easily with just a click of a button.</h4>
          </div>
          <GridContainer 
            gridData={GridData}
            headers={Headers}
          />
          <div className="repayment-btn-container">
            <Button className="repayment-btn" onClick={this.handleSubmit} disabled={!this.state.isEnabled}>Make repayment</Button>
          </div>
        </div>
      )
    }
  }
}

export default Repayment;