window.onload = function () {
  var div = document.getElementById("content-wrapper");
  var windowHeight = window.innerHeight;
  var pageTop = div.offsetTop;
  div.style.height = windowHeight - pageTop;
  div.style.maxHeight = windowHeight - pageTop;
};
