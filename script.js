
var textbox_nodeId
var textbox_link

var forceGraph

$('document').ready(function() {

	forceGraph = new ForceGraph(960, 500, '#body')

	textbox_nodeId = $('.nodeId')
	textbox_link = $('.link')

	d3.select('.add').on('click', function() {
		forceGraph.addNode(textbox_nodeId.val())

		if(textbox_link.val() != '')
			forceGraph.addLink(textbox_nodeId.val(), textbox_link.val())
	
		forceGraph.update()
	})

	forceGraph.addNode('a')
	forceGraph.addNode('b')
	forceGraph.addNode('c')
	forceGraph.addNode('d')
	forceGraph.addNode('e')

	forceGraph.addLink('a', 'b')
	forceGraph.addLink('c', 'd')
	forceGraph.addLink('d', 'e')
	forceGraph.addLink('c', 'e')

})
