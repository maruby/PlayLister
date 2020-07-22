import React, { useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

 const Soundwave = () => {
  const waveformRef = useRef();

  useEffect(() => {
      const wavesurf = WaveSurfer.create({
        container: waveformRef.current,
        barWidth: 3,
        cursorWidth: 1,
        // container: '#waveform',
        backend: 'WebAudio',
        height: 80,
        progressColor: 'blue',
        responsive: true,
        waveColor: 'violet',
        cursorColor: 'transparent',
      });
      wavesurf.load('./Sample_Audio.mp3')
      wavesurf.play()
  }, []);

  return (
    <>
      <div ref={waveformRef}>
      </div>
    </>
  )
}
export default Soundwave