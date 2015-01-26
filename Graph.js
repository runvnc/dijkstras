class Graph {
  constructor(map) {
    this.loadMap(map);
  }

 //{ a: { b: 1, c: 2}, b: {a: 1} }

  loadMap(map) {
    this.map = map;
    this.vertices = [];
    for (var vertex of map) {
      var vertex = { name: vertex };
      var edges = map[vertex];
      vertex.edges = [];
      for (var vertexName of edges) {
        var edge = { weight: edges[vertexName],
                     endVertex: map[vertexName] };
        vertex.edges.push(edge);
      }
      this.vertices.push(vertex);   
    }
  }
}
