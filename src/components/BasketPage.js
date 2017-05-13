import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './PastryList.css'

function formatPrice(priceInCents) {
	return `$${(priceInCents / 100).toFixed(2)}`
}

class BasketList extends React.Component {
	render () {
		const { basket } = this.props

		if (Object.keys(basket.items).length > 0) {
			return (
				<div>
					<table>
						<thead>
						<tr>
							<th>Pastry Name</th>
							<th>Total Price</th>
							<th>Total Quantity</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						{Object.keys(basket.items).map(key => {
							const pastry = basket.items[key]
							return (
								<tr key={pastry.name}>
									<td><Link to={`/${pastry.name}`}>{pastry.name}</Link></td>
									<td>{formatPrice(pastry.totalPrice)}</td>
									<td>{pastry.quantity}</td>
									<td>
										<form method='POST' action='/basket' className='add-to-order' onSubmit={this.props.removeFromOrder}>
											<input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
											<button type='submit'>Remove</button>
										</form>
									</td>
								</tr>
							)
						})}
						</tbody>
						<tfoot>
						<tr>
							<td>Sub-total</td>
							<td>{formatPrice(basket.totalPrice)}</td>
						</tr>
						</tfoot>
					</table>
					<form method='POST' action='/basket' className='add-to-order' onSubmit={this.props.clearOrder}>
						<input type='hidden' value='clear'/>
						<button type='submit'>Clear Order</button>
					</form>
				</div>
			)
		} else {
			return (
				<p>You have not added anything to your basket yet!</p>
			)
		}
	}
}

BasketList.propTypes = {
	basket: PropTypes.object.isRequired,
	removeFromOrder: PropTypes.func.isRequired,
	clearOrder: PropTypes.func.isRequired
}

export default BasketList
