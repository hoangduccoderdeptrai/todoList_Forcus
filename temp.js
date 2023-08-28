const input =document.querySelector("#input");
const todoList =document.querySelector(".container-todo");
const filter =document.querySelector(".filter-select");


document.addEventListener("DOMContentLoaded",getLocalStore);
const toDOList =document.querySelector(".todo-list");
filter.addEventListener("click",filter_function);
todoList.addEventListener("click",travesal);
document.querySelector(".todo-btn").addEventListener("click",addToDo);

let array;

function addToDo(event){
    event.preventDefault();
    let Div =document.createElement("div");
    Div.classList.add("todoList")
    let Li =document.createElement("li");
    Li.classList.add("text");
    Li.innerHTML =input.value;
    saveLocalrRestore(input.value);
    Div.appendChild(Li);
    // toDOList.appendChild(Div);
    let icon =document.createElement("button");
    icon.classList.add("icon1");
    // icon.id="icon1";
    icon.innerHTML ='<i class="fas fa-check-circle"></i>';
    Div.appendChild(icon);
    let icon2 =document.createElement("button");
    icon2.classList.add("icon2");
    icon2.innerHTML='<i class="fas fa-trash"></i>';
    Div.appendChild(icon2);
    toDOList.appendChild(Div);
    input.value="";
    

}


function travesal(event){
    let content =event.target;
    if(content.className==="icon2"){
        
        let del =content.parentElement;
        reMoveLocal(del);
        del.classList.add("slider");
        del.addEventListener("transitionend",function(){
            del.remove();
        })

    }
    if(content.className==="icon1"){
        let del =content.parentElement;
        del.classList.toggle("completed");
    }
    

}
function filter_function(event){
    let arr =toDOList.childNodes;
    arr.forEach(values=>{console.log(values)});
    let content =event.target;
    switch(content.value){
        case "All":
            arr.forEach(value=>{value.style.display="flex";})
            break;
        case "Completed":
            arr.forEach(value=>{
                if(value.classList.contains("completed")){
                    value.style.display="flex";
                }else{
                    value.style.display="none";
                }
            })
            break;
        default:
            arr.forEach(value=>{
                if(!value.classList.contains("completed")){
                    value.style.display="flex";
                }else{
                    value.style.display="none";
                }
            })
            break;
    }
}
function saveLocalrRestore(todo){
    let todosarray;
    if(localStorage.getItem("key")===null){
        todosarray =[];
    }else{
        todosarray =JSON.parse(localStorage.getItem("key"));
    }
    todosarray.push(todo);
    let convert_string =JSON.stringify(todosarray);
    localStorage.setItem("key",convert_string);
}
function getLocalStore(){
    let array;
    if(localStorage.getItem("key")===null)return;
    else{
        array =JSON.parse(localStorage.getItem("key"))
    }
    array.forEach((value,index,arr)=>{
        let Div =document.createElement("div");
        Div.classList.add("todoList");
        let Li =document.createElement("li");
        Li.classList.add("text");
        Li.innerHTML =value;
        Div.appendChild(Li);
        
        let icon =document.createElement("button");
        icon.classList.add("icon1");
        icon.innerHTML ='<i class="fas fa-check-circle"></li>';
        Div.appendChild(icon);


        let icon2 =document.createElement("button");
        icon2.classList.add("icon2");
        icon2.innerHTML='<i class="fas fa-trash"></li>';
        Div.appendChild(icon2);
        toDOList.appendChild(Div);
        
        

    })
}
function reMoveLocal(todo){
    let value =todo.childNodes;
    if(localStorage.getItem("key")===null)return;
    let array =JSON.parse(localStorage.getItem("key"));
    array =Array.from(array)
    array.forEach((values,index)=>{
        if(value[0].innerHTML==values){
            array.splice(index,1);
        }
    })
    localStorage.setItem("key",JSON.stringify(array));
}
