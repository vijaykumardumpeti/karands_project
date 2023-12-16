import React from "react";
import Post from "./Post.js"
import Emotions from "./Emotions.js";
import Comment from "./Comment.js";
import Sidebar from "../Dashboard/Sidebar.js";
import Details from "../Dashboard/Details.js";

export default function AllActivity() {
  return (
    <div className="row flex-nowrap" style={{ width: "100%", height: "100%" }}>
    <Sidebar userPage='allactivity' />
    <div className="col container" style={{ maxWidth: "80%" }}>
      <Details />
      <hr />
      <div className="container-lg container-xl">
        <div className="row">
         
          <div className="col-8">
            <div className="card">
              <div className="card-header">
                <div>
                  <h4 className="text-start mt-2 ">Your activities</h4>
                  <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        class="nav-link active"
                        id="nav-posts-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-posts"
                        type="button"
                        role="tab"
                        aria-controls="nav-posts"
                        aria-selected="true"
                      >
                        Posts
                      </button>
                      <button
                        class="nav-link"
                        id="nav-comments-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-comments"
                        type="button"
                        role="tab"
                        aria-controls="nav-comments"
                        aria-selected="false"
                      >
                        comments
                      </button>
                      <button
                        class="nav-link"
                        id="nav-emotions-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-emotions"
                        type="button"
                        role="tab"
                        aria-controls="nav-emontions"
                        aria-selected="false"
                      >
                        Emotions
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="card-body">
                <div class="tab-content " id="nav-tabContent">
                  <div
                    class="tab-pane fade show active "
                    id="nav-posts"
                    role="tabpanel"
                    aria-labelledby="nav-posts-tab"
                  >
                    <Post />
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-comments"
                    role="tabpanel"
                    aria-labelledby="nav-comments-tab"
                  >
                    <Comment/>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="nav-emotions"
                    role="tabpanel"
                    aria-labelledby="nav-emotions-tab"
                  >
                   
                 <Emotions/>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
          <div className="col-4">
          <div className="card">
          <h3>Addvertisement</h3>
          </div>
          </div>
        </div>
      </div>
      
   
  </div>
  </div>
  );
}
