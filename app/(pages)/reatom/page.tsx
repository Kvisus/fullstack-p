"use client";
import { Button } from "@/components/ui/button";
import { action, atom, computed, withAsyncData } from "@reatom/core";
import { reatomComponent } from "@reatom/react";

const counter = atom(0);
const isEven = computed(() => counter() % 2 === 0);

const list = atom([], "list").extend(target => {
  const isLoading = atom(false, `${target.name}.isLoading`);
  const load = action(async (page: number) => {
    //... fetch data
  }, `${target.name}.load`);
  return {
    isLoading,
    load,
  };
});

const page = atom(1, "page");
const fetchList = action(async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`);
  const data = await res.json();
  return data;
}, "fetchList").extend(withAsyncData({ initState: [] }));
// fetchList.ready();
// fetchList.data();
// fetchList.error();
fetchList(); // promise fetch first page

const ReatomPage = reatomComponent(() => {
  return (
    <div>
      <p>{counter()}</p>
      <p>{isEven() ? "Even" : "Odd"}</p>
      <Button
        onClick={() => {
          counter.set(prev => prev + 1);
          // console.log(counter())
        }}
      >
        Increment
      </Button>
    </div>
  );
}, "ReatomPage");

export default ReatomPage;
