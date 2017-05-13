import React from 'react'
import PropTypes from 'prop-types'
import './PastryPage.css'

function formatPrice(priceInCents) {
	return `$${(priceInCents / 100).toFixed(2)}`
}

class PastryPage extends React.Component {
  render () {
    const { pastry } = this.props
    return (
      <div className='pastry-page'>
        <div className='pastry-container'>
          <div className='pastry-img-container'>
            <img src={pastry.image} alt={pastry.name} />
          </div>
          <div className='pastry-info'>
            <h5 className='name'>{pastry.name}</h5>
            <p className='description'>{pastry.description}</p>
            <div className='price'>{formatPrice(pastry.price)}</div>
          </div>
        </div>
        <form method='POST' action='/basket' className='add-to-order' onSubmit={this.props.addToOrder}>
          <input type='hidden' value={pastry.name} ref={(input) => { this.pastryName = input }} />
          <button type='submit'>Add to Order</button>
        </form>
      </div>
    )
  }
}

PastryPage.propTypes = {
	pastry: PropTypes.object.isRequired,
	addToOrder: PropTypes.func.isRequired
}

export default PastryPage
