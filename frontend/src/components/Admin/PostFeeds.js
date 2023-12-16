import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/employee1.jpg";
import './PostFeed.css';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MdLocationOn } from "react-icons/md";

export default function PostFeeds() {
  function handleClick() { }

  return (
    <div>
      <div className="container" style={{ width: "600px" }}>
        <div className=" container postFeed mt-4 w-100">
          <div className="shadow p-2 bg-body rounded">
            <div className="row">
              <div
                className="col-7 d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <img
                  src={logo}
                  className="rounded-circle"
                  alt="pic"
                  width="50px"
                  height="50px"
                />
                <div>
                  <div>
                    <h5 className="d-flex">David</h5>
                  </div>
                  <div>Senior Wordpress Developer</div>
                  <p className="d-flex">3 min ago <MdLocationOn className="ms-4" /><p>Location</p></p>
                </div>
              </div>

              <div className="col-3"></div>
              <div className="col-2">
                <MoreVertIcon onClick={handleClick("bottom-start")} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="ms-0"></div>
                <div></div>
              </div>
              <div className="col-6 d-flex"></div>

              <div style={{ display: "flex", textAlign: "start" }}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                  luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                  magna sit amet
                  <Link className="text-danger text-decoration-none ms-2">
                    View more..
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <h4>
                  <span className="bi bi-hand-thumbs-up"></span>
                </h4>
              </div>
              <div className="col-8">
                <input
                  class="form-control me-2"
                  type="text"
                  placeholder="Comment"
                />
              </div>
              <div className="col-2">
                <h4>
                  <span className="bi bi-share-fill"></span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container" style={{ width: "600px" }}>
        <div className=" container postFeed mt-5 w-100">
          <div className="shadow p-2 bg-body rounded">
            <div className="row">
              <div
                className="col-7 d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <img
                  src={logo}
                  className="rounded-circle"
                  alt="pic"
                  width="50px"
                  height="50px"
                />
                <div>
                  <div>
                    <h5 className="d-flex">David</h5>
                  </div>
                  <div>Senior Wordpress Developer</div>
                  <p className="d-flex">3 min ago <MdLocationOn className="ms-4" /><p>Location</p></p>
                </div>
              </div>

              <div className="col-3"></div>
              <div className="col-2">
                <MoreVertIcon onClick={handleClick("bottom-start")} />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="ms-0"></div>
                <div></div>
              </div>
              <div className="col-6 d-flex"></div>

              <div style={{ display: "flex", textAlign: "start" }}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                  luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id
                  magna sit amet
                  <Link className="text-danger text-decoration-none ms-2">
                    View more..
                  </Link>
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <h4>
                  <span className="bi bi-hand-thumbs-up"></span>
                </h4>
              </div>
              <div className="col-8">
                <input
                  class="form-control me-2"
                  type="text"
                  placeholder="Comment"
                />
              </div>
              <div className="col-2">
                <h4>
                  <span className="bi bi-share-fill"></span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
