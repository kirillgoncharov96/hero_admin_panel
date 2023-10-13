import { useHttp } from "../../hooks/http.hook";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { heroesCreated} from "../heroesList/heroesSlice";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');
    const {filters, filtersLoadingStatus } = useSelector(state => state.filters);
    
    const dispatch = useDispatch();
    const {request} = useHttp();


    const onChangeValue = (e) => {
        
        switch(e.target.name) {
            case 'name': 
                setHeroName(e.target.value);
                break;
            case 'text':
                setHeroDescr(e.target.value);
                break;
            case 'element': 
                setHeroElement(e.target.value);
                break;
            default:
                return;
        }
        
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if(heroName !== '' && heroDescr !== '' && heroElement !== '') {
            const newHero = {
                id: uuidv4(),
                name: heroName,
                description: heroDescr,
                element: heroElement
            }
            request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
                .then(data => console.log(data))
                .then(dispatch(heroesCreated(newHero)))
                .catch(error => console.log(error));
            
        }
        
        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
        
    }

    const renderFilters = (filters, status) => {
       
        if (status === 'loading') {
            return <option value="loading">Loading...</option>
        } else if (status === 'error') {
            return <option value="error">Error</option>
        }
        
        if (filters && filters.length > 0) {

            return filters.map((item) => {
                
                if (item.name === 'all') {
                    // eslint-disable-next-line
                    return
                };
                
                return <option key={uuidv4()} value={item.name}>{item.label}</option>
            })
        }
    
    }


    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => onChangeValue(e)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => onChangeValue(e)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => onChangeValue(e)}>
                    <option>Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;