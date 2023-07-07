import React from "react";
import Image from "next/image";

//INTERNALIMPORT
import style from "./Vedio.module.css";
import NFTVideo from "../assets/img/index";

const Vedio = () => {
  return (
    <div className={style.Video}>
      <div className={style.Video_box}>
        <h1>
          <span>🎬</span> The Videos
        </h1>
        <p>
          Check out our hottest videos. View more and share more new
          perspectives on just about any topic. Everyone’s welcome.
        </p>

        <div className={style.Video_box_frame}>
          <div className={style.Video_box_frame_left}>
            <Image
              src={NFTVideo.NFTVideo}
              alt="Video image"
              width={850}
              height={500}
              style={{objectFit: "cover"}}
              className={style.Video_box_frame_left_img}
            />
          </div>

          <div className={style.Video_box_frame_right}>Hey</div>
        </div>
      </div>
    </div>
  );
};

export default Vedio;