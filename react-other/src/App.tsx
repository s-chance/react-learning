import { useEffect } from "react";
import { StateCreator, create } from "zustand";

type CounterStore = {
  count: number;
  inc: () => void;
};

type DataStore = {
  data: {
    id: string;
    name: string;
  }[];
  fetchData: () => Promise<void>;
};

const createCounterStore: StateCreator<
  CounterStore & DataStore,
  [],
  [],
  CounterStore
> = (set) => ({
  count: 1,
  inc: () => set((state: { count: number }) => ({ count: state.count + 1 })),
});

const URL = "https://example.com";

const createDataStore: StateCreator<
  CounterStore & DataStore,
  [],
  [],
  DataStore
> = (set) => ({
  data: [],
  fetchData: async () => {
    const res = await fetch(URL);
    const jsonRes = await res.json();
    console.log(jsonRes);
    set({ data: jsonRes.data.channels });
  },
});

const useStore = create<CounterStore & DataStore>()((...a) => {
  return {
    ...createCounterStore(...a),
    ...createDataStore(...a),
  };
});

function App() {
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

export default App;
