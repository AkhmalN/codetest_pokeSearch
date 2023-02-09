import "./styles.css";
import Select from "react-select";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);
  const [userSelect, setUserSelect] = useState("");
  const [isShow, setIsShow] = useState(false);

  const getBerries = async () => {
    const callApi = await fetch(
      "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
    );
    const values = await callApi.json();
    // console.log(values.results);
    let results = values.results.map((data) => {
      return {
        label: data.name,
        value: data.name
      };
    });
    setData(results.sort((a, b) => a.label.localeCompare(b.label)));
  };

  useEffect(() => {
    getBerries();
  });

  const handleOnClick = () => {
    console.log("Event : ", userSelect);
    setIsShow(true);
  };
  const handleOnChange = (event) => {
    setUserSelect(event);
  };
  return (
    <div className="App">
      <h1>Pokemon Search</h1>
      <h2>Search Your Favorite Pokemon</h2>
      <h3>Pokemon : {isShow ? userSelect : "Tidak Memilih"}</h3>
      <Select options={data} onChange={(e) => handleOnChange(e.value)}></Select>
      <button onClick={handleOnClick} disabled={!userSelect}>
        Show Selected
      </button>
    </div>
  );
}
