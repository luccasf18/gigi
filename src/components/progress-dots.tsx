type ProgressDotsProps = {
  current: number;
  total: number;
  onGoTo: (index: number) => void;
};

export function ProgressDots({ current, total, onGoTo }: ProgressDotsProps) {
  return (
    <nav aria-label="Progresso" className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        const isDone = i < current;

        return (
          <button
            key={i}
            type="button"
            aria-label={`Etapa ${i + 1}`}
            aria-current={isActive ? "step" : undefined}
            disabled={i > current}
            onClick={() => isDone && onGoTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              isActive
                ? "w-7 bg-rose-400"
                : isDone
                  ? "w-1.5 cursor-pointer bg-rose-400/50 hover:bg-rose-400/80"
                  : "w-1.5 cursor-default bg-rose-300/15"
            }`}
          />
        );
      })}
    </nav>
  );
}
