import { RootState, UserState } from "@/store/modules/user";
import { useSelector } from "react-redux";

const useUserSelector = () => {
  const user = useSelector<RootState, UserState>((state) => state.user);
  return user;
};

export { useUserSelector };
