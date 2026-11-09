import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLElement> {
  /** The element to render. Use 'section' or 'article' when the card has a heading. */
  as?: 'div' | 'section' | 'article'
}

/** A bordered surface that groups related content. */
export function Card({ as: Element = 'div', className, ...rest }: CardProps) {
  return <Element className={['card', className].filter(Boolean).join(' ')} {...rest} />
}
