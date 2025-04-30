import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/userApi";
import UserContext from "./UserContext";

export function UserProvider({ children }) {
  const queryClient = useQueryClient();

  // useQuery va lancer fetchCurrentUser au montage et mettre en cache la réponse
  const {
    data: user,
    isLoading,
    isError,
    refetch: refetchUser,
  } = useQuery({
    queryKey:["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,                // si token invalide, pas de retry
    staleTime: 5 * 60 * 1000,    // 5 min avant de considérer le user “vieux”
    cacheTime: 30 * 60 * 1000,   // 30 min en cache après inactivité
  });

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("accessToken");
    // on purge le cache de la query user
    queryClient.removeQueries(["currentUser"]);
  };

  return (
    <UserContext.Provider value={{ user, isLoading, isError, refetchUser, logout }}>
      {isLoading ? <p>Chargement global…</p> : children}
    </UserContext.Provider>
  );
}
