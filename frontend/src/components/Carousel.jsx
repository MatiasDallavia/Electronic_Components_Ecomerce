import React from 'react'
import slideCapacitors from '../images/slide_capacitors.webp'
import slideTransistors from '../images/slide_transitors.jpg'
import slideCircuitBoard from '../images/slide_circuit_board.webp'
import Carousel from 'react-bootstrap/Carousel';


const CoverCarousel = () => {
  return (
    <Carousel interval={2000} controls={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slideTransistors}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Find any component model you are looking for</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slideCircuitBoard}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Over 50 manufacturers available</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slideCapacitors}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  );
};

export default CoverCarousel;