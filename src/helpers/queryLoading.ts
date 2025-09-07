export function queryLoading(query: {
  isLoading?: boolean;
  isFetching?: boolean;
  isRefetching?: boolean;
}) {
  return query?.isLoading || query?.isFetching || query?.isRefetching || false;
}
