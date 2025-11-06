import {albums} from '../database/albums.js';
import {genres} from '../database/genres.js';

// Count the number of albums per band
const bandCounts = 
    albums.reduce((counts, album) => {
        counts[album.bandName] = (counts[album.bandName] || 0) + 1; 
        return counts;
    }, {}); 

const bandsCountsArray = Object.entries(bandCounts)
    .map(([bandName, count]) => ({ bandName, count }))
    .sort((a, b) => b.count - a.count);

const bandsHtml = bandsCountsArray.map(band =>
    `<li class="band-item">${band.bandName}: ${band.count}</li>`
).join('');

document.querySelector('.band-list').innerHTML = bandsHtml;

// Count the number of albums per genres
const genresCount = albums
    .flatMap(album => album.genre)
    .reduce((acc, genre) => {
        acc[genre] = (acc[genre] || 0) + 1;
        return acc;
    }, {});

const filtredGenres = genres.filter(g => g.id.split('.').length === 2)

const genreLookup = Object.fromEntries(filtredGenres.map(genre => [genre.id, genre.name]));

const genresCountNamed = Object.fromEntries(
  Object.entries(genresCount)
  .filter(([id]) => id.split('.').length === 2)
  .map(([id, count]) => [genreLookup[id] || id, count])
);


    console.log(genresCountNamed)



    