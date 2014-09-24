/*
 * Funciones para el renderizado de contenidos
 *
 */


//VARIABLES
	var CONTENT_TEMPLATE = 	"<figure id='figure_content_{id}' class='modulo {class_editable} col-xs-6 col-md-4 {type_class}' style='{extra_style}'>"+
							  "<a href='{content_url}' id='content_viewer_{id}' class='{type_class_viewer}-link thumb' style='background-image: url({thumb_url})'>"+
							    "<span class='icon {type_icon}'></span>"+
							  "</a>"+
							  "<div class='info'>"+
							    "<h2 style='height:60px'>{content_name}</h2>"+
							    "<p>{description}<br/><br/>"+
							    	"Temas: {temas}<br/><br/>"+
							    	"{datos_entrevista}<br/><br/>"+
									"{city}<br/>"+
									"{country}<br/>"+
									"{address}<br/>"+ 
								"</p>"+
								"<div class='btn-group acciones'>"+
									"<a class='estado {status}'><span class='icon {status_icon} estampado'></span></a>"+
									"<a class='place' href='javascript:selectionToMap({marker_id})' ><span class='icon icon-location'></span></a>"+
								"</div>";

var CONTENT_TEMPLATE_EDITOR = 	"<figure class='modulo col-xs-6 col-md-4 {type_class}' style='{extra_style}'>"+
									"{media_viewer}"+
									"<div class='editor'>"+
									"<p>{content_name}</p>"+
									"<p>{description}</p>"+
									"<p>{temas}</p>"+
									"<p>{datos_entrevista}</p>"+
									"<p>{city}</p>"+
									"<p>{country}</p>"+
									"<p>{address}</p>"+
									"<p class='coordenadas'><a href='javascript:getCoordenadas()'><span class='icon icon-location'></span>Coordenadas:</a> Calculando...</br></p><input id='txt_longitude' type='hidden'/><input id='txt_latitude' type='hidden'/>"+
									"<div class='accordion-heading'>"+
										"<a href='#edit_entrevista' data-parent='#myAccordion' data-toggle='collapse' class='accordion-toggle'>Datos Entrevista</a>"+
									"</div>"+
									"<div class='accordion-body collapse' id='edit_entrevista'>"+
										"<div class='accordion-inner item'>"+
											"<div class='btn-group' data-toggle='buttons'>"+
												"<label class='author btn btn-default icon ui-link'><input type='radio' class='optGenre' name='nik_genre' id='radio_genero' value='male'>Hombre</label>"+
												"<label class='author btn btn-default icon ui-link'><input type='radio' class='optGenre' name='nik_genre' id='radio_genero' value='female'> Mujer</label>"+
											"</div>"+
											"<div class='btn-group'>"+
												"<button type='button' class='btn btn-default dropdown-toggle selector_edad' data-toggle='dropdown' data-value='0'>Selecciona rango de edad</button>"+
												"<ul class='dropdown-menu' role='menu'>"+
													"<li role='menuitem'><a class='edad_10' href='javascript:setAge(\"edad_10\")' title='Entre 14 y 18 años' data-value='10'>Entre 14 y 18 años</a></li>"+
													"<li role='menuitem'><a class='edad_20' href='javascript:setAge(\"edad_20\")' title='Entre 19 y 25 años' data-value='20'>Entre 19 y 25 años</a></li>"+
													"<li role='menuitem'><a class='edad_30' href='javascript:setAge(\"edad_30\")' title='Entre 26 y 35 años' data-value='30'>Entre 26 y 35 años</a></li>"+
													"<li role='menuitem'><a class='edad_50' href='javascript:setAge(\"edad_50\")' title='Más de 35 años'     data-value='50'>Más de 35 años</a></li>"+
												"</ul>"+
											"</div>"+							
										"</div>"+
									"</div>"+								
									"<p ><button type'button' class='btn btn-link text-left' onclick='sendContent(\"{content_type}\",\"{file_url}\")'>Aceptar</button>"+	           
									"<button type'button' class='btn btn-link text-right' onclick='cancelEdit()'>Cancelar</button></p>"
									;


