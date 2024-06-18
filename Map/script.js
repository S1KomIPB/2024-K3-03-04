const DEFAULT_COORD = [-6.5539484, 106.7207479];

// Initialize the map with zoom control
const Map = L.map('render-map', {
  zoomControl: true
}).setView(DEFAULT_COORD, 13);

Map.zoomControl.setPosition("bottomright");

// Define layers
const osmTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
});
const satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 19,
  attribution: 'Imagery ©2022 Google',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Data © OpenTopoMap (CC-BY-SA)',
  maxZoom: 17
});

// Add the default layer asynchronously
setTimeout(() => {
    osmTile.addTo(Map);
}, 500);

function changeLayer(type) {
  Map.eachLayer(function (layer) {
    Map.removeLayer(layer);
  });
  if (type === 'default') {
    osmTile.addTo(Map);
  } else if (type === 'satellite') {
    satellite.addTo(Map);
  } else if (type === 'terrain') {
    terrain.addTo(Map);
  }
}

// Custom Zoom Functionality
function zoomInMap() {
    Map.zoomIn();
}

function zoomOutMap() {
    Map.zoomOut();
}

let currentMarker = null; // Variable to hold the current marker

// Function to add or move the marker on the map
function addOrUpdateMarker(e) {
  const coords = e.latlng;
  if (currentMarker) {
    // Move the existing marker to the new location
    currentMarker.setLatLng(coords);
  } else {
    // Create a new marker if one doesn't exist
    currentMarker = L.marker([coords.lat, coords.lng]).addTo(Map);
  }
}

// Listen for map click events to add or update the marker
Map.on('click', addOrUpdateMarker);

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector('.toggle-button');
  const settingsDrawer = document.querySelector('.settings-drawer');

  toggleButton.addEventListener('click', function () {
    settingsDrawer.classList.toggle('hidden');
  });

  // Adding custom zoom buttons to the UI
  const zoomInButton = document.createElement('button');
  zoomInButton.innerText = 'Zoom In';
  zoomInButton.onclick = zoomInMap;
  document.body.appendChild(zoomInButton);

  const zoomOutButton = document.createElement('button');
  zoomOutButton.innerText = 'Zoom Out';
  zoomOutButton.onclick = zoomOutMap;
  document.body.appendChild(zoomOutButton);
});

// GEOSERVER LAYER CONNECT

var wfs_url =
  "http://localhost:8080/geoserver/cite/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=cite%3Aipb_biodiversity&maxFeatures=50&outputFormat=application%2Fjson";

$.getJSON(wfs_url).then((res) => {
  var layer = L.geoJson(res, {
    onEachFeature: function (f, l) {
      l.bindPopup(`
            <div style="font-family: 'Poppins', sans-serif; display: flex; align-items: center; text-align: left; padding: 10px;">
                <div style="margin-right: 10px;">
                    <img src="${f.properties.Foto_URL}" alt="${f.properties.Foto_URL}" width="145" height="145" style="border-radius: 10px; object-fit: cover;">
                </div>
                <div>
                    <h2 style="margin-bottom: 5px; line-height: 1.25;">${f.properties.Nama}</h2>
                    <div style="line-height: 1.5;">
                        <p style="margin: 2px 0;"><strong>Nama Latin:</strong><br><span style="font-style: italic;">${f.properties.Nama_Latin}</span></p>
                        <p style="margin: 2px 0;"><strong>Kategori:</strong><br>${f.properties.Kategori}</p>
                        <p style="margin: 2px 0;"><strong>Lokasi:</strong><br>${f.properties.Lokasi}</p>
                    </div>
                </div>
            </div>
        `);
    },
  }).addTo(Map);
});