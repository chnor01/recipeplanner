import React, { useEffect, useState } from "react";

const ViewShopping = () => {
  const [shoppinglist, setShoppinglist] = useState([]);

  useEffect(() => {
    const fetchShopping = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, please log in.");
          return;
        }
        const response = await fetch(
          "http://localhost:5000/api/recipes/shopping-list",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        setShoppinglist(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };

    fetchShopping();
  }, []);

  return (
    <div>
      <header>
        <h1>Shopping list for the week </h1>
      </header>

      <ol>
        {shoppinglist.length > 0 ? (
          shoppinglist.map((shoppinglist, index) => (
            <li key={index}>
              {shoppinglist.item} - {shoppinglist.quantity}g
            </li>
          ))
        ) : (
          <li>No shopping list found</li>
        )}
      </ol>
    </div>
  );
};

export default ViewShopping;
