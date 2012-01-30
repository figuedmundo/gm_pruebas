
		
	$(document).ready(function(){
		var $map =  $('#map').get(0), 
			options = {
				zoom: 12,
				center: new google.maps.LatLng(-17.3937285, -66.1457475),
				mapTypeId: google.maps.MapTypeId.ROADMAP	,
				disableDefaultUI: true,
				navigationControl: true,
				mapTypeControl: true,
				mapTypeControlOptions: google.maps.MapTypeId.ROADMAP
			};
			map = new google.maps.Map( $map, options ),


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
		console.log(locationsJSON);
		// var locations = locationsJSON.locations
		// creamos un unico infowindow 
		var infowindow;

		// creamos un array q contendra los markers
		var markers = [];

		// creamos un MVCArray vacio
		var ruta = new google.maps.MVCArray();

		// creamos el obejto polyline para la ruta
		var polyline = new google.maps.Polyline({
			path: ruta,
			strokeColor: "#ff0000",
			strokeOpacity: 0.6,
			strokeWeight: 5
		});

		// recorremos locationsJSON y vamos insertando cada uno de los markers al map 
		// y generamos un array para la ruta
		$.each( locationsJSON.locations, function( key, value ) {
			console.log( value.lat + ' : ' + value.lng );
			
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(value.lat, value.lng),
				map: map,
				icon: 'imagenes/'+value.markerType+'.png'
				// title: 'Posicion '+key
			});
			// agregamos cada marker al array de markers
			markers.push(marker);
			// agregamos los puntos a la polyline
			polyline.getPath().push( marker.position );
			// maneja el click sobre un marker y muestra el InfoWindow
			google.maps.event.addListener( marker, 'click' , function() {
				
				if (!infowindow) {
					infowindow = new google.maps.InfoWindow();
				};

				infowindow.setContent(value.info);
				
				infowindow.open(map, marker);
			});

		});

		console.log(markers);

		$('#ocultar').click(function(){
			if (markers) {
			    for (i in markers) {
			     	markers[i].setMap(null);
			    }
			 }
		});

		$('#mostrar').click(function(){
			if (markers) {
			    for (i in markers) {
			     	markers[i].setMap(map);
			    }
			 }
		});

		$('#trazar').click( function() {
			
			polyline.setMap(map);

		});

		$('#destrazar').click( function() {
			
			polyline.setMap(null);

		});


		
	}); 				
