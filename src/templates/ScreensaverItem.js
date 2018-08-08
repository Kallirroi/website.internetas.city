import React from 'react'

class ScreensaverItem extends React.Component {

render() {
	return (
	  	<div className="item" ><img role="presentation" src={'../'+this.props.paths} /></div>
	);
	}
}

export default ScreensaverItem