import {
  buildPaginationParams,
  getURLParams,
  mergeURLParams,
  URLParamsConfig,
} from "@/utils/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useURLParams = (defaultLimit: number = 10) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentParams = getURLParams(searchParams, defaultLimit);

  const updateParams = useCallback(
    (newParams: URLParamsConfig, options?: { scroll?: boolean }) => {
      const merged = mergeURLParams(searchParams, newParams);
      router.push(`?${merged.toString()}`, {
        scroll: options?.scroll ?? false,
      });
    },
    [router, searchParams]
  );

  const updatePage = useCallback(
    (page: number) => {
      const paginationParams = buildPaginationParams(
        page,
        currentParams.limit || defaultLimit
      );
      updateParams(paginationParams);
    },
    [updateParams, currentParams.limit, defaultLimit]
  );

  const updateSearch = useCallback(
    (search: string) => {
      const params: URLParamsConfig = {
        q: search,
        ...buildPaginationParams(1, currentParams.limit || defaultLimit),
      };

      if (currentParams.sortBy) {
        params.sortBy = currentParams.sortBy;
        params.order = currentParams.order;
      }

      updateParams(params);
    },
    [
      updateParams,
      currentParams.limit,
      currentParams.sortBy,
      currentParams.order,
      defaultLimit,
    ]
  );

  const updateSort = useCallback(
    (sortValue: string) => {
      const params: URLParamsConfig = {
        ...buildPaginationParams(1, currentParams.limit || defaultLimit),
      };

      if (sortValue) {
        const [sortBy, order] = sortValue.split("_");
        params.sortBy = sortBy;
        params.order = order as "asc" | "desc";
      }

      if (currentParams.q) {
        params.q = currentParams.q;
      }

      updateParams(params);
    },
    [updateParams, currentParams.limit, currentParams.q, defaultLimit]
  );

  const resetParams = useCallback(() => {
    router.push(window.location.pathname);
  }, [router]);

  const getCurrentSortValue = useCallback((): string => {
    if (currentParams.sortBy && currentParams.order) {
      return `${currentParams.sortBy}_${currentParams.order}`;
    }
    return "";
  }, [currentParams.sortBy, currentParams.order]);

  return {
    params: currentParams,
    updateParams,
    updatePage,
    updateSearch,
    updateSort,
    resetParams,
    getCurrentSortValue,
  };
};
