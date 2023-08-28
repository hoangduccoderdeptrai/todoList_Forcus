let count=0;
let m_pomo=0,s_pomo =30;
let m_short =1,s_short =0;
let m_long =3,s_long =0;
let minutes=m_pomo;
let seconds=s_pomo;

document.getElementsByClassName("ip")[0].value =m_pomo;
document.getElementsByClassName("ip")[1].value =m_short;
document.getElementsByClassName("ip")[2].value =m_long;




let bell_echo =document.getElementById("audio");
document.getElementById("h1").innerHTML =`${check(m_pomo)}:${check(s_pomo)}`
function check(time){
	
	time =time.toString();
	
	return time =time.length<2?"0"+time:time;
}
function echo(){
	bell_echo.play();
}
function mouse_bell(){
	document.getElementById("mouse_bell").play();
}
function display(a,b){
	document.getElementById(a).style.display='block';
	document.getElementById(b).style.display='none';
}

function fill(char,a,b){
	document.getElementById(char).style.background ="rgba(0, 0, 0, 0.15)";
	document.getElementById(a).style.background ="none";
	document.getElementById(b).style.background ="none";
}


function call(){
	
	if(minutes==0&&seconds==0){
		if(document.getElementById("btn1").style.background!='none'){
			fill("btn2","btn1","btn3");
			minutes=m_short;
			seconds=s_short;
			document.getElementById("start").style.display='block';
			document.getElementById("pause").style.display='none';
			echo();
			minutes =check(minutes);
			document.getElementById("h1").innerHTML=`${minutes}:00`;
		
		}else if(document.getElementById("btn2").style.background!='none'){
			fill("btn3","btn1","btn2");
			minutes=m_long;
			seconds=s_long;
			document.getElementById("start").style.display='block';
			document.getElementById("pause").style.display='none';
			echo();
			minutes =check(minutes);
			document.getElementById("h1").innerHTML=`${minutes}:00`;
		}else{
			fill("btn1","btn2","btn3");
			minutes=m_pomo;
			seconds=s_pomo;
			document.getElementById("start").style.display='block';
			document.getElementById("pause").style.display='none';
			echo();
			minutes =check(minutes);
			document.getElementById("h1").innerHTML=`${minutes}:00`;
		}
		
		
		clearInterval(x);
		return;
	}
	else if(seconds==0){
		minutes-=1;
		
		seconds=59;
	}else{
		seconds--;
	}
	minutes =check(minutes);
	seconds =check(seconds);
	document.getElementById("h1").innerHTML =`${minutes}:${seconds}`;
	

}


document.getElementById("start").addEventListener("click",callback);
let x;
function callback(){
	document.getElementById("start").style.display='none';
	document.getElementById("pause").style.display='block';
	mouse_bell();
	x =setInterval(call,1000);
	
}
document.getElementById("pause").addEventListener("click",callafter);
function callafter(){
	document.getElementById("start").style.display='block';
	document.getElementById("pause").style.display='none';
	mouse_bell();
	clearInterval(x);
	
}
document.getElementById("btn1").onclick=function(){
	fill("btn1","btn2","btn3");
	minutes =m_pomo;
	seconds =s_pomo;
	display("start","pause");
	clearInterval(x);
	document.getElementById("h1").innerHTML =`${check(minutes)}:${check(seconds)}`
}
document.getElementById("btn2").onclick=function(){
	fill("btn2","btn1","btn3");
	minutes =m_short;
	seconds =s_short;
	display("start","pause");
	clearInterval(x);
	document.getElementById("h1").innerHTML =`${check(minutes)}:${check(seconds)}`
}
document.getElementById("btn3").onclick=function(){
	fill("btn3","btn2","btn1");
	minutes =m_long;
	seconds =s_long;
	display("start","pause");
	clearInterval(x);
	document.getElementById("h1").innerHTML =`${check(minutes)}:${check(seconds)}`
}
document.getElementById("x").onclick =function(){
	document.getElementById("set").style.display ="none"; 
	m_pomo =document.getElementsByClassName("ip")[0].value;
	m_short =document.getElementsByClassName("ip")[1].value;
	m_long =document.getElementsByClassName("ip")[2].value;
	if(document.getElementById("btn1").style.background!='none'){
		minutes =m_pomo;
		document.getElementById("h1").innerHTML =`${check(minutes)}:${check(seconds)}`;
	}else if(document.getElementById("btn2").style.background!='none'){
		minutes =m_short;
		document.getElementById("h1").innerHTML =`${check(minutes)}:${check(seconds)}`;
	}else{
		minutes =m_long;
		document.getElementById("h1").innerHTML =`${check(minutes)}:${check(seconds)}`;
	}
	document.getElementById("set").style.overflow ="hidden";
	document.getElementById("body").style.overflow ="auto";

	
}
document.getElementById("ic1").onclick=function(){
	document.getElementById("set").style.display ="block";
	document.getElementById("set").style.overflow ="scroll";
	document.getElementById("body").style.overflow ="hidden";

}



