import React from 'react';
import Grid from './../Grid/Grid';
import './GridContainer.css';

const GridContainer = props => (
  <div className="details-grid">
    {props.headers.map((header, index) => (
        <Grid
          hasMargin={props.headers.length - 1 === index ? false : true}
          header={header} 
          gridData={props.gridData[index]}
          key={index} />
      )
    )}
  </div>
)

export default GridContainer;