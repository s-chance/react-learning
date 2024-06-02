import ReactDOM from "react-dom/client";
import { RouterProvider } from "@/router";
import { fetchChannelAPI } from "./apis/list";

fetchChannelAPI().then((res) => {
  console.log(res.data.data.channels);
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider />
);
