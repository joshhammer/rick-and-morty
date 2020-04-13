import React from 'react'
import './CharacterCard.scss'

export default function CharacterCard(props) {
    return(
        <div className='character-card'>
            <img src={props.character.image} alt=""/>
            <div className='character-info'>
                <h3 id='character-name'>Name: {props.character.name}</h3>
                <p>Species: {props.character.species}</p>
                <p>Origin: {props.character.origin.name}</p>
            </div>
        </div>
    )
}