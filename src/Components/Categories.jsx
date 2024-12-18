import {useState} from 'react'

function Categories({value, changeCat}) {   
  console.log(value)

    const [categoriesList, setCategoriesList] = useState([
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые",
    ])
    return (
      <div className="categories">
        <ul>
            {
                categoriesList.map((v, i) => (
                    <li key={i} onClick={()=>changeCat(i)} className={value === i ? "active" : ""}>{v}</li>
                ))
            }
        </ul>
      </div>
    );
  }
  
export default Categories  