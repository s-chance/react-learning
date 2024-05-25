import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { removeToken, request } from "@/utils";
import { LoginForm } from "@/pages/Login/types";
import { setToken as _setToken, getToken } from "@/utils";

export type UserInfo = {
  id: number;
  name: string;
  gender: number;
  birthday: string;
  phone: string;
  avatar: string;
};

export interface UserState {
  token: string;
  userInfo: UserInfo;
}

export interface RootState {
  user: UserState;
}

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
    userInfo: {},
  },
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      _setToken(action.payload);
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userInfo = action.payload;
    },
    clearUserInfo(state) {
      state.token = "";
      state.userInfo = {};
      removeToken();
    },
  },
});

const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

const userReducer = userStore.reducer;

const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: Dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};

const fetchUserInfo = () => {
  return async (dispatch: Dispatch) => {
    const res = await request.get("/user/profile");
    dispatch(setUserInfo(res.data));
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo };

export default userReducer;
