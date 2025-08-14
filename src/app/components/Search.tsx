"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) router.push(`/results/${search}`);
    setSearch("");
  };

  return (
    <form
      className="flex justify-center md:justify-between "
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder="Search"
        className="bg-black p-2 w-[260px] sm:w-80 text-xl rounded-xl text-white"
      />
    </form>
  );
}
