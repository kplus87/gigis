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
    zoom             : 13,
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

  if ( geocoder ) {

    geocoder.geocode( { 'address': address }, function( results, status ) {

      if ( status == google.maps.GeocoderStatus.OK ) {

        if ( status != google.maps.GeocoderStatus.ZERO_RESULTS ) {

          map.setCenter( results[0].geometry.location );

          var marker = new CustomMarker({
              position: results[0].geometry.location,
              map: map,
          });

          //var info_window = new google.maps.InfoWindow( {
            //content : '<b>' + address + '</b>',
            //size    : new google.maps.Size( 150, 50 )
          //} );
          /*
          var marker = new google.maps.Marker( {
            position : results[0].geometry.location,
            map      : map,
            title    : address
          } );
          */
         // google.maps.event.addListener( marker, 'click', function() { info_window.open(map, marker); } );

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




CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' +
            '<div>' +
            '<div class="shadow"></div>' +
            '<div class="pulse"></div>' +
            '<div class="pin-wrap">' +
            '<div class="pin"></div>' +
            '</div>' +
            '</div>' +
            '')[0];
        this.pinWrap = this.div.getElementsByClassName('pin-wrap');
        this.pin = this.div.getElementsByClassName('pin');
        this.pinShadow = this.div.getElementsByClassName('shadow');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        google.maps.event.addDomListener(div, "click", function(event) {
            google.maps.event.trigger(self, "click", event);
        });
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.position);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.animateDrop = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'scaleY(2) translateY(-'+$('#googleMap').outerHeight()+'px)',
        'opacity': '1',
    });
    dynamics.animate(this.pinWrap, {
        translateY: 0,
        scaleY: 1.0,
    }, {
        type: dynamics.gravity,
        duration: 1800,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 1800,
        bounciness: 600,
    })

    dynamics.stop(this.pinShadow);
    dynamics.css(this.pinShadow, {
        'transform': 'scale(0,0)',
    });
    dynamics.animate(this.pinShadow, {
        scale: 1,
    }, {
        type: dynamics.gravity,
        duration: 1800,
    });
}

CustomMarker.prototype.animateBounce = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'none',
    });
    dynamics.animate(this.pinWrap, {
        translateY: -30
    }, {
        type: dynamics.forceWithGravity,
        bounciness: 0,
        duration: 500,
        delay: 150,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 0,
    });
    dynamics.animate(this.pin, {
        scaleY: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 600,
        delay: 650,
    });

    dynamics.stop(this.pinShadow);
    dynamics.css(this.pinShadow, {
        'transform': 'none',
    });
    dynamics.animate(this.pinShadow, {
        scale: 0.6,
    }, {
        type: dynamics.forceWithGravity,
        bounciness: 0,
        duration: 500,
        delay: 150,
    });
}

CustomMarker.prototype.animateWobble = function() {
    dynamics.stop(this.pinWrap);
    dynamics.css(this.pinWrap, {
        'transform': 'none',
    });
    dynamics.animate(this.pinWrap, {
        rotateZ: -45,
    }, {
        type: dynamics.bounce,
        duration: 1800,
    });

    dynamics.stop(this.pin);
    dynamics.css(this.pin, {
        'transform': 'none',
    });
    dynamics.animate(this.pin, {
        scaleX: 0.8
    }, {
        type: dynamics.bounce,
        duration: 800,
        bounciness: 1800,
    });
}

$(function() {
   // var pos = new google.maps.LatLng(42.9837, -81.2497);
    var pos = address;
    var map = new google.maps.Map(document.getElementById('googleMap'), {
        zoom: 3,
        //center: pos,
        disableDefaultUI: true,
    });

    var marker = new CustomMarker({
        position: pos,
        map: map,
    });

    google.maps.event.addListener(marker, 'click', function(e) {
        marker.animateWobble();
    });

    $('#drop').on('click', function(e) {
        marker.animateDrop();
    });

    $('#wobble').on('click', function(e) {
        marker.animateWobble();
    });

    $('#bounce').on('click', function(e) {
        marker.animateBounce();
    })
});


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