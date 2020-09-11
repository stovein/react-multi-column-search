import React, { useState } from "react";
import "./styles.css";
import pokedexJSON from "../data/pokedex.json";

export default function App() {
  return (
    <div className="App">
      <Header />
      <SearchAndList />
    </div>
  );
}

function SearchAndList() {
  const pokedex = pokedexJSON;
  const [filter, setFilter] = useState({ num: "", name: "", type: "" });
  const [data, setData] = useState(pokedex.pokemon);

  const onFilterChange = (value, type) => {
    const newState = {
      ...filter,
      [type]: value
    };
    console.log(newState);
    const fd = pokedex.pokemon.filter((pokemon) => {
      return (
        pokemon.num.includes(newState.num) &&
        pokemon.name.toLowerCase().includes(newState.name.toLowerCase()) &&
        pokemon.type.some((type) =>
          type.toLowerCase().includes(newState.type.toLowerCase())
        )
      );
    });

    setData(fd);
    setFilter(newState);
  };

  return (
    <div>
      <tr>
        <td>
          <Search
            filter={filter.num}
            handleFilterChange={onFilterChange}
            placeholder="Search by Number"
            searchType="num"
          />
        </td>
        <td>
          <Search
            filter={filter.name}
            handleFilterChange={onFilterChange}
            placeholder="Search by Name"
            searchType="name"
          />
        </td>
        <td>
          <Search
            filter={filter.type}
            handleFilterChange={onFilterChange}
            placeholder="Search by Type"
            searchType="type"
          />
        </td>
      </tr>
      <List pokedex={data} />
    </div>
  );
}

function Search(props) {
  const searchType = props.searchType;
  const type = searchType === "num" ? "number" : "text";

  return (
    <div>
      <input
        type={type}
        value={props.filter}
        placeholder={props.placeholder}
        onChange={(e) => props.handleFilterChange(e.target.value, searchType)}
      />
    </div>
  );
}

function List(props) {
  const pokedex = props.pokedex;

  return (
    <div>
      {pokedex.map((pokemon, i) => {
        return (
          <tr>
            <td key={"img" + i}>
              <img src={pokemon.img} alt={pokemon.name} />
            </td>
            <td key={"num" + i}> {pokemon.num} </td>
            <td key={"name" + i}> {pokemon.name} </td>
            {pokemon.type.map((type, i) => {
              return <td key={"type" + i}> {type} </td>;
            })}
          </tr>
        );
      })}
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>Pokédex Pokemon Search Tool</h1>
    </div>
  );
}
