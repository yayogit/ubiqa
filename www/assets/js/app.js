$( document ).ready(function() {

	// MOSYRAR Y OCULTAR SIDEBAR
	$("#menu-toggle").click(function(e) {
	    e.preventDefault();
	    $("#wrapper").toggleClass("active");
	});

	// CONTROLAR MAPA CON EL BOTON DEL TOOLBAR
	$("#menu-map-toggle").click(function(e) {
	    e.preventDefault();
	    // SI EL MAPA ESTA VISIBLE
	    if ($("#wrapper").hasClass("showmap") == true){
	    	// OUCLTAR MAPA Y DESACTIVAR PINCHOS ACTIVOS
	    	$("#wrapper").toggleClass("showmap");
	    	$(".place").removeClass("active");
		}else{
			// SINO MOSTRAR MAPA
			$("#wrapper").toggleClass("showmap");
		};
	});

	// MOSTRAR MAPA DESDE LOS PINCHOS DE LOS CONTENIDOS
	$(".place").click(function(e) {
		// SI ESTA VISIBLE EL MAPA
	    if ($("#wrapper").hasClass("showmap") == true){
	    	// SI ESTA ACTIVO EL PINCHO
			if ($(this).hasClass("active") == true){
				//OCULTAR MAPA Y DESACTIVAR PINCHO
				$("#wrapper").toggleClass("showmap");
				$(this).toggleClass("active");
	    	}
	    }else{
	    	// SINO MOSTRAR MAPA Y ACTIVAR PINCHO
			$("#wrapper").toggleClass("showmap");
			$(this).toggleClass("active");
    	}
	});

	// OCULTAR Y MOSTRAR BOTONES DE FILTRADO
	$(".labels .btn-default").click(function(e) {
	    var filtro = $(this).text();

	    e.preventDefault();
	    $(this).toggleClass("active");
	    $("."+filtro).toggleClass("hidden");

	    // RELANZAR FUNCION MASONRY (mosaico tipo pinterst) PARA RECALCULAR POSICION
	    $container.masonry({
            itemSelector: '.modulo',
            columnWidth: '.modulo',
            transitionDuration: 0
        });
	});

	$(".ocultar").click(function(e) {
	    e.preventDefault();
	    $(".ocultar").toggleClass("hidden");
	    $(".labels").toggleClass("cerrado");
	});

	$(".btn-editar").click(function(e) {
	    e.preventDefault();
	    $(".galeria").toggleClass("edicion");
	    $(this).toggleClass("active");
	});

	//INICIALIZAMOS FUNCION DE ACORTADO DE TEXTO CON ELLIPSIS EN LOS PARRAFOS DESCRIPTIVOS QUE SON COLAPSABLES
	$(".info p").dotdotdot();

	$(".info p").click(function(e) {
	    e.preventDefault();
	    $(this).toggleClass("extendido");

        $(this).dotdotdot();

        // RELANZAR FUNCION MASONRY (mosaico tipo pinterst) PARA RECALCULAR POSICION
	    $container.masonry({
            itemSelector: '.modulo',
            columnWidth: '.modulo',
            transitionDuration: 0
        });
	});

	// INICIALIZAMOS LAS POPUPS DE LOS ELEMENTOS MEDIA DE LA GALERIA (solo imagenes)
	$('.galeria').magnificPopup({
	  delegate: '.img-link', // child items selector, by clicking on it popup will open
	  type: 'image'
	  // other options
	});
	
	

	// ACTIVAR Y DESACTIVAR LAS CAPAS DE MODO EDICION PARA PODER ELIMINAR ELEMENTOS DE LA GALERIA
	$( "#btnEditPhotos" ).click(function(e) {
	    e.preventDefault();
		if ($('.galeria').is('.editable')) {
		    $('.galeria').removeClass('editable');
		}
		
		else{
		    $('.galeria').addClass('editable');
		}
	});
	

	$( "#btnEditTexto" ).click(function(e) {
	    e.preventDefault();
		if ($('#textDescription').is('.editable')) {
		    $('#textDescription').removeClass('editable');
		}
		
		else{
		    $('#textDescription').addClass('editable');
		}
	});

	var $container = $('.galeria');
	// INICIALIZAMOS FUNCION MASONRY (mosaico tipo pinterst) PARA RECALCULAR POSICION
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.modulo',
            columnWidth: '.modulo',
            transitionDuration: 0
        });
    });

});