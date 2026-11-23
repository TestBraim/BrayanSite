import { useEffect, useState } from "react";

const roles = [
  "Desenvolvedor WEB",
  "Freelancer",
  "Designer Gráfico",
  "Desenvolvedor Back-End",
  "Editor de Vídeos",
];

function Type() {
  const [reduceMotion, setReduceMotion] = useState(true);
  const [frame, setFrame] = useState({ index: 0, length: roles[0].length, erasing: false });

  useEffect(() => {
    if (!window.matchMedia) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function updatePreference() {
      setReduceMotion(preference.matches);
    }

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  const { index, length, erasing } = frame;
  const role = roles[index];

  useEffect(() => {
    if (reduceMotion) return;

    let nextFrame;
    let delay;
    if (erasing && length === 0) {
      nextFrame = { index: (index + 1) % roles.length, length: 0, erasing: false };
      delay = 170;
    } else if (!erasing && length === role.length) {
      nextFrame = { index, length: length - 1, erasing: true };
      delay = 1900;
    } else {
      nextFrame = { index, length: length + (erasing ? -1 : 1), erasing };
      delay = erasing ? 45 : 75;
    }

    const timer = window.setTimeout(() => setFrame(nextFrame), delay);
    return () => window.clearTimeout(timer);
  }, [erasing, index, length, reduceMotion, role.length]);

  return (
    <div className="home-roles">
      <span className="visually-hidden">{roles.join(", ")}.</span>
      <span className="home-role" aria-hidden="true">
        {reduceMotion ? role : role.slice(0, length)}
      </span>
    </div>
  );
}

export default Type;
