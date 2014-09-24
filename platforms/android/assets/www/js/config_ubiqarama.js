function ConfigUbiqarama() {
	//Credenciales
	this.credentials_path="credentials.txt";
	//API Ubiqarama
	this.api_server = "/api/v1";
	this.api_login_method = "/authenticate";
	this.api_configuration_method = "/configuration";
	this.api_projectslist_method = "/projects";
	this.api_contentslist_method = "/projects/{id}/contents";
//	this.api_contentslist_method = "/contents";
	this.api_contentadd_method = "/contents";
	this.api_contentremove_method = "/contents/{id}/remove";
	this.api_tagslist_method = "/topics";
	
	//MAPAS OpenLayers
	this.ol_defaultLongitude = -2.92;
	this.ol_defaultLatitude = 43.25;
	this.ol_defaultZoom = 10;
	this.ol_defaultMarkerIcon = "img/wht-circle.png";
	this.ol_highlightMarkerIcon = "img/red-circle.png";
	this.ol_widthMarkerIcon = 64;
	this.ol_heightMarkerIcon = 64;
}

var configUbiqarama = new ConfigUbiqarama();
