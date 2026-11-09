import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'quiet'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

/**
 * A button in one of three styles. To style a link as a button, give the
 * `<a>` the same classes: `button button-primary` (or secondary/quiet).
 */
export function Button({ variant = 'secondary', className, type = 'button', ...rest }: ButtonProps) {
  const classes = ['button', `button-${variant}`, className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...rest} />
}
