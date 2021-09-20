import React, { Fragment, useState, useEffect } from "react";

import Person from "./Person";

const People = (props) => {
    
    const [people, setPeople] = useState([]);
    const [peoplefilter, setPeopleFilter] = useState([]);

    const LoadPeople = async () => {
        let peoplelist = []; 

        try {
            let peopleData ={ "next" : "https://swapi.dev/api/people/?page=1"}
            while (peopleData.hasOwnProperty('next') && peopleData.next) {
                const response = await fetch(peopleData.next);
                peopleData = await response.json();
                peoplelist = peoplelist.concat(peopleData.results);
            }
            //console.log(peoplelist);
        } catch (err) {
          console.error(err.message);
        }
        
        let uncat = [];
        peoplelist.forEach(person => {
            if (!person.species.length) {
                uncat.push(person.url);
            }
        });
        console.log("makeUncat");
        console.log(peoplelist);
        console.log(uncat);
        props.SetUnCat(uncat);

        let PeopleMap = [];
        peoplelist.forEach(p => {
            const parts = p.url.split("/");
            PeopleMap[parseInt(parts[parts.length-2])] = p;
        });
        console.log("peoplemap")
        console.log(PeopleMap);

        setPeople(PeopleMap);
    }

    useEffect(() => {
        LoadPeople();
      }, []);
 

  return (
    <Fragment>
        <ul>   
            {props.Filter.map (index => (
                <Person Person={people[''+index]}/>
            ))}
        </ul> 
    </Fragment>
  );
};

export default People;