import { useDispatch } from "react-redux";
import store from "@/store";

const useUserDispatch = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  return dispatch;
};

export { useUserDispatch };
