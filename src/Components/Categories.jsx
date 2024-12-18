import { useState, useEffect } from 'react'
import axios from 'axios';

function Categories({ value, changeCat }) {
  const [categoriesList, setCategoriesList] = useState([])

  useEffect(() => {
    // axios.get("http://localhost:548700/potatoes/list")
    axios.get("http://95.142.35.105:54870/categories/list")
      .then((response) => {
        const defaultCategory = { id: 0, title: "Все категории" };
        setCategoriesList([defaultCategory, ...response.data]);
      })
      .catch((error) => {
        console.error("cats bad!", error);
      });
  }, []);

  return (
    <div className="categories">
      <ul>
        {
          categoriesList.map((v) => (
            <li key={v.id} onClick={() => changeCat(v)} className={value.id === v.id ? "active" : ""}>{v.title}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default Categories  