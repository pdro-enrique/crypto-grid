import LottieComponent from 'react-lottie';

export const Lottie = ({ animationFile, callback, ...rest }) => {
  return (
    <LottieComponent
      options={{
        loop: false,
        autoplay: true, 
        animationData: animationFile,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        },
      }}
      width={500}
      height={300}
      eventListeners={[
        {
          eventName: 'complete',
          callback: callback,
        },
      ]}
      {...rest}
    />
  )
}

export default Lottie;
