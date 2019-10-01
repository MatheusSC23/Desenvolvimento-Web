var app = new Vue({
	el:'#app',
	mounted:function(){
        
  	},
	data:{
		title:"Sistema de Controle de Alunos",
		matricula:null,
		nome:null,
		dataNasc:null,
		email:null,
		ddd:null,
		tel:null,
		operadora:null,
		campus:"Pici",
		cursos:"",
		cursosObj:{
			"Pici": ["Computação", "Matemática" , "Geologia"],
	 		"Benfica" : ["Letras", "Filosofia" , "Direito"],
	 		"Porangabussu" : ["Medicina", "Odontologia" , "Farmácia"]
		}
	},
	methods:{
		checkForm: function(e){
			console.log(this.operadora);
			e.preventDefault();
		},
		
	}
})
