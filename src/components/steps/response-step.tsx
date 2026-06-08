import { useEffect, useRef, useState, type CSSProperties } from "react";
import { siteContent } from "../../data/content";
import { StepActions, StepShell } from "../step-shell";

type ResponseStepProps = {
  onBack: () => void;
};

type Answer = "yes" | "maybe";
type Position = { left: number; top: number };

const COUNTDOWN_SECONDS = 10;
const GAP_BELOW_YES = 18;
const FALLBACK_YES_HEIGHT = 64;

function whatsappUrl(phone: string, message: string): string {
  const numero = phone.replace(/\D/g, "");
  return `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;
}

export function ResponseStep({ onBack }: ResponseStepProps) {
  const { response, whatsapp } = siteContent;

  const [answer, setAnswer] = useState<Answer | null>(null);
  const [autoConfirmed, setAutoConfirmed] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [position, setPosition] = useState<Position | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);

  const arenaRef = useRef<HTMLDivElement>(null);
  const yesRef = useRef<HTMLButtonElement>(null);
  const maybeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (answer) return;

    if (secondsLeft <= 0) {
      setAutoConfirmed(true);
      setAnswer("yes");
      return;
    }

    const timer = window.setTimeout(() => {
      setSecondsLeft((seconds) => seconds - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [secondsLeft, answer]);

  const dodge = () => {
    const arena = arenaRef.current;
    const maybeButton = maybeRef.current;
    if (!arena || !maybeButton) return;

    const yesHeight = yesRef.current?.offsetHeight ?? FALLBACK_YES_HEIGHT;
    const minTop = yesHeight + GAP_BELOW_YES;
    const maxTop = Math.max(minTop, arena.clientHeight - maybeButton.offsetHeight);
    const maxLeft = Math.max(0, arena.clientWidth - maybeButton.offsetWidth);

    setPosition({
      left: Math.random() * maxLeft,
      top: minTop + Math.random() * (maxTop - minTop),
    });
    setAttempts((count) => count + 1);
  };

  if (answer) {
    const message = autoConfirmed
      ? response.autoYesMessage
      : answer === "yes"
        ? response.yesMessage
        : response.maybeMessage;

    const confirmou = answer === "yes";

    return (
      <StepShell>
        <div className="animate-step-in flex min-h-[55dvh] flex-col items-center justify-center text-center">
          <div className="gold-rule w-16" />
          <p
            className={`font-display mt-6 text-3xl leading-relaxed sm:text-4xl ${
              confirmou ? "gold-text" : "text-blush"
            }`}
          >
            {message}
          </p>

          {confirmou && (
            <a
              href={whatsappUrl(whatsapp.phone, whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-romantic font-display mt-10 inline-block rounded-full px-10 py-3.5 text-lg font-semibold text-white transition hover:scale-[1.03] active:scale-[0.98]"
            >
              {whatsapp.button}
            </a>
          )}
        </div>
      </StepShell>
    );
  }

  const maybeLabel =
    attempts === 0
      ? response.maybeButton
      : response.teases[(attempts - 1) % response.teases.length];

  const maybeStyle: CSSProperties = position
    ? { left: position.left, top: position.top }
    : { left: "50%", top: 86, transform: "translateX(-50%)" };

  return (
    <StepShell>
      <div className="flex min-h-[55dvh] flex-col items-center justify-center text-center">
        <div className="flex flex-col items-center">
          <p className="font-display gradient-text text-4xl font-semibold sm:text-5xl">
            {response.question}
          </p>
          <div className="gold-rule mt-5 w-20" />
        </div>

        <p className="font-body mt-5 rounded-full border border-rose-300/20 bg-black/20 px-4 py-1.5 text-sm text-mist">
          {response.timerNote.replace("{s}", String(secondsLeft))}
        </p>

        <div ref={arenaRef} className="relative mt-6 h-[330px] w-full max-w-sm sm:h-[260px]">
          <button
            ref={yesRef}
            type="button"
            onClick={() => setAnswer("yes")}
            className="choice-card group absolute top-0 left-1/2 flex w-52 -translate-x-1/2 items-center justify-between rounded-2xl px-6 py-5 text-left sm:w-64"
          >
            <span className="font-display text-xl text-blush sm:text-2xl">
              {response.yesButton}
            </span>
            <span className="font-body text-rose-300/60 transition group-hover:translate-x-1">
              &rarr;
            </span>
          </button>

          <button
            ref={maybeRef}
            type="button"
            onMouseEnter={dodge}
            onPointerDown={(event) => {
              event.preventDefault();
              dodge();
            }}
            onClick={(event) => {
              event.preventDefault();
              dodge();
            }}
            className="choice-card runaway flex w-52 items-center justify-between rounded-2xl px-6 py-5 text-left sm:w-64"
            style={maybeStyle}
          >
            <span className="font-display text-lg text-mist">{maybeLabel}</span>
            <span className="font-body text-rose-300/40">&rarr;</span>
          </button>
        </div>

        <StepActions onBack={onBack} showBack />
      </div>
    </StepShell>
  );
}
