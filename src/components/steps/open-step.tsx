import { siteContent } from "../../data/content";
import { StepActions, StepShell } from "../step-shell";

type OpenStepProps = {
  onNext: () => void;
};

export function OpenStep({ onNext }: OpenStepProps) {
  const { open } = siteContent;

  return (
    <StepShell>
      <div className="flex min-h-[58dvh] flex-col items-center justify-center text-center">
        <div className="relative">
          <img
            src="/luaazul.png"
            alt=""
            aria-hidden="true"
            className="animate-moon-float pointer-events-none absolute bottom-full left-1/2 h-80 w-80 -translate-x-1/2 object-contain sm:h-96 sm:w-96"
          />
          <h1 className="font-display text-5xl font-semibold sm:text-6xl">
            {open.title}
          </h1>
        </div>
        <p className="font-display gold-text mt-4 text-2xl italic sm:text-3xl">
          {open.line}
        </p>
        <p className="font-body mt-5 text-base text-mist">{open.hint}</p>
        <StepActions showBack={false} onNext={onNext} nextLabel={open.button} />
      </div>
    </StepShell>
  );
}
