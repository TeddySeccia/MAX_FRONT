import { useQueryClient } from "@tanstack/react-query";

export function useNavigationTrail() {
  const queryClient = useQueryClient();

  const trail = queryClient.getQueryData(['navigationTrail']) || [null];

  const currentParentId = trail[trail.length - 1];

  const setNextParent = (newParentId) => {
    const newTrail = [...trail, newParentId];
    queryClient.setQueryData(['navigationTrail'], newTrail);
  };

  const goBack = () => {
    if (trail.length <= 1) return; // On ne peut pas remonter plus haut
    const newTrail = trail.slice(0, -1);
    queryClient.setQueryData(['navigationTrail'], newTrail);
  };

  return {
    currentParentId,
    trail,
    setNextParent,
    goBack,
  };
}
