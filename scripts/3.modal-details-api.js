// show modal as word details
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};

const displayWordDetails = (words) => {
  const detailsBox = document.getElementById("detail-container");

  // synonyms
  const synonyms = words.synonyms || [];
  const synonymHTML = synonyms
    .slice(0, 3)
    .map((s) => `<span class="synonym-badge">${s}</span>`)
    .join("");

  detailsBox.innerHTML = `
    <div class="detail-card font-bangla space-y-2">
      <h2>
        ${words.word}
        <span class="text-slate-400 text-base font-normal ml-2">
          <i class="fa-solid fa-microphone-lines text-cyan-400"></i> ${words.pronunciation}
        </span>
      </h2>
      <p class="detail-label">Meaning</p>
      <p class="detail-value">${words.meaning}</p>
      <p class="detail-label">Example</p>
      <p class="detail-value">${words.sentence}</p>
      <p class="detail-label">সমার্থক শব্দ গুলো</p>
      <div class="flex flex-wrap items-center gap-2 mt-1">
        ${synonymHTML}
      </div>
    </div>
  `;

  document.getElementById("word_modal").classList.add("open");
};

//modal close
const closeModalBtn = document.getElementById("closeModal");
const wordModal = document.getElementById("word_modal");

closeModalBtn.addEventListener("click", () => {
  wordModal.classList.remove("open");
});

// Close modal when clicking outside the box
wordModal.addEventListener("click", (e) => {
  if (e.target === wordModal) {
    wordModal.classList.remove("open");
  }
});
