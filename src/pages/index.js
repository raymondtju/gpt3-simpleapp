import Head from "next/head";
import { useState, useEffect } from "react";

import { Inter } from "@next/font/google";
import Footer from "@/components/Footer";
const inter = Inter({
  variable: "--inter-font",
  subsets: ["latin"],
});

export default function Home() {
  const [data, setData] = useState({ data: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [search]);

  return (
    <>
      <Head>
        <title>GPT-3 Simple App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`flex flex-col max-w-7xl justify-center w-full m-auto align-center ${inter.className}`}
      >
        <div className="w-10/12 m-auto">
          <header className="mt-16 text-center">
            <h1 className="text-4xl font-extrabold">GPT-3</h1>
            <p className="text-sm font-bold text-inherit">
              Check and fix the grammar, spelling, and punctuation mistakes.
            </p>
          </header>
          <textarea
            className="block w-full p-2 pl-4 mt-12 border border-black rounded-md h-36 border-1"
            type="textarea"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter your text or paragraph here"
            defaultValue={""}
          />

          <button
            type="button"
            onClick={() => setSearch(query)}
            className="block p-2 pl-12 pr-12 m-auto mt-2 rounded-full bg-slate-400"
          >
            Send
          </button>

          {data.data && (
            <div className="p-2 pl-4 mt-8 transition-all duration-300 ease-in-out border-2 rounded-md">
              <h3 className="text-xl font-bold">Result</h3>
              {data.data && <hr className="mt-2 mb-2"></hr>}
              {isLoading ? <div>Loading ...</div> : <span> {data.data} </span>}
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
