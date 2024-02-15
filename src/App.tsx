import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BsSearch } from "react-icons/bs";
import Accordion from "./components/Accordion";
import classes from "./styles/Accordion.module.css";
import { actions } from "./store/celebritySlice";
import "./App.css";
import { calculateAge } from "./utils/helperFunctions";

function App() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const fetchCelebrities = async () => {
      setLoading(true);
      fetch("/db/celebrities.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const allCelebrities = data.map((c) => ({
            id: c.id,
            name: c.first + " " + c.last,
            age: calculateAge(c.dob),
            gender: c.gender,
            email: c.email,
            picture: c.picture,
            country: c.country,
            description: c.description,
          }))
          dispatch(actions.setAllCelebrities({ celebrities: allCelebrities }))
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };

    fetchCelebrities();
  }, []);

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
      {loading ? <span>Loading....</span> : <Accordion search={search} />}
    </div>
  );
}

export default App;
