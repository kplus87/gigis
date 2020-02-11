/************************************************************
 * GOOGLE MAP  
 ************************************************************/

update_map();

var geocoder,
    map,
    address = 'Chicago, IL'; // This variable accepts: zipcode, city, state, street, or place

    document.getElementById( 'js-address' ).innerHTML = address;


function initialize() {

  geocoder = new google.maps.Geocoder();

  /* Default setup */
  //var latlng = new google.maps.LatLng( 36.5117484,-6.2807277 );

  var map_options = {
    //center           : latlng,
    zoom             : 5,
    disableDefaultUI : false,
    zoomControlOptions : {
      style    : google.maps.ZoomControlStyle.SMALL,
      position : google.maps.ControlPosition.LEFT_BOTTOM
    },
    mapTypeId        : google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map( document.getElementById( 'googleMap' ), map_options );

  galaxy_geocoder( geocoder );

};

google.maps.event.addDomListener( window, 'load', initialize );


// Call this wherever needed to actually handle the display
function galaxy_geocoder( geocoder ) {

  //BEGIN ADDON

  

  //END ADDON

  if ( geocoder ) {

    geocoder.geocode( { 'address': address }, function( results, status ) {

      if ( status == google.maps.GeocoderStatus.OK ) {

        if ( status != google.maps.GeocoderStatus.ZERO_RESULTS ) {

          map.setCenter( results[0].geometry.location );

          //var info_window = new google.maps.InfoWindow( {
            //content : '<b>' + address + '</b>',
            //size    : new google.maps.Size( 150, 50 )
          //} );

          var marker = new google.maps.Marker( {
            position : results[0].geometry.location,
            map      : map,
            title    : address
          } );

          google.maps.event.addListener( marker, 'click', function() { info_window.open(map, marker); } );

        }
        else {
          alert("No results found");
        }
      }
      else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

}

function update_map() {
  $( document ).on( 'click', 'button', function() {
    var get_val = $('.map-input').val(),
        address_text = $('#js-address');
    
    if( get_val != '') {
      address = get_val;
      address_text.html( get_val );
      initialize();
    }
    else {
      $( '.info-panel').addClass( 'active' );
    }
    
  });
  
  $( document).on( 'click', '.map-input', function() {
    $( '.info-panel').removeClass( 'active' );
  });
}



/************************************************************
 *
 * BONUS TRACK !!!
 * GOOGLE MAP WITH MULTIPLES MARKERS
 *
 ************************************************************/
/*
var geocoder,
    map,
    events_lat = 37.333351,
    events_lng = -4.5765007,
    zoom_num   = 6,

    // This variable accept: zipcode, city, state, street, or place
    address  = [
      ['Ana de viya, Cádiz'],
      ['Calle Sierpes, Sevilla'],
      ['Gran Vía, Granada']
    ];


function initialize() {

  geocoder = new google.maps.Geocoder();

  
  var latlng = new google.maps.LatLng( events_lat, events_lng );

  var map_options = {
    center           : latlng,
    zoom             : zoom_num,
    //disableDefaultUI : true,
    mapTypeId        : google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map( document.getElementById( 'googleMap' ), map_options );

  galaxy_geocoder( geocoder );

};


google.maps.event.addDomListener( window, 'load', initialize );


// Call this wherever needed to actually handle the display
function galaxy_geocoder( geocoder ) {

  if ( geocoder ) {

    var marker, i;

    for (i = 0; i < address.length; i++) {

      //var info_window_content = address[i][0];

      var info_window_content = '' + address[i] + '';

      geocoder.geocode( { 'address': address[i][0] }, function(results, status, address) {

        if (status == google.maps.GeocoderStatus.OK) {

          map.setCenter(results[0].geometry.location);

          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: map
          });

          var infowindow = new google.maps.InfoWindow()

          google.maps.event.addListener(marker,'click', (function(marker,info_window_content,infowindow){
            return function() {
              infowindow.setContent('<b>' + info_window_content + '</b>');
              infowindow.open(map,marker);

            };
          })(marker,results[0].formatted_address,infowindow));

        }
        else
          {
            alert("some problem in geocode" + status);

          }
      } );
    }
  }
}
*/
