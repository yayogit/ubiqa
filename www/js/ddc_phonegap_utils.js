"use strict";

/*
 * Codificacion BASE 64
 */
jQuery.base64 = (function($) {
	var _PADCHAR = "=", _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _VERSION = "1.0";
	function _getbyte64(s, i) {
		var idx = _ALPHA.indexOf(s.charAt(i));
		if (idx === -1) {
			throw "Cannot decode base64"
		}
		return idx
	}
	function _decode(s) {
		var pads = 0, i, b10, imax = s.length, x = [];
		s = String(s);
		if (imax === 0) {
			return s
		}
		if (imax % 4 !== 0) {
			throw "Cannot decode base64"
		}
		if (s.charAt(imax - 1) === _PADCHAR) {
			pads = 1;
			if (s.charAt(imax - 2) === _PADCHAR) {
				pads = 2
			}
			imax -= 4
		}
		for (i = 0; i < imax; i += 4) {
			b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12)
					| (_getbyte64(s, i + 2) << 6) | _getbyte64(s, i + 3);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255, b10 & 255))
		}
		switch (pads) {
		case 1:
			b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12)
					| (_getbyte64(s, i + 2) << 6);
			x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 255));
			break;
		case 2:
			b10 = (_getbyte64(s, i) << 18) | (_getbyte64(s, i + 1) << 12);
			x.push(String.fromCharCode(b10 >> 16));
			break
		}
		return x.join("")
	}
	function _getbyte(s, i) {
		var x = s.charCodeAt(i);
		if (x > 255) {
			throw "INVALID_CHARACTER_ERR: DOM Exception 5"
		}
		return x
	}
	function _encode(s) {
		if (arguments.length !== 1) {
			throw "SyntaxError: exactly one argument required"
		}
		s = String(s);
		var i, b10, x = [], imax = s.length - s.length % 3;
		if (s.length === 0) {
			return s
		}
		for (i = 0; i < imax; i += 3) {
			b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8)
					| _getbyte(s, i + 2);
			x.push(_ALPHA.charAt(b10 >> 18));
			x.push(_ALPHA.charAt((b10 >> 12) & 63));
			x.push(_ALPHA.charAt((b10 >> 6) & 63));
			x.push(_ALPHA.charAt(b10 & 63))
		}
		switch (s.length - imax) {
		case 1:
			b10 = _getbyte(s, i) << 16;
			x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 63)
					+ _PADCHAR + _PADCHAR);
			break;
		case 2:
			b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
			x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt((b10 >> 12) & 63)
					+ _ALPHA.charAt((b10 >> 6) & 63) + _PADCHAR);
			break
		}
		return x.join("")
	}
	return {
		decode : _decode,
		encode : _encode,
		VERSION : _VERSION
	}
}(jQuery));





/**
 * Clase con metodos para realizar llamadas mediante Ajax
 */
