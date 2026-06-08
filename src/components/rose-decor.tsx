const SRC = "/rosabg.png";

const SIZE = "w-20 sm:w-32 md:w-44 lg:w-52";
const SHADOW = "drop-shadow-[0_10px_30px_rgba(0,0,0,0.55)]";

export function RoseDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
    >
      <img
        src={SRC}
        alt=""
        className={`absolute -top-5 -left-7 ${SIZE} ${SHADOW} rotate-[-12deg] opacity-95`}
      />
      <img
        src={SRC}
        alt=""
        className={`absolute -top-6 -right-7 ${SIZE} ${SHADOW} -scale-x-100 rotate-[-12deg] opacity-95`}
      />
      <img
        src={SRC}
        alt=""
        className={`absolute -bottom-7 -left-7 ${SIZE} ${SHADOW} rotate-[195deg] opacity-90`}
      />
      <img
        src={SRC}
        alt=""
        className={`absolute -right-7 -bottom-6 ${SIZE} ${SHADOW} -scale-x-100 rotate-[195deg] opacity-90`}
      />
    </div>
  );
}
