import { ApplianceItem } from "@my-company/warehoox/features/appliance-card/appliance-item.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as logger from "@my-company/core/logger";

const queryKey = "appliance-page-items";

export function useAppliancePageItems() {
  return useQuery({
    queryKey: [queryKey],
    queryFn: (): Promise<ApplianceItem[]> =>
      fetch("/api/items?size=10").then((res) => res.json()),
  });
}

export function useAddAppliancePageItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (item: { brand: string; equipment: string }) => {},
    onSuccess: (_, variables) => {
      queryClient.setQueryData([queryKey], (items: ApplianceItem[]) => [
        { id: generateVerySafeId(), uid: "xxx", ...variables },
        ...items,
      ]);
      logger.info("appliance item added", variables);
    },
  });
}

function generateVerySafeId() {
  return Math.floor(Math.random() * 100 + 10000);
}
