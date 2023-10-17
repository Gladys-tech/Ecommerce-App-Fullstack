import React, { useRef } from 'react';

function ImageSlider() {
  return (
    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="2000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="/images/banner.png" alt="Image 1" className="d-block w-100 " />
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{ color: 'green' }}>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/banner1.png" alt="Image 2" className="d-block w-100" />
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{ color: 'green' }}>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img src="/images/banner2.png" alt="Image 3" className="d-block w-100" />
          <div className="carousel-caption d-none d-md-block">
            <h5 style={{ color: 'green' }}>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      <ol className="carousel-indicators custom-indicators">
        <li data-bs-target="#carouselExampleFade" data-bs-slide-to="0" className="active"></li>
        <li data-bs-target="#carouselExampleFade" data-bs-slide-to="1"></li>
        <li data-bs-target="#carouselExampleFade" data-bs-slide-to="2"></li>
      </ol>
    </div>
  );


}
export default ImageSlider;
