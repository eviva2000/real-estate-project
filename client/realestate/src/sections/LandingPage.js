import React, { useState } from "react";
const LandingPage = () => {
  const [searchResultDisplay, setSearchResultDisplay] = useState("none");
  const [addresses, setAddresses] = useState([]);
  const showSearchResults = () => {
    setSearchResultDisplay("block");
  };
  const hideSearchResults = () => {
    setSearchResultDisplay("none");
  };
  // let serachQuery;
  const API_URL =
    'https://realestate-da8f.restdb.io/rest/addresses?q={"city":"Odense"}';
  const API_KEY = "5ed0af472032862ff2ce2612";
  const searchByCity = async () => {
    const options = {
      crossDomain: true,
      method: "GET",
      headers: {
        "content-type": "application/json",
        "x-apikey": API_KEY,
        "cache-control": "no-cache",
      },
    };
    const fetchCity = await fetch(API_URL, options);
    let result = await fetchCity.json();
    console.log(result);
    setAddresses(result);
    showSearchResults();
  };

  return (
    <div id="landingPage">
      <div className="searchContainer">
        <h2>Looking for your dream house?</h2>
        <div>
          <i className="fas fa-search"></i>
          <input
            type="text"
            name=""
            id="searchInput"
            placeholder="Search by City or Postal code"
            onFocus={searchByCity}
            onInput={searchByCity}
            onBlur={hideSearchResults}
          />
          <div id="searchResult" style={{ display: searchResultDisplay }}>
            {addresses.map((address) => {
              return (
                <div id="searchItem" key={address._id}>
                  <p>
                    {address.city} - Postal code:{address.postalcode}
                  </p>
                </div>
              );
            })}
            {/* {#each ajUsers as jUser} */}
            {/* <div id="searchItem">
              <div style={{ width: "100%", padding: ".5em" }}>
                city
                {/* {jUser.firstname} {jUser.lastname} */}
            {/* </div>
            </div> */}
            {/* {/each} */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
