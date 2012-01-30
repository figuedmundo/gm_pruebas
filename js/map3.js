
locationsJSON = { 'locations': [
    {
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
    }
]};



var mapa = {
    map : null,
    infowindow : null,
    markers : Array(),
    ruta : new google.maps.MVCArray(),
    polyline : null,
    locations : null,

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



};

$(document).ready(function(){
    var latlng = [ -17.3937285, -66.1457475] ;
    mapa.init('#map', 12, latlng );
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

