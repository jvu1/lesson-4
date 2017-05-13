import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './PastryList.css'

class PastryList extends React.Component {
  render () {
    const { pastries, basket } = this.props
    return (
    	<div>
	      <ul className='pastry-list'>
	        {Object.keys(pastries).map(key => {
	          const pastry = pastries[key]
	          return <li key={key}>
	            <Link to={`/${pastry.name}`}>{pastry.name}</Link>
	          </li>
	        })}
	      </ul>
		    <ul className='pastry-list'>
			    {Object.keys(basket.items).map(key => {
				    const pastry = basket.items[key]
				    return <li key={key}>
					    <Link to={`/${pastry.name}`}>{pastry.name}</Link>
					    <Link to={`/${pastry.quantity}`}>{pastry.quantity}</Link>
				    </li>
			    })}
		    </ul>
	    </div>
    )
  }
}

PastryList.propTypes = {
	pastries: PropTypes.object.isRequired,
	basket: PropTypes.object.isRequired
}

export default PastryList