const values =document.querySelector(".inputvalue");
const todo =document.querySelector(".todo-list");
const button_add =document.querySelector(".btn-todo");
const selection =document.querySelector(".list");
button_add.addEventListener("click",todolist);
todo.addEventListener("click",removeElement);
selection.addEventListener("click",show);
document.addEventListener("DOMContentLoaded",getLocalStore);


function todolist(event){
	event.preventDefault();
	let Div =document.createElement("div");
	Div.classList.add("add_div");
	let Li =document.createElement("li");
	Li.classList.add("li");
	Li.innerHTML =values.value;
	localStore(values.value);
	Div.appendChild(Li);

	let icon1 =document.createElement("button");
	icon1.classList.add("icon11");
	icon1.innerHTML ='<i class="fa fa-check-circle"></i>';
	Div.appendChild(icon1);

	let icon2 =document.createElement("button");
	icon2.classList.add("icon12");
	icon2.innerHTML ='<i class="fa fa-trash"></i>'
	Div.appendChild(icon2);


	todo.appendChild(Div);
	window.scrollTo(0, document.body.scrollHeight);

	
}
function removeElement(event){
	let arr =todo.childNodes;
	arr =Array.from(arr);
	let Target =event.target;
	
	if(Target.className==='icon11'){
		let Parent =Target.parentNode;
		Parent.classList.toggle("content");
	}
	if(Target.className==='icon12'){
		let Parent =Target.parentNode;
		let index =arr.indexOf(Parent);
		console.log(index);
		Parent.classList.add("remove");
		
		removeLocal(Parent,index);
		Parent.addEventListener("transitionend",()=>{
			Parent.remove();
		})
	}

}
function show(event){
	let arr =todo.childNodes;
	arr =Array.from(arr);
	arr.splice(0,1);
	let content=event.target;
	if(content.value=="All"){
		arr.forEach(values=>{values.style.display="flex"});
	}else if(content.value=="Completed"){
		arr.forEach(values=>{
			if(values.classList.contains("content")){
				values.style.display="flex";
			}else{
				values.style.display="none";
			}
		})
	}else if(content.value=="InCompleted"){
		arr.forEach(values=>{
			if(!values.classList.contains("content")){
				values.style.display="flex";
			}else{
				values.style.display ="none";
			}
		})
	}
	

	
}
function getLocalStore(){
	let local;
	if(localStorage.getItem("key")===null){
		return;
	}else{
		local =JSON.parse(localStorage.getItem("key"));
	}
	local.forEach(values=>{
		let Div =document.createElement("div");
		Div.classList.add("add_div");
		let Li =document.createElement("li");
		Li.classList.add("li");
		Li.innerHTML =values;
		Div.appendChild(Li);

		let icon1 =document.createElement("button");
		icon1.classList.add("icon11");
		icon1.innerHTML ='<i class="fa fa-check-circle"></i>';
		Div.appendChild(icon1);

		let icon2 =document.createElement("button");
		icon2.classList.add("icon12");
		icon2.innerHTML ='<i class="fa fa-trash"></i>'
		Div.appendChild(icon2);


		todo.appendChild(Div);
	})

}
function localStore(values){
	let local;
	if(localStorage.getItem("key")===null){
		local=[];
	}else{
		local =JSON.parse(localStorage.getItem("key"));
	}
	local.push(values);
	localStorage.setItem("key",JSON.stringify(local));
}
function removeLocal(parent,index){
	let local;
	if(localStorage.getItem("key")===null)return;
	else{
		local =JSON.parse(localStorage.getItem("key"));
	}
	for(let i=0;i<local.length;i++){
		if(index==i+1&&local[i]==parent.childNodes[0].innerHTML){
			local.splice(i,1);
			console.log("da xoa");
		}
	}
	localStorage.setItem("key",JSON.stringify(local));

}



	




