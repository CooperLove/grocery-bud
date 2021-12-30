import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";

Modal.setAppElement("#root");
function List({ items, removeItem, editItem }) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  return (
    <div className="grocery-list">
      <Modal
        className="modal"
        onRequestClose={() => {
          setTitle("");
          setId(null);
          setShowModal(false);
        }}
        shouldCloseOnOverlayClick={true}
        isOpen={showModal}
      >
        <h3>Delete {title} ?</h3>
        <p>Are you sure, you want to delete this item ?</p>
        <div className="modal-btns">
          <button
            className="submit-btn close"
            onClick={() => {
              setTitle("");
              setId(null);
              setShowModal(false);
            }}
          >
            Close
          </button>
          <button
            className="submit-btn confirm"
            onClick={() => {
              setShowModal(false);
              removeItem(id);
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
      {items.map((i) => {
        const { id, title, quantity } = i;
        return (
          <article className="grocery-item" key={id}>
            <p className="title">
              {quantity} - {title}
            </p>
            <div>
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  setTitle(title);
                  setId(id);
                  setShowModal(true);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default List;
