import React, { useEffect, useState } from "react";
import mepic from "../images/avatar.png";
import { useHistory } from "react-router-dom";
// import User from "userSchema";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
      }

      // if (!res.status === 200) {
      //   const error = new Error(res.error);
      //   throw error;
      // }
      setUserData(data);
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container container-about">
        <form method="GET">
          {userData && (
            <div>
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="mypic img-thumbnail"
                    src={mepic}
                    alt="myPic"
                  />
                </div>
                <div className="col-md-6">
                  <div className="profile-head">
                    <h5>{userData.name}</h5>
                    <h6>{userData.work}</h6>
                    <p className="profile-rating mt-3 mb-5">
                      RANKINGS :<span className="span-ranking">1/10</span>
                    </p>

                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          id="home-tab"
                          data-toggle="tab"
                          href="#home"
                          aria-controls="home"
                          role="tab"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          className="nav-link active"
                          aria-current="page"
                          id="profile-tab"
                          data-toggle="tab"
                          href="#profile"
                          aria-controls="profile"
                          role="tab"
                        >
                          Timeline
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-2">
                  <input
                    type="submit"
                    className="profile-edit-btn "
                    name="btnAddMore"
                    value="Edit-Profile"
                  />
                </div>
              </div>

              <div className="row">
                {/* left side url */}
                <div className="container col-md-4">
                  <div className="profile-work">
                    <p>WORK LINK</p>
                    <a href="https://www.facebook.com" target="facebook">
                      Facebook
                    </a>
                    <br />
                    <a href="https://www.instagram.com" target="instagram">
                      Instagram
                    </a>
                    <br />
                    <a href="https://www.tweeter.com" target="tweeter">
                      Tweeter
                    </a>
                    <br />
                    <a href="https://www.google.com" target="google">
                      google
                    </a>
                  </div>
                </div>
                {/* right side toggle */}
                <div className="col-md-8 pl-5 about-info">
                  <div className="tab-content profile-tab" id="myTabContent">
                    <div
                      className="tab-panel fade show active"
                      id="home"
                      role="tabpanel"
                      arial-labelledby="home-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>UserId</label>
                        </div>

                        <div className="col-md-6">
                          <p>{userData._id}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Name</label>
                        </div>

                        <div className="col-md-6">
                          <p>{userData.name}</p>
                        </div>
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Email</label>
                        </div>

                        <div className="col-md-6">
                          <p>{userData.email}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Phone</label>
                        </div>

                        <div className="col-md-6">
                          <p>{userData.phone}</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Profession</label>
                        </div>

                        <div className="col-md-6">
                          <p>{userData.work}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile"
                      roles="tabpanel"
                      arial-labelledby="profile-tab"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <label>Experience</label>
                        </div>
                        <div className="col-md-6">
                          <p> Expert</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Hourly Rate</label>
                        </div>
                        <div className="col-md-6">
                          <p> 10$/hr</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Total Projects</label>
                        </div>
                        <div className="col-md-6">
                          <p> 130</p>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-6">
                          <label>Salary</label>
                        </div>
                        <div className="col-md-6">
                          <p> 10$/hr</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default About;
