export interface URLParamsConfig {
  limit?: number;
  skip?: number;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  [key: string]: string | number | boolean | undefined;
}

export const buildPaginationParams = (
  page: number,
  limit: number
): URLParamsConfig => ({
  limit,
  skip: limit * (page - 1),
});

export const calculatePageFromSkip = (skip: number, limit: number): number => {
  return Math.floor(skip / limit) + 1;
};

export const mergeURLParams = (
  currentParams: URLSearchParams,
  newParams: URLParamsConfig
): URLSearchParams => {
  const merged = new URLSearchParams(currentParams.toString());

  Object.entries(newParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      merged.set(key, value.toString());
    } else {
      merged.delete(key);
    }
  });

  return merged;
};

export const getURLParams = (
  searchParams: URLSearchParams,
  defaultLimit: number = 10
): URLParamsConfig & { currentPage: number } => {
  const limit = Number(searchParams.get("limit")) || defaultLimit;
  const skip = Number(searchParams.get("skip")) || 0;
  const currentPage = calculatePageFromSkip(skip, limit);

  return {
    limit,
    skip,
    q: searchParams.get("q") || "",
    sortBy: searchParams.get("sortBy") || "",
    order: (searchParams.get("order") as "asc" | "desc") || undefined,
    currentPage,
  };
};

export const paramsToObject = (
  params: URLSearchParams
): Record<string, string> => {
  const obj: Record<string, string> = {};
  params.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
};

export const cleanEmptyParams = (params: URLParamsConfig): URLParamsConfig => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};
