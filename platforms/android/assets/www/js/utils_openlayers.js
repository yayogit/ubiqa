"use strict";

/**
 * Clase para manejar un mapa de OpenStreetMap y agregar marcadores
 * 
 * @param pMapID String Id del <div> en el que se ubicara el mapa
 * 
 * @returns Instancia creada
 */

function OpenLayersUtils(pMapID) {
	//VARIABLES
	this.mapnik 			= new OpenLayers.Layer.OSM();
	this.fromProjection 	= new OpenLayers.Projection("EPSG:4326"); // Transform from WGS 1984
	this.toProjection 	= new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
	this.position 		= new OpenLayers.LonLat(configUbiqarama.ol_defaultLongitude, configUbiqarama.ol_defaultLatitude).transform(this.fromProjection, this.toProjection);
	this.zoom 			= configUbiqarama.ol_defaultZoom;
	
	this.map = new OpenLayers.Map(pMapID);
	this.markers = new OpenLayers.Layer.Markers("Markers");
	
	this.ubiqaramaMarkers = new Array();
	this.lastLon = 0;
	this.lastLat = 0;
	
	//INIT
	this.map.addLayer(this.mapnik);
	this.map.addLayer(this.markers);
	this.map.setCenter(this.position, this.zoom);
	
	//METODOS
	
	
	this.addMarker = function(pId, pLon, pLat, pIconURL, pOnClickEvent){
		//Agregar el marcador
		var markerPos = new OpenLayers.LonLat(pLon, pLat).transform(this.fromProjection, this.toProjection);
		var icon = (pIconURL == null? null : new OpenLayers.Icon(pIconURL, new OpenLayers.Size(configUbiqarama.ol_widthMarkerIcon, configUbiqarama.ol_heightMarkerIcon) /*,offset*/));
		var marker = new OpenLayers.Marker(markerPos, icon);
		if(pOnClickEvent != null){
			marker.events.register("click",marker,pOnClickEvent);
			console.log("registrado evento click para marcador "+pId);
		}
		this.markers.addMarker(marker);
		this.map.setCenter(markerPos, this.zoom);
		this.ubiqaramaMarkers[pId] = marker;
		this.lastLon = pLon;
		this.lastLat = pLat;
	}
	
	this.removeMarker = function(pId){
		//Eliminar el marcador
		this.markers.removeMarker(this.ubiqaramaMarkers[id]);
		this.ubiqaramaMarkers[id] = null;
	}
	
	this.clearMarkers = function(){
		//Elimina todos los marcadores
		this.ubiqaramaMarkers = [];
		this.markers.clearMarkers();
	}
	
	this.getMarker = function(pId){
		return this.ubiqaramaMarkers[pId]; 
	}
	
	this.getMarkers = function(){
		return this.ubiqaramaMarkers;
	}
	
	this.setMarkerIcon = function(pId, pIconURL){
		this.ubiqaramaMarkers[pId].setUrl(pIconURL);
	}
	
	this.focusOnMarker = function(pId){
		var marker = this.ubiqaramaMarkers[pId];
		this.map.setCenter(marker.lonlat, this.zoom);
	}
	
	this.addOrRemoveUbiqaramaMarker = function(id, pLon, pLat) {	
		if (this.ubiqaramaMarkers[id] != null) {
			//Eliminar el marcador
			this.markers.removeMarker(this.ubiqaramaMarkers[id]);
			this.ubiqaramaMarkers[id] = null;
		} else {		
			//Agregar el marcador
			var markerPos = new OpenLayers.LonLat(pLon, pLat).transform(this.fromProjection, this.toProjection);
			var marker = new OpenLayers.Marker(markerPos);
			this.markers.addMarker(marker);
			this.map.setCenter(markerPos, this.zoom);
			this.ubiqaramaMarkers[id] = marker;
			this.lastLon = pLon;
			this.lastLat = pLat;
		}	
		//Mostrar el mapa		
//		$('html, body').animate({scrollTop : 0 }, 'fast');
	}


	this.setOrRemoveUbiqaramaMarker = function (pLon, pLat){
		//Elimina todos los marcadores
		this.ubiqaramaMarkers = [];
		this.markers.clearMarkers();
		//Si no existia ya, agrega el marcador
		if( this.lastLon != pLon || this.lastLat != pLat  ){
			var markerPos = new OpenLayers.LonLat(pLon, pLat).transform(this.fromProjection, this.toProjection);
			var marker = new OpenLayers.Marker(markerPos);
			this.markers.addMarker(marker);
			this.map.setCenter(markerPos, this.zoom);
			this.lastLon = pLon;
			this.lastLat = pLat;
			//Mostrar el mapa
//			$('html, body').animate({scrollTop : 0 }, 'fast');			
		}
}








}