var searchWords = ["instalaciones", "mecánica", "mecanica", "electrica", 
"eléctrica", "subestacion", "subestación", "electromecánica", "electromecanica",
 "comunicaciones", "montaje", "fibra óptica", "optica", "movilidad", "sistemas", "its", "linea",
  "línea", "tráfico", "trafico", "brt", "seguridad", "camara", "cámara", "site", "centro de control", "construccion", "construcción"]

var selector = d3.select("#selDataset");

var dependencias = []

var data2filter = []

function loadDependencias(){
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
})
};

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

var inputField = d3.select("#keywordsearch").property("value")

function displayData(dataSet){
   dataSet.forEach(element => {
   if (element.interno == "CUPISA"){
     var topColor = "#337ab7"
   }else if (element.interno == "URALES"){
     var topColor= "green"
   }else{
     var topColor= "purple"
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
}

function loadInitialData(){
  d3.json("./data/licigob.json").then(data => {
    var firstData = data.slice(0,15);
    displayData(firstData);
    searchParam(searchWords, firstData);
  });
};

function searchParam (wordsList, dataset){
  wordsList.forEach(word => {
    var keyWord = dataset.filter((element) => element.Descripcion.toLowerCase().includes(word));
    if (keyWord.length === 0){ 
     //pass
    }else{
      d3.select("#paramCupi").append()
      .html(`<li class="list-group-item d-flex justify-content-between align-items-center" onclick="loadData2('${word}')">
      ${word}
      <span class="badge badge-primary badge-pill">${keyWord.length}</span>
    </li> `)
    } 
  });
};

var button = d3.select("#filter-btn");
button.on("click", filterData);

function cleanDesk(){
  d3.select("#information_proc").html("");
  d3.select("#paramCupi").html("");
}

function storeData(passedData){
  data2filter = [];
  data2filter = passedData;
}

function filterData(){
  cleanDesk();
  var inputValue = d3.select("#selDataset").property("value");
  var searchLower = d3.select("#keywordsearch").property("value").toLowerCase();
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
    var filteredData3 = filteredData2.filter((element) => element.Descripcion.toLowerCase().includes(searchLower)) 
    displayData(filteredData3);
    searchParam(searchWords, filteredData3)
    storeData(filteredData3)
});
};

function loadData2(value){
  d3.select("#information_proc").html("")
  var minimalData = data2filter.filter((element) => element.Descripcion.toLowerCase().includes(value))
  displayData(minimalData)
}

loadDependencias();
loadInitialData();