var CONTENT_TEMPLATE_BOTTOM = "</div><a class='btn-eliminar' onclick='removeContent({id}, \"{content_name_for_remove}\")'><span class='icon icon-cancel'></span></a></figure>";


/**
 * Obtiene la lista de proyectos del servidor y genera el HTML correspondiente para su visualizacion.
 * 
 * @param pOKFunction Funcion que se ejecutara si se obtiene con exito la lista de proyectos. Esta funcion
 * recibe un los siguientes parametros:
 * 	- pHTMLProjects 	: {String} HTML para la visualizacion de la lista de proyectos.
 *  - pFirstProjectId 	: {int} ID del primer proyecto de la lista
 *  - pFirstProjectName	: {String} Nombre del primer proyecto de la lista
 */
function renderProjects(pOKFunction){
	//Se genera el HTML correspondiente a la lista de proyectos
	getHtmlProjects = function(result){		
		var _firstProjectId = 0;
		var _firstProjectName = "";
		var _proyectos = "";
		var _projectDescriptions = new Array();
		$.each(result, function (i, proyecto){
			if(_firstProjectId == 0){
				_firstProjectId = proyecto.id;
				_firstProjectName = proyecto.name;
			}
			_proyectos += "<li><a href='javascript:loadProjectContents("+proyecto.id+",\""+proyecto.name+"\",true)'>"+proyecto.name+"</a></li>";
			_projectDescriptions['id'+proyecto.id] = proyecto.description;
		});
		//Se invoca a la funcion de finalizacion pasando el HTML generado
		pOKFunction(_proyectos, _firstProjectId, _firstProjectName, _projectDescriptions);		
	}
	//Se obtiene la lista de proyectos del servidor
	APIcalls.getProjects(getHtmlProjects);
}

/**
 * Genera el HTML para visualizar los contenidos recibidos como parametro
 * 
 * @param pContents Lista de contenidos a visualizar
 */
