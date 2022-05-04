
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"
import './Pokemon.css'
import { LinearProgress } from "@mui/material"

const Pokemon = () => {
    const {id} = useParams()
    const [pokemon, setPokemon] = useState({})
    const renderPokemon = async () => {
        const pokemonInfo = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id).then(res => res.data)
        const pokemonImgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonInfo.id}.png`
        setPokemon({pokemonInfo, pokemonImgUrl})
    }

    useEffect(() => {
        renderPokemon()
    }, [])

    console.log(pokemon)
    return <>
        <Navbar/>
        {pokemon.pokemonInfo && <main className={"single_pokemon_container "+pokemon.pokemonInfo.types[0].type.name}>
            <img className="single_pokemon_image" 
                src={pokemon.pokemonImgUrl} 
                alt={pokemon.pokemonInfo.name} />

            <div className="pokemon_info_container">
                <div>
                    <h2 className="pokemon_name">{pokemon.pokemonInfo.name}</h2>
                    <h3 className="pokemon_info">Altura: {(pokemon.pokemonInfo.height/10).toFixed(2)}M</h3>
                    <h3 className="pokemon_info">Peso: {(pokemon.pokemonInfo.weight/10).toFixed(2)}KG</h3>
                </div>
                <div className="pokemon_stats_container">
                    {pokemon.pokemonInfo.stats.map(stat => {
                        console.log(stat.base_stat, stat.stat.name)
                        return <div className="stat_container" key={stat.stat.name}>
                            <span className={"icon icon_"+stat.stat.name}></span>
                            <LinearProgress 
                            className="progressbar"
                            color="inherit" variant="determinate" 
                            value={stat.base_stat}/>
                            <span 
                                className={stat.base_stat >= 95 ? "stats_number stats_under " + stat.stat.name : 
                                'stats_number '+ stat.stat.name }>
                                {stat.base_stat}
                            </span>

                        </div>
                    })}
                </div>

                <div className="types">
                    {pokemon.pokemonInfo.types.map(type => {
                        return <h2 key={type.type.name} className="pokemon_type">{type.type.name}</h2>
                    })}
                </div>


            </div>
        </main>}
        
    </>
}

export default Pokemon