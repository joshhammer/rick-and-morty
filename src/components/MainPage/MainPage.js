import React, {useState, useEffect} from 'react'
import CharacterCard from '../CharacterCard/CharacterCard'
import ReactLoader from '../ReactLoader/ReactLoader'
import './MainPage.scss'

export default function MainPage() {

    const [characters, setCharacters] = useState([])
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        fetchData()
        console.log('USEEFFECT Page: ', page)
        console.log('Characters: ', characters)
    }, [page])
    
    const fetchData = async () => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=${page}`)
        const data = await response.json()
        if(data.results) {
            setCharacters([...characters, ...data.results])
        }
    }

    const loadMore = () => {
        setPage(page => page + 1)
    }

    const searchFunction = async () => {
        // This is actually not working because it only LATER sets the page to 1 again and the fetch is done before that
        // setPage(1) 

        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}&page=1`)
        const data = await response.json()
        if(data.results) {
            setCharacters([...data.results])
        }
        else {
            setCharacters([])
        }
    }
    
    const handleChange = (e) => {
        const {value} = e.target
        setSearchTerm(value)
    }
    


    return(
        <>
            <h1 className='main-title'>The Great Rick & Morty Character Lookup</h1>

            <div className='searchBar'>
                <input type="search" name='searchField' value={searchTerm} placeholder='Type a character name...' onChange={handleChange} />
                <button className='btn search-btn' onClick={searchFunction} >Search</button>
            </div>

            <div className='main-container'>
                {
                    characters.length ? characters.map((char) => {
                        return <CharacterCard key={char.id} character={char}/>
                    })
                    :
                    <ReactLoader type='spin' color='black'/>
                }
                <button className='btn load-more-btn' onClick={loadMore}>Load More Characters</button>
            </div>
        </>
    )
} 