import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";
import Modal from "react-modal";

const getListData = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [list, setList] = useState(getListData());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const [showModal, setShowModal] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");

    if (!name) {
      // display alert
      showAlert(true, "danger", "Please enter a name");
    } else if (name && isEditing) {
      // edit
      setList(
        list.map((i) => {
          if (i.id === editId) return { ...i, title: name, quantity: quantity };
          return i;
        })
      );
      showAlert(true, "success", "value changed");
      setName("");
      setIsEditing(false);
      setEditId(null);
      setQuantity(1);
      document.getElementById("objQuantity").value = 1;
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
        quantity: quantity,
      };
      showAlert(true, "success", "Item added " + newItem.id);
      setList([...list, newItem]);
      setName("");
      setQuantity(1);
      document.getElementById("objQuantity").value = 1;
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const item = list.find((i) => i.id === id);
    setIsEditing(true);
    setName(item.title);
    setEditId(item.id);
    setQuantity(item.quantity);
    document.getElementById("objQuantity").value = item.quantity;
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery bud</h3>
        <div className="form-control">
          <input
            className="grocery quantity"
            id="objQuantity"
            type="number"
            placeholder="1"
            defaultValue={1}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="text"
            className="grocery"
            placeholder="e.g Eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            // showModal={setShowModal}
            removeItem={removeItem}
            editItem={editItem}
          />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
