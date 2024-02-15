import { FC, useEffect, useState } from "react";
import classes from "../styles/Accordion.module.css";
import { RxCross2 } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Celebrity from "../interfaces/celebrity.interface";
import ReactTextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";
import DeleteItemModal from "./DeleteItemModal";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../store/celebritySlice";

type AccordionItemProps = {
  celebrity: Celebrity;
  onClick: (c: Celebrity) => void;
};

const AccordionItem: FC<AccordionItemProps> = ({
  celebrity,
  onClick,
}) => {
  const dispatch = useDispatch();
  const { selectedCelebrity, celebrityBeingEdited } = useSelector((state: any) => state.celebrity)

  const [editing, setEditing] = useState<Boolean>(false);
  const [enteredName, setEnteredName] = useState<string>(
    celebrity.name
  );
  const [age, setAge] = useState<number>(celebrity.age);
  const [gender, setGender] = useState<string>(celebrity.gender);
  const [country, setCountry] = useState<string>(celebrity.country);
  const [description, setDescription] = useState<string>(celebrity.description);
  const [changesMade, setChangesMade] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const deleteButtonHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const editButtonHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEditing(true);
    dispatch(actions.setCelebrityBeingEdited({ celebrity: celebrity }));
  };

  const cancelButtonHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEditing(false);
    dispatch(actions.setCelebrityBeingEdited({ celebrity: null }))
  };

  const saveButtonHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const countryContainsNumbers = /\d/.test(country);
    if (countryContainsNumbers) {
      toast.error("Country cannot consist of numbers.");
      return;
    }

    if (
      changesMade &&
      enteredName?.trim().length > 0 &&
      country?.trim().length > 0 &&
      description?.trim().length > 0 &&
      !countryContainsNumbers
    ) {
      dispatch(actions.updateCelebrity({
        celebrity: {
          id: celebrity.id,
          name: enteredName,
          age: age,
          gender: gender,
          country: country,
          email: celebrity.email,
          description: description,
          picture: celebrity.picture,
        }
      }));
      setEditing(false);
      setChangesMade(false);
      dispatch(actions.setCelebrityBeingEdited({ celebrity: null }));
    }
  };

  useEffect(() => {
    if (
      celebrity.name !== enteredName?.trim() ||
      celebrity.age !== age ||
      celebrity.gender != gender ||
      celebrity.country !== country?.trim() ||
      celebrity.description !== description?.trim()
    ) {
      setChangesMade(true);
    } else {
      setChangesMade(false);
    }
  }, [enteredName, age, gender, country, description]);

  return (
    <>
      <div
        className={classes["accordion-item"]}
        onClick={() => {
          if (editing) return;
          onClick(celebrity);
        }}
      >
        <div className={classes.title}>
          <div className={classes.top}>
            <div className={classes["avatar-container"]}>
              <img
                src={celebrity.picture}
                alt="celebrity picture"
                className={classes.avatar}
              />
            </div>
            {editing ? (
              <input
                required
                type="text"
                value={enteredName}
                className={`${classes["name-input"]} ${classes.input}`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEnteredName(e.target.value);
                }}
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  width: "70%",
                }}
              />
            ) : (
              <span className={classes.name}>{celebrity.name}</span>
            )}
          </div>
          <span className={classes["toggle-icon"]}>{selectedCelebrity?.id === celebrity?.id ? "-" : "+"}</span>
        </div>
        <div
          className={
            selectedCelebrity?.id === celebrity?.id ? `${classes.details} ${classes.show}` : classes.details
          }
        >
          <div className={classes["celebrity-info"]}>
            <div>
              <div className={classes["info-title"]}>Age</div>
              {editing ? (
                <input
                  required
                  type="number"
                  value={age}
                  min={1}
                  className={`${classes["details-input"]} ${classes.input}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAge(+e.target.value);
                  }}
                />
              ) : (
                <div className={classes["info"]}>{celebrity.age} Years</div>
              )}
            </div>
            <div>
              <div className={classes["info-title"]}>Gender</div>
              {editing ? (
                <select
                  required
                  className={`${classes["details-input"]} ${classes.input}`}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setGender(e.target.value);
                  }}
                  defaultValue={celebrity.gender}
                >
                  <option value="male">
                    male
                  </option>
                  <option value="female"
                  >
                    female
                  </option>
                  <option value="transgender"
                  >
                    transgender
                  </option>
                  <option
                    value="rather not say"
                  >
                    rather not say
                  </option>
                  <option value="other">
                    other
                  </option>
                </select>
              ) : (
                <div className={classes["info"]}>{celebrity.gender}</div>
              )}
            </div>
            <div>
              <div className={classes["info-title"]}>Coutry</div>
              {editing ? (
                <input
                  required
                  type="text"
                  value={country}
                  className={`${classes["details-input"]} ${classes.input}`}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCountry(e.target.value);
                  }}
                />
              ) : (
                <div className={classes["info"]}>{celebrity.country}</div>
              )}
            </div>
          </div>
          <div className={classes["celebrity-decription"]}>
            <div className={classes["info-title"]}>Description</div>
            {editing ? (
              <ReactTextareaAutosize
                required
                value={description}
                className={classes["description-input"]}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setDescription(e.target.value);
                }}
              />
            ) : (
              celebrity.description
            )}
          </div>
          <div className={classes.options}>
            {editing ? (
              <>
                <button onClick={cancelButtonHandler}>
                  <RxCross2 size="1.5rem" color="red" />
                </button>
                <button
                  disabled={!changesMade}
                  onClick={saveButtonHandler}
                  style={{ marginLeft: "0.5rem" }}
                >
                  <IoCheckmarkCircleOutline size="1.5rem" color="green" />
                </button>
              </>
            ) : (
              <>
                <button onClick={deleteButtonHandler}>
                  <RiDeleteBin6Line size="1.25rem" color="red" />
                </button>
                {celebrity.age >= 18 && (
                  <button
                    onClick={editButtonHandler}
                    style={{ marginLeft: "0.75rem" }}
                  >
                    <MdModeEdit size="1.25rem" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <DeleteItemModal
          onDelete={() => {
            dispatch(actions.deleteCelebrity({ celebrity: celebrity }))
            dispatch(actions.setSelectedCelebrity({ celebrity: null }))
          }}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default AccordionItem;
