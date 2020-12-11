
	function gettodo(){
		let todos;
		if(localStorage.getItem('todos')==null){
			todos=[];
		}else{
			todos= JSON.parse(localStorage.getItem('todos'))
		}
		todos.forEach(todoj => {
              
			chrome.tabs.query({}, function(tabs) {
				
				
				
				let tabIndex = tabs[0].index
				for(let i=0;i<tabs.length;i++){
					if(tabs[i].url==todoj){

						let tabToRefresh= i
						chrome.tabs.reload(tabs[tabToRefresh].id)
						

					}
					
					
				}
			
		});
	
		});}

 const reloadtime= Math.floor(Math.random()*120000) ;
		
setInterval(function() {
	gettodo()
}, reloadtime);

	







