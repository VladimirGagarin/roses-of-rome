// Album filter component with horizontal layout
import "./Album.css";
import {useLan}

const AlbumFilter = ({ albums, selectedAlbum, onSelectAlbum }) => {
  return (
    <div className="album-filter">
      <div className="album-scroller">
        {/* "All" option */}
        <button
          className={`album-chip ${selectedAlbum === "all" ? "active" : ""}`}
          onClick={() => onSelectAlbum("all")}
        >
          All
        </button>

        {/* Individual album options */}
        {albums.map((album) => (
          <button
            key={album}
            className={`album-chip ${selectedAlbum === album ? "active" : ""}`}
            onClick={() => onSelectAlbum(album)}
          >
            {album}
          </button>
        ))}
      </div>
    </div>
  );
};


export default AlbumFilter