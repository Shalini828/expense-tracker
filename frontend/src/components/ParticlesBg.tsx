import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: "transparent",
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 120,
          },
          color: {
            value: "#38bdf8",
          },
          size: {
            value: 2,
          },
          opacity: {
            value: 0.6,
          },
          move: {
            enable: true,
            speed: 1,
          },
          links: {
            enable: true,
            color: "#38bdf8",
            opacity: 0.2,
            distance: 150,
          },
        },
      }}
      style={{
        position: "fixed",
        zIndex: 0,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParticlesBg;
