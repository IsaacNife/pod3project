import React, {Component} from 'react';
import './BarShowContainer.scss';

class BarShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bar: {},
      reviews: []
    }
  }

  componentDidMount() {
    //we will implement ways to address ids that don't exist
    let pathArray = window.location.pathname.split('/');
    let barId = pathArray[pathArray.length-1];
    fetch(`/api/v1/bars/${barId}`)
    .then(response => {
      return response.json()
  })
    .then(bar => {
      this.setState( {bar: bar} )
      this.setState( {reviews: bar.reviews} )
    })
  }

  render() {
    let reviewsArray = this.state.reviews.map(review => {
      return(
        <div className="container">
          <div className="row">
            <div className="col-md-2 text-center">
              <img src={review.reviewerPic} alt="avatar pic" height="40" width="40"/>
              <p>{review.reviewerUsername}</p>
            </div>
            <div className="col-md-10 pg-vertical-line">
              <p>Rating: {review.rating} / 10</p>
              <textarea rows="4" cols="85" maxlength="1000" style={{border: `none`, resize: `none`}} readOnly>{review.comment}</textarea>
            </div>
          </div>
          <hr></hr>
        </div>
      )
    })

    return(
      <div>
        <div className="container pg-border">
          <div className="row">

            <div className="col-md-4">
              <img src="https://i.ytimg.com/vi/LObpA84ddL0/hqdefault.jpg" alt="Bar ambiance" height="240" width="280"/>
            </div>

            <div className="col-md-8 pg-vertical-line d-md-flex">  
              <div className="text-primary">
                <h2>{this.state.bar.barName}</h2>
                <p><strong>Location</strong><br></br> {this.state.bar.location}</p>
                <p><strong>Description</strong><br></br> {this.state.bar.description}</p>
                <p><strong>Near the beach</strong><br></br> {this.state.bar.hasBeach?"Yes":"No"}</p>
              </div>
              <button type="button" className="btn btn-info btn-md" data-toggle="modal" data-target="#myModal">Write a review</button>
            </div>

          </div>
        </div>

        <hr style={{borderTop: `2px solid maroon`}}></hr>
        <h2>Reviews</h2>
        <br></br>
        {reviewsArray}
      </div>
    )
  }
}

export default BarShowContainer;