function renderContents(pContents){	
	var _contentTemplate = 	CONTENT_TEMPLATE + CONTENT_TEMPLATE_BOTTOM;
	
	//Se recorren todos los contenidos y se generan los elementos de interfaz
	var _htmlContents = "";
	$.each(pContents, function (i, contenido){
		if(contenido.project_id == currentProjectID){
			_htmlContents += _contentTemplate
								.replace(/\{extra_style\}/g, "")
								/* Tipo */
								.replace(/\{type_icon\}/g, (contenido.type == "image"? "icon-icn-247" : (contenido.type == "audio" ? "icon-mic" : "icon-icn-327")))
								.replace(/\{type_class\}/g, (contenido.type == "image"? "imagen" : contenido.type))
								.replace(/\{type_class_viewer\}/g, (contenido.type == "image"? "img" : "video"))
								/* Id */
								.replace(/\{id\}/g, contenido.id)
								/* Media */
								.replace(/\{content_url\}/g, (contenido.type == "image"? contenido.content_url : "#video_viewer_"+contenido.id))
								/* Miniatura */
								.replace(/\{thumb_url\}/g, getUrlFromImg(contenido.thumb_html))
								/* Nombre */
								.replace(/\{content_name\}/g, contenido.content_name)
								.replace(/\{content_name_for_remove\}/g, contenido.content_name)
								/* Descripcion */
								.replace(/\{description\}/g, contenido.description)
								/* Coordenadas */
								.replace(/\{coords\}/g, (contenido.location != null? contenido.location.lon+","+contenido.location.lat : ""))
								.replace(/\{marker_id\}/g, i)
								/* Estado (local / publicado) */
								.replace(/\{status\}/g, (contenido.content_status == "publish"? "cloud" : "local"))
								.replace(/\{status_icon\}/g, (contenido.content_status == "publish"? "icon-icn-155" : "icon-floppy"))
								/* Etiquetas tematicas */
								.replace(/\{temas\}/g, getTagNames(contenido.topics," "))
								/* Direccion */
								.replace(/\{city\}/g,contenido.city==null?"":contenido.city)
								.replace(/\{country\}/g,contenido.country==null?"":contenido.country)
								.replace(/\{address\}/g,contenido.address==null?"":contenido.address)
								/* Datos Entrevista */
								.replace(/\{datos_entrevista\}/g,renderInterviewData(contenido))
								/* Editable (si el usuario es el autor) */
								.replace(/\{{class_editable\}/g, userUbiqarama.user_id == contenido.user_id? "" : "bloqueado" )
								;
			if(contenido.type!="image"){
				_htmlContents += "<div id='video_viewer_"+contenido.id+"' class='mfp-hide' style='position:relative;background: #FFF;padding:20px;width:auto;max-width:500px;margin: 20px auto;'>";
				if(contenido.type=="video"){
					if(contenido.content_status == "publish"){
						if(contenido.embed_html !== null){_htmlContents += contenido.embed_html.replace("=\"//","=\"http://");}	
					}else{
						_htmlContents += "<video width='100%' height='auto' controls src='"+contenido.local_video_url+"'>Tu dispositivo no soporta "+contenido.type+" HTML5.</video>";
					}										
				}else{
					_htmlContents += contenido.audio_html;					
				}
				_htmlContents += "</div>";
			}
		}		
	});
			
	return _htmlContents;
}

/**
 * Obtiene el HTML correspondiente al editor de contenido que visualiza tanto el archivo multimedia capturado como los campos necesarios para introducir
 * toda la informacion relacionada con el contenido.
 * 
 * @param pContentType {String} Tipo de contenido multimedia
 * @param pFileURL {String} Ruta al archivo multimedia
 */
function renderEditor(pContentType, pFileURL){
	var _mediaViewer = "";
	if(pContentType=="image"){
		_mediaViewer += 	"<a href='"+pFileURL+"' id='content_viewer_NEW' class='img-link thumb' style='background-image: url("+pFileURL+")'><span class='icon {type_icon}'></span></a>";
	}else if(pContentType=="video"){
		_mediaViewer += "<video width='100%' height='auto' controls src='"+pFileURL+"'>Tu dispositivo no soporta "+pContentType+" HTML5.</video>";
	}else{
		_mediaViewer += "<audio width='100%' height='auto' controls src='"+pFileURL+"'>Tu dispositivo no soporta "+pContentType+" HTML5.</audio>";					
	}
	
	var _contentTemplate = 	CONTENT_TEMPLATE_EDITOR + CONTENT_TEMPLATE_BOTTOM;
	
	var _htmlContents = _contentTemplate
								.replace(/\{extra_style\}/g, "width:100%; z-index:1000")
								.replace(/\{media_viewer\}/g, _mediaViewer)
								/* Tipo */
								.replace(/\{type_icon\}/g, (pContentType == "image"? "icon-icn-247" : (pContentType == "audio" ? "icon-mic" : "icon-icn-327")))
								.replace(/\{type_class\}/g, (pContentType == "image"? "imagen" : pContentType))
								.replace(/\{type_class_viewer\}/g, (pContentType == "image"? "img" : "video"))
								.replace(/\{content_type\}/g, pContentType)
								/* Id */
								.replace(/\{id\}/g, "NEW")
								/* Media */
								.replace(/\{content_url\}/g, (pContentType == "image"? pFileURL : "#video_viewer_NEW"))
								.replace(/\{file_url\}/g, pFileURL)
								/* Miniatura */
								.replace(/\{thumb_url\}/g, pFileURL)
								/* Nombre */
								.replace(/\{content_name\}/g, "<input id='txt_content_name' name='content_name' type='text' class='form-control content_name' placeholder='Nombre' required autofocus/>")
								.replace(/\{content_name_for_remove\}/g, "NEW")
								/* Descripcion */
								.replace(/\{description\}/g, "<textarea id='txt_description' name='description' type='text' class='form-control description campo_editable_con_formato' placeholder='Descripcion' cols='5'/>")
								/* Coordenadas */
								.replace(/\{coords\}/g, "<input id='txt_longitude' type='hidden'/><input id='txt_latitude' type='hidden'/><a href='javascript:getCoordenadas()'><span class='icon icon-location'></span>Coordenadas:</a> Calculando...")
								/* Estado (local / publicado) */
								.replace(/\{status\}/g, ("local" == "publish"? "cloud" : "local"))
								.replace(/\{status_icon\}/g, ("local" == "publish"? "icon-icn-155" : "icon-floppy"))
								/* Etiquetas tematicas */
								.replace(/\{temas\}/g, renderTagSelector())
								/* Direccion */
								.replace(/\{city\}/g,"<input id='txt_city' name='city' type='text' class='form-control city' placeholder='Ciudad'/>")
								.replace(/\{country\}/g,"<input id='txt_country' name='country' type='text' class='form-control country' placeholder='Pais'/>")
								.replace(/\{address\}/g,"<input id='txt_address' name='address' type='text' class='form-control address' placeholder='Direccion'/>")
								/* Datos Entrevista */
								.replace(/\{datos_entrevista\}/g,"")
								;
	
	
	var editor = new MediumEditor('.campo_editable_con_formato');
	
	return _htmlContents;
}



function renderInterviewData(pContent){
	var _htmlInterview = "";
	if(pContent.is_interview == 1){
		_htmlInterview += "Datos Entrevista: ";
		_htmlInterview += (pContent.genre == "male"? "Hombre, " : "Mujer, ");		
		if(pContent.age == "10"){_htmlInterview += "entre 14 y 18 a&ntilde;os";}
		else if(pContent.age == "20"){_htmlInterview += "entre 19 y 25 a&ntilde;os";}
		else if(pContent.age == "30"){_htmlInterview += "entre 26 y 35 a&ntilde;os";}
		else if(pContent.age == "50"){_htmlInterview += "mas de 35 a&ntilde;os";}		
	}
	return _htmlInterview;
}


function getUrlFromImg(pHTML){
	var _url = pHTML.replace(/ /g,"").replace(/(.*)src=\"/g,"").replace(/\"(.*)/g,"");
	return _url;
}

function getTagName(pTagId){
	var tagName = "";
	$.each(tagList, function (i, tag){
		if(tag.id == pTagId){
			tagName = tag.name;
			return tagName;
		}		
	});
	return tagName;
}

function getTagNames(pTagIdList, pSeparador){
	var tagNames = "";
	$.each(pTagIdList, function (i, tagId){
		tagNames += pSeparador + getTagName(tagId);
	});
	return tagNames;
}

function renderTagSelector(){
	var renderTagList =
		"<div class='accordion-heading'>"+
			"<a href='#edit_tags' data-parent='#myAccordion' data-toggle='collapse' class='accordion-toggle'>Temas </a>"+
		"</div>"+
		"<div class='accordion-body collapse' id='edit_tags'>"+
			"<div class='accordion-inner item'>"+
				"<div class='btn-group' data-toggle='buttons'>";	
	$.each(tagList, function (i, tag){
		renderTagList += "<label class='author btn btn-default icon ui-link'><input type='checkbox' class='chkTag' name='"+tag.name+"' value='"+tag.id+"'>"+tag.name+"</label>";
	});
	renderTagList += 
				"</div>"+
			"</div>"+
		"</div>";
	
	return renderTagList;
}


/**
 * Obtiene las coordenadas de la ubicacion actual del dispositivo y las muestra
 */
function getCoordenadas(){	 
	$("p.coordenadas").html("<a href='javascript:getCoordenadas()'><span class='icon icon-location'></span>Coordenadas:</a> Calculando...");
	
	function getCoordsOK(pPosition){
		//Mostrar
		$("#txt_longitude").val(pPosition.coords.longitude);
		$("#txt_latitude").val(pPosition.coords.latitude);
		$("p.coordenadas").html("<a href='javascript:getCoordenadas()'><span class='icon icon-location'></span>Coordenadas:</a><br/> Longitud="+pPosition.coords.longitude+", Latitud="+pPosition.coords.latitude);				
	}
	function getCoordsError(pError){
		ubiqaramaUtils.alert('Error al obtener la ubicacion actual.\ncode: '+error.code+''+'message: '+error.message);
	}
	//Obtener coordenadas
	ddcGeolocationUtils.getLocation(getCoordsOK, getCoordsError);
}