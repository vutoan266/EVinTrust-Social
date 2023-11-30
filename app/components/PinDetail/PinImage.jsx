"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PinImage({ pinDetail }) {
  return (
    <Slider
      className="slider variable-width center"
      // dotsClass="slick-dots slick-thumb h-[50px] bottom-auto mt-4"
      dots
      infinite={false}
      centerMode
      slidesToScroll={1}
      variableWidth
      // customPaging={(i) => {
      //   return <img key={i} src={pinDetail.images?.[i]} width={50} />;
      // }}
    >
      {pinDetail.images?.map((image) => (
        <img src={image} key={image} height={500} />
      )) || []}
    </Slider>
  );
}

export default PinImage;
