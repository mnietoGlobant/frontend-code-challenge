import React, {useEffect, useState} from "react";
import ListComponent from "../components/list";
import sortByPoint from "../util/sortByPoint";

function Home() {
    const [data, setData] = useState([]);
    const [dataFiltered, setDataFiltered] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect((()=> {
            fetch('https://gist.githubusercontent.com/bar0191/fae6084225b608f25e98b733864a102b/raw/dea83ea9cf4a8a6022bfc89a8ae8df5ab05b6dcc/pokemon.json')
                .then(response => response.json())
                .then(data => setData(data))
        }
    ),[]);

    function filterByType(input, types) {
        return types.find(type => type.toLowerCase().includes(input.toLowerCase()));

    }
    function filterData(input) {
        setInputValue(input)

        const pokemonByName = data.filter(pokemon => pokemon.Name.toLowerCase().includes(input.toLowerCase()));
        const pokemonByType = data.filter(pokemon => filterByType(input ,pokemon.Types));

        setDataFiltered([...pokemonByName,...pokemonByType].slice(0,4));
    }

    return (
        <>
            <label htmlFor="maxCP" className="max-cp">
                <input type="checkbox" id="maxCP"
                       checked={isChecked}
                       onChange={()=> sortByPoint(isChecked, setIsChecked, data)} />
                <small>
                    Maximum Combat Points
                </small>
            </label>
            <input type="text" className="input" placeholder="Pokemon or type"
                   value={inputValue}
                   onChange={(e)=> filterData(e.target.value)}/>
            { data.length > 0 ?
                <div className="wrapper">
                    <ul className="suggestions" >
                        { inputValue.length > 0  ? ListComponent(dataFiltered, inputValue) : ListComponent(data, '')}
                    </ul>
                </div>
                :<div className="loader"/>
            }
        </>);

}

export default Home;