 /* Pici	Computação, Matemática e Geologia
	Benfica Letras, Filosofia e Direito
	Porangabussu  Medicina, Odontologia e Farmácia
 */


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
	var matricula = document.getElementById("matricula").value;
	var nome = document.getElementById("nome").value;
	var data = document.getElementById("data").value;
	var email = document.getElementById("email").value;
	var ddd = document.getElementById("ddd").value;
	var telefone = document.getElementById("telefone").value;

	if(matricula && nome && data && email && telefone && ddd){

	 	if(!populated){
	 		var children =document.getElementById("padrao");
	 		var e = children.firstElementChild;
	 		children.removeChild(e);
	 		populated = true;
	 	}

	 	if(!matriculas.includes(matricula)){
	 		matriculas.push(matricula);
	 		matriculas.sort(comparador);
	 		pos = matriculas.indexOf(matricula)+1;

	 		var table = document.getElementById("info"); 
		 	var row = table.insertRow(pos);
		 	var matr = row.insertCell(0);
		 	var name = row.insertCell(1);
		 	var acao = row.insertCell(2);

		 	matr.innerHTML = matricula;
		 	name.innerHTML = nome;	
		 	acao.appendChild(createButton(matricula));
	 	}
	}
}

function comparador(a,b) {
	return a-b;
}

function createButton(matr){
	var btn = document.createElement('input');
	btn.type = "button";
	btn.classList.add("btn");
	btn.classList.add("btn-danger");
	btn.classList.add("btn-sm");
	btn.value = "Remover";
	btn.onclick = function (){
		var parent = document.getElementById("body");
		parent.removeChild(btn.parentElement.parentElement);
		var index = matriculas.indexOf(matr);
		matriculas.splice(index,1);
		if(matriculas.length===0){
			populated = false;
			var row = document.getElementById("padrao"); 
	 		var defealt = row.insertCell(0);
	 		defealt.colSpan = 3;
	 		defealt.innerText = "Sem alunos registrados 2";		
	 	}
		
	};
	return btn;
}