mapboxgl.accessToken = 'pk.eyJ1IjoibGFjNTg0NyIsImEiOiJjbWg5ZDV4azYwbmxoMmlweWszMXk5aTR6In0.geUP0I8Zg03UcZmMwuSbkA';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/lac5847/cmhn09vy7003t01qtagpz8j4n',
  center: [-122.27, 37.8], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9 // starting zoom
});

map.on('load', function () {
  map.addSource('points-data', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/Lac5847/Historical-San-Francisco-Theaters/refs/heads/main/data/SF_theaters.geojson'
    
  });

  map.addLayer({
    id: 'points-layer',
    type: 'circle',
    source: 'points-data',
    paint: {
      'circle-color': '#ffff99',
      'circle-radius': 10,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#000000'
      
    }
  });

  map.on('click', 'points-layer', (e) => {
        // Copy coordinates array
        const coordinates = e.features[0].geometry.coordinates.slice();
        const properties = e.features[0].properties;

    const popupContent = `
            <div>
                <h3>${properties.Landmark}</h3>
                <p><strong>Address:</strong> ${properties.Address}</p>
                <p><strong>Neighborhood:</strong> ${properties.Neighborhood}</p>
                <p><strong>Year:</strong> ${properties.Year}</p>
                <p><strong>Authority:</strong> ${properties.Authority}</p>
                <p><strong>ID:</strong> ${properties.ID}</p>
                ${properties.Link ? `<p><a href="${properties.Link}" target="_blank">More Information</a></p>` : ''}
                ${properties.Notes ? `<p><strong>Notes:</strong> ${properties.Notes}</p>` : ''}
            </div>

    
    
        `;

         new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popupContent)
            .addTo(map);
  });

      // Change cursor to pointer when hovering over points
    map.on('mouseenter', 'points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change cursor back when leaving points
    map.on('mouseleave', 'points-layer', () => {
        map.getCanvas().style.cursor = '';
    });

});
//source: Historic Sites and points of Interest in San Francisco. https://noehill.com/sf/landmarks/default.aspx
    // example code for different point colors.
//const marker = new mapboxgl.Marker()
    //.setLngLat([30.5, 50.5])
   // .addTo(map);
       // new mapboxgl.Popup()
            //.setLngLat(coordinates)
           // .setHTML(popupContent)
           // .addTo(map);

  // Example Set for different marker options .
//const marker = new mapboxgl.Marker({
    //color: "#FFFFFF",
   // draggable: true
//}).setLngLat([30.5, 50.5])
    //.addTo(map);