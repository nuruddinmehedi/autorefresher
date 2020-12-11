



const formtitle = document.querySelector(".titleinput");
const fromurl = document.querySelector(".urlinput");
const frombtn = document.querySelector("form");
const ul = document.querySelector("ul");
console.log(frombtn);
	
	frombtn.addEventListener('submit',(ev)=>{


		ev.preventDefault();
	const div= document.createElement('div');
	div.classList='todo';
	const li= document.createElement('li');
	li.innerText= formtitle.value;
	li.classList="todo-item";
	ul.appendChild(div);
	div.appendChild(li)
	//set todo localsorage
	savelocalsorage(formtitle.value)
	const delet = document.createElement("button");
	delet.innerHTML='<img src="img/del.png" alt="">';
	delet.classList='deletbtn';
	div.appendChild(delet);
	formtitle.value='';
	
	
	});
	document.addEventListener('DOMContentLoaded',gettodo);
	ul.addEventListener('click',deletitem);


	function deletitem(e){
		const item= e.target;
		if(item.classList[0]==='deletbtn'){
			const todo=item.parentElement;
			todo.remove();
			remove(todo)
		
		}
		}




function savelocalsorage(todo){

	let todos;
	if(localStorage.getItem('todos')==null){
		todos=[];
	}else{
		todos= JSON.parse(localStorage.getItem('todos'))
	}
	todos.push(todo);
	localStorage.setItem('todos',JSON.stringify(todos));
	  
}

function gettodo(){
	let todos;
	if(localStorage.getItem('todos')==null){
		todos=[];
	}else{
		todos= JSON.parse(localStorage.getItem('todos'))
	}
	todos.forEach(todoj => {
		const div= document.createElement('div');
div.classList='todo';
const li= document.createElement('li');
li.innerText= todoj;
li.classList="todo-item";
ul.appendChild(div);
div.appendChild(li)
const delet = document.createElement("button");
delet.innerHTML='<img src="img/del.png" alt="">';
delet.classList='deletbtn';
div.appendChild(delet);

	});
}
function remove(todo){
	let todos;
	if(localStorage.getItem('todos')==null){
		todos=[];
	}else{
		todos= JSON.parse(localStorage.getItem('todos'))
	}
 const todoindex= todo.children[0].innerText;
 todos.splice(todos.indexOf(todoindex),1);
 localStorage.setItem('todos',JSON.stringify(todos));
}

