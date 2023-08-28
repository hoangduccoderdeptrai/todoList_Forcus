function getHTTP(URL){
    let promise =new Promise(function(resolve,reject){

   
        const xml =new XMLHttpRequest();
        xml.onload =function(){
            if(this.readyState==4&&this.status==200){
                resolve(this.response);
            }else{
                reject("wrong somthing");
            }
        };
        xml.open("GET",URL,true);
        xml.send();
    })
    return promise;
}
const url ='';
let promise =getHTTP(url);
promise.then(
    (value)=>{
        let t =JSON.parse(value).results[0].latest;
        console.log(t);
    }
).catch(
    (error)=>{console.log(error)}
)