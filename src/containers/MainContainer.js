import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor() {
    super() 
    this.state = {
      allStocks: [],
      filteredStocks: [],
      filtered: false,
      sortedByPrice: [],
      byPrice: false,
      sortedByAlpha: [],
      byAlpha: false,
      portfolio: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(resp => resp.json())
    // .then(data => console.log(data))
    // leaving console.log caused issues with setting state
    .then(stocksData => this.setState({allStocks: stocksData}))
  }

  buyStock = (stock) => {
    let updatedPortfolio = this.state.portfolio.slice()
    if(!updatedPortfolio.includes(stock)) {
      updatedPortfolio.push(stock)
      this.setState({portfolio: updatedPortfolio})
    }
  }

  // buyStock = (e) => {
  //   let value = e.target.value
  //   let updatedPortfolio = this.state.portfolio.slice()
  //   if(!updatedPortfolio.includes(value)) {
  //     updatedPortfolio.push(value)
  //     this.setState({portfolio: updatedPortfolio})
  //   }
  // }

  sellStock = (stock) => {
    let updatedPortfolio = this.state.portfolio.filter(s => s !== stock)
    this.setState({portfolio: updatedPortfolio})
  }

  filterStocks = (e) => {
    let value = e.target.value
    let stocks
    if(value === "All") {
      stocks = this.state.allStocks
    } else {
      stocks = this.state.allStocks.filter(stock => stock.type === value)
    }
    this.setState({filteredStocks: stocks, filtered: true, byAlpha: false, byPrice: false})
  }

  sortStocks = (e) => {
    let value = e.target.value
    switch(value) {
      case "Price":
        let byPrice = this.state.allStocks.sort((a, b) => a.price - b.price)
        this.setState({sortedByPrice: byPrice, byPrice: true, byAlpha: false, filter: false})
        break
      case "Alphabetically":
        let byAlpha = this.state.allStocks.sort((a, b) => a.ticker < b.ticker ? -1 : 1)
        this.setState({sortedByAlpha: byAlpha, byAlpha: true, byPrice: false, filter: false})
        break
      default:
        return this.state
    }
  }
  
  render() {
    // debugger 

    return (
      <div>
        <SearchBar
        filter={this.filterStocks}
        sort={this.sortStocks} 
        // filtered = {this.state.filteredStocks}
        // byPrice={this.state.sortedByPrice}
        // byAlpha={this.state.sortedByAlpha}
        priced={this.state.byPrice}
        alphad={this.state.byAlpha}
        filtered={this.state.filtered} />
          <div className="row">
            <div className="col-8">
              <StockContainer 
              stocks={this.state.allStocks}
              filtered={this.state.filteredStocks} 
              filter={this.state.filtered}
              alphad={this.state.byAlpha}
              priced={this.state.byPrice}
              sortedByPrice={this.state.sortedByPrice}
              sortedByAlpha={this.state.sortedByAlpha}
              buyStock={this.buyStock} />
            </div>
            <div className="col-4">
              <PortfolioContainer 
              stocks={this.state.allStocks} 
              portfolio={this.state.portfolio} 
              sellStock={this.sellStock} />
            </div>
          </div>
      </div>
    );
  }
}

export default MainContainer;
