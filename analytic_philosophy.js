// ==========================================================================
// The Tree of Analytic Philosophy - Botanical & D3 Hybrid Engine
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById("tree-canvas-container");
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const svg = d3.select("#philosophy-tree-svg")
        .attr("width", "100%")
        .attr("height", "100%");
        
    // 定义 SVG 渐变效果（赋予树干立体木质感）
    const defs = svg.append("defs");
    const trunkGrad = defs.append("linearGradient")
        .attr("id", "trunk-gradient")
        .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
    trunkGrad.append("stop").attr("offset", "0%").attr("stop-color", "#3e2723");
    trunkGrad.append("stop").attr("offset", "50%").attr("stop-color", "#5d4037");
    trunkGrad.append("stop").attr("offset", "100%").attr("stop-color", "#3e2723");

    const gMain = svg.append("g");
    
    // 缩放与平移引擎
    const zoom = d3.zoom()
        .scaleExtent([0.15, 3.5])
        .on("zoom", (event) => { gMain.attr("transform", event.transform); });
    svg.call(zoom);
    
    // 图层顺序：底层交叉虚线 -> 中层实体树干与树枝 -> 顶层节点
    const gCrossLinks = gMain.append("g").attr("class", "cross-links-layer");
    const gBotanicalTrunk = gMain.append("g").attr("class", "botanical-trunk-layer");
    const gLinks = gMain.append("g").attr("class", "links-layer");
    const gNodes = gMain.append("g").attr("class", "nodes-layer");

    // 数据层次初始化
    const root = d3.hierarchy(philosophyTreeData);
    const treeLayout = d3.tree().nodeSize([150, 180]);
    
    root.x0 = 0;
    root.y0 = 0;

    // 默认折叠状态：初始只展示到一级主枝（Depth 2 展开，Depth > 2 收起）
    root.descendants().forEach(d => {
        if (d.depth > 2) {
            d._children = d.children;
            d.children = null;
        }
    });

    let i = 0;

    // ==================================================================
    // 核心渲染与更新引擎
    // ==================================================================
    function update(source) {
        const duration = 500;
        const treeData = treeLayout(root);
        const nodes = treeData.descendants();
        const links = treeData.links();

        // 垂直反转：实现自底向上的植物生长形态
        nodes.forEach(d => { d.y = -d.y; });

        // 绘制物理主干脊椎与根系底座
        drawBotanicalSpineAndRoots();

        // 节点更新
        const node = gNodes.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append("g")
            .attr("class", d => `node ${d.data.nodeType || 'Concept'}`)
            .attr("transform", d => `translate(${source.x0},${source.y0})`)
            .style("opacity", 0)
            .on("click", (event, d) => {
                event.stopPropagation();
                toggleNode(d);
            });

        nodeEnter.append("circle")
            .attr("r", d => getRadius(d));

        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children || d._children ? -14 : 14)
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.title_en);

        const nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition().duration(duration)
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .style("opacity", 1);

        node.exit().transition().duration(duration)
            .attr("transform", d => `translate(${source.x},${source.y})`)
            .style("opacity", 0)
            .remove();

        // 主枝与次级枝条连线
        const link = gLinks.selectAll("path.botanical-branch")
            .data(links, d => d.target.id);

        const linkGenerator = d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y);

        const linkEnter = link.enter().insert("path", "g")
            .attr("class", "botanical-branch")
            .attr("stroke-width", d => getLinkThickness(d.target))
            .attr("d", d => {
                const o = {x: source.x0, y: source.y0};
                return linkGenerator({source: o, target: o});
            });

        const linkUpdate = linkEnter.merge(link);
        linkUpdate.transition().duration(duration)
            .attr("d", linkGenerator)
            .attr("stroke-width", d => getLinkThickness(d.target));

        link.exit().transition().duration(duration)
            .attr("d", d => {
                const o = {x: source.x, y: source.y};
                return linkGenerator({source: o, target: o});
            })
            .remove();

        nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });
        setTimeout(drawCrossDomainLinks, duration + 50);
    }

    // 枝条粗细渐变映射
    function getLinkThickness(nodeData) {
        if (nodeData.data.nodeType === "Trunk") return 12;
        if (nodeData.data.nodeType === "Field") return 7;
        if (nodeData.data.nodeType === "Subfield") return 4;
        return 2;
    }
    
    // 节点圆点半径映射
    function getRadius(nodeData) {
        if (nodeData.data.nodeType === "Trunk") return 9;
        if (nodeData.data.nodeType === "Field") return 7;
        if (nodeData.data.nodeType === "Root") return 6;
        return 5;
    }

    // 绘制自然植物树干与地下根系
    function drawBotanicalSpineAndRoots() {
        gBotanicalTrunk.selectAll("*").remove();

        // 绘制实体渐变树干（自 y = 100 向上延伸至 y = -350）
        gBotanicalTrunk.append("path")
            .attr("d", "M -22 100 C -12 0, -8 -150, -12 -380 L 12 -380 C 8 -150, 12 0, 22 100 Z")
            .attr("class", "botanical-trunk");

        // 绘制地下向下延伸的根系（y > 100）
        const rootsData = [
            { d: "M 0 100 C -10 140, -40 180, -90 220" },
            { d: "M 0 100 C 10 150, 50 190, 110 240" },
            { d: "M 0 100 C 0 160, -20 220, -30 290" },
            { d: "M 0 100 C 0 150, 20 210, 40 280" }
        ];
        rootsData.forEach(r => {
            gBotanicalTrunk.append("path")
                .attr("d", r.d)
                .attr("class", "botanical-root")
                .attr("stroke-width", "5")
                .attr("fill", "none");
        });
    }

    // 展开/收起交互
    function toggleNode(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
        showNodeDetails(d.data);
        updateBreadcrumb(d);
    }

    // 绘制跨学科虚线
    function drawCrossDomainLinks() {
        gCrossLinks.selectAll("*").remove();
        const visibleNodes = new Map();
        root.descendants().forEach(d => { visibleNodes.set(d.data.id, d); });

        crossLinksData.forEach(linkInfo => {
            const source = visibleNodes.get(linkInfo.source);
            const target = visibleNodes.get(linkInfo.target);
            
            if (source && target) {
                const cx = (source.x + target.x) / 2;
                const cy = Math.min(source.y, target.y) - 120;
                gCrossLinks.append("path")
                    .attr("class", "cross-link")
                    .attr("d", `M ${source.x} ${source.y} Q ${cx} ${cy} ${target.x} ${target.y}`);
            }
        });
    }

    // 初始化画布视角（置于地面线附近，自下而上观察整棵树）
    const initialTransform = d3.zoomIdentity.translate(width / 2, height - 120).scale(0.75);
    svg.call(zoom.transform, initialTransform);
    update(root);

    // ==================================================================
    // 交互控件绑定
    // ==================================================================
    document.getElementById("btn-zoom-in").addEventListener("click", () => {
        svg.transition().duration(300).call(zoom.scaleBy, 1.25);
    });
    document.getElementById("btn-zoom-out").addEventListener("click", () => {
        svg.transition().duration(300).call(zoom.scaleBy, 0.8);
    });
    document.getElementById("btn-reset-view").addEventListener("click", () => {
        svg.transition().duration(500).call(zoom.transform, initialTransform);
    });
    document.getElementById("btn-collapse-all").addEventListener("click", () => {
        root.descendants().forEach(d => {
            if (d.depth > 0 && d.children) { d._children = d.children; d.children = null; }
        });
        update(root); closeDetailsPanel();
    });

    // 学术详情抽屉控制
    const panel = document.getElementById("node-details-panel");
    document.getElementById("btn-close-panel").addEventListener("click", closeDetailsPanel);
    function closeDetailsPanel() { panel.classList.remove("open"); }

    function showNodeDetails(data) {
        document.getElementById("detail-type").textContent = data.nodeType || "Concept";
        document.getElementById("detail-title-en").textContent = data.title_en;
        document.getElementById("detail-title-zh").textContent = data.title_zh || "";
        document.getElementById("detail-description").textContent = data.descriptionZh || data.description || "暂无学术概述。";
        
        // 哲学家
        const philSec = document.getElementById("section-philosophers");
        const philList = document.getElementById("detail-philosophers");
        philList.innerHTML = "";
        if (data.philosophers && data.philosophers.length > 0) {
            data.philosophers.forEach(p => { const li = document.createElement("li"); li.textContent = p; philList.appendChild(li); });
            philSec.classList.remove("hidden");
        } else philSec.classList.add("hidden");

        // 跨学科关联
        const relSec = document.getElementById("section-relations");
        const relList = document.getElementById("detail-relations");
        relList.innerHTML = "";
        const relatedCross = crossLinksData.filter(l => l.source === data.id || l.target === data.id);
        if (relatedCross.length > 0) {
            relatedCross.forEach(rc => {
                const li = document.createElement("li");
                li.innerHTML = `<em>${rc.relationType}</em>`;
                relList.appendChild(li);
            });
            relSec.classList.remove("hidden");
        } else relSec.classList.add("hidden");

        // 学术文献链接 (SEP 优先)
        const resSec = document.getElementById("section-resources");
        const resList = document.getElementById("detail-resources");
        resList.innerHTML = "";
        if (data.links && data.links.sep) {
            resList.innerHTML += `<li><span class="tag-sep">SEP</span> <a href="${data.links.sep}" target="_blank">Stanford Encyclopedia of Philosophy Entry</a></li>`;
            resSec.classList.remove("hidden");
        } else {
            resList.innerHTML += `<li><span class="tag-alt">Search</span> <a href="https://plato.stanford.edu/search/searcher.py?query=${encodeURIComponent(data.title_en)}" target="_blank">Search on SEP</a></li>`;
            resSec.classList.remove("hidden");
        }

        panel.classList.add("open");
    }

    function updateBreadcrumb(d) {
        const path = [];
        let curr = d;
        while (curr) { path.unshift(curr.data.title_en); curr = curr.parent; }
        document.getElementById("current-path").textContent = `Path: ${path.join(" → ")}`;
    }

    // ==================================================================
    // 全局穿透搜索与外部学术检索
    // ==================================================================
    const flatData = [];
    root.descendants().forEach(d => { flatData.push(d); });

    const searchInput = document.getElementById("tree-search-input");
    const clearBtn = document.getElementById("btn-clear-search");
    const resultsPanel = document.getElementById("search-results-panel");
    const localList = document.getElementById("local-results-list");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) { clearBtn.classList.remove("hidden"); performSearch(query); } 
        else { clearBtn.classList.add("hidden"); hideSearchResults(); }
    });

    clearBtn.addEventListener("click", () => { searchInput.value = ""; clearBtn.classList.add("hidden"); hideSearchResults(); searchInput.focus(); });
    function hideSearchResults() { resultsPanel.classList.add("hidden"); localList.innerHTML = ""; }

    function performSearch(query) {
        localList.innerHTML = "";
        const matches = flatData.filter(d => {
            const data = d.data;
            const searchStr = `${data.title_en} ${data.title_zh || ''} ${data.philosophers ? data.philosophers.join(" ") : ''} ${data.description || ''}`.toLowerCase();
            return searchStr.includes(query);
        });

        if (matches.length > 0) {
            matches.slice(0, 6).forEach(d => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${d.data.title_en}</strong> ${d.data.title_zh ? `(${d.data.title_zh})` : ''} <br><small style="color:#777">${d.data.nodeType || 'Concept'}</small>`;
                li.addEventListener("click", () => {
                    let curr = d;
                    while(curr.parent) {
                        if(curr.parent._children) {
                            curr.parent.children = curr.parent._children;
                            curr.parent._children = null;
                        }
                        curr = curr.parent;
                    }
                    update(root);
                    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(width / 2 - d.x, height / 2 - d.y).scale(1.2));
                    showNodeDetails(d.data);
                    updateBreadcrumb(d);
                    hideSearchResults();
                    searchInput.value = d.data.title_en;
                });
                localList.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No local matches found. Try external engines below.";
            li.style.color = "#888";
            localList.appendChild(li);
        }

        document.getElementById("link-sep").href = `https://plato.stanford.edu/search/searcher.py?query=${encodeURIComponent(query)}`;
        document.getElementById("link-iep").href = `https://www.google.com/search?q=site%3Aiep.utm.edu+${encodeURIComponent(query)}`;
        document.getElementById("link-scholar").href = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
        document.getElementById("link-wiki").href = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
        document.getElementById("external-search-links").classList.remove("hidden");
        resultsPanel.classList.remove("hidden");
    }
});