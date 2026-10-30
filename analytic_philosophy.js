// ==========================================================================
// D3.js Bottom-Up Tree Engine for Analytic Philosophy
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. D3.js 画布与缩放初始化 ---
    const width = document.getElementById("tree-canvas-container").clientWidth;
    const height = document.getElementById("tree-canvas-container").clientHeight;
    
    const svg = d3.select("#philosophy-tree-svg")
        .attr("width", "100%")
        .attr("height", "100%");
        
    const gMain = svg.append("g");
    
    // D3 缩放引擎
    const zoom = d3.zoom()
        .scaleExtent([0.1, 3])
        .on("zoom", (event) => { gMain.attr("transform", event.transform); });
    
    svg.call(zoom);
    
    // 创建专属图层，确保层级正确：虚线在最下，实线在中，节点在最上
    const gCrossLinks = gMain.append("g").attr("class", "cross-links-layer");
    const gLinks = gMain.append("g").attr("class", "links-layer");
    const gNodes = gMain.append("g").attr("class", "nodes-layer");

    // --- 2. D3 数据层次结构与布局算法 ---
    const root = d3.hierarchy(philosophyTreeData);
    
    // 关键：d3.tree() 防止重叠。
    // nodeSize([x间距, y间距])，x是水平节点距离，y是垂直层级距离。
    const treeLayout = d3.tree().nodeSize([160, 200]); 
    
    // 根节点初始坐标设定在画面中下方
    root.x0 = 0;
    root.y0 = height / 2;

    // 默认折叠第三层以下的节点以保持界面清爽
    root.descendants().forEach(d => {
        if (d.depth > 2) {
            d._children = d.children;
            d.children = null;
        }
    });

    let i = 0; // 动画 ID 计数器

    // --- 3. 核心更新与绘制逻辑 ---
    function update(source) {
        const duration = 500;
        
        // 执行 D3 树形算法计算坐标
        const treeData = treeLayout(root);
        const nodes = treeData.descendants();
        const links = treeData.links();

        // 【最关键一步：将其变为自底向上的树】
        // 标准 D3 tree 是从 y=0 向下生长。我们将 y 取反，即可实现向上生长。
        nodes.forEach(d => { d.y = -d.y; });

        // =========== 绘制节点 ===========
        const node = gNodes.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++i));

        const nodeEnter = node.enter().append("g")
            .attr("class", d => `node ${d.data.type}`)
            .attr("transform", d => `translate(${source.x0},${source.y0})`) // 动画起点
            .style("opacity", 0)
            .on("click", (event, d) => {
                event.stopPropagation();
                toggleNode(d);
            });

        nodeEnter.append("circle")
            .attr("r", d => getRadius(d));

        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children || d._children ? -15 : 15) // 有子节点文字在左，无则在右
            .attr("text-anchor", d => d.children || d._children ? "end" : "start")
            .text(d => d.data.title_en);

        const nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition().duration(duration)
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .style("opacity", 1);

        const nodeExit = node.exit().transition().duration(duration)
            .attr("transform", d => `translate(${source.x},${source.y})`)
            .style("opacity", 0)
            .remove();

        // =========== 绘制主要树枝连线 (Parent-Child) ===========
        const link = gLinks.selectAll("path.link")
            .data(links, d => d.target.id);

        // 使用 D3 的垂直贝塞尔曲线生成器
        const linkGenerator = d3.linkVertical()
            .x(d => d.x)
            .y(d => d.y);

        const linkEnter = link.enter().insert("path", "g")
            .attr("class", d => `link ${d.target.data.type === 'Trunk' ? 'trunk' : ''}`)
            .attr("stroke-width", d => getLinkThickness(d.target))
            .attr("d", d => {
                const o = {x: source.x0, y: source.y0};
                return linkGenerator({source: o, target: o});
            });

        const linkUpdate = linkEnter.merge(link);
        linkUpdate.transition().duration(duration)
            .attr("d", linkGenerator);

        link.exit().transition().duration(duration)
            .attr("d", d => {
                const o = {x: source.x, y: source.y};
                return linkGenerator({source: o, target: o});
            })
            .remove();

        // 存储旧坐标供下次动画使用
        nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });

        // 动画完成后绘制跨领域虚线
        setTimeout(drawCrossLinks, duration + 50);
    }

    // 树枝粗细动态映射
    function getLinkThickness(nodeData) {
        if (nodeData.data.type === "Trunk") return 14;
        if (nodeData.data.type === "Field") return 8;
        if (nodeData.data.type === "Subfield") return 4;
        return 2; // 叶片最细
    }
    
    // 节点圆点大小动态映射
    function getRadius(nodeData) {
        if (nodeData.data.type === "Trunk") return 10;
        if (nodeData.data.type === "Field") return 8;
        return 6;
    }

    // 切换折叠状态
    function toggleNode(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
        showNodeDetails(d.data); // 同步更新详情面板
        updateBreadcrumb(d);
    }

    // =========== 绘制跨领域交叉虚线 (Cross-References) ===========
    function drawCrossLinks() {
        gCrossLinks.selectAll("*").remove(); // 每次重绘清除旧线
        
        // 收集当前可见节点在画布上的实际引用
        const visibleNodes = new Map();
        root.descendants().forEach(d => { visibleNodes.set(d.data.id, d); });

        crossLinksData.forEach(linkInfo => {
            const source = visibleNodes.get(linkInfo.source);
            const target = visibleNodes.get(linkInfo.target);
            
            // 只有当两个存在关联的节点同时展开并在屏幕上时，才绘制虚线
            if (source && target) {
                // 使用二次贝塞尔曲线 (Q) 让虚线微微向上拱起，区别于主干树枝
                const cx = (source.x + target.x) / 2;
                const cy = Math.min(source.y, target.y) - 100;
                
                gCrossLinks.append("path")
                    .attr("class", "cross-link")
                    .attr("d", `M ${source.x} ${source.y} Q ${cx} ${cy} ${target.x} ${target.y}`);
            }
        });
    }

    // --- 4. 视角初始化与居中 ---
    // 将整个树下移，露出由下至上的生长轨迹
    const initialTransform = d3.zoomIdentity.translate(width / 2, height - 150).scale(0.8);
    svg.call(zoom.transform, initialTransform);
    update(root);

    // --- 5. 交互控件绑定 (保留原有功能) ---
    document.getElementById("btn-zoom-in").addEventListener("click", () => {
        svg.transition().duration(300).call(zoom.scaleBy, 1.2);
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

    // --- 面板与面包屑更新 ---
    const panel = document.getElementById("node-details-panel");
    document.getElementById("btn-close-panel").addEventListener("click", closeDetailsPanel);
    function closeDetailsPanel() { panel.classList.remove("open"); }

    function showNodeDetails(data) {
        document.getElementById("detail-type").textContent = data.type;
        document.getElementById("detail-title-en").textContent = data.title_en;
        document.getElementById("detail-title-zh").textContent = data.title_zh || "";
        document.getElementById("detail-description").textContent = data.description || "No description provided.";
        
        // Philosophers
        const philSec = document.getElementById("section-philosophers");
        const philList = document.getElementById("detail-philosophers");
        philList.innerHTML = "";
        if (data.philosophers && data.philosophers.length > 0) {
            data.philosophers.forEach(p => { const li = document.createElement("li"); li.textContent = p; philList.appendChild(li); });
            philSec.classList.remove("hidden");
        } else philSec.classList.add("hidden");

        // External Links
        const resSec = document.getElementById("section-resources");
        const resList = document.getElementById("detail-resources");
        resList.innerHTML = "";
        if (data.links && data.links.sep) {
            resList.innerHTML += `<li><span class="tag-sep">SEP</span> <a href="${data.links.sep}" target="_blank">View Article</a></li>`;
            resSec.classList.remove("hidden");
        } else resSec.classList.add("hidden");

        panel.classList.add("open");
    }

    function updateBreadcrumb(d) {
        const path = [];
        let curr = d;
        while (curr) { path.unshift(curr.data.title_en); curr = curr.parent; }
        document.getElementById("current-path").textContent = `Path: ${path.join(" → ")}`;
    }

    // --- 搜索功能适配扁平化检索 ---
    // 由于数据现在是树状嵌套的，我们需要一个平铺的数组来供搜索使用
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
            const searchStr = `${data.title_en} ${data.title_zh || ''} ${data.philosophers ? data.philosophers.join(" ") : ''}`.toLowerCase();
            return searchStr.includes(query);
        });

        if (matches.length > 0) {
            matches.slice(0, 5).forEach(d => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${d.data.title_en}</strong> ${d.data.title_zh ? `(${d.data.title_zh})` : ''} <br><small style="color:#888">${d.data.type}</small>`;
                li.addEventListener("click", () => {
                    // 自动展开目标节点的所有父级
                    let curr = d;
                    while(curr.parent) {
                        if(curr.parent._children) {
                            curr.parent.children = curr.parent._children;
                            curr.parent._children = null;
                        }
                        curr = curr.parent;
                    }
                    update(root);
                    
                    // 动画平滑定位到搜索结果
                    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity.translate(width / 2 - d.x, height / 2 - d.y).scale(1.2));
                    
                    showNodeDetails(d.data);
                    updateBreadcrumb(d);
                    hideSearchResults();
                    searchInput.value = d.data.title_en;
                });
                localList.appendChild(li);
            });
        }
        
        document.getElementById("link-sep").href = `https://plato.stanford.edu/search/searcher.py?query=${encodeURIComponent(query)}`;
        document.getElementById("link-iep").href = `https://www.google.com/search?q=site%3Aiep.utm.edu+${encodeURIComponent(query)}`;
        document.getElementById("link-wiki").href = `https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`;
        document.getElementById("external-search-links").classList.remove("hidden"); 
        resultsPanel.classList.remove("hidden");
    }
});