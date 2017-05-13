import React from 'react'
import PropTypes from 'prop-types'

class SubmitButton extends React.Component {
	render() {
		const {value, action, method, text} = this.props

		return (
			<div>
				<form method='POST' action={action} onSubmit={method}>
					<input type='hidden' value={value} ref={(input) => { this.pastryName = input }} />
					<button type='submit'>{text}</button>
				</form>
			</div>
		)
	}
}

SubmitButton.propTypes = {
	value: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	method: PropTypes.func,
	text: PropTypes.string.isRequired
}

export default SubmitButton