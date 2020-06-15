
var selector = d3.select("#selDataset");

var dependencias = []


var inputField = d3.select("#keywordsearch").property("value")


d3.json("./data/licigob.json").then(data => {
    data.forEach(element => {
      if (dependencias.includes(element.Dependencia)){
        //pass
      }else{
        dependencias.push(element.Dependencia)
      }
      
  });
  dependencias.sort().forEach(element =>{
    var options = selector.append("option");
    options.text(element);
    options.attr("value", element);
  })
  // Sample Data

  var filteredData = data.slice(0,20);
  filteredData.forEach(element => {
    if (element.interno == "CUPISA"){
      var topColor = "#337ab7"
    }else if (element.interno == "URALES"){
      var topColor= "green"
    }else{
      var topColor= "red"
    }
    var panelData = d3.select("#information_proc").append("div")
    panelData.classed("panel panel-primary", true)
    panelData.html(`
    <div class="panel-heading" style="background-color:${topColor};">
            <h3 class="panel-title">${element.Descripcion}</h3>
          </div>
          <div id="sample-metadata" class="panel-body">
          <p>Dependencia : ${element.Dependencia}</p>
          <p>Lugar : ${element.Lugar}</p>
          <p>Fecha de publicación : ${element.fecha_de_publicacion}</p>
          <p>Fecha de Presentación : ${element.fecha_de_presentacion}</p>
          <p>Modalidad del concurso : ${element.Modalidad}</p>
          <p>Numero de procedimiento : ${element.Numero_de_procedimiento}</p>
          <a href="${element.link}" target="_blank">Revisar el Procedimiento</a>
          </div>`);
});
});

var button = d3.select("#filter-btn");
button.on("click", loadData);
var companySel = ""


function changeCUP(){
  companySel = "URALES"
};
function changeCU(){
  companySel = "CUPISA"
};
function changeAMB(){
  companySel = ""
};

function loadData(){
  d3.select("#information_proc").html("")
  var inputValue = d3.select("#selDataset").property("value");
  d3.json("./data/licigob.json").then(data => {
  if (inputValue == "todas"){
    var filteredData = data
  }else{
    var filteredData = data.filter((element) => element.Dependencia == inputValue);
  };
    if (companySel == ""){
      var filteredData2 = filteredData
    }else{
    var filteredData2 = filteredData.filter((element) => element.interno != companySel);
    }
    var searchLower = d3.select("#keywordsearch").property("value").toLowerCase();
    var filteredData3 = filteredData2.filter((element) => element.Descripcion.toLowerCase().includes(searchLower)) 
  filteredData3.forEach(element => {
    if (element.interno == "CUPISA"){
      var topColor = "#337ab7"
    }else if (element.interno == "URALES"){
      var topColor= "green"
    }else{
      var topColor= "red"
    }
    var panelData = d3.select("#information_proc").append("div")
    panelData.classed("panel panel-primary", true)
    panelData.html(`
    <div class="panel-heading" style="background-color:${topColor};">
            <h3 class="panel-title">${element.Descripcion}</h3>
          </div>
          <div id="sample-metadata" class="panel-body">
          <p>Dependencia : ${element.Dependencia}</p>
          <p>Lugar : ${element.Lugar}</p>
          <p>Fecha de publicación : ${element.fecha_de_publicacion}</p>
          <p>Fecha de Presentación : ${element.fecha_de_presentacion}</p>
          <p>Modalidad del concurso : ${element.Modalidad}</p>
          <p>Numero de procedimiento : ${element.Numero_de_procedimiento}</p>
          <a href="${element.link}" target="_blank">Revisar el Procedimiento</a>
          </div>`);

  });
});
};


var searchWords = ["instalaciones", "mecánica", "mecanica", "electrica", 
"eléctrica", "subestacion", "subestación", "electromecánica", "electromecanica",
 "comunicaciones", "montaje", "fibra", "óptica", "optica", "movilidad", "sistemas", "its", "linea",
  "línea", "tráfico", "trafico", "brt", "seguridad", "camara", "cámara", "site", "centro", "control"]

function splitbywords(searchWord){
  d3.json("./data/licigob.json").then(data => {
    var keyWord = data.filter((element) => element.Descripcion.toLowerCase().includes(searchWord));
    if (keyWord.length === 0){ 
     //pass
    }else{
      d3.select("#paramCupi").append()
      .html(`<li class="list-group-item d-flex justify-content-between align-items-center" onclick="loadData2('${searchWord}')">
      ${searchWord}
      <span class="badge badge-primary badge-pill">${keyWord.length}</span>
    </li> `)

    }  
})
};

searchWords.forEach(word => {
  splitbywords(word)
});


function loadData2(valuePassed){
  d3.select("#information_proc").html("")

  d3.json("./data/licigob.json").then(data => {
      var filteredData3 = data.filter((element) => element.Descripcion.toLowerCase().includes(valuePassed)) 
  filteredData3.forEach(element => {
    if (element.interno == "CUPISA"){
      var topColor = "#337ab7"
    }else if (element.interno == "URALES"){
      var topColor= "green"
    }else{
      var topColor= "red"
    }
    var panelData = d3.select("#information_proc").append("div")
    panelData.classed("panel panel-primary", true)
    panelData.html(`
    <div class="panel-heading" style="background-color:${topColor};">
            <h3 class="panel-title">${element.Descripcion}</h3>
          </div>
          <div id="sample-metadata" class="panel-body">
          <p>Dependencia : ${element.Dependencia}</p>
          <p>Lugar : ${element.Lugar}</p>
          <p>Fecha de publicación : ${element.fecha_de_publicacion}</p>
          <p>Fecha de Presentación : ${element.fecha_de_presentacion}</p>
          <p>Modalidad del concurso : ${element.Modalidad}</p>
          <p>Numero de procedimiento : ${element.Numero_de_procedimiento}</p>
          <a href="${element.link}" target="_blank">Revisar el Procedimiento</a>
          </div>`);

  });
});
};