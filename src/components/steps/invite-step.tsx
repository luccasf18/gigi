import { useRef, useState } from "react";
import { siteContent, type InviteRow } from "../../data/content";
import { StepActions, StepShell } from "../step-shell";

type InviteStepProps = {
  onBack: () => void;
  onNext: () => void;
};

const CLOSED_HEIGHT = 180;
const FALLBACK_OPEN_HEIGHT = 380;

export function InviteStep({ onBack, onNext }: InviteStepProps) {
  const { invite } = siteContent;
  const [opened, setOpened] = useState(false);
  const [stageHeight, setStageHeight] = useState(CLOSED_HEIGHT);
  const letterRef = useRef<HTMLDivElement>(null);

  const openEnvelope = () => {
    setStageHeight(letterRef.current?.offsetHeight ?? FALLBACK_OPEN_HEIGHT);
    setOpened(true);
  };

  return (
    <StepShell tag={invite.tag}>
      <div
        className={`iv-stage ${opened ? "is-open" : ""}`}
        style={{ height: stageHeight }}
      >
        <div ref={letterRef} className="iv-letter card-premium overflow-hidden">
          <header className="px-8 pt-9 pb-6 text-center sm:px-10">
            <span className="font-display text-2xl text-rose-300/80">&#10087;</span>
            <h2 className="font-display gold-text mt-3 text-3xl leading-tight font-semibold sm:text-4xl">
              {invite.title}
            </h2>
            <div className="gold-rule mx-auto mt-5 w-24" />
          </header>

          <dl className="px-8 pb-7 sm:px-10">
            {invite.rows.map((row) => (
              <DetailRow key={row.label} row={row} />
            ))}
          </dl>

          <footer className="border-t border-dashed border-rose-300/15 bg-black/15 px-8 py-4 text-center sm:px-10">
            <p className="font-body text-base text-mist italic sm:text-lg">
              {invite.note}
            </p>
          </footer>
        </div>

        <div className="iv-back" aria-hidden="true" />
        <div className="iv-flap" aria-hidden="true" />
        <div className="iv-pocket" aria-hidden="true" />
        <div className="iv-seal" aria-hidden="true">
          <span className="text-sm">&hearts;</span>
        </div>

        {!opened && (
          <button
            type="button"
            onClick={openEnvelope}
            className="iv-trigger"
            aria-label="Abrir o convite"
          />
        )}
      </div>

      {!opened && (
        <p className="font-body mt-6 animate-pulse text-center text-sm tracking-[0.25em] text-rose-300/70 uppercase">
          toque para abrir
        </p>
      )}

      {opened ? (
        <StepActions onBack={onBack} onNext={onNext} nextLabel={invite.button} />
      ) : (
        <StepActions onBack={onBack} />
      )}
    </StepShell>
  );
}

function DetailRow({ row }: { row: InviteRow }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-rose-300/10 py-4 last:border-0">
      <dt className="font-body text-xs tracking-[0.25em] text-rose-400/70 uppercase">
        {row.label}
      </dt>
      <dd className="font-display text-right text-xl text-blush sm:text-2xl">
        {row.value}
      </dd>
    </div>
  );
}
