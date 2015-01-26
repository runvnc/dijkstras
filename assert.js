window.assert = function(code) {
  if (!(eval(code)) {
    write("fail: " + code);
  }
}
