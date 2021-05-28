import React, {useState, useEffect} from 'react';
import ListComponent from "./Components/list";
import './App.css';

const App = () => {
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

    function sortByPoint(){
        setIsChecked(!isChecked);
        if(!isChecked){
            let len = data.length;
            for (let i = 0; i < len ; i++) {
                for(let j = 0 ; j < len - i - 1; j++){
                    if (data[j].MaxCP < data[j + 1].MaxCP) {
                        let temp = data[j];
                        data[j] = data[j+1];
                        data[j + 1] = temp;
                    }
                }
            }
        } else {
            let len = data.length;
            for (let i = 0; i < len ; i++) {
                for(let j = 0 ; j < len - i - 1; j++){
                    if (parseInt(data[j].Number) > parseInt(data[j + 1].Number)) {
                        let temp = data[j];
                        data[j] = data[j+1];
                        data[j + 1] = temp;
                    }
                }
            }
        }
    }

    return (
        <>
            <label htmlFor="maxCP" className="max-cp">
                <input type="checkbox" id="maxCP"
                       checked={isChecked}
                       onChange={sortByPoint} />
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

export default App;
