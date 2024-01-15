import { cx } from "@my-company/style/cx";
import s from "@my-company/warehoox/components/illustration.module.css";

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export function Illustration({ children, className }: Props) {
  return <div className={cx(s.illustration, className)}>{children}</div>;
}
