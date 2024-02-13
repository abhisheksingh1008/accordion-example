import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import Accordion from "./components/Accordion";
import classes from "./styles/Accordion.module.css";
import "./App.css";

function App() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <div className={classes["search-container"]}>
        <BsSearch className={classes["search-icon"]} />
        <input
          type="text"
          value={search}
          placeholder="Search user"
          className={classes["search-input"]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Accordion search={search} />
    </div>
  );
}

export default App;
