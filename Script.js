

(function(){
    const svg = document.getElementById('netSvg');
    const ns = 'http://www.w3.org/2000/svg';
    const W = 1180, H = 800;
    const nodeCount = 16;
    const nodes = [];
    for(let i=0;i<nodeCount;i++){
      nodes.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: Math.random()*2 + 2
      });
    }
    // connect each node to its 2 nearest neighbors
    function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
    const edges = [];
    nodes.forEach((n,i)=>{
      const sorted = nodes.map((m,j)=>({j,d:dist(n,m)})).filter(o=>o.j!==i).sort((a,b)=>a.d-b.d).slice(0,2);
      sorted.forEach(o=>{
        const key = [i,o.j].sort().join('-');
        if(!edges.find(e=>e.key===key)) edges.push({key,a:i,b:o.j});
      });
    });

    edges.forEach((e,idx)=>{
      const a = nodes[e.a], b = nodes[e.b];
      const line = document.createElementNS(ns,'line');
      line.setAttribute('x1',a.x); line.setAttribute('y1',a.y);
      line.setAttribute('x2',b.x); line.setAttribute('y2',b.y);
      line.setAttribute('stroke','#ffc42d');
      line.setAttribute('stroke-width','1');
      line.setAttribute('opacity','0.15');
      svg.appendChild(line);

      // traveling pulse dot
      const pulse = document.createElementNS(ns,'circle');
      pulse.setAttribute('r','2.5');
      pulse.setAttribute('fill','#ffc42d');
      const anim = document.createElementNS(ns,'animateMotion');
      anim.setAttribute('dur', (4 + Math.random()*4)+'s');
      anim.setAttribute('repeatCount','indefinite');
      anim.setAttribute('path', `M${a.x},${a.y} L${b.x},${b.y}`);
      anim.setAttribute('begin', (Math.random()*4)+'s');
      pulse.appendChild(anim);
      const opAnim = document.createElementNS(ns,'animate');
      opAnim.setAttribute('attributeName','opacity');
      opAnim.setAttribute('values','0;1;1;0');
      opAnim.setAttribute('dur', anim.getAttribute('dur'));
      opAnim.setAttribute('repeatCount','indefinite');
      opAnim.setAttribute('begin', anim.getAttribute('begin'));
      pulse.appendChild(opAnim);
      svg.appendChild(pulse);
    });

    nodes.forEach(n=>{
      const c = document.createElementNS(ns,'circle');
      c.setAttribute('cx',n.x); c.setAttribute('cy',n.y); c.setAttribute('r',n.r);
      c.setAttribute('fill','#ffc42d');
      c.setAttribute('opacity','0.5');
      svg.appendChild(c);
    });
  })();