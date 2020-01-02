import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.stocks.map(stock =>  {
          if (this.props.portfolio.includes(stock)) {
            return <Stock stock={stock} moveStock={this.props.sellStock} />
          } else {
            return null
          }
        })}
      </div>
    );
  }
}

export default PortfolioContainer;
