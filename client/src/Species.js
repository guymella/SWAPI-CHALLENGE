import React, { Fragment, useState, useEffect } from "react";

const Species = (props) => {
    const [species, setSpecies] = useState([]);
    const [unCatInit, SetUnCatInit] = useState([]);

    const LoadSpecies = async () => {
        let specieslist = [{
            "name": "No Species", 
            "people": props.UnCat
        }];  
        console.log("load uncat");
        console.log(props.UnCat);

        try {
            let speciesData ={ "next" : "https://swapi.dev/api/species/?page=1"}
            while (speciesData.hasOwnProperty('next') && speciesData.next) {
                const response = await fetch(speciesData.next);
                speciesData = await response.json();
                specieslist = specieslist.concat(speciesData.results);
            }
            console.log(specieslist);
        } catch (err) {
          console.error(err.message);
        }
        setSpecies(specieslist);
        SetUnCatInit(false);
    }

    const getFilter = (people) => {
        let filter = [];
        people.forEach(person => {
            const parts = person.split("/");
            filter.push(parseInt(parts[parts.length-2]))
        });
        console.log("getFilterx");
        console.log(people);
        console.log(filter);
        return filter;
    }

    const setUncat = (uncat) => {
        
        if (species.length && uncat.length && !unCatInit ){
            console.log("setUncat");
            //console.log(species);
            console.log(uncat);
            let newSpecies = species;
            newSpecies[0].people = uncat;
            console.log(newSpecies);
            setSpecies(newSpecies);
            SetUnCatInit(true);
        }
        
        
    }

    useEffect(() => {
        LoadSpecies();
      }, []);
 

  return (
    <Fragment>
           
            {setUncat(props.UnCat)}
            {species.map(spec => (
                <div type="button"
                class="btn btn-warning nav" 
                onClick={() => props.setFilter(getFilter(spec.people))}>
                    {spec.name}
                </div>
            ))}
         
    </Fragment>
  );
};

export default Species;