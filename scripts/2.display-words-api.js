//load all words when clicking lesson-btn via api
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${id}`);
      clickedBtn.classList.add("active");
      displayWords(json.data);
    });
};

//btn active
const removeActive = () => {
  const allBtn = document.querySelectorAll(".lesson-btn");
  allBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};


//display words cards
const displayWords = (cards) => {
  const parent = document.getElementById("load-words");
  parent.innerHTML = "";

  if (cards.length === 0) {
    //this is empty section if no cards available in any lesson
    parent.innerHTML = `
      <div class="font-bangla bg-[#13151c] text-center col-span-3 py-24 space-y-5">
        <div>
          <img src="./assets/alert-error.png" alt="alert" class="mx-auto" />
        </div>
        <p class="text-red-100 font-medium text-sm">দুঃখিত এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-3xl text-slate-300">নেক্সট Lesson এ যান</h2>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  for (const card of cards) {
    const child = document.createElement("div");
    child.innerHTML = `
      <div class="word-card">
        <div class="card-info">
          <h2>${card.word ? card.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="label">Meaning / Pronunciation</p>
          <p class="meaning font-bangla">
            ${card.meaning ? card.meaning : "অর্থ পাওয়া যায়নি"} /
            ${card.pronunciation ? card.pronunciation : "Pronunciation পাওয়া যায়নি"}
          </p>
        </div>
        <div class="card-buttons">
          <button onclick="loadWordDetails(${card.id})" class="icon-btn" title="Details">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${card.word}')"  class="icon-btn" title="Pronounce">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    parent.append(child);
  }
  manageSpinner(false);
};
