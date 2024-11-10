import { Carousel } from "react-responsive-carousel";
import { img } from "./images/data"; // Assuming this is correct and the data file exists
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../carousel/carousel.module.css"; // Ensure this path is correct

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imageItem, index) => (
          // Add a unique 'key' for each img element
          <img key={index} src={imageItem} className={classes.img} />
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
