class DijkstrasGraph {

  constructor(map) {
    super(map);
    this.unvisited = this.vertices.map( v => v);
  }

  markVisited(vertex) {
    vertex.visited = true;
    this.unvisited.delete(vertex);
  }

  findNextClose() {
    var next = null;
    var closest = infinity;
    for (var vertex of this.unvisited) {
      if (vertex.distance < closest) {
        next = vertex;
      }
    }
    return next;
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

    var next = findNextClose();

    if (next === to) {
      yield next;
    } else {
      yield* findShortestPath(next, to);
    }
  }

}


