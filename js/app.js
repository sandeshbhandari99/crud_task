// ....
import { groceryItems } from "./data.js";
import { createItems } from "./items.js";
import { createForm } from "./form.js";

function getLocalStorage() {
  const list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return groceryItems;
}

function setLocalStorage(itemsArray) {
  localStorage.setItem("grocery-list", JSON.stringify(itemsArray));
}

// Initialize items from local storage
let items = getLocalStorage();
let editId = null;
// Render App
function render() {
  const app = document.getElementById("app");
  app.innerHTML = "";
  const formElement = createForm(
    editId,
    editId ? items.find((item) => item.id === editId) : null,
  );
  const itemsElement = createItems(items);
  app.appendChild(formElement);
  app.appendChild(itemsElement);
}
render();
// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Add Item Function
export function addItem(itemName, dueDate = null) {
  const now = new Date().toLocaleString();
  const newItem = {
    name: itemName,
    completed: false,
    id: generateId(),
    dueDate: dueDate || null,
    addedDate: now,
    updatedDate: now,
  };
  items = [...items, newItem];
  setLocalStorage(items);
  render();
  setTimeout(() => alert("Item Added Successfully!"), 0);
}
// Initialize App
render();
// Edit Completed Function
export function editCompleted(itemId) {
  items = items.map((item) => {
    if (item.id === itemId) {
      return { ...item, completed: !item.completed };
    }
    return item;
  });
  setLocalStorage(items);
  render();
}

// Remove Item Function
export function removeItem(itemId) {
  items = items.filter((item) => item.id !== itemId);
  setLocalStorage(items);
  render();
  setTimeout(() => alert("Item Deleted Successfully!"), 0);
}
// Update Item Name Function
export function updateItemName(newName, newDueDate = null) {
  const now = new Date().toLocaleString();
  items = items.map((item) => {
    if (item.id === editId) {
      return { ...item, name: newName, dueDate: newDueDate || item.dueDate, updatedDate: now };
    }
    return item;
  });
  editId = null;
  setLocalStorage(items);
  render();
  setTimeout(() => alert("Item Updated Successfully!"), 0);
}

// Set Edit ID Function
export function setEditId(itemId) {
  editId = itemId;
  render();

  // Focus input after render
  setTimeout(() => {
    const input = document.querySelector(".form-input");
    if (input) {
      input.focus();
    }
  }, 0);
}






