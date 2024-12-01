import {useState} from 'react'

function Categories() {    
    const [currentCategory, setCurrentCategory] = useState(0)

    const onCategoryChanged = (index) => {
        setCurrentCategory(index)
    }

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
                    <li key={i} onClick={()=>onCategoryChanged(i)} className={currentCategory === i ? "active" : ""}>{v}</li>
                ))
            }
        </ul>
      </div>
    );
  }
  
export default Categories  