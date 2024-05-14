const DEFAULT_COORD = [-6.5539484, 106.7207479];

// Initialize the map with zoom control
const Map = L.map('render-map', {
    zoomControl: true
}).setView(DEFAULT_COORD, 15);

Map.zoomControl.setPosition('bottomright');

// Define layers
const osmTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 20,
    minZoom: 2
});
const satellite = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    minZoom: 2,
    attribution: 'Imagery ©2022 Google',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const terrain = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Data © OpenTopoMap (CC-BY-SA)',
    maxZoom: 20,
    minZoom: 2
});

// Add the default layer asynchronously
setTimeout(() => {
    osmTile.addTo(Map);
}, 500);

function changeLayer(type) {
    Map.eachLayer(function (layer) {
        if (layer instanceof L.TileLayer) {
            Map.removeLayer(layer);
        }
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

// Array to store the marker references
const markers = [];

// Function to filter markers based on scale
function filterMarkers() {
    const filterValue = document.getElementById('scale-filter').value;

    markers.forEach(marker => {
        const markerScale = marker.options.scale;
        if (
            filterValue === 'all' ||
            (filterValue === 'low' && markerScale < 5000) ||
            (filterValue === 'medium' && markerScale >= 5000 && markerScale < 10000) ||
            (filterValue === 'high' && markerScale >= 10000)
        ) {
            if (!Map.hasLayer(marker)) {
                marker.addTo(Map);
            }
        } else {
            if (Map.hasLayer(marker)) {
                Map.removeLayer(marker);
            }
        }
    });
}

// Add markers with popups for each position
popupContents.forEach(content => {
    const marker = L.circleMarker(content.position, {
        color: 'black',
        fillColor: 'red',
        fillOpacity: 1,
        radius: 8,
        weight: 1,
        scale: content.scale, // Store the scale value in the marker options
        interactive: true
    });

    marker.bindPopup(`
        <div style="font-family: 'Poppins', sans-serif; display: flex; align-items: center; text-align: left; padding: 10px;">
            <div style="margin-right: 10px;">
                <img src="${content.image}" alt="${content.name}" width="145" style="border-radius: 10px;">
            </div>
            <div>
                <h2 style="margin-bottom: 5px; line-height: 2.5;">${content.name}</h2>
                <div style="line-height: 1.5;">
                    <p style="margin: 2px 0;"><strong>Nama Latin:</strong> <span style="font-style: italic;">${content.latinName}</span></p>
                    <p style="margin: 2px 0;"><strong>Persebaran:</strong> ${content.distribution}</p>
                    <p style="margin: 2px 0;"><strong>Skala:</strong> ${content.scale}</p>
                    <p style="margin: 2px 0;"><strong>Jumlah:</strong> ${content.count}</p>
                </div>
            </div>
        </div>
    `);

    marker.on('click', function () {
        if (marker.options.interactive) {
            marker.setStyle({
                color: 'black',
                fillColor: '#4F6F52'
            });
        }
    });

    marker.on('popupclose', function () {
        marker.setStyle({
            color: 'black',
            fillColor: 'red'
        });
    });

    markers.push(marker);
    marker.addTo(Map); // Add marker to the map initially
});

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
