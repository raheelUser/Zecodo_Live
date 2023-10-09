import React from "react";
import Dhlimage from "../../Images/Shipping/dhl.png";
import Workingdays from "../../Images/Shipping/workingdays.png";
import Dhlstatusimage from '../../Images/Shipping/dhlstatus.png'
import Subscribesignup from '../../components/Shipping/singup'
const Typesofdelivery = () => {
  return (
    <>
      <div className="container">
        <div className="typesofdelivery">
          <table>
            <tr className="theading">
              <th>Types of Delivery</th>
              <th>Shipping Time</th>
              <th>Billing Method</th>
              <th>Item Limit</th>
              <th>Range of Declared Value</th>
              <th>Estimated Shipping Fee</th>
              <th></th>
            </tr>
            <tbody>
              <tr>
                <td>
                  <div className="type">
                    <img src={Dhlimage} />
                    <h5>
                      DHL Economy Line DZ <br />
                      Used 34042 times
                    </h5>
                  </div>
                </td>
                <td>
                  <img src={Workingdays} />
                </td>
                <td>
                  <h5>It is charged based on the actual weight</h5>
                </td>
                <td>
                  One side≤ 60 cm length+width+height≤ 90 cm Weight Limit0-2 kg
                </td>
                <td>USD 0-140</td>
                <td className="price">US $46.67</td>
                <td>
                  <a href="#">
                    <button>Order </button>
                  </a>
                  <a href="#">
                    <button style={{backgroundColor:"#fff", color:"#000", boxShadow: "0px 1px 12px 0px #00000014"}}>View Details </button>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="type">
                    <img src={Dhlimage} />
                    <h5>
                      DHL Economy Line DZ <br />
                      Used 34042 times
                    </h5>
                  </div>
                </td>
                <td>
                  <img src={Workingdays} />
                </td>
                <td>
                  <h5>It is charged based on the actual weight</h5>
                </td>
                <td>
                  One side≤ 60 cm length+width+height≤ 90 cm Weight Limit0-2 kg
                </td>
                <td>USD 0-140</td>
                <td className="price">US $46.67</td>
                <td>
                  <a href="#">
                    <button>Order </button>
                  </a>
                  <a href="#">
                    <button style={{backgroundColor:"#fff", color:"#000", boxShadow: "0px 1px 12px 0px #00000014"}}>View Details </button>
                  </a>
                </td>
              </tr>

              <tr>
                <td>
                  <div className="type">
                    <img src={Dhlimage} />
                    <h5>
                      DHL Economy Line DZ <br />
                      Used 34042 times
                    </h5>
                  </div>
                </td>
                <td>
                  <img src={Workingdays} />
                </td>
                <td>
                  <h5>It is charged based on the actual weight</h5>
                </td>
                <td>
                  One side≤ 60 cm length+width+height≤ 90 cm Weight Limit0-2 kg
                </td>
                <td>USD 0-140</td>
                <td className="price">US $46.67</td>
                <td>
                  <a href="#">
                    <button>Order </button>
                  </a>
                  <a href="#">
                    <button style={{backgroundColor:"#fff", color:"#000", boxShadow: "0px 1px 12px 0px #00000014"}}>View Details </button>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="type">
                    <img src={Dhlimage} />
                    <h5>
                      DHL Economy Line DZ <br />
                      Used 34042 times
                    </h5>
                  </div>
                </td>
                <td>
                  <img src={Workingdays} />
                </td>
                <td>
                  <h5>It is charged based on the actual weight</h5>
                </td>
                <td>
                  One side≤ 60 cm length+width+height≤ 90 cm Weight Limit0-2 kg
                </td>
                <td>USD 0-140</td>
                <td className="price">US $46.67</td>
                <td>
                  <a href="#">
                    <button>Order </button>
                  </a>
                  <a href="#">
                    <button style={{backgroundColor:"#fff", color:"#000", boxShadow: "0px 1px 12px 0px #00000014"}}>View Details </button>
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="type">
                    <img src={Dhlimage} />
                    <h5>
                      DHL Economy Line DZ <br />
                      Used 34042 times
                    </h5>
                  </div>
                </td>
                <td>
                  <img src={Workingdays} />
                </td>
                <td>
                  <h5>It is charged based on the actual weight</h5>
                </td>
                <td>
                  One side≤ 60 cm length+width+height≤ 90 cm Weight Limit0-2 kg
                </td>
                <td>USD 0-140</td>
                <td className="price">US $46.67</td>
                <td>
                  <a href="#">
                    <button>Order </button>
                  </a>
                  <a href="#">
                    <button style={{backgroundColor:"#fff", color:"#000", boxShadow: "0px 1px 12px 0px #00000014"}}>View Details </button>
                  </a>
                </td>
              </tr>
            </tbody>
            
          </table>
        </div>
      </div>
      <div className="subscribe"
      style={{marginTop: "40px"}}
      >
        <Subscribesignup />
      </div>
    </>
  );
};

export default Typesofdelivery;
