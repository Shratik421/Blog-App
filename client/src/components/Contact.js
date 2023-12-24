import React from "react";
import { useEffect, useState } from "react";
// import { json } from "stream/consumers";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContact();
  }, []);

  // we are storing data in the usestate
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // send the data to the backend

  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();

    if (!data) {
      console.log("message not send ");
    } else {
      alert("message Send");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div className="contact_info">
        <div className="conatiner">
          <div className="conatiner-fluid">
            <div className="row">
              <div className="col-lg-10 offset-lg-1">
                {/* phone number card */}
                <div className="container contact-container">
                  <div className="row">
                    <div className="col">
                      <img
                        className="contact-phone-img"
                        src="https://img.icons8.com/material-outlined/30/000000/iphone--v2.png"
                        alt=" phone-img"
                      />
                      Phone
                      <div>
                        <h5> 9896877412</h5>
                      </div>
                    </div>
                    <div className="col">
                      <img
                        className="contact-phone-img"
                        src="https://img.icons8.com/material-outlined/24/000000/mobile-email.png"
                        alt="email-img"
                      />
                      Email
                      <div>
                        <h5>Email.gmail@Google.com</h5>
                      </div>
                    </div>
                    <div className="col">
                      <img
                        className="contact-phone-img"
                        src="https://img.icons8.com/ios-glyphs/30/000000/address.png"
                        alt="adress-img"
                      />
                      Address
                      <div>
                        <h5>Nagpur, Maharastra, India</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact form */}
      <div className="container container-contact-form">
        <div className="contact-from-heading">
          <h2 className="contact-form-heading-h2">Get In Touch</h2>
        </div>
        <form id="contact-form" method="POST">
          <div className="contact_form_name d-flex ">
            <input
              type="text"
              id="contact_form_name"
              className="contact_form_name input-feild"
              value={userData.name}
              onChange={handleInputs}
              name="name"
              placeholder="Your Name"
              required="true"
            />

            <input
              type="text"
              id="contact_form_name"
              className="contact_form_name input-feild"
              value={userData.email}
              onChange={handleInputs}
              name="email"
              placeholder="Your Email"
              required="true"
            />

            <input
              type="number"
              id="contact_form_name"
              className="contact_form_name input-feild"
              value={userData.phone}
              onChange={handleInputs}
              name="phone"
              placeholder="Contact no"
              required
            />
          </div>
          <div className="textarea">
            <textarea
              cols="30"
              rows="5"
              value={userData.message}
              onChange={handleInputs}
              name="message"
              placeholder="Your Comment"
            ></textarea>
          </div>
          <div className="submit-button">
            <button
              type="submit"
              onClick={contactForm}
              className="btn button btn-success btn-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;
