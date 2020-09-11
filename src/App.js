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
  const searchArray = [
    { filter: filter.num, placeholder: "Search by Number", type: "num" },
    { filter: filter.name, placeholder: "Search by Name", type: "name" },
    { filter: filter.type, placeholder: "Search by Type", type: "type" }
  ];

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
        {searchArray.map((obj, i) => {
          return (
            <td key={i}>
              <Search
                filter={obj.filter}
                handleFilterChange={onFilterChange}
                placeholder={obj.placeholder}
                searchType={obj.type}
              />
            </td>
          );
        })}
      </tr>
      <List pokedex={data} />
    </div>
  );
}

function Search(props) {
  const { searchType } = props;
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
  const { pokedex } = props;

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
