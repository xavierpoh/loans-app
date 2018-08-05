import React, { Component } from 'react';
import axios from 'axios';
import { FormGroup, FormControl, HelpBlock, ControlLabel, Row, Col, Button } from 'react-bootstrap';
import GridContainer from './../GridContainer/GridContainer';
import './LoanForm.css';

class LoanForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loanData: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        loanPurpose: 'Business loan',
        loanTerm: '12',
        loanAmount: '',
        weeklyRepayment: '0',
        totalRepayment: '0',
      },
      isLoading: false,
      showSuccessMsg: false,
      successOrErrorMsg: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
  }

  componentDidMount() {
    // prevent user from keying in negative values for loan amount
    let loanAmountInput = document.getElementById('number');
    loanAmountInput.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8)) {
          return false;
      }
    };
  }

  handleChange(e) {
    const multiplierWithInterest = 1.1;
    const loanData = this.state.loanData;
    loanData[e.target.name] = e.target.value;
    
    if(e.target.name === 'loanAmount') {
      let totalRepayment = (e.target.value * multiplierWithInterest).toFixed(2);
      loanData.totalRepayment = totalRepayment;
      let weeklyRepayment = (totalRepayment / this.state.loanData.loanTerm).toFixed(2);
      loanData.weeklyRepayment = weeklyRepayment;
    } else if (e.target.name === 'loanTerm') {
      let weeklyRepayment = (this.state.loanData.totalRepayment / e.target.value).toFixed(2);
      loanData.weeklyRepayment = weeklyRepayment;
    }
    this.setState({ loanData });
  }


  handleSubmit(e) {
    this.setState({ isLoading: true });
    e.preventDefault();
    const loanData = {
      loan_data: this.state.loanData
    }
    axios.post('http://demo3320252.mockable.io/loans', loanData)
      .then((res) => {
        this.props.onApplication();
        this.setState({ 
          isLoading: false,
          showSuccessMsg: true,
          successOrErrorMsg: res.data.success_msg
        });
      })
      .catch(err => {
        this.setState({ 
          isLoading: false,
          showSuccessMsg: true,
          successOrErrorMsg: 'Sorry, there was an error in processing your application. Please try again.'
        });
      })
  }

  validateLoanAmount() {
    return (this.state.loanData.loanAmount.length && this.state.loanData.loanAmount > 0) ? true : false;
  }
  validateEmail() {
    const EmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EmailRegex.test(this.state.loanData.email);
  }

  canBeSubmitted() {
    const { firstName, lastName, phoneNumber, email, loanPurpose, loanTerm, loanAmount } = this.state.loanData;
    return (
      firstName.length > 0 && lastName.length > 0 && phoneNumber.length > 0 && this.validateEmail() && loanPurpose.length > 0 && loanTerm.length > 0 && this.validateLoanAmount()
    );
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    const { firstName, lastName, phoneNumber, email, loanPurpose, loanTerm, loanAmount, totalRepayment, weeklyRepayment } = this.state.loanData;
    const Headers = ['Principal Repayment', 'Interest', 'Total Repayment', 'Weekly Repayment'];
    const GridData = [
      {data: loanAmount, is_money: true}, 
      {data: (totalRepayment - loanAmount), is_money: true}, 
      {data: totalRepayment, is_money: true}, 
      {data: weeklyRepayment, is_money: true}
    ];
    return (
      <div>
        <div className={`loan-text success-msg ${this.state.showSuccessMsg ? 'unhide' : 'invisible'}`}>
          {this.state.successOrErrorMsg}
        </div>
        <div className={`${this.state.showSuccessMsg ? 'invisible' : 'unhide'}`}>
          <div className="loan-text">
            <h2>Same day approval.</h2>
            <h4>Apply now to grow your business.</h4>
          </div>
          <form className="show-grid" onSubmit={this.handleSubmit}>
            <div className="personal-details">
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>First Name</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Please enter your first name"
                      name="firstName"
                      value={firstName}
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Last Name</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Please enter your last name"
                      name="lastName"
                      value={lastName}
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <div className="contact">
              <Row>
                <Col md={6}>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Phone Number</ControlLabel>
                    <FormControl
                      type="number"
                      min="0"
                      placeholder="Please include country code, for e.g., 6512345678"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Please enter your email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <div className="loan-details">
              <Row>
                <Col md={6}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Loan Purpose</ControlLabel>
                    <FormControl 
                      componentClass="select" 
                      placeholder="business"
                      name="loanPurpose"
                      value={loanPurpose}
                      onChange={this.handleChange}
                    >
                      <option value="business">Business loan</option>
                      <option value="personal">Personal loan</option>
                      <option value="advance">Advance against an invoice</option>
                      <option value="funds">Funds to start my business</option>
                      <option value="other">Other</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Loan Term</ControlLabel>
                    <FormControl 
                      componentClass="select" 
                      placeholder="short"
                      name="loanTerm"
                      value={loanTerm}
                      onChange={this.handleChange}
                    >
                      <option value="12">12 weeks</option>
                      <option value="24">24 weeks</option>
                      <option value="48">48 weeks</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Loan Amount</ControlLabel>
                    <FormControl
                      id="number"
                      type="number"
                      min="0"
                      placeholder="Please enter loan amount in SGD"
                      name="loanAmount"
                      value={loanAmount}
                      onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <GridContainer 
              gridData={GridData}
              headers={Headers}
            />

            <div className="loan-btn-container">
              <Button className="loan-btn" type="submit" value="Submit" disabled={!isEnabled || this.state.isLoading}>{this.state.isLoading ? 'Application in Progress...' : 'Apply Now'}</Button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoanForm;