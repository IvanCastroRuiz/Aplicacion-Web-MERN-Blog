import React, { Component } from 'react';

class ViewImage extends Component {
    render() {
        return (
            <div className="image-wrap">
                {
                    this.props.image !== null ? (
                        <img src={this.props.url+"get-image/"+this.props.image} alt={this.props.title} className="thumb" />
                    ) : (
                        <img src="https://www.definicionabc.com/wp-content/uploads/Paisaje-Natural.jpg" alt="paisajes" className="thumb" />
                    ) 
                }
            </div>
        );
    }
}

export default ViewImage;
