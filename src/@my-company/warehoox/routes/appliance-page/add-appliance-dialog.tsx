import { Dialog } from "@my-company/warehoox/components/dialog";
import s from "@my-company/warehoox/routes/appliance-page/add-appliance-dialog.module.css";
import { useAddAppliancePageItem } from "@my-company/warehoox/routes/appliance-page/appliance-page-items.api";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export function AddApplianceDialog({ onClose }: Props) {
  const [brand, setBrand] = useState("");
  const [equipment, setEquipment] = useState("");
  const addAppliance = useAddAppliancePageItem();
  return (
    <Dialog onClose={onClose}>
      <form
        className={s.form}
        onSubmit={async (e) => {
          e.preventDefault();

          await addAppliance.mutateAsync({
            brand,
            equipment,
          });
          onClose();
        }}
      >
        <div className={s.field}>
          <label className={s.label}>Brand</label>
          <input
            type="text"
            className={s.input}
            autoFocus
            required
            value={brand}
            onChange={(e) => {
              setBrand(e.target.value);
            }}
          />
        </div>

        <div className={s.field}>
          <label className={s.label}>Equipment</label>
          <input
            type="text"
            className={s.input}
            required
            value={equipment}
            onChange={(e) => {
              setEquipment(e.target.value);
            }}
          />
        </div>

        <div className={s.buttons}>
          <button
            type="button"
            className={s.cancelButton}
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <button type="submit" className={s.addButton}>
            Add
          </button>
        </div>
      </form>
    </Dialog>
  );
}
