import { cx } from "@my-company/style/cx";
import { cardClassName } from "@my-company/warehoox/components/card";
import s from "@my-company/warehoox/routes/appliance-page/add-appliance-button.module.css";
import { AddApplianceDialog } from "@my-company/warehoox/routes/appliance-page/add-appliance-dialog";
import { useState } from "react";

export function AddApplianceButton() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cx(s.button, cardClassName)}
        onClick={() => {
          setShowDialog(true);
        }}
      >
        +
      </button>
      {showDialog && (
        <AddApplianceDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
