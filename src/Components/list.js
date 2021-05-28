import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';

function ListComponent(data, input) {
    if(data.length === 0){
        return <li>
            <img src="https://cyndiquil721.files.wordpress.com/2014/02/missingno.png" alt="" />
            <div className="info">
                <h1 className="no-results">
                    No results
                </h1>
            </div>
        </li>
    }

    function getListType(types) {
        return types.map((elementType)=>{
            return (
                <>
                    <span className={"type " + elementType.toLowerCase()}>{elementType}</span>
                </>
            );
        });
    }

    function getHighlightedText(text, highlight) {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> { parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
        } </span>;
    }

    return data.map((element) => {
        const {Name, Types} = element;
        return (
            <>
                <li>
                    <img src={element.img} alt="" />
                    <div className="info">
                        <h1>
                            <span className="hl">{getHighlightedText(Name, input)}</span>
                        </h1>
                        {getListType(Types)}
                    </div>
                </li>
            </>
        );
    });
}

ListComponent.prototype = {
  data: PropTypes.shape([{
      Name: PropTypes.string.isRequired,
      Types: PropTypes.shape([]),
    }
  ]).isRequired,
  input: PropTypes.string.isRequired
}

export default ListComponent;