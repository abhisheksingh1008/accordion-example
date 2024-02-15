import { FC, useEffect, useState } from "react";
import classes from "../styles/Accordion.module.css";
import Celebrity from "../interfaces/celebrity.interface";
import AccordionItem from "./AccordionItem";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/celebritySlice";

type AccordionProps = {
  search: string;
};

const Accordion: FC<AccordionProps> = ({ search }) => {
  const dispatch = useDispatch();
  const { celebrities: allCelebrities, selectedCelebrity, celebrityBeingEdited } = useSelector((state: any) => state.celebrity)

  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);

  useEffect(() => {
    if (search.trim().length > 0) {
      debounceFunc(search);
    } else {
      setCelebrities(allCelebrities);
    }
  }, [search, allCelebrities]);

  const onAccordionClick = (c: Celebrity) => {
    if (celebrityBeingEdited === null) {
      if (selectedCelebrity?.id === c?.id) {
        dispatch(actions.setSelectedCelebrity({ celebrity: null }))
      } else {
        dispatch(actions.setSelectedCelebrity({ celebrity: c }))
      }
    } else {
      toast.error(
        "An item is currently being edited, save or cancel to open another."
      );
    }
  };

  const debounceFunc = debounce((value: string) => {
    setCelebrities(
      allCelebrities.filter((c) => {
        if (
          c.name.toLowerCase().includes(value.toLowerCase())
        )
          return c;
      })
    );
  }, 0);

  return (
    <div className={classes.accordion}>
      {(
        celebrities.length > 0 && celebrities.map((c, i) => (
          <AccordionItem
            key={c.id}
            celebrity={c}
            onClick={onAccordionClick}
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
