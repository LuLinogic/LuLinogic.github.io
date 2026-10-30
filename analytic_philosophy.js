// ==========================================================================
// The Tree of Analytic Philosophy - Tree Engine & Interaction Logic
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------------------------
    // 1. 初始化与配置
    // ----------------------------------------------------------------------
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.getElementById("philosophy-tree-svg");
    const container = document.getElementById("tree-canvas-container");
    const data = philosophyData; // 来自 analytic_philosophy_data.js

    // 画布与视角状态
    let viewBox = { x: -800, y: -600, w: 1600, h: 1200 }; // 以 (0,0) 为中心
    let isDragging = false;
    let startPan = { x: 0, y: 0 };
    
    // 节点展开状态 (存储已展开的节点 ID)
    let expandedNodes = new Set();
    // 初始默认展开 trunk 的所有直接子节点 (Roots & Main Branches)
    Object.keys(data).forEach(key => {
        if (data[key].parent_id === "trunk") expandedNodes.add(key);
    });

    // ----------------------------------------------------------------------
    // 2. SVG 画布控制 (平移与缩放)
    // ----------------------------------------------------------------------
    function updateViewBox() {
        svg.setAttribute("viewBox", `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    }
    updateViewBox();

    container.addEventListener("mousedown", (e) => {
        // 如果点击的是搜索框或详情面板内的元素，不触发拖拽
        if (e.target.closest('.trunk-search-box') || e.target.closest('.details-panel')) return;
        isDragging = true;
        startPan = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = (e.clientX - startPan.x) * (viewBox.w / container.clientWidth);
        const dy = (e.clientY - startPan.y) * (viewBox.h / container.clientHeight);
        viewBox.x -= dx;
        viewBox.y -= dy;
        startPan = { x: e.clientX, y: e.clientY };
        updateViewBox();
    });

    window.addEventListener("mouseup", () => isDragging = false);

    // 缩放按钮
    document.getElementById("btn-zoom-in").addEventListener("click", () => {
        viewBox.w *= 0.8; viewBox.h *= 0.8;
        viewBox.x += viewBox.w * 0.125; viewBox.y += viewBox.h * 0.125;
        updateViewBox();
    });
    
    document.getElementById("btn-zoom-out").addEventListener("click", () => {
        viewBox.x -= viewBox.w * 0.125; viewBox.y -= viewBox.h * 0.125;
        viewBox.w *= 1.25; viewBox.h *= 1.25;
        updateViewBox();
    });

    document.getElementById("btn-reset-view").addEventListener("click", () => {
        viewBox = { x: -800, y: -600, w: 1600, h: 1200 };
        updateViewBox();
    });

    document.getElementById("btn-collapse-all").addEventListener("click", () => {
        expandedNodes.clear();
        Object.keys(data).forEach(key => {
            if (data[key].parent_id === "trunk") expandedNodes.add(key);
        });
        renderTree();
        closeDetailsPanel();
    });

    // ----------------------------------------------------------------------
    // 3. 树木形态算法与绘制引擎
    // ----------------------------------------------------------------------
    
    // 获取子节点
    function getChildren(parentId) {
        return Object.values(data).filter(node => node.parent_id === parentId);
    }

    // 核心渲染函数
    function renderTree() {
        svg.innerHTML = ""; // 清空画布重绘 (简化的重绘机制)
        
        // 绘制 Central Trunk (视觉上不可见，但作为坐标原点)
        const trunkCoords = { x: 0, y: 0 };
        
        // 绘制 Roots (向下生长)
        const roots = getChildren("trunk").filter(n => n.type === "Historical Source");
        layoutAndDrawBranch(roots, trunkCoords, Math.PI / 2, 400, "root");

        // 绘制 Main Branches (向左右两侧生长)
        const branches = getChildren("trunk").filter(n => n.type === "Field");
        const leftBranches = branches.slice(0, Math.ceil(branches.length / 2));
        const rightBranches = branches.slice(Math.ceil(branches.length / 2));
        
        // 左侧向左上分布，右侧向右上分布
        layoutAndDrawBranch(leftBranches, trunkCoords, Math.PI, 600, "main-left");
        layoutAndDrawBranch(rightBranches, trunkCoords, 0, 600, "main-right");
    }

    // 递归布局与绘制树枝
    // directionAngle: 基础生长方向 (0=右, PI/2=下, PI=左, -PI/2=上)
    // spreadRadius: 这一层分布的半径跨度
    function layoutAndDrawBranch(nodes, parentCoords, baseAngle, spreadRadius, layoutType) {
        if (!nodes || nodes.length === 0) return;

        const angleStep = Math.PI / (nodes.length + 1); // 扇形分布角度间隔
        
        nodes.forEach((node, index) => {
            // 计算当前节点的角度和坐标
            let angle;
            if (layoutType === "root") {
                // 根部在底部 90度 左右展开 (-PI/4 到 PI/4)
                angle = baseAngle - (Math.PI / 4) + (index + 1) * (Math.PI / 2 / (nodes.length + 1));
            } else if (layoutType === "main-left") {
                // 左侧在 135度 到 225度 展开
                angle = baseAngle - (Math.PI / 4) + (index + 1) * (Math.PI / 2 / (nodes.length + 1));
            } else if (layoutType === "main-right") {
                // 右侧在 -45度 到 45度 展开
                angle = baseAngle - (Math.PI / 4) + (index + 1) * (Math.PI / 2 / (nodes.length + 1));
            } else {
                // 次级枝条，顺着父节点的角度继续扇形展开
                angle = baseAngle - (Math.PI / 6) + (index + 1) * (Math.PI / 3 / (nodes.length + 1));
            }

            const r = layoutType.startsWith("main") ? spreadRadius : spreadRadius * 0.7;
            const x = parentCoords.x + r * Math.cos(angle);
            const y = parentCoords.y + r * Math.sin(angle);
            
            const coords = { x, y };

            // 绘制连线 (使用贝塞尔曲线模拟自然树枝)
            drawCurve(parentCoords, coords, node.type === "Historical Source");

            // 绘制节点
            drawNode(node, coords);

            // 如果节点已展开，递归绘制子节点
            if (expandedNodes.has(node.id)) {
                const children = getChildren(node.id);
                layoutAndDrawBranch(children, coords, angle, r, "sub");
            }
        });
    }

    // 绘制自然曲线连线
    function drawCurve(start, end, isRoot) {
        const path = document.createElementNS(svgNS, "path");
        // 控制点用于制造弯曲效果
        const cx1 = start.x + (end.x - start.x) / 2;
        const cy1 = start.y;
        const cx2 = start.x + (end.x - start.x) / 2;
        const cy2 = end.y;
        
        const d = `M ${start.x} ${start.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${end.x} ${end.y}`;
        path.setAttribute("d", d);
        path.setAttribute("class", `tree-link ${isRoot ? 'root-link' : ''}`);
        svg.appendChild(path);
    }

    // 绘制节点 (圆点 + 文字)
    function drawNode(node, coords) {
        const g = document.createElementNS(svgNS, "g");
        g.setAttribute("class", `tree-node ${node.type === "Field" ? "main-branch" : ""}`);
        g.setAttribute("transform", `translate(${coords.x}, ${coords.y})`);
        
        // 节点点击事件：展开/收起，并显示详情
        g.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleNode(node.id);
            showNodeDetails(node);
            updateBreadcrumb(node);
        });

        // 圆点
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("r", node.type === "Field" ? 12 : (node.type === "Historical Source" ? 10 : 8));
        circle.setAttribute("cx", 0);
        circle.setAttribute("cy", 0);
        
        // 文字标签
        const text = document.createElementNS(svgNS, "text");
        text.textContent = node.title_en;
        text.setAttribute("x", 15);
        text.setAttribute("y", 5);
        
        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
    }

    function toggleNode(nodeId) {
        if (expandedNodes.has(nodeId)) {
            // 收起当前节点及其所有子孙节点
            const collapseRecursive = (id) => {
                expandedNodes.delete(id);
                getChildren(id).forEach(child => collapseRecursive(child.id));
            };
            collapseRecursive(nodeId);
        } else {
            expandedNodes.add(nodeId);
        }
        renderTree();
    }

    // 初始化渲染一次
    renderTree();

    // ----------------------------------------------------------------------
    // 4. 学术详情面板控制
    // ----------------------------------------------------------------------
    const panel = document.getElementById("node-details-panel");
    const btnClosePanel = document.getElementById("btn-close-panel");

    btnClosePanel.addEventListener("click", closeDetailsPanel);

    function closeDetailsPanel() {
        panel.classList.remove("open");
    }

    function showNodeDetails(node) {
        document.getElementById("detail-type").textContent = node.type;
        document.getElementById("detail-title-en").textContent = node.title_en;
        document.getElementById("detail-title-zh").textContent = node.title_zh || "";
        document.getElementById("detail-description").textContent = node.description;

        // 哲学家
        const philSec = document.getElementById("section-philosophers");
        const philList = document.getElementById("detail-philosophers");
        philList.innerHTML = "";
        if (node.philosophers && node.philosophers.length > 0) {
            node.philosophers.forEach(p => {
                const li = document.createElement("li");
                li.textContent = p;
                philList.appendChild(li);
            });
            philSec.classList.remove("hidden");
        } else {
            philSec.classList.add("hidden");
        }

        // 关系网络 (点击可跳转)
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
                            // 将关系类型首字母大写并替换下划线
                            const relLabel = relType.replace(/_/g, ' ').replace(/ \w/g, l => l.toUpperCase());
                            li.innerHTML = `<em>${relLabel}:</em> <a href="#" data-target="${targetId}">${targetNode.title_en}</a>`;
                            relList.appendChild(li);
                        }
                    });
                }
            });
        }
        
        // 绑定跳转事件
        relList.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = a.getAttribute("data-target");
                // 自动展开目标节点的父级路径 (简单实现)
                if(data[targetId] && data[targetId].parent_id !== "trunk") {
                     expandedNodes.add(data[targetId].parent_id);
                     renderTree();
                }
                showNodeDetails(data[targetId]);
                updateBreadcrumb(data[targetId]);
            });
        });

        if (hasRelations) relSec.classList.remove("hidden");
        else relSec.classList.add("hidden");

        // 学术资源链接
        const resSec = document.getElementById("section-resources");
        const resList = document.getElementById("detail-resources");
        resList.innerHTML = "";
        if (node.links) {
            if (node.links.sep) resList.innerHTML += `<li><span class="tag-sep">SEP</span> <a href="${node.links.sep}" target="_blank">View Article</a></li>`;
            if (node.links.iep) resList.innerHTML += `<li><span class="tag-iep">IEP</span> <a href="${node.links.iep}" target="_blank">View Article</a></li>`;
            if (node.links.wiki) resList.innerHTML += `<li><span class="tag-wiki">WIKI</span> <a href="${node.links.wiki}" target="_blank">View Article</a></li>`;
            resSec.classList.remove("hidden");
        } else {
            resSec.classList.add("hidden");
        }

        // 展开面板
        panel.classList.add("open");
    }

    function updateBreadcrumb(node) {
        const path = [];
        let curr = node;
        while (curr && curr.id !== "trunk") {
            path.unshift(curr.title_en);
            curr = data[curr.parent_id];
        }
        path.unshift("Trunk");
        document.getElementById("current-path").textContent = `Path: ${path.join(" → ")}`;
    }

    // ----------------------------------------------------------------------
    // 5. 树干嵌入式 Search 引擎
    // ----------------------------------------------------------------------
    const searchInput = document.getElementById("tree-search-input");
    const clearBtn = document.getElementById("btn-clear-search");
    const resultsPanel = document.getElementById("search-results-panel");
    const localList = document.getElementById("local-results-list");
    const externalLinks = document.getElementById("external-search-links");

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) {
            clearBtn.classList.remove("hidden");
            performSearch(query);
        } else {
            clearBtn.classList.add("hidden");
            hideSearchResults();
        }
    });

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearBtn.classList.add("hidden");
        hideSearchResults();
        searchInput.focus();
    });

    function hideSearchResults() {
        resultsPanel.classList.add("hidden");
        localList.innerHTML = "";
    }

    function performSearch(query) {
        localList.innerHTML = "";
        
        // 1. 本地知识库匹配
        const matches = Object.values(data).filter(node => {
            if (node.id === "trunk") return false;
            const searchStr = `${node.title_en} ${node.title_zh || ''} ${node.philosophers ? node.philosophers.join(" ") : ''}`.toLowerCase();
            return searchStr.includes(query);
        });

        if (matches.length > 0) {
            matches.slice(0, 5).forEach(node => { // 最多显示5个本地结果
                const li = document.createElement("li");
                li.innerHTML = `<strong>${node.title_en}</strong> ${node.title_zh ? `(${node.title_zh})` : ''} <br><small style="color:#888">${node.type}</small>`;
                li.addEventListener("click", () => {
                    // 展开路径并显示
                    if(node.parent_id !== "trunk") expandedNodes.add(node.parent_id);
                    renderTree();
                    showNodeDetails(node);
                    updateBreadcrumb(node);
                    hideSearchResults();
                    searchInput.value = node.title_en; // 填充搜索框
                });
                localList.appendChild(li);
            });
        } else {
            const li = document.createElement("li");
            li.textContent = "No local nodes found.";
            li.style.color = "#999";
            li.style.cursor = "default";
            localList.appendChild(li);
        }

        // 2. 外部检索链接动态生成
        document.getElementById("link-sep").href = `https://plato.stanford.edu/search/searcher.py?query=${encodeURIComponent(query)}`;
        document.getElementById("link-iep").href = `https://www.google.com/search?q=site%3Aiep.utm.edu+${encodeURIComponent(query)}`;
        document.getElementById("link-wiki").href = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
        
        externalLinks.classList.remove("hidden");
        resultsPanel.classList.remove("hidden");
    }

    // 点击其他地方关闭搜索结果
    document.addEventListener("click", (e) => {
        if (!e.target.closest('.trunk-search-box')) {
            hideSearchResults();
        }
    });
});