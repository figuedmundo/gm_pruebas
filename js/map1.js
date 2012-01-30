$(document).ready(function(){
        var mapDiv = document.getElementById('map');
        var latlng = new google.maps.LatLng(-17.3937285, -66.1457475);
        var options = {
          center: latlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(mapDiv, options);

         google.maps.event.addListener(map, 'click', function(event) {
           placeMarker(event.latLng);

          $('#x').text( event.latLng.lat() );
          $('#y').text( event.latLng.lng() );
          //alert(event.latLng.lat());

         });

         function placeMarker(location) {
          var clickedLocation = new google.maps.LatLng(location);
          var marker = new google.maps.Marker({
              position: location,
              map: map
              });
          //map.setCenter(location);
          //alert('latitude: '+ location.lat() + '  longitude: '+ location.lng());

          }


      });
