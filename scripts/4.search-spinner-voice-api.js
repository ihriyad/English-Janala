
//search
document.getElementById("searchBtn").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("searchInput");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );

      displayWords(filterWords);
    });
});

// search via enter key
document.getElementById("searchInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchBtn").click();
  }
});


// spinner
const manageSpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const wordContainer = document.getElementById("word-container");
  if (status === true) {
    spinner.classList.remove("hidden");
    wordContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    wordContainer.classList.remove("hidden");
  }
};


//word voice
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN";
  window.speechSynthesis.speak(utterance);
}
