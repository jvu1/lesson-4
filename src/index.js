import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route,
	hashHistory,
	Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import OrderPage from './components/BasketPage'
import NotFound from './components/NotFound'

// function getTotalPrice (pastries, totalPrice = 0) {
// 	return pastries.reduce((acc, p) => {
// 		return acc + p.price
// 	}, totalPrice)
// }

class Root extends React.Component {
	constructor() {
		super()
		this.state = {
			pastries,
			basket: {
				items: {},
				totalPrice: 0
			}
		}

		this.addToOrder = this.addToOrder.bind(this)
		this.removeFromOrder = this.removeFromOrder.bind(this)
		this.clearOrder = this.clearOrder.bind(this)
	}

	addToOrder(e) {
		e.preventDefault()

		const input = e.target.querySelector('input')
		const value = input.value
		const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
		const pastry = pastries.find(p => p.name === value)

		const exists = Object.keys(this.state.basket.items).some(p => p === pastry.name)
		const basket = Object.assign({}, this.state.basket)

		if (exists) {
			basket.items[pastry.name].quantity++
			basket.items[pastry.name].totalPrice = basket.items[pastry.name].price * basket.items[pastry.name].quantity
		} else {
			basket.items[pastry.name] = Object.assign({}, pastry, {quantity: 1}, {totalPrice: pastry.price})
		}

		basket.totalPrice = Object.keys(basket.items)
			.map(item => basket.items[item].totalPrice)
			.reduce((acc, price) => {
				return acc + price
			}, 0)

		this.setState({basket})
	}

	removeFromOrder(e) {
		e.preventDefault()
		const input = e.target.querySelector('input')
		const value = input.value

		const basket = Object.assign({}, this.state.basket)

		basket.items[value].quantity--
		basket.items[value].totalPrice -= basket.items[value].price

		if (basket.items[value].quantity === 0) {
			delete basket.items[value]
		}

		this.setState({basket})
	}

	clearOrder(e) {
		e.preventDefault()

		this.setState({
			basket: {
				items: {},
				totalPrice: 0
			}
		})
	}

	render() {
		return (
			<Router history={hashHistory}>
				<App>
					<Switch>
						<Route exact path='/' render={props => (
							<PastryList pastries={this.state.pastries}
							            basket={this.state.basket}/>
						)}/>
						<Route path='/basket' render={props => (
							<OrderPage basket={this.state.basket}
							           removeFromOrder={this.removeFromOrder}
							           clearOrder={this.clearOrder}/>
						)}/>
						<Route path='/:pastry' render={props => {
							const pastryName = props.match.params.pastry
							const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
							const pastry = pastries.find(p => p.name === pastryName)
							if (pastry) {
								return (
									<PastryPage pastry={pastry} addToOrder={this.addToOrder}/>
								)
							} else {
								return (
									<Route path='*' status={404} component={NotFound}/>
								)
							}
						}}/>
					</Switch>
				</App>
			</Router>
		)
	}
}

ReactDOM.render(
	<Root />,
	document.getElementById('root')
)
