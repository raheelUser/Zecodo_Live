import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import Readmessage from '../Chatbox/Readmessage'
import Unreadmessage from '../Chatbox/Unread'
const Allmessage = () => {
 
  return (
    <>
      <section id="my-message-box" style={{ padding: "30px 0px" }}>
        <h2>My Message</h2>
        <div className="row">
          <div className="col-4">
          <header class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_message1" data-bs-toggle="tab" class="nav-link active">All</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_message2" data-bs-toggle="tab" class="nav-link">Read</a>
                    </li>
                    <li class="nav-item">
                    <a href="#" data-bs-target="#tab_message3" data-bs-toggle="tab" class="nav-link">Unread</a>
                    </li>
                    
                    </ul>
                    </header>
          </div>
          <div className="col-8">
            <a className="customerservice" href="#">
              <p>
                <FontAwesomeIcon icon={faHeadset} /> Connect customer Service
              </p>
            </a>
            <div className="importantmessage">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="Important2"
                />
                <label class="form-check-label" for="Important2">
                  Important message only
                </label>
              </div>
              <a href="#">Delete all</a>
            </div>
          </div>
        </div>

        <div class="tab-content">
                    <article id="tab_message1" class="tab-pane show active card-body">
                   <Readmessage />
                   <Unreadmessage />
                    </article> 
                    <article id="tab_message2" class="tab-pane card-body">
                    <Readmessage />
                    </article>

                    <article id="tab_message3" class="tab-pane card-body">
                      <Unreadmessage />
                    </article>
                  
                    </div>
        {/* row end */}
      </section>
    </>
  );
};

export default Allmessage;
