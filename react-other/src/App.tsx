import { useEffect } from "react";
import { create } from "zustand";

type Store = {
  count: number;
  inc: () => void;
  data: {
    id: string;
    name: string;
  }[];
  fetchData: () => void;
};

const URL = "https://example.com";

const useStore = create<Store>()((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  data: [],
  fetchData: async () => {
    const res = await fetch(URL);
    const jsonRes = await res.json();
    console.log(jsonRes);
    set({ data: jsonRes.data.channels });
  },
}));

function Counter() {
  const { count, inc, data, fetchData } = useStore();
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <button onClick={inc}>{count}</button>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
