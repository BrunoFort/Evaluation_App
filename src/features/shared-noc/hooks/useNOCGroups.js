import { useMemo } from "react";
import { noc2021 } from "../noc2021";

export function useNOCGroups() {
  return useMemo(() => Object.keys(noc2021).sort(), []);
}
