import { createContext } from "react";

const UserContext = createContext<firebase.default.User | null>(null);
export default UserContext;
