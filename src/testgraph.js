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


class DijkstrasGraph extends Graph {

  constructor(map) {
    super(map);
    this.unvisited = new Set(this.vertices);
  }

  markVisited(vertex) {
    vertex.visited = true;
    write('marked vertex ' + vertex.name + ' as visited');
    this.unvisited.delete(vertex);
  }

  findNextClose() {
    var next = null;
    var closest = Infinity;
    for (var vertex of this.unvisited) {
      if (vertex.distance === undefined 
          || vertex.distance <= closest) {
        next = vertex;
        write(vertex.name);
      }
    }
    return next;
  }

  findShortestPath(from, to) {
    from.edges.map((edge) => { 
      var vertex = edge.endVertex;
      if (!vertex.visited) { 
        var distance = from.distance + edge.weight;
        if (distance < vertex.distance) {
          vertex.distance = distance;
        }
      }
    });

    this.markVisited(from);

    var next = this.findNextClose();

    if (next === to) {
      return true;
    } else {
      if (next != null) 
        return this.findShortestPath(next, to);
    }
  }

  findShortest(a, b) {
    return this.findShortestPath(this.map[a].obj, this.map[b].obj);  
  }
}


write('Hello from testgraph');

var map = { a: { b:1, c: 2}, b: { a: 1, c: 1 }, c: { b: 1 } };

var graph = new DijkstrasGraph(map);


graph.findShortest('a', 'b');




