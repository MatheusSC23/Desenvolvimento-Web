Vue.component('modal', {
  template: `
	  <transition name="modal">
	    <div class="modal-mask">
	      <div class="modal-wrapper">
	        <div class="modal-container">

	          <div class="modal-header">
	            <slot name="header">
	              Confirmar remoção
	            </slot>
	          </div>
	          <div class="modal-body">
	            <slot name="body">
	              Você deseja remover este usuário?
	            </slot>
	          </div>
	          <div class="modal-footer">
		          <button class="btn btn-primary" @click="$emit('remove')">
	                Remover
	              </button>
	              <button class="btn btn-secondary" @click="$emit('close')">
	                Cancelar
	              </button>
	           </div>
	        </div>
	      </div>
	    </div>
	  </transition>
	`,
 })

Vue.component('warning', {
  template: `
	  <transition name="modal">
	    <div class="modal-mask">
	      <div class="modal-wrapper">
	        <div class="modal-container">

	          <div class="modal-header">
	            <slot name="header">
	              Ação Inválida
	            </slot>
	          </div>
	          <div class="modal-body">
	            <slot name="body">
	              Já existe usuário com esta matrícula!
	            </slot>
	          </div>
	          <div class="modal-footer">
		          <button class="btn btn-primary" @click="$emit('close')">
	                Fechar
	              </button>
	           </div>
	        </div>
	      </div>
	    </div>
	  </transition>
	`,
 })


var app = new Vue({
	el:'#app',
	props:['user'],
	data:{
		editMode:false,
		currentPage:0,
		currentUsers:[],
		idButton:-1,
		showWarning: false,
		showModal: false,
		matStored: [],
		users: [],
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
		removeUser: function(e){
			var index = this.matStored.indexOf(this.idButton);
			this.matStored.splice(index,1);
			this.users.splice(index,1);
			this.showModal = false;
			this.refreshPage();
		},

		checkForm: function(e){
			if(this.validateForm()){
				if(!this.matStored.includes(this.matricula)){
					this.matStored.push(this.matricula);
					this.matStored.sort((a,b)=>{
						return a-b;
					});
					var user = {
						matricula:this.matricula,
						nome:this.nome,
						dataNasc:this.dataNasc,
						email:this.email,
						ddd:this.ddd,
						tel:this.tel,
						operadora:this.operadora,
						campus:this.campus,
						cursos:this.cursos,
					};
					this.users.push(user);
					this.sortUsers();
					this.refreshPage();					
				}
				else if(this.editMode){
					this.users[this.idButton].nome = this.nome;
					this.users[this.idButton].dataNasc = this.dataNasc;
					this.users[this.idButton].email = this.email;
					this.users[this.idButton].ddd = this.ddd;
					this.users[this.idButton].tel = this.tel;
					this.users[this.idButton].operadora = this.operadora;
					this.users[this.idButton].campus = this.campus;
					this.users[this.idButton].cursos = this.cursos;
					this.editMode = false;
				}
				else{
					this.showWarning = true;
				}
			}
		},

		next: function(){
			this.currentPage += 4;
			this.refreshPage();
		},

		prev: function(){
			this.currentPage -= 4;
			this.refreshPage();
		},

		refreshPage: function(){
			if(this.currentPage > this.users.length-1){
				this.currentPage -= 4;
				this.refreshPage();
			}
			this.currentUsers = [];
			var pos = this.currentPage;
			while(pos<this.currentPage+4  && pos<this.users.length){
				this.currentUsers.push(this.users[pos]);
				pos++;
			}
		},

		validateForm: function(){
			var matrIsValid = typeof this.matricula === 'number'; 
			var nameIsValid = !!this.nome;
			var dateIsValid = !!this.dataNasc;
			var email = !!this.email;
			var foneIsValid = typeof this.ddd === 'number' && typeof this.tel ==='number';
			var opIsValid = !!this.operadora;
			var campusIsValid = !!this.campus;
			var cursoIsValid = !!this.cursos;
			return matrIsValid && nameIsValid && dateIsValid && email && foneIsValid && opIsValid && campusIsValid && cursoIsValid;			
		},

		cleanCurso: function(){
			this.cursos = "";
		},

		cleanForm: function(e){
			if(this.editMode === false){
				e.target.parentElement.reset();
				this.matricula = null;
			}
			this.nome = null;
			this.dataNasc = null;
			this.email = null;
			this.ddd = null;
			this.tel = null;
			this.operadora = null;
			this.campus = "Pici";
			this.cursos = "";

		},

		sortUsers: function(){
			function compare(a,b){
				return a.matricula-b.matricula;
			}
			this.users.sort(compare);
		},

		loadData:function(e){
			var mat = parseInt(e.target.value,10);
			var index = this.matStored.indexOf(mat);
			var cache = this.users[index];
			this.idButton = index;

			
			this.matricula = cache.matricula;
			this.nome = cache.nome;
			this.dataNasc = cache.dataNasc;
			this.email = cache.email;
			this.ddd = cache.ddd;
			this.tel = cache.tel;
			this.operadora = cache.operadora;
			this.campus = cache.campus;
			this.cursos = cache.cursos;
			this.editMode = true;

		},

		cancelEdit: function(e){
			this.editMode = false;
			this.cleanForm(e);
		}
		
	}
})
