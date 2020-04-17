import React from 'react'
import CharacterCard from '../CharacterCard/CharacterCard'
import ReactLoader from '../ReactLoader/ReactLoader'
import '../MainPage/MainPage.scss'

class MainPageClass extends React.Component {
    constructor() {
        super()

        this.state = {
            characters: [],
            page: 1,
            searchTerm: ''
        }
    }

    componentDidMount() {
        this.fetchData()
    }


    fetchData = async () => {
        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${this.state.searchTerm}&page=${this.state.page}`)
        const data = await response.json()
        if (data.results) {
            this.setState({
                ...this.state,
                characters: [...this.state.characters, ...data.results]
            })
        }
    }

    loadMore = () => {
        this.setState({
            ...this.state,
            page: this.state.page + 1
        })
    }

    searchFunction = async () => {

        const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${this.state.searchTerm}&page=1`)
        const data = await response.json()
        if (data.results) {
            this.setState({
                ...this.state,
                characters: [...data.results]
            })
        }
        else {
            this.setState({
                ...this.state,
                characters: []
            })
        }
    }

    handleChange = (e) => {
        const { value } = e.target
        this.setState({
            ...this.state,
            searchTerm: value
        })
    }


    render() {

        return (
            <>
                <h1 className='main-title'>The Great Rick & Morty Character Lookup</h1>
    
                <div className='searchBar'>
                    <input type="search" name='searchField' value={this.state.searchTerm} placeholder='Type a character name...' onChange={this.handleChange} />
                    <button className='btn search-btn' onClick={this.searchFunction} >Search</button>
                </div>
    
                <div className='main-container'>
                    {
                        this.state.characters.length ? this.state.characters.map((char) => {
                            return <CharacterCard key={char.id} character={char} />
                        })
                            :
                            <ReactLoader type='spin' color='black' />
                    }
                    <button className='btn load-more-btn' onClick={this.loadMore}>Load More Characters</button>
                </div>
            </>
        )
    }
} 

export default MainPageClass