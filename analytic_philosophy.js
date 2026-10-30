// ==========================================================================
// The Tree of Analytic Philosophy - Vertical Tree Engine & Interaction Logic
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("philosophy-tree-svg");
    const container = document.getElementById("tree-canvas-container");
    const data = philosophyData;

    // 画布与视角状态 (针对垂直布局调整初始坐标)
    let viewBox = { x: -800, y: -600, w: 1600, h: 1200 };
    let isDragging = false;
    let startPan = { x: 0, y: 0 };
    
    // 节点展开状态
    let expandedNodes = new Set();
    Object.keys(data).forEach(key => {
        if (data[key].parent_id === "trunk") expandedNodes.add(key);
    });

    // 存储渲染坐标，用于绘制交叉虚线
    let renderedCoords = new Map();

    // ----------------------------------------------------------------------
    // 画布控制与缩放 (保留不变)
    // ----------------------------------------------------------------------
    function updateViewBox() { svg.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`); }
    updateViewBox();

    container.addEventListener("mousedown", (e) => {
        if (e.target.closest('.trunk-search-box') || e.target.closest('.details-panel')) return;
        isDragging = true; startPan = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        viewBox.x -= (e.clientX - startPan.x) * (viewBox.w / container.clientWidth);
        viewBox.y -= (e.clientY - startPan.y) * (viewBox.h / container.clientHeight);
        startPan = { x: e.clientX, y: e.clientY };
        updateViewBox();
    });
    window.addEventListener("mouseup", () => isDragging = false);

    document.getElementById("btn-zoom-in").addEventListener("click", () => {
        viewBox.w *= 0.8; viewBox.h *= 0.8; viewBox.x += viewBox.w * 0.125; viewBox.y += viewBox.h * 0.125; updateViewBox();
    });
    document.getElementById("btn-zoom-out").addEventListener("click", () => {
        viewBox.x -= viewBox.w * 0.125; viewBox.y -= viewBox.h * 0.125; viewBox.w *= 1.25; viewBox.h *= 1.25; updateViewBox();
    });
    document.getElementById("btn-reset-view").addEventListener("click", () => {
        viewBox = { x: -800, y: -600, w: 1600, h: 1200 }; updateViewBox();
    });
    document.getElementById("btn-collapse-all").addEventListener("click", () => {
        expandedNodes.clear();
        Object.keys(data).forEach(key => { if (data[key].parent_id === "trunk") expandedNodes.add(key); });
        renderTree(); closeDetailsPanel();
    });

    // ----------------------------------------------------------------------
    // 核心树形生成算法 (垂直定向分形布局)
    // ----------------------------------------------------------------------
    function getChildren(parentId) { return Object.values(data).filter(node => node.parent_id === parentId); }

    function renderTree() {
        svg.innerHTML = "";
        renderedCoords.clear();

        // 1. 坐标计算：定义一条垂直居中的真实树干 (从 y=150 到 y=-400)
        // 渲染树干节点
        const trunkNodes = [
            { id: "trunk-formation", y: 150 },
            { id: "trunk-logic-analysis", y: 0 },
            { id: "trunk-lang-analysis", y: -150 },
            { id: "trunk-concept-analysis", y: -300 }
        ];
        trunkNodes.forEach(t => {
            if(data[t.id]) renderedCoords.set(t.id, { x: 0, y: t.y, parentCoords: {x:0, y: t.y+150}, level: 0, node: data[t.id] });
        });

        // 渲染向下生长的树根
        const roots = getChildren("trunk").filter(n => n.type === "Historical Source");
        calculateBranchCoords(roots, {x:0, y: 150}, Math.PI/2, 280, 1, "root"); // Math.PI/2 代表正下方

        // 渲染向两侧生长的主枝 (Fields)
        const fields = getChildren("trunk").filter(n => n.type === "Field");
        const leftFields = fields.slice(0, Math.ceil(fields.length / 2));
        const rightFields = fields.slice(Math.ceil(fields.length / 2));

        // 左侧树枝分布在树干左半边，角度朝左上 (Math.PI)
        leftFields.forEach((field, i) => {
            const startY = 100 - (i * 450 / leftFields.length); // 沿树干高度错落分布
            calculateBranchCoords([field], {x: 0, y: startY}, Math.PI, 380, 1, "main-left");
        });
        
        // 右侧树枝分布在树干右半边，角度朝右上 (0)
        rightFields.forEach((field, i) => {
            const startY = 50 - (i * 450 / rightFields.length); // 错开左右分枝的高度，更显自然
            calculateBranchCoords([field], {x: 0, y: startY}, 0, 380, 1, "main-right");
        });

        // 2. 按 Z-Index 顺序绘制 (底层虚线 -> 中层实线 -> 顶层节点)
        drawCrossDomainLinks(); // ★ 新增：画出跨领域虚线
        drawVisualTrunk();      // ★ 新增：画出粗壮的主树干线
        drawTreeLinks();
        drawNodes();
    }

    // 递归坐标计算
    function calculateBranchCoords(nodes, parentCoords, baseAngle, radius, level, type) {
        if (!nodes || nodes.length === 0) return;
        
        // 分形发散角度 (根据层级和类型动态调整)
        let spread = Math.PI / 1.5; 
        if (type.startsWith("main")) spread = 0; // 主枝根部直接顺着基准角度长
        else if (type === "sub") spread = Math.PI / 2.5; // 次级枝条张角稍小，避免混乱

        nodes.forEach((node, i) => {
            let angle = baseAngle;
            if (nodes.length > 1) {
                // 均匀扇形分布
                angle = baseAngle - spread/2 + (i + 0.5) * (spread / nodes.length);
            }
            
            // 为了有机感，叶子节点的半径稍微随机化
            const finalRadius = (node.type === "Concept" || node.type === "Theory") ? radius * (0.8 + Math.random()*0.4) : radius;
            
            const x = parentCoords.x + finalRadius * Math.cos(angle);
            const y = parentCoords.y + finalRadius * Math.sin(angle);
            
            renderedCoords.set(node.id, { x, y, parentCoords, level, node });

            if (expandedNodes.has(node.id)) {
                const children = getChildren(node.id);
                // 递归：枝条变短，继承父枝条生长角度
                calculateBranchCoords(children, {x, y}, angle, radius * 0.7, level + 1, "sub");
            }
        });
    }

    // ----------------------------------------------------------------------
    // 绘制功能 (画布底层至顶层)
    // ----------------------------------------------------------------------

    // [底层] 绘制跨领域交叉虚线
    function drawCrossDomainLinks() {
        const drawnPairs = new Set();
        const g = document.createElementNS(svgNS, "g");
        g.setAttribute("class", "cross-links-layer");

        renderedCoords.forEach((coordsA, idA) => {
            const nodeA = coordsA.node;
            if (!nodeA.relations) return;

            Object.values(nodeA.relations).forEach(relArray => {
                relArray.forEach(idB => {
                    // 如果关系目标也在当前屏幕上
                    if (renderedCoords.has(idB)) {
                        const pairKey = [idA, idB].sort().join("-"); // 防止 A连B，B又连A
                        if (!drawnPairs.has(pairKey)) {
                            drawnPairs.add(pairKey);
                            const coordsB = renderedCoords.get(idB);
                            
                            // 排除正常的父子关系，只画交叉关系
                            if (nodeA.parent_id !== idB && data[idB].parent_id !== idA) {
                                const path = document.createElementNS(svgNS, "path");
                                // 绘制一条向上拱起的贝塞尔曲线虚线
                                const cx = (coordsA.x + coordsB.x) / 2;
                                const cy = (coordsA.y + coordsB.y) / 2 - 150; 
                                path.setAttribute("d", `M ${coordsA.x} ${coordsA.y} Q ${cx} ${cy} ${coordsB.x} ${coordsB.y}`);
                                path.setAttribute("class", "cross-link");
                                g.appendChild(path);
                            }
                        }
                    }
                });
            });
        });
        svg.appendChild(g);
    }

    // [中层] 绘制粗壮的物理主树干
    function drawVisualTrunk() {
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", `M 0 150 L 0 -450`);
        path.setAttribute("stroke", "var(--tree-trunk)");
        path.setAttribute("stroke-width", "16"); // 最粗
        path.setAttribute("stroke-linecap", "round");
        svg.appendChild(path);
    }

    // [中层] 绘制实体树枝（根据层级动态变细）
    function drawTreeLinks() {
        renderedCoords.forEach((coords) => {
            if (coords.node.type === "Trunk") return; // 树干已经在上面画了
            
            const start = coords.parentCoords;
            const end = { x: coords.x, y: coords.y };
            const path = document.createElementNS(svgNS, "path");
            
            // 贝塞尔曲线控制点：靠近起点的延伸，形成平滑弯折
            const cx1 = start.x + (end.x - start.x) / 2;
            const cy1 = start.y;
            const cx2 = start.x + (end.x - start.x) / 2;
            const cy2 = end.y;
            
            path.setAttribute("d", `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`);
            
            // 动态粗细：层级越深（level越大），枝条越细 (最高 12px，最低 2px)
            const thickness = Math.max(2, 12 - (coords.level * 2));
            path.setAttribute("stroke-width", thickness);
            path.setAttribute("class", `tree-link ${coords.node.type === "Historical Source" ? 'root-link' : ''}`);
            
            svg.appendChild(path);
        });
    }

    // [顶层] 绘制节点与文字
    function drawNodes() {
        renderedCoords.forEach((coords) => {
            const node = coords.node;
            const g = document.createElementNS(svgNS, "g");
            
            // 给特殊节点挂上专属 CSS Class 以改变颜色
            let nodeClass = "";
            if (node.type === "Trunk") nodeClass = "node-trunk";
            if (node.type === "Field") nodeClass = "node-field";
            if (node.type === "Historical Source") nodeClass = "node-root";
            
            g.setAttribute("class", `tree-node ${nodeClass}`);
            g.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
            
            g.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleNode(node.id);
                showNodeDetails(node);
                updateBreadcrumb(node);
            });

            // 圆点大小随重要性变化
            const circle = document.createElementNS(svgNS, "circle");
            let radius = 6;
            if (node.type === "Trunk" || node.type === "Field") radius = 12;
            if (node.type === "Historical Source" || node.type === "Subfield") radius = 10;
            circle.setAttribute("r", radius);
            circle.setAttribute("cx", 0); circle.setAttribute("cy", 0);
            
            // 文字标签排版防止遮挡
            const text = document.createElementNS(svgNS, "text");
            text.textContent = node.title_en;
            // 树根文字写在右下，左枝文字写在左边，右枝和树干写在右边
            if(coords.x < 0) {
                text.setAttribute("x", -15); text.setAttribute("y", 5); text.setAttribute("text-anchor", "end");
            } else {
                text.setAttribute("x", 15); text.setAttribute("y", 5); text.setAttribute("text-anchor", "start");
            }
            
            g.appendChild(circle);
            g.appendChild(text);
            svg.appendChild(g);
        });
    }

    function toggleNode(nodeId) {
        if (expandedNodes.has(nodeId)) {
            // 收起：递归删除本节点和所有子孙节点的展开状态
            const collapseRecursive = (id) => {
                expandedNodes.delete(id);
                getChildren(id).forEach(child => collapseRecursive(child.id));
            };
            collapseRecursive(nodeId);
        } else {
            expandedNodes.add(nodeId);
        }
        renderTree(); // 触发全画布重绘，此时虚线引擎也会自动重算
    }

    // 初始化画布渲染
    renderTree();

    // ----------------------------------------------------------------------
    // 侧边栏与搜索功能 (完整保留，逻辑不变)
    // ----------------------------------------------------------------------
    const panel = document.getElementById("node-details-panel");
    const btnClosePanel = document.getElementById("btn-close-panel");
    btnClosePanel.addEventListener("click", () => panel.classList.remove("open"));

    function showNodeDetails(node) {
        document.getElementById("detail-type").textContent = node.type;
        document.getElementById("detail-title-en").textContent = node.title_en;
        document.getElementById("detail-title-zh").textContent = node.title_zh || "";
        document.getElementById("detail-description").textContent = node.description;

        const philSec = document.getElementById("section-philosophers");
        const philList = document.getElementById("detail-philosophers");
        philList.innerHTML = "";
        if (node.philosophers && node.philosophers.length > 0) {
            node.philosophers.forEach(p => { const li = document.createElement("li"); li.textContent = p; philList.appendChild(li); });
            philSec.classList.remove("hidden");
        } else philSec.classList.add("hidden");

        const relSec = document.getElementById("section-relations");
        const relList = document.getElementById("detail-relations");
        relList.innerHTML = "";
        let hasRelations = false;
        if (node.relations) {
            Object.keys(node.relations).forEach(relType => {
                const relArray = node.relations[relType];
                if (relArray && relArray.length > 0) {
                    hasRelations = true;
                    relArray.forEach(targetId => {
                        const targetNode = data[targetId];
                        if (targetNode) {
                            const li = document.createElement("li");
                            const relLabel = relType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                            li.innerHTML = `<em>${relLabel}:</em> <a href="#" data-target="${targetId}">${targetNode.title_en}</a>`;
                            relList.appendChild(li);
                        }
                    });
                }
            });
        }
        relList.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = a.getAttribute("data-target");
                if(data[targetId] && data[targetId].parent_id !== "trunk") { expandedNodes.add(data[targetId].parent_id); renderTree(); }
                showNodeDetails(data[targetId]); updateBreadcrumb(data[targetId]);
            });
        });
        if (hasRelations) relSec.classList.remove("hidden"); else relSec.classList.add("hidden");

        const resSec = document.getElementById("section-resources");
        const resList = document.getElementById("detail-resources");
        resList.innerHTML = "";
        if (node.links) {
            if (node.links.sep) resList.innerHTML += `<li><span class="tag-sep">SEP</span> <a href="${node.links.sep}" target="_blank">View Article</a></li>`;
            if (node.links.iep) resList.innerHTML += `<li><span class="tag-iep">IEP</span> <a href="${node.links.iep}" target="_blank">View Article</a></li>`;
            if (node.links.wiki) resList.innerHTML += `<li><span class="tag-wiki">WIKI</span> <a href="${node.links.wiki}" target="_blank">View Article</a></li>`;
            resSec.classList.remove("hidden");
        } else resSec.classList.add("hidden");

        panel.classList.add("open");
    }

    function updateBreadcrumb(node) {
        const path = []; let curr = node;
        while (curr && curr.id !== "trunk") { path.unshift(curr.title_en); curr = data[curr.parent_id]; }
        path.unshift("Trunk");
        document.getElementById("current-path").textContent = `Path: ${path.join(" → ")}`;
    }

    // 搜索引擎逻辑保持不变
    const searchInput = document.getElementById("tree-search-input");
    const clearBtn = document.getElementById("btn-clear-search");
    const resultsPanel = document.getElementById("search-results-panel");
    const localList = document.getElementById("local-results-list");
    const externalLinks = document.getElementById("external-search-links");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) { clearBtn.classList.remove("hidden"); performSearch(query); } 
        else { clearBtn.classList.add("hidden"); hideSearchResults(); }
    });

    clearBtn.addEventListener("click", () => { searchInput.value = ""; clearBtn.classList.add("hidden"); hideSearchResults(); searchInput.focus(); });
    function hideSearchResults() { resultsPanel.classList.add("hidden"); localList.innerHTML = ""; }

    function performSearch(query) {
        localList.innerHTML = "";
        const matches = Object.values(data).filter(node => {
            if (node.type === "Virtual") return false;
            const searchStr = `${node.title_en} ${node.title_zh || ''} ${node.philosophers ? node.philosophers.join(" ") : ''}`.toLowerCase();
            return searchStr.includes(query);
        });

        if (matches.length > 0) {
            matches.slice(0, 5).forEach(node => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${node.title_en}</strong> ${node.title_zh ? `(${node.title_zh})` : ''} <br><small style="color:#888">${node.type}</small>`;
                li.addEventListener("click", () => {
                    if(node.parent_id !== "trunk") expandedNodes.add(node.parent_id);
                    renderTree(); showNodeDetails(node); updateBreadcrumb(node);
                    hideSearchResults(); searchInput.value = node.title_en;
                });
                localList.appendChild(li);
            });
        } else {
            const li = document.createElement("li"); li.textContent = "No local nodes found."; li.style.color = "#999"; li.style.cursor = "default"; localList.appendChild(li);
        }

        document.getElementById("link-sep").href = `https://plato.stanford.edu/search/searcher.py?query=${encodeURIComponent(query)}`;
        document.getElementById("link-iep").href = `https://www.google.com/search?q=site%3Aiep.utm.edu+${encodeURIComponent(query)}`;
        document.getElementById("link-wiki").href = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
        
        externalLinks.classList.remove("hidden"); resultsPanel.classList.remove("hidden");
    }

    document.addEventListener("click", (e) => { if (!e.target.closest('.trunk-search-box')) hideSearchResults(); });
});