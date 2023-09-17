import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import isUrlHttp from "is-url-http";
import extractDomain from "extract-domain";

import styles from "./SearchBar.module.css";
import { uiActions } from "../store/uiSlice";

const initialCrawled = localStorage.getItem("crawledDomains");

function Searchbar() {
  const [URL, setURL] = useState("");
  const dispatch = useDispatch();

  const [crawledDomains, setCrawledDomains] = useState(() =>
    initialCrawled ? JSON.parse(initialCrawled) : []
  );

  useEffect(() => {
    if (!crawledDomains) return;
    const updatedElement = crawledDomains.at(-1);
    if (!updatedElement?.domain) return;
    const itemExists = localStorage.getItem("crawledDomains");

    const locallyCrawled = itemExists ? JSON.parse(itemExists) : [];

    const crawlExists = locallyCrawled.find(
      (c) => c.domain === updatedElement.domain
    );
    if (crawlExists) return;
    localStorage.setItem(
      "crawledDomains",
      JSON.stringify([...locallyCrawled, updatedElement])
    );
  }, [crawledDomains]);

  async function handleCrawled() {
    const post_array = [
      {
        url: URL,
        filters: [["url", "=", URL]],
        enable_javascript: true,
        custom_js: "meta = {}; meta.url = document.URL; meta;",
      },
    ];
    const response = await axios({
      method: "post",
      url: "https://api.dataforseo.com/v3/on_page/instant_pages",
      auth: {
        username: import.meta.env.VITE_DATAFORSEO_USERNAME,
        password: import.meta.env.VITE_DATAFORSEO_PASSWORD,
      },
      data: post_array,
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response["data"]["tasks"][0]["result"][0]["items"][0];
    dispatch(uiActions.setResults(data));
    dispatch(uiActions.setIsLoading(false));

    setURL("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isUrlHttp(URL)) return;
    // Setting URL early so that the Loader can access it for UI changes
    dispatch(uiActions.setURL(URL));
    dispatch(uiActions.setIsLoading(true));

    const domain = extractDomain(URL);

    const isCrawled = crawledDomains.find((c) => c.domain === domain && c);
    if (isCrawled) {
      return handleCrawled(isCrawled.taskID);
    }

    const post_array = [
      {
        target: domain,
        max_crawl_pages: 1,
        load_resources: true,
        enable_javascript: true,
        enable_browser_rendering: true,
        allow_subdomains: true,
        custom_js: "meta = {}; meta.url = document.URL; meta;",
      },
    ];

    const response = await axios({
      method: "post",
      url: "https://api.dataforseo.com/v3/on_page/task_post",
      auth: {
        username: import.meta.env.VITE_DATAFORSEO_USERNAME,
        password: import.meta.env.VITE_DATAFORSEO_PASSWORD,
      },
      data: post_array,
      headers: {
        "content-type": "application/json",
      },
    });

    const id = await response["data"]["tasks"][0]["id"];

    setCrawledDomains((prevState) => [...prevState, { domain, taskID: id }]);

    const interval = setInterval(async () => {
      const response = await axios({
        method: "get",
        url: "https://api.dataforseo.com/v3/on_page/tasks_ready",
        auth: {
          username: import.meta.env.VITE_DATAFORSEO_USERNAME,
          password: import.meta.env.VITE_DATAFORSEO_PASSWORD,
        },
        headers: {
          "content-type": "application/json",
        },
      });
      const taskReady = response["data"]["tasks"][0]["result"]?.find(
        (task) => task.id === id
      );

      if (taskReady) {
        handleCrawled();
        clearInterval(interval);
      }
    }, 3000);
  }

  return (
    <form className={styles.layout} onSubmit={handleSubmit}>
      <label htmlFor="search">URL</label>
      <div className={styles.search}>
        <input
          type="text"
          id="search"
          value={URL}
          onChange={(e) => setURL(e.target.value)}
          placeholder="eg. https://thecakeblog.com/"
        />
        <button type="button" className={styles.btn} onClick={handleSubmit}>
          Search
        </button>
      </div>
    </form>
  );
}

export default Searchbar;
