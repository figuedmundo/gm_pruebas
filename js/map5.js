
locationsJSON = { 
    'locations': [
 /*       {
            'lat':  -17.3937285, 
            'lng': -66.1457475,
            'info': 'Hola mundo',
            'markerType': 'prueba'
        },
        {
            'lat':  -17.3560289,
            'lng': -66.1150475,
            'info': 'Como estas',
            'markerType': 'prueba'
        },
        {
            'lat':  -17.3165289,
            'lng': -66.1955475,
            'info': 'U are dead!!',
            'markerType': 'prueba1'
        },*/
        {
            'lat':  -17.395639841287075,
            'lng':  -66.1495984815931,
            'info': 'bound sw',
            'markerType': 'prueba' 
        },
        {
            'lat':  -17.391806900392517,
            'lng':  -66.14190523558614,
            'info': 'bound ne',
            'markerType': 'prueba' 
        }

    ]
};


        

function USGSOverlay(bounds, image, map) {

  // Now initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // We define a property to hold the image's
  // div. We'll actually create this div
  // upon receipt of the add() method so we'll
  // leave it null for now.
  this.div_ = null;

  // Explicitly call setMap() on this overlay
  this.setMap(map);
}

USGSOverlay.prototype = new google.maps.OverlayView();



USGSOverlay.prototype.onAdd = function() {

  // Note: an overlay's receipt of onAdd() indicates that
  // the map's panes are now available for attaching
  // the overlay to the map via the DOM.

  // Create the DIV and set some basic attributes.
  var div = document.createElement('DIV');
  div.style.border = "none";
  div.style.borderWidth = "0px";
  div.style.position = "absolute";

  // Create an IMG element and attach it to the DIV.
  var img = document.createElement("img");
  img.src = this.image_;
  img.style.width = "100%";
  img.style.height = "100%";
  div.appendChild(img);

  // Set the overlay's div_ property to this DIV
  this.div_ = div;

  // We add an overlay to a map via one of the map's panes.
  // We'll add this overlay to the overlayImage pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
}




USGSOverlay.prototype.draw = function() {

  // Size and position the overlay. We use a southwest and northeast
  // position of the overlay to peg it to the correct position and size.
  // We need to retrieve the projection from this overlay to do this.
  var overlayProjection = this.getProjection();

  // Retrieve the southwest and northeast coordinates of this overlay
  // in latlngs and convert them to pixels coordinates.
  // We'll use these coordinates to resize the DIV.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's DIV to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
}


/*
USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
}

// Note that the visibility property must be a string enclosed in quotes
USGSOverlay.prototype.hide = function() {
  if (this.div_) {
    this.div_.style.visibility = "hidden";
  }
}

USGSOverlay.prototype.show = function() {
  if (this.div_) {
    this.div_.style.visibility = "visible";
  }
}

USGSOverlay.prototype.toggle = function() {
  if (this.div_) {
    if (this.div_.style.visibility == "hidden") {
      this.show();
    } else {
      this.hide();
    }
  }
}

USGSOverlay.prototype.toggleDOM = function() {
  if (this.getMap()) {
    this.setMap(null);
  } else {
    this.setMap(this.map_);
  }
}

*/
/*// Now we add an input button to initiate the toggle method 
// on the specific overlay
<div id ="toolbar" width="100%; height:20px;" style="text-align:center">
  <input type="button" value="Toggle Visibility" onclick="overlay.toggle();"></input>
  <input type="button" value="Toggle DOM Attachment" onclick="overlay.toggleDOM();"></input>
</div>*/


var mapa = {
    map : null,
    infowindow : null,
    markers : Array(),
    ruta : new google.maps.MVCArray(),
    polyline : null,
    locations : null,
    overlay: null,

    init : function( selector, zoom, latlng ){
        var options = {
            zoom: zoom,
            center: new google.maps.LatLng( latlng[0], latlng[1] ),
            mapTypeId: google.maps.MapTypeId.ROADMAP    ,
            disableDefaultUI: true,
            navigationControl: true,
            // mapTypeControl: true,
            // mapTypeControlOptions: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map($(selector).get(0), options);
        // creamos el obejto polyline para la ruta
        this.polyline = new google.maps.Polyline({
            path: this.ruta,
            strokeColor: "#ff0000",
            strokeOpacity: 0.6,
            strokeWeight: 5
        });

        var swBound = new google.maps.LatLng(
         -17.395639841287075, -66.1495984815931
        );

        var neBound = new google.maps.LatLng(
          -17.391806900392517, -66.14190523558614
        );
        var bounds = new google.maps.LatLngBounds(swBound, neBound);

        var srcImage = 'imagenes/margen1.png';
        this.overlay = new USGSOverlay(bounds, srcImage, mapa.map);

        // google.maps.event.addListener(mapa.map, 'click', function(event) {
        //    mapa.placeMarker(event.latLng);

          
         });
    },

    addMarker : function( object ){
                
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng( object.lat, object.lng  ),
                // map: this.map,
                icon: 'imagenes/'+object.markerType+'.png'
                // title: 'Posicion '+key
            });
            this.markers.push(marker);
            
            // maneja el click sobre un marker y muestra el InfoWindow
            google.maps.event.addListener( marker, 'click' , function() {
                
                if (!mapa.infowindow) {
                    mapa.infowindow = new google.maps.InfoWindow();
                };

                mapa.infowindow.setContent(object.info);
                
                mapa.infowindow.open(mapa.map, marker);
            });

            //
            this.polyline.getPath().push( marker.position );

    },

    removeMarkers : function() {
        this.markers.length = 0;
    },

    addMarkers : function(){
         this.locations = locationsJSON.locations;
         console.log(this.locations);
          $.each( this.locations, function( key, value ) {
              mapa.addMarker(value);
          });
          mapa.showMarkers();
    },

    showMarkers : function(){
        $.each(this.markers, function(key, value) {
            // console.log(value);
            value.setMap(mapa.map);
        });
    },

    hideMarkers : function(){
         $.each(this.markers, function(key, value) {
            value.setMap(null);
        });
    },

    showPolyline : function(){
        this.polyline.setMap(this.map);
    },

    hidePolyline : function(){
        this.polyline.setMap(null);
    }

    /*placeMarker : function( location ){
          // var clickedLocation = new google.maps.LatLng(location);
          var marker = new google.maps.Marker({
              position: location,
              map: mapa.map
          });
          console.log( location.lat()+", "+location.lng() );
          // console.log(location);
    }*/


};

$(document).ready(function(){
    var latlng = [ -17.3937285, -66.1457475] ;
    mapa.init('#map', 17, latlng );
    mapa.addMarkers();

// $('#menu').find('li').each(function(){
//     $(this).click(function(){
        
//         ($('#marker').prop('checked')) ?  mapa.showMarkers() : mapa.hideMarkers() ;
//         ($('#ruta').prop('checked')) ?  mapa.showPolyline() : mapa.hidePolyline() ;
        
//     });
// });
    
    $('#marker').click(function(){
        ($(this).prop('checked')) ?  mapa.showMarkers() : mapa.hideMarkers() ;
    });

    $('#ruta').click(function(){
        ($(this).prop('checked')) ?  mapa.showPolyline() : mapa.hidePolyline() ;
    });
});

