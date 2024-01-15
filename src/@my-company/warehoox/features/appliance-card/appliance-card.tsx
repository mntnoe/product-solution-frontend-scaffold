import { Card } from "@my-company/components/card";
import { PackageIcon } from "@my-company/warehoox/components/icons";
import { Illustration } from "@my-company/warehoox/components/illustration";
import s from "@my-company/warehoox/features/appliance-card/appliance-card.module.css";
import { ApplianceItem } from "@my-company/warehoox/features/appliance-card/appliance-item.types";

type Props = {
  item: ApplianceItem;
};

export function ApplianceCard({ item }: Props) {
  return (
    <Card>
      <Illustration className={s.illustration}>
        <PackageIcon size={92} />
      </Illustration>
      <div className={s.brand}>{item.brand}</div>
      <div className={s.equipment}>{item.equipment}</div>
    </Card>
  );
}
