import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [foodName, setFoodName] = useState("");
  const [days, setDays] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) => {
      setFoodList(response.data);
      console.log(foodList);
    });
  }, []);

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      days: days,
    });
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>CRUD App with MERN</h1>
      <label>Food Name: </label>
      <input
        type="text"
        onChange={(e) => {
          setFoodName(e.target.value);
        }}
      />
      <label>Days Since You Ate It</label>
      <input
        type="number"
        onChange={(e) => {
          setDays(e.target.value);
        }}
      />
      <button onClick={addToList}>Add to List</button>
      <h1>Food List</h1>
      {foodList.map((food, index) => (
        <div className="food" key={index}>
          <h1>{food.foodName}</h1>
          <h1>{food.daysSinceIAte}</h1>
          <input
            onChange={(e) => {
              setNewFoodName(e.target.value);
            }}
            type="text"
            placeholder="New Food Name.."
          />
          <button onClick={() => updateFood(food._id)}>Update</button>
          <button onClick={() => deleteFood(food._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
