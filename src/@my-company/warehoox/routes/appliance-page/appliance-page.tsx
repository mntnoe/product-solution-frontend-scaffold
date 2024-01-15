import { ApplianceCard } from "@my-company/warehoox/features/appliance-card/appliance-card";
import { AddApplianceButton } from "@my-company/warehoox/routes/appliance-page/add-appliance-button";
import { useAppliancePageItems } from "@my-company/warehoox/routes/appliance-page/appliance-page-items.api";
import s from "@my-company/warehoox/routes/appliance-page/appliance-page.module.css";

export function AppliancePage() {
  const { data, isLoading, isError } = useAppliancePageItems();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return null;

  return (
    <div className={s.items}>
      <AddApplianceButton />
      {data?.map((item: any) => <ApplianceCard key={item.id} item={item} />)}
    </div>
  );
}
