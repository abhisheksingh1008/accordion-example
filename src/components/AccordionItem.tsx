import { FC, useEffect, useRef, useState } from "react";
import classes from "../styles/Accordion.module.css";
import { RxCross2 } from "react-icons/rx";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Celebrity from "../interfaces/celebrity.interface";
import Gender from "../types/gender.type";
import { calculateAge } from "../utils/helperFunctions";
import ReactTextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";
import DeleteItemModal from "./DeleteItemModal";

type AccordionItemProps = {
  i: number;
  selected: Boolean;
  celebrity: Celebrity;
  onClick: (i: number) => void;
  onDelete: (c: Celebrity) => void;
  editingEnabled: (c: Celebrity | null) => void;
};

const AccordionItem: FC<AccordionItemProps> = ({
  i,
  selected,
  celebrity,
  onClick,
  onDelete,
  editingEnabled,
}) => {
  let [ageInYears, setAgeInYears] = useState<number>(
    calculateAge(celebrity.dob)
  );
  const [editing, setEditing] = useState<Boolean>(false);
  const [userName, setUserName] = useState<string>(
    celebrity.first + " " + celebrity.last
  );
  const [enteredName, setEnteredName] = useState<string>(
    celebrity.first + " " + celebrity.last
  );
  const [age, setAge] = useState<number>(ageInYears);
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
    editingEnabled(null);
  };

  const editButtonHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEditing(true);
    editingEnabled(celebrity);
  };

  const cancelButtonHandler = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEditing(false);
    editingEnabled(null);
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
      enteredName.trim().length > 0 &&
      country.trim().length > 0 &&
      description.trim().length > 0 &&
      !countryContainsNumbers
    ) {
      celebrity.gender = gender as Gender;
      celebrity.country = country.trim();
      celebrity.description = description.trim();
      setUserName(enteredName.trim());
      setAgeInYears(age);
      setEditing(false);
      editingEnabled(null);
      setChangesMade(false);
    }
  };

  useEffect(() => {
    if (
      userName !== enteredName.trim() ||
      ageInYears !== age ||
      celebrity.gender != gender ||
      celebrity.country !== country.trim() ||
      celebrity.description !== description.trim()
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
          onClick(i);
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
              <span className={classes.name}>{userName}</span>
            )}
          </div>
          <span className={classes["toggle-icon"]}>{selected ? "-" : "+"}</span>
        </div>
        <div
          className={
            selected ? `${classes.details} ${classes.show}` : classes.details
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
                <div className={classes["info"]}>{ageInYears} Years</div>
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
                >
                  <option value="male" selected={celebrity.gender == "male"}>
                    male
                  </option>
                  <option
                    value="female"
                    selected={celebrity.gender == "female"}
                  >
                    female
                  </option>
                  <option
                    value="transgender"
                    selected={celebrity.gender == "transgender"}
                  >
                    transgender
                  </option>
                  <option
                    value="rather not say"
                    selected={celebrity.gender == "rather not say"}
                  >
                    rather not say
                  </option>
                  <option value="other" selected={celebrity.gender == "other"}>
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
                {ageInYears >= 18 && (
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
            onDelete(celebrity);
          }}
          closeModal={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default AccordionItem;
