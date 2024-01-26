import React, { useState } from "react";
import cl from "./ImageSlider.module.css";
import { isMobile } from "react-device-detect";

interface IProps {
  imagesUrls: string[];
}

export const ImageSlider = ({ imagesUrls }: IProps) => {
  const [selected, setSlected] = useState<number>(0);

  const selectImage = (index: number) => {
    setSlected(index);
  };
  return (
    <div className={cl.wrapper}>
      <div className={cl.container}>
        <div className={cl.mainImage}>
          <img src={imagesUrls[selected]} alt="" />
        </div>
        <div className={cl.items}>
          {imagesUrls.map((url, index) => (
            <div
              className={[cl.item, selected === index && cl.active].join(" ")}
              onMouseEnter={!isMobile ? () => selectImage(index) : undefined}
              onClick={isMobile ? () => selectImage(index) : undefined}
            >
              <img src={url} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
