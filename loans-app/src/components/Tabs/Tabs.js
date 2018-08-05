import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {

  handleClick(tabIndex) {
    this.props.onTabChange(tabIndex);
  }

  render() {
    return (
      <div className="tabs-container">
        {this.props.tabList.map((tab, index) => {
          return (
            <div 
              className={`tab-btn ${index === this.props.currentTab ? 'is-selected' : ''} ${index === 0 ? 'left-tab': 'right-tab'}`} 
              onClick={() => this.handleClick(index)} 
              key={index}>
              {tab}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Tabs;