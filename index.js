const LoadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLessons(data.data));
};

const LoadLevelWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res=>res.json()).then(data=>displayWord(data.data))
}




const displayWord = (words) =>{
    const levelword=document.getElementById("word-container");
    levelword.innerHTML= ' ';
    words.forEach(word=>{
        console.log(word)
        const card=document.createElement("div");
        card.innerHTML=`
         <div class="bg-white rounded-xl flex flex-col justify-center items-center gap-3 p-4 hover:scale-105 shadow-sm text-center">
      <h1 class="font-bold text-2xl">${word.word}</h1>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <p class="font-bold text-xl text-gray-700 .font-bangla">${word.meaning} / ${word.pronunciation}</p>
      <div class="flex justify-between items-center w-full">
      <button id="btn" class="btn btn-soft btn-primary rounded-xl"><i class="fa-solid fa-circle-info"></i></button>
      <button id="btn"class="btn btn-soft btn-primary rounded-xl"><i class="fa-solid fa-volume-high"></i></button>
      </div>
     </div>
        `;
        levelword.append(card)
    })

}

const displayLessons = (lessons) => {
  const level = document.getElementById("level-container");
  level.innerHTML = '';

  for (let lesson of lessons) {
    console.log(lesson)
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button onclick="LoadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;
    level.append(btnDiv);
  }
};

LoadLessons();