function DDCajaxUtils(){
	/**
	 * Llamada generica a una API JSON mediante POST
	 * 
	 * @param pUserName String Nombre del usuario con el que se realizara la llamada
	 * @param pPass Clave del usuario con la que se se realizara la llamada
	 * @param pURL URL a la que acceder
	 * @param pResultFunction Funcion que se ejecutara si la llamada se completa con exito. Esta funcion recibira 
	 * 			un parametro con objeto JSON correspondiente a la respuesta.
	 * @param pErrorFunction Funcion que se ejecutara en caso de producirse error en la llamada. Esta funcion recibira
	 * 			como parametros los objetos 'xhr' y 'ajaxOptions'
	 */
	this.ajaxJsonPOST = function(pUserName, pPass, pURL, pResultFunction, pErrorFunction){
		$.ajax({
	        type 		: "POST",
			url 		: pURL,
			dataType 	: 'json',
			async 		: false,
			beforeSend 	: function(xhr) {
				$.mobile.loading('show');
				xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(pUserName + ":" + pPass));				
			},
			complete : function() {$.mobile.loading('hide')},
			success : function(response) {
				console.log("Finalizada con exito llamada a '"+pURL+"'");
				pResultFunction(response);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				console.error("Error :"+ xhr.status + ", "+xhr.statusText);				
				pErrorFunction(xhr, ajaxOptions);
			}
		});
	}
	
	/**
	 * Llamada generica a una API JSON mediante GET
	 * 
	 * @param pUserName String Nombre del usuario con el que se realizara la llamada
	 * @param pPass Clave del usuario con la que se se realizara la llamada
	 * @param pURL URL a la que acceder
	 * @param pResultFunction Funcion que se ejecutara si la llamada se completa con exito. Esta funcion recibira 
	 * 			un parametro con objeto JSON correspondiente a la respuesta.
	 * @param pErrorFunction Funcion que se ejecutara en caso de producirse error en la llamada. Esta funcion recibira
	 * 			como parametros los objetos 'xhr' y 'ajaxOptions'
	 */
	this.ajaxJsonGET = function(pUserName, pPass, pURL, pResultFunction, pErrorFunction){
		$.ajax({
	        type 		: "GET",
			url 		: pURL,
			dataType 	: 'json',
			async 		: false,
			beforeSend 	: function(xhr) {
				$.mobile.loading('show');
				xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(pUserName + ":" + pPass));				
			},
			complete : function() {$.mobile.loading('hide')},
			success : function(response) {
				console.log("Finalizada con exito llamada a '"+pURL+"'");
				pResultFunction(response);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				console.error("Error :"+ xhr.status + ", "+xhr.statusText);				
				pErrorFunction(xhr, ajaxOptions);
			}
		});
	}
	
	/**
	 * Llamada generica a una API JSON mediante POST, enviando parametros de entrada
	 * 
	 * @param pUserName String Nombre del usuario con el que se realizara la llamada
	 * @param pPass Clave del usuario con la que se se realizara la llamada
	 * @param pURL URL a la que acceder
	 * @param pData hash con los nombres de los parametros y sus valores, en la forma {param_name1 : param_value1, param_name2 : param_value2, ...}
	 * @param pResultFunction Funcion que se ejecutara si la llamada se completa con exito. Esta funcion recibira 
	 * 			un parametro con objeto JSON correspondiente a la respuesta.
	 * @param pErrorFunction Funcion que se ejecutara en caso de producirse error en la llamada. Esta funcion recibira
	 * 			como parametros los objetos 'xhr' y 'ajaxOptions'
	 */
	this.ajaxJsonPOSTwithData = function(pUserName, pPass, pURL, pData, pResultFunction, pErrorFunction, pContentType){
		$.ajax({
	        type 		: "POST",
			url 		: pURL,
			data		: pData,
			dataType 	: 'json',
			async 		: false,
			beforeSend 	: function(xhr) {
				$.mobile.loading('show');
				xhr.setRequestHeader("Authorization", "Basic " + $.base64.encode(pUserName + ":" + pPass));
			},
			complete : function() {$.mobile.loading('hide')},
			success : function(response) {
				console.log("Finalizada con exito llamada a '"+pURL+"'");
				pResultFunction(response);
			},
			error : function(xhr, ajaxOptions, thrownError) {
				console.error("Error :"+ xhr.status + ", "+xhr.statusText);				
				alert("Error :"+ xhr.status + ", "+xhr.statusText+" - ajOp:"+ajaxOptions+". throw:"+thrownError);				
				pErrorFunction(xhr, ajaxOptions, thrownError);
			}
		});
	}
	
	this.ajaxJsonPOSTwithMedia = function(pUserName, pPass, pURL, pContentType, pFileURL, pData, pResultFunction, pErrorFunction){
		var options = new FileUploadOptions();
        options.fileKey="file";
        var fileName = pFileURL.substr(pFileURL.lastIndexOf('/')+1);
        fileName = fileName.replace(/ /g,"_");
        fileName = fileName.replace(/%20/g,"_");
        options.fileName= fileName;
        options.mimeType=pContentType;
        
        options.params = pData;
        
        options.type="POST";
        console.log("ajaxJsonPOSTwithMedia!!!!!!!!!!!!!:"+options);
        
        var headers = {'Authorization' : "Basic " + $.base64.encode(pUserName + ":" + pPass)};
        options.headers = headers;        
        
        var ft = new FileTransfer();            
		ft.upload(pFileURL, encodeURI(pURL), pResultFunction, pErrorFunction, options);

        
		
	}
	
	
	
	
}
var ddcAjaxUtils = new DDCajaxUtils();


/**
 * Clase con metodos para acceder a archivos
 */
