import { cx } from "@my-company/style/cx";
import s from "@my-company/components/card.module.css";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function Card({ children, className }: Props) {
  return <div className={cx(s.card, className)}>{children}</div>;
}

export const cardClassName = s.card;
