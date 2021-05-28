import React from 'react';
import '../styles/Home.css';

export default function sortByPoint(isChecked, setIsChecked, data){
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
