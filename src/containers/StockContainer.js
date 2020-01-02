import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    // debugger
    let stocks

    if(this.props.filter) {
      stocks = this.props.filtered
    } else if(this.props.priced) {
      // else caused problems, it has to be else if
      stocks = this.props.sortedByPrice
    } else if(this.props.alphad) {
      stocks = this.props.sortedByAlpha
    } else {
      stocks = this.props.stocks
    }

    return (
      <div>
        <h2>Stocks</h2>
        {stocks.map(stock => <Stock 
        key={stock.id} 
        stock={stock} 
        moveStock={this.props.buyStock} />)}
      </div>
    );
  }
}

export default StockContainer;
