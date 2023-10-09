import React from "react";
import Userdashboardmenu from "../../components/Usermenus";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Paymentsfield from "../../components/Mypayments/Paymentsfield";
import Paymentaddmore from '../../components/Mypayments/Paymentaddmore'
const MyPaymentMethods = () => {
  return (
    <>
      {/* HEADER */}
      <Header />
      {/* HEADER */}

      <section id="mypaymentmethod">
        <div className="row">
          <div className="col-2">
            <Userdashboardmenu />
          </div>

          <div className="col-10" style={{ padding: "30px 40px" }}>
            <h2>My Payment Methods</h2>
            <Paymentsfield />
            <Paymentaddmore />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
      {/* FOOTER */}
    </>
  );
};

export default MyPaymentMethods;
