import { useMemo } from "react";
import { useNOCGroups } from "./useNOCGroups";
import { useFlattenedNOC } from "./useFlattenedNOC";

export function useNOCSearch(searchTerm) {
  const groups = useNOCGroups();
  const flattened = useFlattenedNOC();

  return useMemo(() => {
    if (!searchTerm?.trim()) return groups;

    const lower = searchTerm.toLowerCase();
    const matched = new Set();

    // Match por sinônimos
    for (const item of flattened) {
      if (item.title.toLowerCase().includes(lower)) {
        matched.add(item.group);
      }
    }

    // Match por título principal
    for (const group of groups) {
      if (group.toLowerCase().includes(lower)) {
        matched.add(group);
      }
    }

    return [...matched].sort();
  }, [searchTerm, groups, flattened]);
}
