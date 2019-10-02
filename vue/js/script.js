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
	computed:{
		validateForm(){
			var matrIsValid = typeof matricula === 'number'; 
			var nameIsValid = !!nome;
			var dateIsValid = !!dataNasc;
			var email = !!email;
			
		}

	},
	methods:{
		checkForm: function(e){
			var form = document.getElementById('validate-form');
			console.log(form.checkValidity());
			e.preventDefault();
		},
		
	}
})
