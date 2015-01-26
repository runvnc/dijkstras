var write = (function(msg) {
  var div = document.getElementById('info');
  div.innerHTML = msg + '<br/>' + div.innerHTML;
});
window.onerror = (function(e, a, b) {
  write(e);
  write(a);
  write(b);
});
var Graph = function Graph(map) {
  "use strict";
  this.loadMap(map);
};
($traceurRuntime.createClass)(Graph, {loadMap: function(map) {
    "use strict";
    this.map = map;
    this.vertices = new Set();
    for (var vertex = void 0 in map) {
      var obj = {name: vertex};
      var edges = map[vertex];
      obj.edges = [];
      for (var vertexName = void 0 in edges) {
        var edge = {
          weight: edges[vertexName],
          endVertexName: vertexName
        };
        obj.edges.push(edge);
      }
      this.vertices.add(obj);
      map[vertex].obj = obj;
    }
    for (var $__1 = this.vertices[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__2 = void 0; !($__2 = $__1.next()).done; ) {
      var vertex = $__2.value;
      {
        vertex.edges.map((function(edge) {
          edge.endVertex = map[edge.endVertexName].obj;
        }));
      }
    }
    ;
  }}, {});
var map = {
  a: {
    b: 1,
    c: 2
  },
  b: {a: 1},
  c: {a: 2}
};
var graph = new Graph(map);
write('Hello from testgraph');
write(JSON.stringify(graph));
