import { useCallback, useState } from "react";
import { AmbientBg, MeteorLayer } from "./components/ambient-bg";
import { ProgressDots } from "./components/progress-dots";
import { RoseDecor } from "./components/rose-decor";
import { InviteStep } from "./components/steps/invite-step";
import { OpenStep } from "./components/steps/open-step";
import { ResponseStep } from "./components/steps/response-step";

const TOTAL_STEPS = 3;
const STEP_TRANSITION_MS = 230;

export default function App() {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const goToStep = useCallback((next: number) => {
    setLeaving(true);
    window.setTimeout(() => {
      setStep(next);
      setLeaving(false);
    }, STEP_TRANSITION_MS);
  }, []);

  const goNext = useCallback(
    () => goToStep(Math.min(step + 1, TOTAL_STEPS - 1)),
    [step, goToStep],
  );

  const goBack = useCallback(
    () => goToStep(Math.max(step - 1, 0)),
    [step, goToStep],
  );

  return (
    <div className="font-body relative flex min-h-dvh flex-col text-blush">
      <AmbientBg />
      <MeteorLayer />
      <RoseDecor />

      <header className="relative z-10 flex justify-center px-5 pt-8 pb-2">
        <ProgressDots current={step} total={TOTAL_STEPS} onGoTo={goToStep} />
      </header>

      <main
        className={`relative z-10 mx-auto flex w-full flex-1 flex-col justify-center pb-10 ${
          leaving ? "animate-step-out" : ""
        }`}
      >
        {step === 0 && <OpenStep onNext={goNext} />}
        {step === 1 && <InviteStep onBack={goBack} onNext={goNext} />}
        {step === 2 && <ResponseStep onBack={goBack} />}
      </main>
    </div>
  );
}
