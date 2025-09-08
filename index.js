const LoadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => displayLessons(data.data));
};



const LoadLevelWord = (id) => {
  managespinner(true)
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
       const lessonbutton=document.querySelectorAll(".lesson-button");
    lessonbutton.forEach(btn=>btn.classList.remove('active'));
      const selected = document.getElementById(`lesson-btn-${id}`);
      console.log(selected); 
      selected.classList.add("active");

      displayWord(data.data);
    });
};

const loadworddetail=async(id)=>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`;
  const res=await fetch(url);
  const detail=await res.json();
  displaymodal(detail.data);
}

const managespinner=(status)=>{
   if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
   }
   else{
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
   }
}
const displaymodal=(word)=>{
     console.log(word)
     const modal=document.getElementById("modal-container")
     modal.innerHTML=`
     <p class="font-bold text-2xl mb-3">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</p>
      <p class=" font-semibold mb-1.5">Meaning</p>
      <p class=".font-bangla font-semibold mb-3">${word.meaning}</p>
      <p class="font-semibold mb-1.5">Example</p>
      <p class="text-gray-400 mb-3">${word.sentence}</p>
      <p class=" font-semibold mb-2">সমার্থক শব্দ গুলো</p>
      <div class="flex gap-2.5">
      <button class="btn btn-soft btn-primary">${word.synonyms[0]}</button>
      <button class="btn btn-soft btn-primary">${word.synonyms[1]}</button>
      <button class="btn btn-soft btn-primary">${word.synonyms[2]}</button>
      `;
     document.getElementById("my_modal_5").showModal();

}

const displayWord = (words) =>{
    const levelword=document.getElementById("word-container");
    levelword.innerHTML= ' ';
    if (words.length==0){
        levelword.innerHTML=' ';
        const card = document.createElement("div");
        card.className = "flex flex-col justify-center items-center p-5 text-center col-span-full space-y-3.5";
       card.innerHTML = `
      <img src="./assets/alert-error.png" class=mx-auto> 
      <p class="font-bangle text-gray-500 text-xl font-semibold">
      এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি।
      </p>
     <p class="text-3xl font-bold">নেক্সট Lesson এ যান</p>
   `;
      levelword.append(card);
      managespinner(false)
      return
    }
    words.forEach(word=>{
        console.log(word)
        const card=document.createElement("div");
        card.innerHTML=`
         <div class="bg-white rounded-xl flex flex-col justify-center items-center gap-3 p-4 hover:scale-105 shadow-sm text-center">
      <h1 class="font-bold text-2xl">${word.word ? word.word:"কোনো শব্দ পাওয়া যায়নি"}</h1>
      <p class="font-semibold">Meaning /Pronounciation</p>
      <p class="font-bold text-xl text-gray-700 .font-bangla">${word.meaning ? word.meaning: "কোনো অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation:"কোনো উচ্চারণ পাওয়া যায়নি"}</p>
      <div class="flex justify-between items-center w-full">
      <button id="btn" onclick="loadworddetail(${word.id})" class="btn btn-soft btn-primary rounded-xl"><i class="fa-solid fa-circle-info"></i></button>
      <button id="btn" onclick="pronounceWord('${word.word}')" class="btn btn-soft btn-primary rounded-xl"><i class="fa-solid fa-volume-high"></i></button>
      </div>
     </div>
        `;
        levelword.append(card)
    });
    managespinner(false)

}


function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const displayLessons = (lessons) => {
  const level = document.getElementById("level-container");
  level.innerHTML = '';

  for (let lesson of lessons) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
      <button id="lesson-btn-${lesson.level_no}" onclick="LoadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-button">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
      </button>
    `;
    level.append(btnDiv);
  }
};

LoadLessons();


document.getElementById("btn-search").addEventListener("click",()=>{
  const input =document.getElementById("input-search");
  const value=input.value.trim().toLowerCase();
  console.log(value)
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then(res=>res.json())
  .then(data=>{
    const allword=data.data;
    console.log(allword)
    const filter=allword.filter(word=>word.word.toLowerCase().includes(value));
   displayWord(filter);
  })
})


 document.querySelectorAll(".faq-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const answer = btn.querySelector(".answer");
        const icon = btn.querySelector(".icon");
        answer.classList.toggle("hidden");
        icon.textContent = icon.textContent === "+" ? "-" : "+";
      });
    });