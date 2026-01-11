import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client: mounted
    () => false // Server: not mounted
  );
}
