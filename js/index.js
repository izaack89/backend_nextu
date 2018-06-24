/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
function setSelect(){
        var params ={
                "filterKey": 'get_selects'
            };
        $.ajax
                ({
                type: "POST",
                url: "php/ajax.php",
                data: params,
                async: true,
                cache: false,
                success: function(response)
                {   

                    var data=JSON.parse(response);
                    let total_ciudades=data['ciudades'].length;
                    let select_ciudad = document.getElementById("selectCiudad");
                    for(var x=0;x<total_ciudades;x++){
                        var option_ciudad = document.createElement("option");
                            option_ciudad.text = data['ciudades'][x];
                            option_ciudad.value = data['ciudades'][x];
                            select_ciudad.add(option_ciudad);
                    }
                    let total_tipos=data['tipos'].length;
                    let select_tipo = document.getElementById("selectTipo");
                    for(var x=0;x<total_tipos;x++){
                        var option_tipo = document.createElement("option");
                            option_tipo.text = data['tipos'][x];
                            option_tipo.value = data['tipos'][x];
                            select_tipo.add(option_tipo);
                    }
                    
                    $('select').formSelect();
                },
                error: function(response){
                    console.log(response);
                }
        });  
    }
    function buscar(tipo_busqueda){
        let ciudad=document.getElementById("selectCiudad").value;
        let tipo=document.getElementById("selectTipo").value;
        let slider = $("#rangoPrecio").data("ionRangeSlider");
        let from = slider.result.from;
        let to = slider.result.to;
        console.log(from);
        console.log(to);
        var params ={
                "ciudad": ciudad,
                "tipo": tipo,
                "tipo_busqueda": tipo_busqueda,
                "from": from,
                "to": to,
                "filterKey": 'busqueda_casas'
            };
        $.ajax
                ({
                type: "POST",
                url: "php/ajax.php",
                data: params,
                async: true,
                cache: false,
                success: function(response)
                {   

                    var data=JSON.parse(response);
                    console.log(response);
                   
                    let total_casas=data.length;
                    let info_casas = document.getElementById("info_casas");
                    info_casas.innerHTML="";
                    for(var x=0;x<total_casas;x++){
                        var div_row = document.createElement("div");
                            div_row.className = "row";
                            info_casas.appendChild(div_row);
                        var div_img = document.createElement("div");
                            div_img.className = "col-md-4 text-center";
                        var img_elem = document.createElement("img");
                            img_elem.src="img/home.jpg";
                            img_elem.className = "img-responsive";
                            div_img.appendChild(img_elem);
                            info_casas.appendChild(div_img);
                        var div_text = document.createElement("div");
                            div_text.className = "col-md-8";
                        var p_text = document.createElement("p");
                        var span_direccion = document.createElement("span");
                            span_direccion.innerHTML = "Direccion: ";
                            span_direccion.className = "text-bold";
                            p_text.appendChild(span_direccion);
                        var span_direccion_data = document.createElement("span");
                            span_direccion_data.innerHTML = data[x]["Direccion"];
                           
                            p_text.appendChild(span_direccion_data); // Agrega el valor de Direccion
                            p_text.appendChild(document.createElement("BR")); // Agrega salto de linea
                        
                        var span_ciudad = document.createElement("span");
                            span_ciudad.innerHTML = "Ciudad: ";
                            span_ciudad.className = "text-bold";
                            p_text.appendChild(span_ciudad);
                        var span_ciudad_data = document.createElement("span");
                            span_ciudad_data.innerHTML = data[x]["Ciudad"];
                            
                            p_text.appendChild(span_ciudad_data); // Agrega el valor de Ciudad
                            p_text.appendChild(document.createElement("BR")); // Agrega salto de linea
                        
                        var span_telefono = document.createElement("span");
                            span_telefono.innerHTML = "Telefono: ";
                            span_telefono.className = "text-bold";
                            p_text.appendChild(span_telefono);
                        var span_telefono_data = document.createElement("span");
                            span_telefono_data.innerHTML = data[x]["Telefono"];
                            
                            p_text.appendChild(span_telefono_data); // Agrega el valor deTelefono
                            p_text.appendChild(document.createElement("BR")); // Agrega salto de linea
                            
                        var span_cp = document.createElement("span");
                            span_cp.innerHTML = "Codigo Postal: ";
                            span_cp.className = "text-bold";
                            p_text.appendChild(span_cp);
                        var span_cp_data = document.createElement("span");
                            span_cp_data.innerHTML = data[x]["Codigo_Postal"];
                            
                            p_text.appendChild(span_cp_data); // Agrega el valor de Codigo Postal
                            p_text.appendChild(document.createElement("BR")); // Agrega salto de linea
                        
                        var span_tipo = document.createElement("span");
                            span_tipo.innerHTML = "Tipo: ";
                            span_tipo.className = "text-bold";
                            p_text.appendChild(span_tipo);
                        var span_tipo_data = document.createElement("span");
                            span_tipo_data.innerHTML = data[x]["Tipo"];
                            
                            p_text.appendChild(span_tipo_data); // Agrega el valor de Codigo Postal
                            p_text.appendChild(document.createElement("BR")); // Agrega salto de linea
                        
                        var span_precio = document.createElement("span");
                            span_precio.innerHTML = "Precio: ";
                            span_precio.className = "text-bold";
                            p_text.appendChild(span_precio);
                        var span_precio_data = document.createElement("span");
                            span_precio_data.innerHTML = data[x]["Precio"];
                            span_precio_data.className = "precioTexto";
                            
                        var div_divider = document.createElement("div");
                            div_divider.className = "divider";    
                            
                        var div_vermas = document.createElement("div");
                            div_vermas.innerHTML = " Ver Mas ";    
                            div_vermas.className = "texto_derecha";    
                            
                            p_text.appendChild(span_precio_data); // Agrega el valor de Precio
                            div_text.appendChild(p_text);          // Agrega todo el elemento p dentro del Div de texto
                            div_text.appendChild(div_divider);          // Agrega todo el elemento p dentro del Div de texto
                            div_text.appendChild(div_vermas);          // Agrega todo el elemento p dentro del Div de texto
                            info_casas.appendChild(div_text);       // Agrega el div de texto al div principal
                        
                    }
                },
                error: function(response){
                    console.log(response);
                }
        });  
    }
    setSelect();
      
inicializarSlider();
//playVideoOnScroll();
