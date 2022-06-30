import { useEffect, useState } from 'react';
import Character from './Character';

function NavPage({ page, setPage }) {
  function handleClick() {
    setPage(page + 1);
  }

  return (
    <header className="d-flex justify-content-between align-items-center">
      <span>Page {page}</span>
      <button className="btn btn-primary bn-sm" onClick={handleClick}>
        Page {page + 1}
      </button>
    </header>
  );
}

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }

    fetchData();
  }, [page]);

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} setLoading={setLoading} />
      {loading ? (
        <h3 className="text-center">Loading...</h3>
      ) : (
        <div className="row">
          {characters.map((character) => (
            <div className="col-md-4" key={character.id}>
              <Character character={character} />
            </div>
          ))}
        </div>
      )}
      <NavPage page={page} setPage={setPage} setLoading={setLoading} />
    </div>
  );
}

export default CharacterList;
