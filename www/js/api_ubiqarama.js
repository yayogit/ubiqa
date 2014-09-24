"use strict";

/**
 * Clase con funciones de acceso a los metodos de la API ofrecida por el servidor remoto de Ubiqarama
 * @returns
 */
function APIUbiqarama() {

	this.defaultErrorFunc = function(xhr, ajaxOptions, trhownError){
		if(xhr.status == 401){
			console.error("Usuario o clave incorrectos");
			alert("Usuario o clave incorrectos");
		}else{
			console.error("Error "+xhr.status+", "+xhr.statusText);
			alert("Error accediendo al servidor, intentelo de nuevo");
		}
		return false;
	}
	

	/**
	 * URL de la API
	 */
	this.getAPIurl = function(){
		return userUbiqarama.server + configUbiqarama.api_server;
	}
	
	/**
	 * Login
	 */
	this.login = function(pResultFunction, pErrorFunction){
		pErrorFunction = typeof pErrorFunction !== 'undefined'? pErrorFunction : this.defaultErrorFunc; 
		ddcAjaxUtils.ajaxJsonPOST(userUbiqarama.user, userUbiqarama.pwd, this.getAPIurl() + configUbiqarama.api_login_method, pResultFunction, pErrorFunction);
	}
	
	/**
	 * Config
	 */
	this.getConfig = function (pResultFunction, pErrorFunction){
		pErrorFunction = typeof pErrorFunction !== 'undefined'? pErrorFunction : this.defaultErrorFunc;
		ddcAjaxUtils.ajaxJsonPOST(userUbiqarama.user, userUbiqarama.pwd, this.getAPIurl() + configUbiqarama.api_configuration_method, pResultFunction, pErrorFunction);
	} 
	
	/**
	 * Lista de Proyectos
	 */
	this.getProjects = function (pResultFunction, pErrorFunction){
		pErrorFunction = typeof pErrorFunction !== 'undefined'? pErrorFunction : this.defaultErrorFunc;
		ddcAjaxUtils.ajaxJsonPOST(userUbiqarama.user, userUbiqarama.pwd, this.getAPIurl() + configUbiqarama.api_projectslist_method, pResultFunction, pErrorFunction);
	}
	
	/**
	 * Lista de Contenidos de un Proyecto
	 */
	this.getContents = function(pProjectId, pResultFunction, pErrorFunction){
		pErrorFunction = typeof pErrorFunction !== 'undefined'? pErrorFunction : this.defaultErrorFunc;
		var url = this.getAPIurl() + configUbiqarama.api_contentslist_method;
		url = url.replace(/\{id\}/g,pProjectId);
		ddcAjaxUtils.ajaxJsonGET(userUbiqarama.user, userUbiqarama.pwd, url, pResultFunction, pErrorFunction);
	}
	
	/**
	 * Lista de tags
	 */
	this.getTags = function (pResultFunction, pErrorFunction){
		pErrorFunction = typeof pErrorFunction !== 'undefined'? pErrorFunction : this.defaultErrorFunc;
		ddcAjaxUtils.ajaxJsonPOST(userUbiqarama.user, userUbiqarama.pwd, this.getAPIurl() + configUbiqarama.api_tagslist_method, pResultFunction, pErrorFunction);
	}
	
	/**
	 * Agrega un contenido al proyecto
	 */
	this.addContent = function(pContentType, pFileURL, pData, pResultFunction, pErrorFunction){		 
		ddcAjaxUtils.ajaxJsonPOSTwithMedia(userUbiqarama.user, userUbiqarama.pwd, this.getAPIurl() + configUbiqarama.api_contentadd_method, pContentType, pFileURL, pData, pResultFunction, pErrorFunction);
	}
	
	/**
	 * Elimina un contenido del proyecto
	 */
	this.removeContent = function(pContentId, pResultFunction, pErrorFunction){
		var url = this.getAPIurl() + configUbiqarama.api_contentremove_method;
		url = url.replace(/\{id\}/g,pContentId);
		ddcAjaxUtils.ajaxJsonPOST(userUbiqarama.user, userUbiqarama.pwd, url, pResultFunction, pErrorFunction);
	}
	
	
	
		
}

var APIcalls = new APIUbiqarama();




