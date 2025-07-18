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

const pins = {};

const pinIcon = L.icon({
  iconUrl: 'leaflet/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'leaflet/images/marker-shadow.png',
  shadowSize: [41, 41],
});


function addOrUpdatePin(x, y) {
  const key = `${x},${y}`;
  if (!pins[key]) {
    const marker = L.marker([y, x], { icon: pinIcon }).addTo(map);
    
    pins[key] = { count: 1, marker };

    marker.bindPopup('1');

    marker.on('click', () => {
      pins[key].count--;
      if (pins[key].count <= 0) {
        map.removeLayer(pins[key].marker);
        delete pins[key];
      } else {
        pins[key].marker.getPopup().setContent(String(pins[key].count));
        pins[key].marker.openPopup();
      }
    });
  } else {
    pins[key].count++;
    pins[key].marker.getPopup().setContent(String(pins[key].count));
    pins[key].marker.openPopup();
  }
}

document.getElementById('add-pin-btn').addEventListener('click', () => {
  const xInput = document.getElementById('x');
  const yInput = document.getElementById('y');

  const x = Number(xInput.value);
  const y = Number(yInput.value);

  if (
    isNaN(x) || isNaN(y) ||
    x < 0 || x > imageWidth ||
    y < 0 || y > imageHeight
  ) {
    alert(`Please enter valid coordinates:\nX: 0 - ${imageWidth}\nY: 0 - ${imageHeight}`);
    return;
  }

  addOrUpdatePin(x, y);

  xInput.value = '';
  yInput.value = '';
});

