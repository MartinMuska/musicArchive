import {albums} from '../database/albums.js';

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