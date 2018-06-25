var limiteitem = 12;
var testval,memoval;
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  console.log(x.length);
  memoval=0;
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    testval =x[i].className.indexOf(c);
    console.log(testval);
    
    if ((testval > -1)&&(memoval < limiteitem)) {w3AddClass(x[i], "show");
    memoval++;}
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) 
    {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

var y

$('#showfilmP').on('click', function() {
  $('#showfilmP').css("display","none");
  $('#showfilmM').css("display","block");
  limiteitem=18;
  y = document.getElementsByClassName("active");
  console.log(y[0].id);
  switch(y[0].id){
    case "all": 
      filterSelection("all");
      break;
    case "action": 
      filterSelection("action");
      break;
    case "commedie": 
      filterSelection("commedie");
      break;
    case "amour": 
      filterSelection("amour");
      break;
    case "all": 
      filterSelection("triler");
      break;
  }
});
$('#showfilmM').on('click', function() {

  $('#showfilmM').css("display","none");
  $('#showfilmP').css("display","block");
  limiteitem=12;
  y = document.getElementsByClassName("active");
  console.log(y[0].id);
  switch(y[0].id){
    case "all": 
      filterSelection("all");
      break;
    case "action": 
      filterSelection("action");
      break;
    case "commedie": 
      filterSelection("commedie");
      break;
    case "amour": 
      filterSelection("amour");
      break;
    case "all": 
      filterSelection("triler");
      break;
  }
});