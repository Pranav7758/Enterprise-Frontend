import { createContext, useContext, useState, type ReactNode } from "react";
import { getStoredUser, storeUser, type Role } from "./mock-data";

interface RoleContextValue {
  currentRole: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue>({
  currentRole: "super-admin",
  setRole: () => {},
});

export function RoleProvider({ children }: { children: ReactNode }) {
  const user = getStoredUser();
  const [currentRole, setCurrentRole] = useState<Role>(user?.role ?? "super-admin");

  const setRole = (role: Role) => {
    const u = getStoredUser();
    if (u) storeUser({ ...u, role });
    setCurrentRole(role);
  };

  return (
    <RoleContext.Provider value={{ currentRole, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
