import React from "react";

type Props = {
  slides: string[];
};

const MovieCarousel = ({ slides }: Props) => {
  return (
    <div className="overflow-hidden relative mt-2">
      <>
        {slides.forEach((e) => {
          <></>;
        })}
      </>
    </div>
  );
};

export default MovieCarousel;
