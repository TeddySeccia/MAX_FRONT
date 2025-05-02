// hooks/useSelectedDocuments.js
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useSelectedDocuments() {
  const queryClient = useQueryClient();

  // 1. On souscrit à la query pour se re-render quand elle change
  const { data: selected = [] } = useQuery({
    queryKey: ["selectedForMenu"],
    queryFn: () => queryClient.getQueryData(["selectedForMenu"]) ?? [],
    // On initialise si jamais il n'y a rien en cache
    initialData: () => queryClient.getQueryData(["selectedForMenu"]) ?? [],
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // 2. On bascule la sélection dans le cache
  const toggleSelected = (docId) => {
    const isAlready = selected.includes(docId);
    const next = isAlready
      ? selected.filter((id) => id !== docId)
      : [...selected, docId];
    queryClient.setQueryData(["selectedForMenu"], next);
  };

  // 3. Utilitaire de test
  const isSelected = (docId) => selected.includes(docId);

  return { selected, toggleSelected, isSelected };
}
