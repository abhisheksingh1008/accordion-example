import { FC, useEffect, useState } from "react";
import classes from "../styles/Accordion.module.css";
import Celebrity from "../interfaces/celebrity.interface";
import AccordionItem from "./AccordionItem";
import toast from "react-hot-toast";

type AccordionProps = {
  search: string;
};

const Accordion: FC<AccordionProps> = ({ search }) => {
  const [allCelebrities, setAllCelebrities] = useState<Celebrity[]>([]);
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [selected, setSelected] = useState<number>(-1);
  const [currentlyBeingEdited, setCurrentlyBeingEdited] =
    useState<Celebrity | null>(null);

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
          setCelebrities(data);
          setAllCelebrities(data);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };

    fetchCelebrities();
  }, []);

  useEffect(() => {
    if (search.trim().length > 0) {
      debounceFunc(search);
    } else {
      setCelebrities(allCelebrities);
    }
  }, [search, allCelebrities]);

  const onAccordionClick = (i: number) => {
    if (currentlyBeingEdited === null) {
      if (selected === i) {
        setSelected(-1);
      } else {
        setSelected(i);
      }
    } else {
      toast.error(
        "An item is currently being edited, save or cancel to open another."
      );
    }
  };

  const onDeleteCelebrity = (c: Celebrity) => {
    setAllCelebrities(allCelebrities.filter((celeb) => c.id !== celeb.id));
    setSelected(-1);
  };

  const debounceFunc = debounce((value: string) => {
    setCelebrities(
      allCelebrities.filter((c) => {
        const userName = c.first + " " + c.last;
        if (
          userName.toLowerCase().includes(value.toLowerCase()) ||
          userName.toLowerCase().includes(value.toLowerCase())
        )
          return c;
      })
    );
  }, 0);

  return (
    <div className={classes.accordion}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        celebrities.map((c, i) => (
          <AccordionItem
            i={i}
            key={c.id}
            celebrity={c}
            selected={selected === i}
            onClick={onAccordionClick}
            onDelete={onDeleteCelebrity}
            editingEnabled={setCurrentlyBeingEdited}
          />
        ))
      )}
    </div>
  );
};

function debounce(callback: Function, delay: number = 500): Function {
  let timer: NodeJS.Timeout;
  return function (...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      return callback(...args);
    }, delay);
  };
}

export default Accordion;
