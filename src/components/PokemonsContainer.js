import axios from 'axios';
import { useEffect, useState, useContext, createContext} from 'react';

const PagesContext = createContext()

const amountOfPokemonsPerPage = 21


function PokemonsContainer() {

  const [numberOfPages, setNumberOfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {

    //set Amount of pages needed, and keep tracking of current page. 
    const getAmountOfPages = async () => {
      const totalPokemons = 859 //some pokemons from the api are just empty, so I put it manually
      const paginationArray = []
      

      for(let i = 0; i <= Math.ceil(totalPokemons/amountOfPokemonsPerPage); i++){
        paginationArray.push({pageNumber: i})
      }

      setNumberOfPages(paginationArray)
    }
    getAmountOfPages()
  }, [])  

  return <>
    <main className='pokemon_page'>
      <PagesContext.Provider value={{numberOfPages, setNumberOfPages, currentPage, setCurrentPage}}>
      <Pagination/>
      <Pokemons/>
      <Pagination/>
      </PagesContext.Provider>
    </main>
  </>
}

const Pagination = () => {

  const {numberOfPages, currentPage, setCurrentPage} = useContext(PagesContext)

  return <>
    <div className='btns-list'>
      <button
          className='page_btn'
          onClick={() => setCurrentPage(0)}>
          &#706;&#706;
      </button>
        {numberOfPages.filter((value) => {

          //filter amount of pages shown
          if(value.pageNumber >= currentPage - 2 && value.pageNumber <= currentPage) return value
          if(value.pageNumber >= currentPage && (value.pageNumber <= currentPage + 2
            || (currentPage -2 === -1 && value.pageNumber <= currentPage + 3)
            || (currentPage -2 === -2 && value.pageNumber <= currentPage + 4))) return value

        })
        .map((value, index) => {

          return <button 
              key={index}
              className={`page_btn ${currentPage === value.pageNumber ? 'selected_page' : ''}`}
              onClick={() => setCurrentPage(value.pageNumber)}>
              {value.pageNumber}
          </button>

        })}

        <button
            className='page_btn'
            onClick={() => setCurrentPage(numberOfPages.slice(-1)[0].pageNumber)}>
            &#707;&#707;
        </button>
      </div>

  </>
}

const Pokemons = () => {
  const {currentPage} = useContext(PagesContext)
  const [ArrayOfPokemons, setArrayOfPokemons] = useState([])
  const [filterByText, setFilterByText] = useState([])
  const [filterByType, setFilterByType] = useState([])
  console.log(filterByType)





  useEffect(() => {
    setArrayOfPokemons([])
    //get List of pokemons acording to current page
    const getPokemons = async () => {

      const startIteration = currentPage === 0 ? 0 : amountOfPokemonsPerPage * (currentPage)
      const keepIteration = currentPage === 0 ? (currentPage + 1) * amountOfPokemonsPerPage: amountOfPokemonsPerPage + (currentPage) * amountOfPokemonsPerPage 

      let pokemonArray = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=9000').then(res => res.data.results)
      pokemonArray = pokemonArray.filter(pokemon => {
        return pokemon.name.indexOf(filterByText) > -1
      })

      console.log(pokemonArray)
      
      for(let i = startIteration; i < keepIteration; i++){
        const pokemonInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/'+pokemonArray[i].name).then(res => res.data)
        const pokemonImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`
        
        setArrayOfPokemons(pv => [...pv, {pokemonImgUrl, pokemonInfo}])
      }

    }
    getPokemons()
  }, [currentPage, filterByText])
  return <>

    <input type="text" onChange={(e) => setFilterByText(e.target.value)} value={filterByText}/>
    <div className='pokemons_list'>
      {
      //handle fast click bug
      ArrayOfPokemons.length > amountOfPokemonsPerPage  ? setArrayOfPokemons(ArrayOfPokemons.slice(amountOfPokemonsPerPage, ArrayOfPokemons.length - 1)):     
      ArrayOfPokemons.map(pokemon => {
          return <div 
          key={pokemon.pokemonInfo.id}
          className={'pokemon_container '+ pokemon.pokemonInfo.types[0].type.name}

          onClick={() => window.location = '/'+pokemon.pokemonInfo.name}
          >


            <img src={pokemon.pokemonImgUrl} alt="" />
            <h3>{pokemon.pokemonInfo.name}</h3>
          
          </div> 


      })}
    </div>

    </>
}

export default PokemonsContainer;
