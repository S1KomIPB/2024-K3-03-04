const DEFAULT_COORD = [-6.5539484, 106.7207479]

// initial map
const Map = L.map("render-map")

// initial osm tile url
const osmTileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const attrib = 'Leaflet with <a href="https://academy.byidmore.com">Id More Academy<a>'

const osmTile = new L.TileLayer(osmTileUrl, { minZoom: 2, maxZoom: 20, attribution: attrib })

// add layer 
// https://leafletjs.com/reference-1.6.0.html#layer
Map.setView(new L.LatLng(DEFAULT_COORD[0], DEFAULT_COORD[1]), 15)
Map.addLayer(osmTile)

// add marker
// https://leafletjs.com/reference-1.6.0.html#marker
const Marker = L.marker(DEFAULT_COORD).addTo(Map)

// click listener
// https://leafletjs.com/reference-1.6.0.html#evented
Map.on("click", function(e){
  const {lat, lng} = e.latlng
  // regenerate marker position
  Marker.setLatLng([lat, lng])
})

