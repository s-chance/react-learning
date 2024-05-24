import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { LoginForm } from "@/pages/Login/types";
import { setToken as _setToken, getToken } from "@/utils";

interface UserState {
  token: string;
}

const userStore = createSlice({
  name: "user",
  initialState: {
    token: getToken() || "",
  } as UserState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
      _setToken(action.payload);
    },
  },
});

const { setToken } = userStore.actions;

const userReducer = userStore.reducer;

const fetchLogin = (loginForm: LoginForm) => {
  return async (dispatch: Dispatch) => {
    const res = await request.post("/authorizations", loginForm);
    dispatch(setToken(res.data.token));
  };
};

export { fetchLogin, setToken };

export default userReducer;
