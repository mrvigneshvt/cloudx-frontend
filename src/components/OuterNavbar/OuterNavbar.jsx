import React, { useState } from "react";
import "./OuterNavbar.css";
import { useNavigate, Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { config } from "../../../config";

const OuterNavbar = ({ inLogin, isUser, home }) => {
  const [showSearch, setShowSearch] = useState(false); // State to toggle search input
  const [searchQuery, setSearchQuery] = useState(""); // State for search input value
  const navi = useNavigate();

  const toggleSearch = () => {
    console.log(showSearch);
    setShowSearch((prev) => !prev);
  };

  const goTOsearch = (query) => {
    const Query = query.replaceAll(" ", "_");
    const toNavigate = `/search/${Query}`;
    navi(toNavigate);
  };
  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const handleLogout = async () => {
    navi("/signin");
    await fetch(config.apiPoint.logOut, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <>
      <div className="nav-container">
        {/* Left Section */}
        <div
          className="nav-left"
          onClick={() => {
            isUser ? navi("/welcome") : navi("/home");
          }}
        >
          <h1 className="c">Cloud</h1>
          <h1 className="x">X</h1>
        </div>

        {/* Right Section */}
        <div className="nav-right">
          {isUser && (
            <div className="search-container">
              {/* Search Icon */}
              <span className="search-icon" onClick={() => toggleSearch()}>
                <CiSearch />
              </span>
              {/* Input Field */}
              {showSearch && (
                <form onSubmit={() => navi(`/search/${searchQuery}`)}>
                  <div className="search-wrapper">
                    <input
                      className="searchBar"
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    {!searchQuery ? (
                      <>
                        {
                          // <div className="absolute w-auto flex flex-col gap-2  bg-yellow">
                          //   <p className="text-2xl">
                          //     Recent: Search: {searchQuery}
                          //   </p>
                          //   <p>Recent: Search: {searchQuery}</p>
                          //
                          //   <p>Recent: Search: {searchQuery}</p>
                          // </div>
                        }
                      </>
                    ) : (
                      <>
                        <div className="search-results">
                          <p onClick={() => goTOsearch(searchQuery)}>
                            Search: "{searchQuery}"
                          </p>
                        </div>
                      </>
                    )}

                    {/* Results */}
                  </div>
                </form>
              )}
            </div>
          )}
          <p
            onClick={() =>
              (window.location.href = "https://www.github.com/mrvigneshvt")
            }
          >
            Contact
          </p>
          {inLogin ? <p onClick={() => navi("/home")}>Home</p> : <></>}
          {isUser && !inLogin ? (
            <p onClick={() => handleLogout()}>LOGOUT</p>
          ) : (
            <></>
          )}
          {home ? <p onClick={() => navi("/signin")}>LogIn</p> : <></>}
        </div>
      </div>
      {showSearch && (
        <div
          onClick={() => toggleSearch()}
          className="fixed inset-0 bg-transparent bg-opacity-50 z-50"
        ></div>
      )}
    </>
  );
};

export default OuterNavbar;
