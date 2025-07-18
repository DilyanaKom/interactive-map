const imageWidth = 1536;
const imageHeight = 1162;

const imageBounds = [[0, 0], [imageHeight, imageWidth]];

const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1,
  maxZoom: 4,
  zoomControl: true,
});

L.imageOverlay('map.jpg', imageBounds).addTo(map);

map.fitBounds(imageBounds);
