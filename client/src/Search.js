import React, { Fragment, useState, useEffect } from "react";

const Search = (props) => {
    const [search_text, setSearch_Text] = useState("");

    const [filter, setFilter] = useState([]);

    const SearchPeople = async () => {
        let searchlist = [];
        try {
            let searchData ={ "next" : 'https://swapi.dev/api/people/?' + (search_text.length ?'search='+search_text+'&' : '')+'page=1'}
            //console.log(searchData);
            while (searchData.hasOwnProperty('next') && searchData.next) {
                const response = await fetch(searchData.next);
                searchData = await response.json();
                searchlist = searchlist.concat(searchData.results);
            }
            console.log(searchlist);
            //console.log(PeopleData);
        } catch (err) {
          console.error(err.message);
        }

        let searchFilter = [];
        searchlist.forEach(person => {
            const parts = person.url.split("/");
            searchFilter.push(parseInt(parts[parts.length-2]));
        });
        console.log("search");
        console.log(searchlist);
        console.log(searchFilter);
        setFilter(searchFilter);
        props.setFilter(searchFilter);
    }

    useEffect(() => {
        SearchPeople();
      }, []);

  const onSubmitForm = async e => {
    e.preventDefault();
    SearchPeople();
    props.setFilter(filter);
  };

  

  return (
    <Fragment>
        <div type="button"
                class="btn btn-warning nav" onClick={() => props.setFilter(filter)}>
        <form className="d-flex" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={search_text}
          onChange={e => setSearch_Text(e.target.value)}
        />
        <button className="btn btn-success">Search</button>
      </form>
      </div>
    </Fragment>
  );
};

export default Search;