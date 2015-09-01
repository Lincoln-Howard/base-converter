document.querySelector ("#input").onkeyup = function () {
  Converter.source = this.value;
}
document.querySelector ("#base_source").onchange = function () {
  Converter.base_source = this.value;
  Converter.validate ();
  document.querySelector ("#input").value = Converter.source;
}
document.querySelector ("#base_target").onchange = function () {
  Converter.base_target = this.value;
  Converter.validate ();
  document.querySelector ("#input").value = Converter.source;
}
document.querySelector ("#calculate").onclick = function () {
  Converter.convert ();
  document.querySelector ("#output").innerHTML = "";
  document.querySelector ("#output").innerHTML = Converter.target;
}