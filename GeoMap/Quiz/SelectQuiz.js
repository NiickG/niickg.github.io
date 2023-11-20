function openFlagToQuizPage(type) {
    var url = 'MainQuiz.html?' 
    + "type=" + encodeURIComponent(type) 
    + "&difficulty=" + encodeURIComponent(document.getElementById("difficultyOptions").value) 
    + "&smarterOptions=" + encodeURIComponent(document.getElementById("SmarterOptions").checked)
    + "&noTimeLimit=" + encodeURIComponent(document.getElementById("NoTimeLimit").checked);
    window.location.href = url;
  }