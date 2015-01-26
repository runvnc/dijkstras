"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Graph = (function () {
  function Graph(map) {
    this.loadMap(map);
  }

  _prototypeProperties(Graph, null, {
    loadMap: {

      //{ a: { b: 1, c: 2}, b: {a: 1} }

      value: function loadMap(map) {
        this.map = map;
        this.vertices = [];
        for (var _iterator = map[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) {
          var vertex = _step.value;
          var vertex = { name: vertex };
          var edges = map[vertex];
          vertex.edges = [];
          for (var _iterator2 = edges[Symbol.iterator](), _step2; !(_step2 = _iterator2.next()).done;) {
            var vertexName = _step2.value;
            var edge = { weight: edges[vertexName],
              endVertex: map[vertexName] };
            vertex.edges.push(edge);
          }

          this.vertices.push(vertex);
        }
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Graph;
})();

