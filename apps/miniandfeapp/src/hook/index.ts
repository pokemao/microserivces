import { debounce, DebounceOptions } from "@/utils";
import { AxiosResponse } from "axios";
import { useCallback } from "react";

export interface useDebounceOptions extends DebounceOptions {}

export const useDebounce = <F extends (...args: unknown[]) => PromiseLike<AxiosResponse> | AxiosResponse> (
  fn: F,
  dependsOn: unknown[] = [],
  options: useDebounceOptions = {}
) => {
  return useCallback(debounce(fn, options), dependsOn)
}
