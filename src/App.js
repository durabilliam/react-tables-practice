import React, { useMemo, useState, useEffect } from 'react';
import Table from "./Table";
import './App.css';
import axios from 'axios';

const Genres = ({ values }) => {
  return (
    <>
    {values.map((genre, idx) => {
      return (
        <span key={idx} className="badge">
          {genre}
        </span>
      );
    })}
    </>
  );
};

function App() {
  // data state to store the TV Maze API data. Its initial value is an empty array
  const [data, setData] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect (() => {
    (async () => {
      const result = await axios("https://api.tvmaze.com/search/shows?q=men");
      setData(result.data);
    })();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "TV SHOW",
        columns:[
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          }
        ]
      },
      {
        Header: "Details",
        columns: [
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres",
            Cell: ({ cell: { value } }) => <Genres values={value} />
          },
          {
            Header: "Runtime",
            accessor: "show.runtime",
            Cell: ({ cell: { value } }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
                {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
                </>
              );
            }
          },
          {
            Header: "Status",
            accessor: "show.status"
          }
        ]
      }
    ], []
  );



  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
