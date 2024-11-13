import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [bandName, setBandName] = useState('');
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchSongs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/search_tracks', {
        params: { name: bandName },
      });
      setSongs(response.data.canciones);
    } catch (error) {
      console.error("Error al buscar canciones", error);
    }
  };

  const addFavorite = async (song) => {
    try {
      const favoriteData = {
        nombre_banda: bandName,
        cancion_id: song.cancion_id,
        usuario: 'juan',
        ranking: '5/5'
      };
      await axios.post('http://localhost:3001/api/favoritos', favoriteData);
      
      // Actualizar favoritos en el estado
      setFavorites([...favorites, song.cancion_id]);
      alert('Canción agregada a favoritos');
    } catch (error) {
      console.error("Error al agregar a favoritos", error);
    }
  };

  return (
    <div className="container">
      <h1>Información de Bandas Musicales</h1>
      <input
        type="text"
        value={bandName}
        onChange={(e) => setBandName(e.target.value)}
        placeholder="Ingresa el nombre de la banda"
      />
      <button onClick={searchSongs}>Buscar Canciones</button>

      <table>
        <thead>
          <tr>
            <th>Nombre Canción</th>
            <th>Nombre Álbum</th>
            <th>Preview</th>
            <th>Precio</th>
            <th>Fecha de Lanzamiento</th>
            <th>Favoritos</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.cancion_id}>
              <td data-label="Nombre Canción">{song.nombre_tema}</td>
              <td data-label="Nombre Álbum">{song.nombre_album}</td>
              <td data-label="Preview">
                <a href={song.preview_url} target="_blank" rel="noopener noreferrer">Escuchar</a>
              </td>
              <td data-label="Precio">{song.precio.valor} {song.precio.moneda}</td>
              <td data-label="Fecha de Lanzamiento">{new Date(song.fecha_lanzamiento).toLocaleDateString()}</td>
              <td data-label="Favoritos">
                <button
                  onClick={() => addFavorite(song)}
                  className={favorites.includes(song.cancion_id) ? 'favorite-btn' : ''}
                >
                  {favorites.includes(song.cancion_id) ? 'En Favoritos' : 'Agregar a Favoritos'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
