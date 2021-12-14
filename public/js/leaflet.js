

   


const getLocationNames = async () => {
  const res = await fetch('/api/locations', {
      method: 'GET',
  })
  const data = await res.json()
  const locations = data.map(location => location.location_name)
  return locations;
  //console.log(locations)

}

function locationLookUp(locations) {
  // here you do something with data
  console.log(locations)



        var startlat = -34.92537;
        var startlon = 138.59973;

        // Initialize map to specified coordinates
        var map = L.map('map', {
          center:  [startlat, startlon], 
          zoom: 14
        });
    
        // Add tiles (streets, etc)
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
          minZoom: 1
        }).addTo(map);
    
        var fg = L.featureGroup().addTo(map);

        var query_addr = locations;
      
        query_addr.forEach((query_addr)=>{
        const provider = new window.GeoSearch.OpenStreetMapProvider()
        var query_promise = provider.search({
          query: query_addr
        });
 
        query_promise.then(value => {
          for (i = 0; i < value.length; i++) {
            // Success!
            var x_coor = value[i].x;
            var y_coor = value[i].y;
            var label = value[i].label;
            var marker = L.marker([y_coor, x_coor]).addTo(fg) // CAREFULL!!! The first position corresponds to the lat (y) and the second to the lon (x)
            marker.bindPopup("<b>Found location</b><br>" + label).openPopup(); // note the "openPopup()" method. It only works on the marker
          };
        }, reason => {
          console.log(reason); // Error!
        });
    })
  }

    getLocationNames().then(locationLookUp)