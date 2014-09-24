"use strict";

/**
 * Objeto con los datos de usuario
 */
function UserUbiqarama(){
	this.server = "";
	this.user = "";
	this.pwd = "";
	this.user_id = 0;
	this.url_avatar = "";
	this.name = "";
}

var userUbiqarama = new UserUbiqarama();

/**
 * Objeto con la configuracion del cliente
 */
function CustomerConfig(){
	this.name = "";
	this.has_interview = 0;
	this.has_geo = 0;
	this.has_routes = 0;
	this.vimeo_api_token = "";
	this.style_logo = "";
	this.style_h1_color = "";
	this.style_h2_color = "";
	this.style_h4_color = "";
	this.style_a_color = "";
	this.style_button_color = "";
	this.style_button_text_color = "";	
}
var customerConfig = new CustomerConfig();