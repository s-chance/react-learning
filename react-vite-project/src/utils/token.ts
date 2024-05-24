const TOKEN = "token";

const setToken = (token: string) => {
  localStorage.setItem(TOKEN, token);
};

const getToken = (): string | null => {
  return localStorage.getItem(TOKEN);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN);
};

export { setToken, getToken, removeToken };
