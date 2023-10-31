import React, { useRef } from 'react';
import "./ImageSlider.css"

function ImageSlider() {
  return (
      <section className="slider_section ">
        <div id="customCarousel1" className="carousel slide carousel-fade " data-bs-ride="carousel" data-bs-interval="2000" >
          <div className="carousel-inner">
            <div className="carousel-item active ">
              <div className="container">
                <div className="row">
                  <div className="col-md-5">
                    <div className="detail_box">
                      <h1>
                        Chocolate <br></br>
                        <span>
                          Yummy
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-2">
                    <div className="img-box">
                      <img src="images/slider-img.png" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <div className="container">
                <div className="row">
                  <div className="col-md-5">
                    <div className="detail_box">
                      <h1>
                        Flavoured cake <br></br>
                        <span>
                          Yummy
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-2">
                    <div className="img-box">
                      <img src="images/slider-img.png" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item ">
              <div className="container">
                <div className="row">
                  <div className="col-md-5">
                    <div className="detail_box">
                      <h1>
                        Cakes 3d <br></br>
                        <span>
                          Beautiful
                        </span>
                      </h1>
                    </div>
                  </div>
                  <div className="col-md-5 offset-md-2">
                    <div className="img-box">
                      <img src="images/slider-img.png" alt=""/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        {/* <div className="carousel_btn-box">
          <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
            
            <span className="sr-only ">Prev</span>
          </a>
          <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
            
            <span className="sr-only ">Next</span>
          </a>
        </div> */}
      </section>
       
    
  );


}
export default ImageSlider;
