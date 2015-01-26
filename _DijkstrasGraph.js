"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _get = function get(object, property, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};

var DijkstrasGraph = (function () {
  function DijkstrasGraph(map) {
    _get(Object.getPrototypeOf(DijkstrasGraph.prototype), "constructor", this).call(this, map);
    this.unvisited = this.vertices.map(function (v) {
      return v;
    });
  }

  _prototypeProperties(DijkstrasGraph, null, {
    markVisited: {
      value: function markVisited(vertex) {
        vertex.visited = true;
        this.unvisited["delete"](vertex);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    findShortestPath: {
      value: (function (_findShortestPath) {
        var _findShortestPathWrapper = function findShortestPath() {
          return _findShortestPath.apply(this, arguments);
        };

        _findShortestPathWrapper.toString = function () {
          return _findShortestPath.toString();
        };

        return _findShortestPathWrapper;
      })(regeneratorRuntime.mark(function callee$1$0(from, to) {
        var next;
        return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              from.edges.map(function (edge) {
                vertex = edge.endVertex;
                if (!vertex.visited) {
                  distance = from.distance + edge.weight;
                  if (distance < vertex.distance) {
                    vertex.distance = distance;
                  }
                }
              });

              this.markVisited(from);

              next = this.unvisited.reduce(function (a, b) {
                a.distance < b.distance ? a : b;
              });
              if (!(next === to)) {
                context$2$0.next = 8;
                break;
              }
              context$2$0.next = 6;
              return next;
            case 6:
              context$2$0.next = 9;
              break;
            case 8:
              return context$2$0.delegateYield(findShortestPath(next, to), "t0", 9);
            case 9:
            case "end":
              return context$2$0.stop();
          }
        }, callee$1$0, this);
      })),
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return DijkstrasGraph;
})();

