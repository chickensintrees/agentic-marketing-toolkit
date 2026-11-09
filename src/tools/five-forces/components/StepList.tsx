interface StepListProps {
  labels: string[]
  current: number
  isComplete: (step: number) => boolean
  onSelect: (step: number) => void
}

/** The Analyze step list: jump to any step and see which are complete. */
export function StepList({ labels, current, isComplete, onSelect }: StepListProps) {
  return (
    <nav className="step-list" aria-label="Analysis steps">
      <ol>
        {labels.map((label, step) => {
          const complete = isComplete(step)
          const classes = ['step-button']
          if (step === current) classes.push('is-current')
          if (complete) classes.push('is-complete')
          return (
            <li key={label}>
              <button
                type="button"
                className={classes.join(' ')}
                aria-current={step === current ? 'step' : undefined}
                onClick={() => onSelect(step)}
              >
                <span className="step-marker" aria-hidden="true">
                  {complete ? '✓' : step + 1}
                </span>
                <span className="step-label">{label}</span>
                {complete ? <span className="visually-hidden"> (complete)</span> : null}
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
