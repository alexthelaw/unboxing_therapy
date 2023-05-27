import { ComponentChildren, h } from 'preact';

import styles from './P.css';

type TSize = 'xs' | 's' | 'm' | 'l' | 'xl';
type TWeight = 'regular' | 'semibold' | 'bold';
type TCase = 'regularCase' | 'uppercase';

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  textSize?: TSize;
  weight?: TWeight;
  textcase?: TCase;
  color?: string | 'gold';
  children?: ComponentChildren;
}

const SizeToStyle: Record<TSize, StyleSheet> = {
  xs: styles.xs,
  s: styles.s,
  m: styles.m,
  l: styles.l,
  xl: styles.xl,
};
const WeightToStyle: Record<TWeight, StyleSheet> = {
  regular: styles.regular,
  semibold: styles.semibold,
  bold: styles.bold,
};
const CaseToStyle: Record<TCase, StyleSheet> = {
  regularCase: styles.regularCase,
  uppercase: styles.uppercase,
};

export const Index = ({
  textSize = 'm',
  weight = 'regular',
  textcase = 'regularCase',
  color = 'var(--color-text)',
  className,
  children,
  ...props
}: PProps) => {
  return (
    <p
      className={`${SizeToStyle[textSize]} ${WeightToStyle[weight]} ${CaseToStyle[textcase]} ${className} ${
        color === 'gold' && styles.gold_text
      }`}
      style={{ color: color }}
      {...props}
    >
      {children}
    </p>
  );
};

export default Index;