function DDCFileUtils(){
	
	/**
	 * Lee el fichero indicado y devuelve el valor <b>en formato texto</b> como parametro de la funcion 'pOnLoad' indicada.
	 * 
	 * @param pPath String con la ruta del archivo a leer.
	 * @param pOnLoad Function funcion que se ejecutara cuando se lea con exito el archivo indicado. 
	 * 			Esta funcion recibira como parametro una cadena de texto con el contenido del fichero.
	 * @param pOnError Function funcion que se ejecutara si se produce un error al leer el archivo.
	 *  		Esta funcion recibira como parametro un objeto 'error' con informacion del error.
	 */
	this.readFileAsText = function(pPath, pOnLoad, pOnError){
		//Acceso al sistema de archivos del dispositivo
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, pOnError);
		function gotFS(fileSystem) {
			 fileSystem.root.getFile(pPath, {create: true, exclusive: false}, gotFileEntry, pOnError);
		}
		//Acceso al archivo
		function gotFileEntry(fileEntry) {
			fileEntry.file(gotFile, pOnError);
		}
		//Lectura del archivo
		function gotFile(file) {
			//Se lee el fichero
			var reader = new FileReader();
	        reader.onloadend = function(evt) {
	            var result = evt.target.result;
            	//Se ejecuta la funcion 'onLoad'
	            pOnLoad(result);      
	        };
	        reader.readAsText(file);
	    }
	}
	
	/**
	 * Lee el fichero indicado y devuelve el valor <b>en formato Base64</b> como parametro de la funcion 'pOnLoad' indicada.
	 * 
	 * @param pPath String con la ruta del archivo a leer.
	 * @param pOnLoad Function funcion que se ejecutara cuando se lea con exito el archivo indicado. 
	 * 			Esta funcion recibira como parametro el contenido del fichero codificado en Base64.
	 * @param pOnError Function funcion que se ejecutara si se produce un error al leer el archivo.
	 *  		Esta funcion recibira como parametro un objeto 'error' con informacion del error.
	 */
	this.readFileAsDataURL = function(pPath, pOnLoad, pOnError){
		//Acceso al sistema de archivos del dispositivo
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, pOnError);
		function gotFS(fileSystem) {
			 fileSystem.root.getFile(pPath, {create: true, exclusive: false}, gotFileEntry, pOnError);
		}
		//Acceso al archivo
		function gotFileEntry(fileEntry) {
			fileEntry.file(gotFile, pOnError);
		}
		//Lectura del archivo
		function gotFile(file) {
			//Se lee el fichero
			var reader = new FileReader();
	        reader.onloadend = function(evt) {
	            var result = evt.target.result;
            	//Se ejecuta la funcion 'onLoad'
	            pOnLoad(result);      
	        };
	        reader.readAsDataURL(file);
	    }
	}
	
	/**
	 * Almacena los datos indicados en el archivo con la ruta especificada. Si el archivo ya existe se sobreescribira su contenido.
	 * 
	 * @param pPath String con la ruta absoluta en la que almacenar el contenido
	 * @param pContent contenido a almacenar 
	 */
	this.storeFile = function (pPath, pContent, pOnWrite){
		function failWrite(error) {
		    console.log("Error al almacenar archivo:"+error.code);
		    alert("Error al almacenar archivo:"+error.code);
		}
		
		//Acceso al sistema de archivos del dispositivo
		console.log("Entre en .storeFile");
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSwrite, failWrite);
		function gotFSwrite(fileSystem) {
			console.log("Entra en .storeFile.gotFS");
			 fileSystem.root.getFile(pPath, {create: true, exclusive: false}, gotFileEntryWrite, failWrite);
		}
		//Acceso al archivo
		function gotFileEntryWrite(fileEntry) {
			console.log("Entra en .storeFile.gotFileEntry");
			fileEntry.createWriter(gotFileWriter, failWrite);
		}
		//Escritura del archivo
		function gotFileWriter(writer) {
			console.log("Entra en .storeFile.gotFileWriter");
	        writer.onwriteend = function(evt) {
	            console.log("Generado archivo en "+writer.fileName);              
	        };
	        console.log("Entra en .storeFile.gotFileWriter: antes de writer.write");
	        writer.onwriteend = pOnWrite;
	        writer.write(pContent);
	    }
		
		
//		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
//		function gotFS(fileSystem) {
//	        fileSystem.root.getFile(pPath, {create: true, exclusive: false}, gotFileEntry, fail);
//	    }
//
//	    function gotFileEntry(fileEntry) {
//	        fileEntry.createWriter(gotFileWriter, fail);
//	    }
//
//	    function gotFileWriter(writer) {
//	        writer.onwriteend = function(evt) {
//	            console.log("escritura finalizada!!!!!!!!!!!!!!");
//	        };
//	        writer.write(pContent);
//	    }
//
//	    function fail(error) {
//	        console.log(error.code);
//	    }

		
	}
}
var ddcFileUtils = new DDCFileUtils();


