//load all lesson buttons from api
const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};
//display lesson btn
const displayLesson = (lessons) => {
  const parent = document.getElementById("lessonContainer");
  parent.innerHTML = "";
  lessons.forEach((lesson) => {
    const child = document.createElement("div");
    child.innerHTML = `
      <button
        id="lesson-btn-${lesson.level_no}"
        onclick="loadLevelWord(${lesson.level_no})"
        class="lesson-btn"
      >
        <i class="fa-brands fa-leanpub"></i> Lesson ${lesson.level_no}
      </button>
    `;
    parent.append(child);
  });
};

loadLesson();
