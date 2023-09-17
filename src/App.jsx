import { useSelector } from "react-redux";
import { useEffect } from "react";

import Searchbar from "./components/Searchbar";
import Title from "./components/Title";
import ResultGrid from "./components/ResultGrid";
import Item from "./components/Item";
import UrlDisplay from "./components/UrlDisplay";
import PageScore from "./components/PageScore";
import Loader from "./components/Loader";

function App() {
  const { results, URL, pageScore, isLoading } = useSelector(
    (store) => store.ui
  );

  useEffect(() => {
    const crawledExists = localStorage.getItem("crawledDomains");
    if (!crawledExists) {
      localStorage.setItem("crawledDomains", JSON.stringify([]));
    }

    // return () => localStorage.removeItem("crawledDomains");
  }, []);

  return (
    <>
      <Title />
      <Searchbar />
      {!isLoading && URL && <UrlDisplay />}
      {!isLoading && pageScore && <PageScore />}
      {!isLoading && (
        <ResultGrid>
          {results.map((result) => (
            <Item key={crypto.randomUUID()} item={result} />
          ))}
        </ResultGrid>
      )}
      {isLoading && <Loader />}
    </>
  );
}

export default App;
