"use strict";

/**
 * Clase con metodos de utilidad
 */
function UbiqaramaUtils(){

/*
 * SECURITY FUNCTIONS
 */

	/**
	 * Obtiene las credenciales almacenadas.
	 * 
	 * @param pOnLoad Funcion que sera invocada si se han obtenido credenciales. Esta funcion recibe como 
	 * parametro un objeto con las credenciales asignadas a sus propiedades "user" y "pwd" 
	 */
	this.loadCredentials = function(pOnLoad){
		var funcFileReaded = function(pStringData){
			//Se procesan los datos
	        if(pStringData.length > 0){
	        	var credentials = new UserUbiqarama();
	        	var credentialsString = pStringData.split(",");
	        	credentials.server = credentialsString[0].split("=")[1];
	        	credentials.user = credentialsString[1].split("=")[1];
	        	credentials.pwd = credentialsString[2].split("=")[1];
	        	//Se ejecuta la funcion 'onLoad'
	        	console.log("credenciales encontradas para el usuario:"+credentials.user);
	        	pOnLoad(credentials);            
	        } 
		};
		//Se lee el archivo de credenciales
		ddcFileUtils.readFileAsText(configUbiqarama.credentials_path, funcFileReaded, fail);
	}
	
	/**
	 * Almacena las credenciales.
	 */
	this.store = function(pServer, pUser, pPwd, pOnWrite){
		//Se genera la cadena a almacenar
		var credentialsString = 's='+pServer+',u='+pUser+',p='+pPwd;
		//Se almacena
		ddcFileUtils.storeFile(configUbiqarama.credentials_path, credentialsString, pOnWrite);
		console.log("credenciales almacenadas en el archivo :"+configUbiqarama.credentials_path);
	}
	
	/**
	 * Elimina las credenciales almacenadas
	 */
	this.clear = function(){
		//Se vacia el archivo de credenciales
		ddcFileUtils.storeFile(configUbiqarama.credentials_path, "");
	}
	
	
	
	this.alert = function(pText){
		function voidCallBack(){}
		navigator.notification.alert(pText,voidCallBack(),"UBIQARAMA","Aceptar");
	}
	
	this.toSlug = function(pText){
	    return pText
	        .toLowerCase()
	        .replace(/ /g,'-')
	        .replace(/[^\w-]+/g,'');
	}
	
	this.getContentURL = function(pTitle,pContentType){
		return userUbiqarama.server+"/"+pContentType+"/"+this.toSlug(pTitle);
	}
	
	this.getURLShareFacebook = function(pTitle, pContentType){
		return "http://www.facebook.com/share.php?u="+this.getContentURL(pTitle, pContentType)+"&t=UBIQARAMA";
	}
	
	this.getURLShareTwitter = function(pTitle, pContentType){
		return "http://twitter.com/?status=Viendo%20UBIQARAMA%20:&20"+this.getContentURL(pTitle, pContentType);
	}
	
	this.getURLShareMail = function(pTitle, pContentType){
		return "mailto:?subjetct=Viendo%20UBIQARAMA&body=He%20pensado%20que%20te%20puede%20interesar,%20echa%20un%20vistazo%20a%20"+this.getContentURL(pTitle, pContentType);
	}
	
	this.getURLShareTuenti = function(pTitle, pContentType){
		return "http://www.tuenti.com/share/url="+this.getContentURL(pTitle, pContentType);
	}
}

var ubiqaramaUtils = new UbiqaramaUtils();









//var credentialsUbiqarama = new UserUbiqarama();
//
///**
// * Almacena las credenciales
// */
//credentialsUbiqarama.store = function(){
//	//Se genera la cadena a almacenar
//	var credentialsString = 'u='+this.user+',p='+this.pwd;
//	
//	//Se almacena el fichero
//	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
//	function gotFS(fileSystem) {
//		 fileSystem.root.getFile(configUbiqarama.credentials_path, {create: true, exclusive: false}, gotFileEntry, fail);
//	}
//	function gotFileEntry(fileEntry) {
//		fileEntry.createWriter(gotFileWriter, fail);
//	}
//	function gotFileWriter(writer) {
//        writer.onwriteend = function(evt) {
//            console.log('Almacenadas las credenciales -'+credentialsString+"- en "+writer.fileName);              
//        };
//        writer.write(credentialsString);
//    }
//}



function getFecha(){
	var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	var f=new Date();
	return (f.getDate() + " de " + meses[f.getMonth()] +" "+ f.getFullYear());
}

function getFechaYHora(){
	var f=new Date();
	return(f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate()+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds());
	
}




function fail(error) {
    console.log(error.code);
}