/**
 * Clase con metodos para capturar imagenes, audio y video
 */
function DDCCaptureUtils(){
	
	/**
	 * Captura un clip de audio con el dispositivo movil y lo almacena en la ruta por defecto.
	 * 
	 * @param pOnLoad funcion que sera invocada cuando finalice con exito la grabacion, recibiendo un objeto que representa el archivo generado
	 * @param pOnError funcion que se ejecutara si se produce un error o si el usuario cancela la operacion, recibiendo un objeto error con informacion
	 */
	this.captureAudio = function (pOnLoad, pOnError){
		function captureOK(pMediaFiles){
			var _mediaFile = pMediaFiles[0];
			console.log("Grabado audio '"+_mediaFile.name+"' en el archivo: "+_mediaFile.fullPath);
			pOnLoad(_mediaFile);
			
		}
		function captureError(error){
			console.error("Error capturando audio: "+error.code);
			pOnError(error);
		}
		//Se inicia la captura
		navigator.device.capture.captureAudio(captureOK, captureError);
	}
	
	this.captureImage = function (pOnLoad, pOnError){
		function captureOK(pMediaFiles){
//			var _mediaFile = pMediaFiles[0];
			var _mediaFile = new Object();
			_mediaFile.name = pMediaFiles;
			_mediaFile.fullPath = pMediaFiles;
			
			console.log("Grabada imagen '"+_mediaFile.name+"' en el archivo: "+_mediaFile.fullPath);
			pOnLoad(_mediaFile);
			
		}
		function captureError(error){
			console.error("Error capturando imagen: "+error.code);
			pOnError(error);
		}
		//Se inicia la captura
//		navigator.device.capture.captureImage(captureOK, captureError);
		navigator.camera.getPicture(captureOK, captureError, { 'destinationType': navigator.camera.DestinationType.FILE_URI});
	}
	
	this.captureVideo = function (pOnLoad, pOnError){
		function captureOK(pMediaFiles){
			var _mediaFile = pMediaFiles[0];
			console.log("Grabado video '"+_mediaFile.name+"' en el archivo: "+_mediaFile.fullPath);
			pOnLoad(_mediaFile);
			
		}
		function captureError(error){
			console.error("Error capturando video: "+error.code);
			pOnError(error);
		}
		//Se inicia la captura
		navigator.device.capture.captureVideo(captureOK, captureError);
	}
}
var ddcCaptureUtils = new DDCCaptureUtils();

function DDCGeolocationUtils(){
	
	this.getLocation = function (pOnLoad, pOnError){
//		var onSuccess = function(position) {
//		    alert('Latitude: '          + position.coords.latitude          + '\n' +
//		          'Longitude: '         + position.coords.longitude         + '\n' +
//		          'Altitude: '          + position.coords.altitude          + '\n' +
//		          'Accuracy: '          + position.coords.accuracy          + '\n' +
//		          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
//		          'Heading: '           + position.coords.heading           + '\n' +
//		          'Speed: '             + position.coords.speed             + '\n' +
//		          'Timestamp: '         + position.timestamp                + '\n');
//		};
//		function onError(error) {
//		    alert('code: '    + error.code    + '\n' +
//		          'message: ' + error.message + '\n');
//		}
		navigator.geolocation.getCurrentPosition(pOnLoad, pOnError);
	}
	
}
var ddcGeolocationUtils = new DDCGeolocationUtils();


function DDCDialogUtils(){
//	var proggressDiv = $('<div class="modal hide" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-header"><h1 id="ddcProggressText">Procesando...</h1></div><div class="modal-body"><div class="progress progress-striped active"><div class="bar" style="width: 100%;"></div></div></div></div>');
	var modalInstance = new BootstrapDialog({
        closable: false        
    });
	
	this.showProgress = function(pText){
		modalInstance.realize();
		modalInstance.getModalHeader().hide();
		modalInstance.getModalFooter().hide();
		modalInstance.setMessage(pText).open();
	}

	this.hideProgress = function(){
		modalInstance.close();
	}
}
var ddcDialog = new DDCDialogUtils();