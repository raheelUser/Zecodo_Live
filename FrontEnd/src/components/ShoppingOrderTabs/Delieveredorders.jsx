import React from "react";
import Productimage from "../../Images/userimages/myshoppingorders/paymentpending/product.png";
import Productimage1 from "../../Images/userimages/myshoppingorders/paymentpending/product1.png";
import Reviewproduct from "../../Images/userimages/reviewsimages/reviewproduct.png";
import Cameraimage from "../../Images/userimages/reviewsimages/camera.png";
import Refund from './Refund'
import '../../assets/js/main'
const Deliveredorders = () => {
  return (
    <>
      <div className="paymentpending">
        <table id="paymentpending-table">
          <tr className="firstrow">
            <th>Item Details</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Order Status</th>
            <th>Payment Status</th>
            <th>Logistics Status</th>
            <th>Actions Available</th>
          </tr>

          <tr>
            <td>
              <div className="product-listing">
                <img src={Productimage} />
                <div className="product-info">
                  <h2>Order #ID: 15s5d8e1</h2>
                  <h3>
                    Adidas Originals Men's Stan Smith
                    <br /> Kris Andrew Pride Sneaker Cream US 7{" "}
                  </h3>
                  <p>Product ID#GX6394</p>
                </div>
              </div>
            </td>
            <td width="8%">$ 54.63</td>
            <td>1</td>
            <td>
              <a className="atwarehouse" href="#">
                <button style={{ backgroundColor: "#41FF54" }}>
                  Delivered to the customer
                </button>
              </a>
            </td>
            <td>
              <a className="pending" href="#">
                <button style={{ backgroundColor: "#41FF54" }}>Paid</button>
              </a>
            </td>
            <td>
              <a className="pending" href="#">
                <button style={{ backgroundColor: "#41FF54" }}>
                  Delivered
                </button>
              </a>
            </td>
            <td className="verify-order">
              <a href="#">
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#reviewProduct"
                  style={{ backgroundColor: "#F9B300", color: "#1E1E1E" }}
                >
                  Post a review
                </button>
              </a>
              <a href="#" className='modal-linksss'>
                <button
                  style={{
                    backgroundColor: "#fff",
                    color: "#D92C2C",
                    borderColor: "#D92C2C",
                    border: "1px solid",
                    marginTop: "10px",
                  }}
                >
                  Refund
                </button>
              </a>
            </td>
          </tr>
        </table>
      </div>

      {/* MY REFUND POPUP START */}
 {/* EDIT IT  */}
 <section id="my">
 <div id="refundpopup" class="custom-modal">
        <div class="custom-modal-dialog">
            <div class="custom-modal-content">
               <span class="close-modal">X</span>
                <div class="custom-modal-body">
                    <div class="custom-modal-inner">
                        <Refund />
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
{/* REFUND POPUP */}
      {/* MY REFUND POPUP END */}
      
      <div
        class="modal fade"
        id="reviewProduct"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog review-modal" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <div className="row">
                <div className="postareview">
                  <img src={Reviewproduct} />
                  <h2>
                    Tell us about what do you think about Nike <br /> Sketch
                    Stripe Yellow Jogs ?
                  </h2>

                  <h6>Rating </h6>
                  <div class="rate">
                    <input type="radio" id="star5" name="rate" value="5" />
                    <label for="star5" title="text">
                      5 stars
                    </label>
                    <input type="radio" id="star4" name="rate" value="4" />
                    <label for="star4" title="text">
                      4 stars
                    </label>
                    <input type="radio" id="star3" name="rate" value="3" />
                    <label for="star3" title="text">
                      3 stars
                    </label>
                    <input type="radio" id="star2" name="rate" value="2" />
                    <label for="star2" title="text">
                      2 stars
                    </label>
                    <input type="radio" id="star1" name="rate" value="1" />
                    <label for="star1" title="text">
                      1 star
                    </label>
                  </div>

                  <div className="contentfield">
                    <h6>Review Content</h6>
                    <textarea
                      type="textarea"
                      placeholder="Describe what you think about the product"
                    />
                  </div>
                  <div className="anonymous-reviews">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="ColorFilter3"
                        checked
                      />
                      <label class="form-check-label" for="ColorFilter3">
                        Anonymous Review
                      </label>
                    </div>
                  </div>
                  <div className="photos-upload-reviews">
                    <div class="upload__box">
                      <div class="upload__btn-box">
                        <label class="upload__btn">
                          <p>
                            <img src={Cameraimage} /> ADD PHOTOS (MAX. 5)
                          </p>
                          <input
                            type="file"
                            multiple
                            data-max_length="20"
                            class="upload__inputfile"
                          />
                        </label>
                      </div>
                      <div class="upload__img-wrap"></div>
                    </div>
                  </div>
                  <div className="save-review-button">
                    <a href="#">
                      <button type="submit">Save Review</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
};

export default Deliveredorders;
