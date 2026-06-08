type StepShellProps = {
  children: React.ReactNode;
  tag?: string;
};

export function StepShell({ children, tag }: StepShellProps) {
  return (
    <section className="animate-step-in mx-auto w-full max-w-lg px-5 py-6 sm:px-8 sm:py-10">
      {tag && (
        <p className="font-body mb-5 text-center text-sm tracking-[0.3em] text-rose-300/60 uppercase">
          {tag}
        </p>
      )}
      {children}
    </section>
  );
}

type StepActionsProps = {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  showBack?: boolean;
};

export function StepActions({
  onBack,
  onNext,
  nextLabel = "Continuar",
  showBack = true,
}: StepActionsProps) {
  return (
    <div className="mt-10 flex flex-col-reverse items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
      {showBack && onBack && (
        <button
          type="button"
          onClick={onBack}
          className="font-body rounded-full border border-rose-300/20 px-7 py-3 text-lg text-mist transition hover:border-rose-300/40 hover:text-blush"
        >
          voltar
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          className="btn-romantic font-display rounded-full px-10 py-3.5 text-lg font-semibold text-white transition hover:scale-[1.03] active:scale-[0.98]"
        >
          {nextLabel}
        </button>
      )}
    </div>
  );
}
