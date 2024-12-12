import React from 'react'
import style from './Animation.module.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Loading() {
  return   <>
  <div className={`${style.customWidth} d-flex mx-auto`}>
  <DotLottieReact
      src="https://lottie.host/581a7fbe-6514-48aa-9620-83f557f9d73d/lf1CrhN4Nd.lottie"
      loop
      autoplay
    />
  </div>
  </>
}

export default Loading


