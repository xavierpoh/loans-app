import React from 'react';
import './Grid.css';

const Grid = (props) => {

  function addComma(input) {
    if(input === '') {
      return '0.00';
    }
    return parseFloat(input).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  return (
    <div className={`repayment-detail ${props.hasMargin ? 'with-margin' : ''}`}>
      <div className="header">{props.header}</div>
      <div className="main">{`${props.gridData.is_money ? '$' : ''}${props.gridData.is_money? addComma(props.gridData.data) : props.gridData.data}`}</div>
    </div>
  )
}

export default Grid;