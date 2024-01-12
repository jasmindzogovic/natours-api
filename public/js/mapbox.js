export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiamFzbWluZHpvZ292aWMiLCJhIjoiY2xyNnRzMmhhMmRrMDJqcWJzeTNwNm1xNSJ9.0RqhcwwlRaOYET3oIPP_TQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jasmindzogovic/clr6umruu012101qubdi85gon',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
