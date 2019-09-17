 /* Pici	Computação, Matemática e Geologia
	Benfica Letras, Filosofia e Direito
	Porangabussu  Medicina, Odontologia e Farmácia
 */

var idButton = -1;

var matriculas = [];
var populated = false;

function changeContent() {
 	var campus = document.getElementById("campus").value;
 	var data = {
 		"Pici": ["Computação", "Matemática" , "Geologia"],
 		"Benfica" : ["Letras", "Filosofia" , "Direito"],
 		"Porangabussu" : ["Medicina", "Odontologia" , "Farmácia"]
 	}
 	var cursos = document.getElementById("cursos");
 	cursos.innerHTML = ""; 	
 	for(e in data[campus]){
 		text = data[campus][e]
 		var option = document.createElement('option');
		option.appendChild( document.createTextNode(text) );
		cursos.appendChild(option); 
 	} 	
}



function add() {
	var form = document.getElementById("formObj");
	if(form.checkValidity()){

	 	if(!populated){
	 		var children =document.getElementById("padrao");
	 		var e = children.firstElementChild;
	 		children.removeChild(e);
	 		populated = true;
	 	}
	 	
	 	var matricula = parseInt(document.getElementById("matricula").value,10);
	 	var nome = document.getElementById("nome").value;
	 	if(!matriculas.includes(matricula)){
	 		
	 		matriculas.push(matricula);
	 		matriculas.sort(comparador);
	 		var pos = matriculas.indexOf(matricula)+1;

	 		var table = document.getElementById("info"); 
		 	var row = table.insertRow(pos);
		 	var matr = row.insertCell(0);
		 	var name = row.insertCell(1);
		 	var acao = row.insertCell(2);

		 	matr.innerHTML = matricula;
		 	name.innerHTML = nome;	
		 	acao.appendChild(createButton(matricula));
	 	}
	 	else{
	 		emptyField("userRegistred");
	 	}
	}
	else{
		emptyField("emptyField");
	}
}

function comparador(a,b) {
	return a-b;
}

function deleteUser() {
	btn = document.getElementById(idButton);
	var parent = document.getElementById("body");
	parent.removeChild(btn.parentElement.parentElement);
	var index = matriculas.indexOf(idButton);
	matriculas.splice(index,1);
	if(matriculas.length===0){
		populated = false;
		var row = document.getElementById("padrao"); 
 		var defealt = row.insertCell(0);
 		defealt.colSpan = 3;
 		defealt.innerText = "Sem alunos registrados";		
 	}
 	idButton = -1;
}

function resetVar() {
	idButton = -1;
}

function createButton(matr){
	var btn = document.createElement('input');
	btn.id = matr
	btn.type = "button";
	btn.dataset.toggle = "modal"
	btn.dataset.target = "#remocao"
	btn.classList.add("btn");
	btn.classList.add("btn-danger");
	btn.classList.add("btn-sm");
	btn.value = "Remover";
	btn.onclick = function (){
		idButton = matr;
	}
	return btn;
}

function clearForm() {
	var form = document.getElementById("formObj");
	form.reset();
}


function emptyField(id) {
	var modal = document.getElementById(id);
	modal.style.display = "block";
	var span = document.getElementsByClassName("close_"+id)[0];

	span.onclick = function() {
	  modal.style.display = "none";
	}

	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
}