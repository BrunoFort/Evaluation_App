import { useMemo } from "react";
import { noc2021 } from "../noc2021";

export function useFlattenedNOC() {
  return useMemo(() => {
    const list = [];

    for (const group of Object.keys(noc2021)) {
      for (const title of noc2021[group]) {
        list.push({ group, title });
      }
    }

    return list;
  }, []);
}
