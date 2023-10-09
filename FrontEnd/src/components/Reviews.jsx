import React from 'react'
import reviewstar from '../Images/star.png'
const Reviews = () => {
  return (
   <>
   <section id='reviews'>
    <div className='averge'>
        <h3>Average Customer Rating</h3>

        <table className='table' width="20%">
        <tbody>
    <tr>
      <th scope="row">Overall :</th>
      <td><div class="rate">
    <input type="radio" id="star5" name="rate" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" value="1" />
    <label for="star1" title="text">1 star</label>
  </div></td>
      <td>3/5</td>
     
    </tr>
    </tbody>
        </table>
    </div>

    <div className='averge'>
        <h3>Most Helpful favorable review</h3>
        </div>

        <div className='customers-reviews'>
            <div className='review-list-1'>
                <div className='review-star d-flex'>
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                </div>
                <h4 className='title'>Superman@(33). <span className='date'>month ago</span></h4>
                <p className='desc'>Love them! The sneakers are true to size, super comfortable and 
                don't need any breaking in! I love how soft the material on the 
                shoes are as well.</p>
            </div>

            <div className='review-list-1'>
                <div className='review-star d-flex'>
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                </div>
                <h4 className='title'>Superman@(33). <span className='date'>month ago</span></h4>
                <p className='desc'>Love them! The sneakers are true to size, super comfortable and 
                don't need any breaking in! I love how soft the material on the 
                shoes are as well.</p>
            </div>

            <div className='review-list-1'>
                <div className='review-star d-flex'>
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                </div>
                <h4 className='title'>Superman@(33). <span className='date'>month ago</span></h4>
                <p className='desc'>Love them! The sneakers are true to size, super comfortable and 
                don't need any breaking in! I love how soft the material on the 
                shoes are as well.</p>
            </div>

            <div className='review-list-1'>
                <div className='review-star d-flex'>
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                    <img src={reviewstar} />
                </div>
                <h4 className='title'>Superman@(33). <span className='date'>month ago</span></h4>
                <p className='desc'>Love them! The sneakers are true to size, super comfortable and 
                don't need any breaking in! I love how soft the material on the 
                shoes are as well.</p>
            </div>
        </div>
   </section>
   </>
  )
}

export default Reviews