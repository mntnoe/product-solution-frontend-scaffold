import s from "@my-company/warehoox/components/dialog.module.css";
import { createPortal } from "react-dom";

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

export function Dialog({ onClose, children }: Props) {
  return createPortal(
    <div
      className={s.container}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={s.dialog}>{children}</div>
    </div>,
    document.body,
  );
}
