import React, { useState} from "react";
import './App.css';


import People from "./People";
import Search from "./Search";
import Species from "./Species";



function App() {
  const [filter, setFilter] = useState([]);
  const [unCat , setUnCat] = useState([]);
  
  const Set_UnCat = (uncat) => {
    //console.log("set_uncat");
    //console.log(uncat);
    setUnCat(uncat);
  }

  return (
    

    <div className="App">
      <header className="App-header">
        SWAPI Challenge
      </header>
      <div style={{width: '90%'}}>
      
      <div style={{width: '20%', float: 'left'}}>
        <Search setFilter={setFilter} />
        <Species setFilter={setFilter} UnCat={unCat} />
      </div>
      <div style={{width: '80%', overflow: 'hidden'}}>
        <People SetUnCat={Set_UnCat} Filter={filter}/>
      </div>
      
      </div>

    </div>
  );
}

export default App;
