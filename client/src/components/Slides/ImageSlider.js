import React, { useRef } from 'react';
import "./ImageSlider.css"

function ImageSlider() {
  return (
    // <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
    //   <div className="carousel-inner">
    //     <div className="carousel-item active">
    //       <img src="/images/banner.png" alt="Image 1" className="d-block w-100 " />
    //       <div className="carousel-caption d-none d-md-block">
    //         <h5 style={{ color: 'green' }}>First slide label</h5>
    //         <p>Some representative placeholder content for the first slide.</p>
    //       </div>
    //     </div>
    //     <div className="carousel-item">
    //       <img src="/images/banner1.png" alt="Image 2" className="d-block w-100" />
    //       <div className="carousel-caption d-none d-md-block">
    //         <h5 style={{ color: 'green' }}>First slide label</h5>
    //         <p>Some representative placeholder content for the first slide.</p>
    //       </div>
    //     </div>
    //     <div className="carousel-item">
    //       <img src="/images/banner2.png" alt="Image 3" className="d-block w-100" />
    //       <div className="carousel-caption d-none d-md-block">
    //         <h5 style={{ color: 'green' }}>First slide label</h5>
    //         <p>Some representative placeholder content for the first slide.</p>
    //       </div>
    //     </div>
    //   </div>
    //   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    //   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    //   <ol className="carousel-indicators custom-indicators">
    //     <li data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active"></li>
    //     <li data-bs-target="#carouselExampleFade" data-bs-slide-to="1"></li>
    //     <li data-bs-target="#carouselExampleFade" data-bs-slide-to="2"></li>
    //   </ol>
    // </div>

    // slider section 
      <section className="slider_section ">
        <div id="customCarousel1" className="carousel slide carousel-fade " data-bs-ride="carousel" data-bs-interval="2000" >
          <div className="carousel-inner">
            <div className="carousel-item active">
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
                      {/* <a href="#">
                        <span>
                          Read More
                        </span>
                        <img src="images/white-arrow.png" alt=""/>
                      </a> */}
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
                      {/* <a href="#">
                        <span>
                          Read More
                        </span>
                        <img src="images/white-arrow.png" alt=""/>
                      </a> */}
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
                      {/* <a href="#">
                        <span>
                          Read More
                        </span>
                        <img src="images/white-arrow.png" alt=""/>
                      </a> */}
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
        <div className="carousel_btn-box">
          <a className="carousel-control-prev" href="#customCarousel1" role="button" data-slide="prev">
            
            <span className="sr-only">Prev</span>
          </a>
          <a className="carousel-control-next" href="#customCarousel1" role="button" data-slide="next">
            
            <span className="sr-only">Next</span>
          </a>
        </div>
      </section>
       
    
  );


}
export default ImageSlider;
