"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PinImage({ pinDetail }) {
  return (
    <Slider
      className="slider variable-width center"
      dots
      infinite={false}
      centerMode
      slidesToScroll={1}
      variableWidth
    >
      {pinDetail.images?.map((image) => (
        <div key={image} className="mr-4">
          <img src={image} height={500} />
        </div>
      )) || []}
    </Slider>
  );
}

export default PinImage;
