import React, { useState } from "react";
import axiosWithAuth from "../util/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [newColor, setNewColor] = useState({ color: "", hexCode: "" });
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  function handleChange(e) {
    setNewColor({ ...newColor, [e.target.name]: e.target.value });
  }

  const addColor = e => {
    e.preventDefault();
    if (!newColor.color && !newColor.hexCode) {
      return;
    }

    axiosWithAuth()
      .post("/colors", {
        color: newColor.color,
        code: {
          hex: newColor.hexCode
        }
      })
      .then(res => {
        updateColors(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data);
        let updatedColorsData = colors.map(color => {
          if (color.id === res.data.id) {
            return res.data;
          }
          return color;
        });

        updateColors(updatedColorsData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res.data);
        let updatedColorsData = colors.filter(color => {
          return color.id !== res.data;
        });

        updateColors(updatedColorsData);
      });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            name="color"
            value={newColor.color}
            onChange={handleChange}
            placeholder="color name"
          />
        </label>
        <label>
          hex code:
          <input
            name="hexCode"
            value={newColor.hexCode}
            onChange={handleChange}
            placeholder="hex color"
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
