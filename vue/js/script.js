Vue.component( 'table-form' , {
			template: "#table-form" ,
});

Vue.component( 'table-users' , {
			template: "#table-users" ,
});

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
		operadora:null
	},
	methods:{
		checkForm: function(e){
			console.log(this.operadora);
			e.preventDefault();
		}
	}
})
