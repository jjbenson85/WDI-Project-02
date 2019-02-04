import React from 'react'

import {Link} from 'react-router-dom'

const PlacesCard = ({name, id, featured_image, cuisines,location, price_range, user_rating, fsa_rating}) => {

  featured_image = featured_image === '' ? `../../../assets/images/placeHolderImages/placeholder${(""+id).split('')[((""+id).length)-1]}.jpg` : featured_image

  return(
    <div className="card narrow">
      <Link to={`/places/${id}/${fsa_rating}`}>
        <div className="card-header">
          <h1 className="card-header-title title is-1">{name}</h1>
        </div>
        <div className="card-image">
          <figure className="image" style = { {backgroundImage: `url(${featured_image})`}} >
          </figure>
        </div>
        <hr className="hr"/>
        <div className="card-content">
          <div className="content">
            <div className="level">
              <h3 className='title is-3 level-item'>Hygiene Rating:</h3>
              <div className="fsa-rating-bar level-item" style={ {backgroundImage: `url("/assets/images/fsa-bar/fhrs_${fsa_rating}_en-gb.jpg")`}}></div>
            </div>
            <hr className="hr"/>
            <div className="level">
              <h4 className="level-item">{cuisines}</h4>
              <h4 className="level-item">|</h4>
              <h4 className="level-item">
                {(price_range===1)&& " £ "}
                {(price_range===2)&& " ££ "}
                {(price_range===3)&& " £££ "}
              </h4>
              <h4 className="level-item">|</h4>
              <h4 className="level-item">
                {(user_rating.aggregate_rating>=0)&& '⭐️'}
                {(user_rating.aggregate_rating>1)&& '⭐️'}
                {(user_rating.aggregate_rating>2)&& '⭐️'}
                {(user_rating.aggregate_rating>3)&& '⭐️'}
                {(user_rating.aggregate_rating>4)&& '⭐️'}
              </h4>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PlacesCard
