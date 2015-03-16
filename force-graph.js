
var ForceGraph = function(width, height, containerId) {
	this.width = width
	this.height = height

	this.svg = d3.select(containerId).append("svg")
				    				.attr("width", width)
				    				.attr("height", height)

	this.force = d3.layout.force()
			  	    .charge(-120)
			  		.linkDistance(30)
			  		.size([width, height])

	this.nodes = this.force.nodes()
	this.links = this.force.links()

	this.color = d3.scale.category10()
}

ForceGraph.prototype.addNode = function(id) {
	if(id === '' || id === null)  return
	if(this.findNode(id)) return

	this.nodes.push({'name': 'new node', 'group': 1, 'id': id})
	this.update()
}

ForceGraph.prototype.addLink = function(sourceId, targetId) {

	if(sourceId === '' || sourceId === null || targetId === '' || targetId === null) 
		return

	var sourceNode = this.findNode(sourceId)
	var targetNode = this.findNode(targetId)

	if(!sourceNode || !targetNode)
		return

	this.links.push({source: sourceNode, target: targetNode})
	this.update()
}

ForceGraph.prototype.removeNode = function(nodeId) {
	for(var n in this.nodes) {
		if(nodes[n].id === nodeId) {
			this.nodes.splice(n, 1)
			this.removeLinksToNode(nodeId)
		}
	}
	
	this.update()
}

ForceGraph.prototype.removeLinkBetween = function(sourceNodeId, targetNodeId) {
	for(var l in this.links) {
		if(this.links[l].source.id === sourceNodeId && this.links[l].target.id === targetNodeId) {
			this.links[l].splice(l, 1)
		}
	}
}

ForceGraph.prototype.removeLinksToNode = function(nodeId) {
	for(var l in links) {
		if(links[l].source.id === nodeId) {
			links[l].splice(l, 1)
		}
		if(links[l].target.id === nodeId) {
			links[l].splice(l, 1)
		}
	}
	update()
}

ForceGraph.prototype.findNode = function(nodeId) {
	for(var n in this.nodes) {
		if(this.nodes[n].id === nodeId) {
			return this.nodes[n]			
		}
	}
}

ForceGraph.prototype.update = function() {

	var vertex = this.updateAndReturnVertexes()
	var node = this.updateAndReturnNodes()

	this.force.on("tick", function() {
		vertex.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; })

		node.attr("transform", function(d) { 
			return "translate(" + d.x + ", " + d.y + ")"; 
		})
	});

	this.force.start()
}

ForceGraph.prototype.updateAndReturnVertexes = function() {

	var link = this.svg.selectAll('line').data(this.links, function(d) {
		if(d.target != null)
			return d.source.id + "-" + d.target.id
		else
			return d.source.id
	})

	link.enter().append('line').attr('class', 'link').attr('id', function(d) {
		if(d.target != null)
			return d.source.id + "-" + d.target.id
		else
			return d.source.id
	})
	link.append('title').text(function(d) {
		return d.value
	})
	link.exit().remove()

	return link
}

ForceGraph.prototype.updateAndReturnNodes = function() {

	var node = this.svg.selectAll('.node').data(this.nodes, function(d) {
		return d.id
	})

	var nodeEnter = node.enter().append('g').attr('class', 'node').call(this.force.drag)
	
	nodeEnter.append('svg:circle')
			.attr('r', 5)
			.attr('id', function(d) { return 'Node:' + d.id})
			.style('fill', function(d) { return forceGraph.color(d.group) })
	
	nodeEnter.append('svg:text')
			.attr('x', '6')
			.attr('y', '.2em')
			.attr('class', 'node-text')
			.text(function(d) { 
				return d.id
			})
	
	node.exit().remove()

	return node
}