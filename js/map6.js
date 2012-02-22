var UMSS = {
    map : null,
    infowindow : null,
    markers : Array(),
    polyline : null,
    locations : null,
    // overlay: null,
    
    init : function( opt_ ) {
        var opt = opt_ || {};
        var options = {
           zoom: opt.zoom || 17,
           center: new google.maps.LatLng(  (opt.lat || -17.3937285 ) , (opt.lng ||  -66.1457475) ),
           mapTypeId: google.maps.MapTypeId.ROADMAP    ,
           disableDefaultUI: true,
           navigationControl: true
       }
       
       this.map = new google.maps.Map( $(opt.selector || "#map").get(0), options ); 
    },

    addOverlay : function ( bounds , image ){
        var overlay = new UMSSOverlay(bounds, image, this.map);
        return overlay;
    }



}

function UMSSOverlay(bounds, image, map) {
// console.log(map);
    // google.maps.OverlayView.call(this);
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

UMSSOverlay.prototype  =  new google.maps.OverlayView(); 



UMSSOverlay.prototype.onAdd = function() {
        // Create the DIV and set some basic attributes.
        var div = document.createElement('div');
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
        
    };

UMSSOverlay.prototype.draw =  function() {
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
};

UMSSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};

UMSSOverlay.prototype.opacity = function( opacity_ ){
    /*
     if (typeof(this.div_.style.filter) =='string'){
       this.div_.style.filter = 'alpha(opacity:' + opacity + ')' ;
      }

   */
/*      var x = opacity/100 ;
      console.log( $(this.div_) );

      if (typeof(this.div_.style.KHTMLOpacity) == 'string' ){
       this.div_.style.KHTMLOpacity = x ;
      };
      if (typeof(this.div_.style.MozOpacity) == 'string'){
       this.div_.style.MozOpacity = x ;
      };
      if (typeof(this.div_.style.opacity) == 'string'){
       this.div_.style.opacity = x ;
      }; 
*/
      $(this.div_).css({ opacity: opacity_ })
};




$(document).ready(function(){
    UMSS.init();


        var swBound = new google.maps.LatLng(
         -17.395639841287075, -66.1495984815931
        );

        var neBound = new google.maps.LatLng(
          -17.391806900392517, -66.14190523558614
        );
        var bounds = new google.maps.LatLngBounds(swBound, neBound);

        var srcImage = 'imagenes/umss3.png';


        // var primerPiso  = UMSSOverlay( bounds, srcImage, UMSS.map );
        var primerPiso  = UMSS.addOverlay( bounds, srcImage );
        console.log(primerPiso);

        // var segundoPiso = UMSSOverlay( bounds, "imagenes/margen1.png", UMSS.map)
        var segundoPiso = UMSS.addOverlay( bounds, "imagenes/margen1.png")
        console.log(segundoPiso.div_);
        // segundoPiso.setO(50);

        $('#primer-piso').click(function(){
            ($(this).prop('checked')) ?  primerPiso.opacity(1) : primerPiso.opacity(0) ;
        });
        $('#segundo-piso').click(function(){
            ($(this).prop('checked')) ?  segundoPiso.opacity(1) : segundoPiso.opacity(0) ;
        });

});

// var primerPiso = new UMSS.UMSSOverlay();