export function dessinerCarteNeurale(neurones) {
    const width = 400;
    const height = 400;

    const svg = d3.select("#brain-map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(neurones)
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(40));

    const node = svg.selectAll("circle")
        .data(neurones)
        .enter()
        .append("circle")
        .attr("r", 20)
        .attr("fill", "skyblue")
        .call(drag(simulation));

    const label = svg.selectAll("text")
        .data(neurones)
        .enter()
        .append("text")
        .text(d => d.nom)
        .attr("text-anchor", "middle")
        .attr("dy", 4);

    simulation.on("tick", () => {
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);

        label.attr("x", d => d.x)
             .attr("y", d => d.y);
    });

    function drag(simulation) {
        return d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }
}
