const LoadLessons =()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>displayLessons(data.data));
}
const displayLessons=(lessons)=>{
    const level=document.getElementById("level-container")
    level.innerHTML='';
for (let lesson of lessons){
    const btnDiv=document.createElement("div")
    btnDiv.innerHTML='
    '
}
}
LoadLessons();