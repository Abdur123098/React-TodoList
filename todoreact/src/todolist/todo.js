import "./style.css";
import { useState, useEffect } from "react";

// Getting data out of localStorage

const getLocalData = () => {
  const list = localStorage.getItem("todolist");

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(getLocalData());

  // Add item function:

  const addItem = () => {
    if (!input) {
      alert("Please Add your task");
    } else {
      const newInput = {
        id: new Date().getTime().toString(),
        name: input,
      };

      setItem([...item, newInput]);
      setInput("");
    }
  };

  // Remove/Delete item function

  const deleteItem = (id) => {
    const updatedItems = item.filter((curElem) => {
      return curElem.id !== id;
    });
    setItem(updatedItems);
  };

  // Remove/Delete all items function

  const removeAll = () => {
    setItem([]);
  };

  // Adding localstorage

  {
    useEffect(() => {
      localStorage.setItem("todolist", JSON.stringify(item));
    }, [item]);
  }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todoimage" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️Add your items"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <i className="fa fa-plus add-btn" onClick={addItem}></i>
          </div>

          {/* Show items */}

          <div className="showItems">
            {item.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    {/* <i className="far fa-edit add-btn"></i> */}
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remove All Button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
