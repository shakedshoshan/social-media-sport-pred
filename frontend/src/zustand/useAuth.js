    import { create } from "zustand";
    import { persist } from "zustand/middleware";
    
    const useAuth = create(
      persist(
        (set, get) => ({
          authUser: null,
          setAuthUser: (authUser) => set({ authUser }),
          getAuthUser: () => get().authUser,
          // logout: () => set({ authUser: null }),
        }),
        {
          name: "auth-storage", // name of the storage key
          getStorage: () => localStorage,
        }
      )
    );
    
    export default useAuth;
