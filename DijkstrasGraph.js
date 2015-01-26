class DijkstrasGraph {

  constructor(map) {
    super(map);
    this.unvisited = this.vertices.map( v => v);
  }

  markVisited(vertex) {
    vertex.visited = true;
    this.unvisited.delete(vertex);
  }

  *findShortestPath(from, to) {
    from.edges.map((edge) => { 
      vertex = edge.endVertex;
      if (!vertex.visited) { 
        distance = from.distance + edge.weight;
        if (distance < vertex.distance) {
          vertex.distance = distance;
        }
      }
    });

    this.markVisited(from);

    var next = this.unvisited.reduce(
      (a, b) => { a.distance < b.distance ? a : b; }
    );

    if (next === to) {
      yield next;
    } else {
      yield* findShortestPath(next, to);
    }
  }

}


