import React from 'react'
import style from './Animation.module.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
function Animation() {
  return  <>
  <div className={`${style.customWidth} d-flex mx-auto`}>
  <DotLottieReact
      src="https://lottie.host/e4396254-9163-4dde-8e41-079ff48c50f7/AEmtWeHcK9.lottie"
      loop
      autoplay
    />
  </div>
  </>
}

export default Animation




// const App = () => {
//   return (
//     <DotLottieReact
//       src="https://lottie.host/e4396254-9163-4dde-8e41-079ff48c50f7/AEmtWeHcK9.lottie"
//       loop
//       autoplay
//     />
//   );
// };
