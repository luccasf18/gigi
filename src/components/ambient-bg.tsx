import { useMemo, type CSSProperties } from "react";

const STAR_COUNT = 70;
const METEOR_COUNT = 6;

type StarStyle = CSSProperties & {
  "--duration": string;
  "--delay": string;
};

type MeteorStyle = CSSProperties & {
  "--duration": string;
  "--delay": string;
  "--angle": string;
  "--travel": string;
};

type CloudStyle = CSSProperties & {
  "--duration": string;
  "--delay": string;
};

const CLOUDS: CloudStyle[] = [
  { top: "12%", "--duration": "70s", "--delay": "-10s" },
  { top: "34%", "--duration": "95s", "--delay": "-45s" },
];

function buildStars(): StarStyle[] {
  return Array.from({ length: STAR_COUNT }, () => {
    const size = 1 + Math.random() * 2;
    return {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      "--duration": `${2.5 + Math.random() * 4}s`,
      "--delay": `${Math.random() * 5}s`,
    };
  });
}

function buildMeteors(): MeteorStyle[] {
  return Array.from({ length: METEOR_COUNT }, (_, index) => ({
    left: `${Math.random() * 70 - 10}%`,
    top: `${Math.random() * 45}%`,
    "--duration": `${4 + Math.random() * 4}s`,
    // O primeiro cometa já entra em cena assim que a página abre.
    "--delay": index === 0 ? "-0.5s" : `${1 + Math.random() * 11}s`,
    "--angle": `${18 + Math.random() * 16}deg`,
    "--travel": `${480 + Math.random() * 320}px`,
  }));
}

export function AmbientBg() {
  const stars = useMemo(buildStars, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-wine-950 via-wine-900 to-[#160710]" />
      <div className="animate-orb animate-glow absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-rose-500/12 blur-[120px]" />

      {stars.map((style, index) => (
        <span key={`star-${index}`} className="star" style={style} />
      ))}

      {CLOUDS.map((style, index) => (
        <span key={`cloud-${index}`} className="cloud" style={style} />
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

export function MeteorLayer() {
  const meteors = useMemo(buildMeteors, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {meteors.map((style, index) => (
        <span key={`meteor-${index}`} className="meteor" style={style} />
      ))}
    </div>
  );
}
