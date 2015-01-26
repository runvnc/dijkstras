var write = (msg) => {
  var div = document.getElementById('info');
  div.innerHTML = msg + '<br/>' + div.innerHTML;
}

window.onerror = (e, a, b) => {
  write(e);
  write(a);
  write(b);
}

class Graph {
  constructor(map) {
    this.loadMap(map);
  }

  loadMap(map) {
    this.map = map;
    this.vertices = new Set();
    for (var vertex in map) {
      var obj = { name: vertex };
      var edges = map[vertex];
      obj.edges = [];
      for (var vertexName in edges) {
        var edge = { weight: edges[vertexName],
                     endVertexName: vertexName };
        obj.edges.push(edge);
      }
      this.vertices.add(obj);
      map[vertex].obj = obj;   
    }
    for (var vertex of this.vertices) {
      vertex.edges.map((edge) => {
        edge.endVertex = map[edge.endVertexName].obj;
      });
    };
  }
}


var map = { a: { b:1, c: 2}, b: { a: 1 }, c: { a: 2 } };

var graph = new Graph(map);

write('Hello from testgraph');
write(JSON.stringify(graph));
