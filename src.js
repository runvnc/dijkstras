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
var DijkstrasGraph = function DijkstrasGraph(map) {
  "use strict";
  $traceurRuntime.superConstructor($DijkstrasGraph).call(this, map);
  this.unvisited = new Set(this.vertices);
};
var $DijkstrasGraph = DijkstrasGraph;
($traceurRuntime.createClass)(DijkstrasGraph, {
  markVisited: function(vertex) {
    "use strict";
    vertex.visited = true;
    write('marked vertex ' + vertex.name + ' as visited');
    this.unvisited.delete(vertex);
  },
  findNextClose: function() {
    "use strict";
    var next = null;
    var closest = Infinity;
    for (var $__1 = this.unvisited[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__2 = void 0; !($__2 = $__1.next()).done; ) {
      var vertex = $__2.value;
      {
        if (vertex.distance === undefined || vertex.distance <= closest) {
          next = vertex;
          write(vertex.name);
        }
      }
    }
    return next;
  },
  findShortestPath: function(from, to) {
    "use strict";
    from.edges.map((function(edge) {
      var vertex = edge.endVertex;
      if (!vertex.visited) {
        var distance = from.distance + edge.weight;
        if (distance < vertex.distance) {
          vertex.distance = distance;
        }
      }
    }));
    this.markVisited(from);
    var next = this.findNextClose();
    if (next === to) {
      return true;
    } else {
      if (next != null)
        return this.findShortestPath(next, to);
    }
  },
  findShortest: function(a, b) {
    "use strict";
    return this.findShortestPath(this.map[a].obj, this.map[b].obj);
  }
}, {}, Graph);
write('Hello from testgraph');
var map = {
  a: {
    b: 1,
    c: 2
  },
  b: {
    a: 1,
    c: 1
  },
  c: {b: 1}
};
var graph = new DijkstrasGraph(map);
graph.findShortest('a', 'b');
