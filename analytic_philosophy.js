/* 分析哲学知识树 —— 布局 / 交互 / 搜索
 * 依赖 window.PHIL_DATA（analytic_philosophy_data.js）
 */
(function () {
  "use strict";

  var D = window.PHIL_DATA;
  var NS = "http://www.w3.org/2000/svg";

  var VW = 1600, VH = 1000, CX = 800;
  var GROUND = 900;
  var TRUNK_TOP = 470;
  var ATTACH_L = [740, 665, 590, 515];
  var ATTACH_R = [705, 630, 555, 480];
  var LEAF_W = 128, LEAF_H = 38, CELL_W = 144, CELL_H = 46, COLS = 3;

  var kwById = {}, kwList = [], clusterOf = {}, branchOf = {};
  var state = { branch: null, kw: null, view: "tree" };
  var viewT = { x: 0, y: 0, k: 1 };
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, attrs, parent) {
    var n = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function h(tag, cls, parent) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (parent) parent.appendChild(n);
    return n;
  }
  function $(id) { return document.getElementById(id); }
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function hash(str) { var x = 0, i; for (i = 0; i < str.length; i++) x = (x * 31 + str.charCodeAt(i)) | 0; return Math.abs(x); }

  /* ---------- 曲线工具 ---------- */
  function cubic(p0, p1, p2, p3, t) {
    var u = 1 - t, a = u * u * u, b = 3 * u * u * t, c = 3 * u * t * t, d = t * t * t;
    return {
      x: a * p0.x + b * p1.x + c * p2.x + d * p3.x,
      y: a * p0.y + b * p1.y + c * p2.y + d * p3.y
    };
  }

  /* ---------- 几何：主干 / 主枝 ---------- */
  var TRUNK = { p0: { x: 800, y: 905 }, p1: { x: 786, y: 760 }, p2: { x: 814, y: 600 }, p3: { x: 800, y: TRUNK_TOP } };

  function trunkWidth(t) { return 96 + (44 - 96) * t; }

  function polygonPath(points) {
    var d = "M" + points[0].x.toFixed(1) + "," + points[0].y.toFixed(1);
    for (var i = 1; i < points.length; i++) d += "L" + points[i].x.toFixed(1) + "," + points[i].y.toFixed(1);
    return d + "Z";
  }

  function taperedPolygon(fn, widthFn, steps) {
    var left = [], right = [], i, t, a, b, dx, dy, len, nx, ny, w;
    for (i = 0; i <= steps; i++) {
      t = i / steps;
      a = fn(Math.max(0, t - 0.01));
      b = fn(Math.min(1, t + 0.01));
      dx = b.x - a.x; dy = b.y - a.y;
      len = Math.sqrt(dx * dx + dy * dy) || 1;
      nx = -dy / len; ny = dx / len;
      w = widthFn(t) / 2;
      var p = fn(t);
      left.push({ x: p.x + nx * w, y: p.y + ny * w });
      right.push({ x: p.x - nx * w, y: p.y - ny * w });
    }
    return polygonPath(left.concat(right.reverse()));
  }

  function branchGeom(br) {
    var idx = (br.order || 1) - 1;
    var s = br.side === "left" ? -1 : 1;
    var ay = (br.side === "left" ? ATTACH_L : ATTACH_R)[idx] || 700;
    var L = 350 + 12 * idx;
    var D = 150 + 10 * idx;
    var p0 = { x: 800, y: ay };
    var p1 = { x: 800 + s * 0.12 * L, y: ay - 0.35 * D };
    var p2 = { x: 800 + s * 0.62 * L, y: ay - 0.92 * D };
    var p3 = { x: 800 + s * L, y: ay - D };
    return {
      s: s, ay: ay, L: L, D: D, p0: p0,
      at: function (t) { return cubic(p0, p1, p2, p3, t); },
      tip: p3
    };
  }

  /* ---------- 建树 ---------- */
  function buildStatic() {
    var gArc = $("apArcs"), gCan = $("apCanopy"), gRoot = $("apRoots"),
        gTr = $("apTrunk"), gBr = $("apBranches"), gTw = $("apTwigs"), gTag = $("apTags");

    // 地面
    el("path", {
      d: "M0,1000 L0,912 Q380,874 800,880 Q1220,874 1600,912 L1600,1000 Z",
      fill: "#DCCBAE"
    }, $("apGround"));

    var grass = [[180, 906], [255, 912], [520, 900], [1105, 901], [1290, 910], [1420, 905], [690, 897], [960, 899]];
    grass.forEach(function (p, i) {
      el("path", {
        d: "M" + p[0] + "," + p[1] + " q" + (i % 2 ? 8 : -8) + ",-22 " + (i % 2 ? 14 : -14) + ",-30",
        stroke: "#9C8A6B", "stroke-width": 1.6, fill: "none", "stroke-linecap": "round"
      }, gRoot);
    });
    [[300, 896], [1240, 894], [560, 902]].forEach(function (p) {
      el("ellipse", { cx: p[0], cy: p[1], rx: 16, ry: 7, fill: "#C9B79A" }, gRoot);
    });

    // 根系
    var roots = [
      ["M800,900 C790,930 754,946 716,968", 13],
      ["M800,900 C808,934 842,952 884,972", 12],
      ["M800,902 C780,940 736,962 700,996", 7],
      ["M800,902 C820,942 866,964 900,998", 7],
      ["M792,898 C760,920 726,928 690,940", 5],
      ["M808,898 C842,920 878,928 912,942", 5]
    ];
    roots.forEach(function (r) {
      el("path", { d: r[0], stroke: "#4A3524", "stroke-width": r[1], fill: "none", "stroke-linecap": "round" }, gRoot);
    });

    // 主干
    var trunkPath = taperedPolygon(function (t) { return cubic(TRUNK.p0, TRUNK.p1, TRUNK.p2, TRUNK.p3, t); }, trunkWidth, 40);
    el("path", { d: trunkPath, fill: "#6B4F32" }, gTr);
    el("path", { d: trunkPath, fill: "none", stroke: "#463322", "stroke-width": 2 }, gTr);
    // 左侧高光
    var hl = [];
    for (var i = 0; i <= 20; i++) {
      var t = i / 20, p = cubic(TRUNK.p0, TRUNK.p1, TRUNK.p2, TRUNK.p3, t);
      hl.push({ x: p.x - trunkWidth(t) * 0.26, y: p.y });
    }
    el("path", {
      d: "M" + hl.map(function (q) { return q.x.toFixed(1) + "," + q.y.toFixed(1); }).join("L"),
      stroke: "#8A6B45", "stroke-width": 6, fill: "none", opacity: 0.45, "stroke-linecap": "round"
    }, gTr);

    // 主枝 + 次枝 + 叶簇 + 吊牌
    D.branches.forEach(function (br) {
      var g = branchGeom(br);
      var d = taperedPolygon(g.at, function (t) { return 26 + (6 - 26) * t; }, 26);
      var path = el("path", { d: d, fill: "#7A5A3A", stroke: "#4A3524", "stroke-width": 1 }, gBr);
      path.setAttribute("data-branch", br.id);

      // 次枝
      [0.58, 0.72, 0.86].forEach(function (tt, k) {
        var p = g.at(tt), q = g.at(Math.min(1, tt + 0.02));
        var ang = Math.atan2(q.y - p.y, q.x - p.x) + (k % 2 ? 0.62 : -0.55);
        var len = 66 + k * 16 + ((br.order || 1) % 3) * 6;
        var ex = p.x + Math.cos(ang) * len, ey = p.y + Math.sin(ang) * len;
        el("path", {
          d: "M" + p.x.toFixed(1) + "," + p.y.toFixed(1) + " Q" +
             ((p.x + ex) / 2 + g.s * 8).toFixed(1) + "," + ((p.y + ey) / 2 - 6).toFixed(1) + " " +
             ex.toFixed(1) + "," + ey.toFixed(1),
          stroke: "#7A5A3A", "stroke-width": 2.4, fill: "none", "stroke-linecap": "round", opacity: 0.9
        }, gTw);
        el("ellipse", {
          cx: ex.toFixed(1), cy: (ey - 6).toFixed(1), rx: 46 + k * 8, ry: 26 + k * 4,
          fill: k % 2 ? "#A8B98C" : "#8FA57A", opacity: 0.4
        }, gCan);
      });

      // 树冠
      el("ellipse", {
        cx: (g.tip.x - g.s * 26).toFixed(1), cy: (g.tip.y + 4).toFixed(1),
        rx: 78, ry: 44, fill: "#8FA57A", opacity: 0.42,
        transform: "rotate(" + (g.s * -12) + " " + g.tip.x.toFixed(1) + " " + g.tip.y.toFixed(1) + ")"
      }, gCan);

      // 吊牌
      var tp = g.at(0.52);
      var rot = (hash(br.id) % 5) - 2;
      var tg = el("g", {
        "class": "ap-tag", "data-branch": br.id, tabindex: "0", role: "button",
        "aria-label": br.zh + "，" + br.clusters.length + " 个子领域，回车展开"
      }, gTag);
      el("line", {
        x1: tp.x.toFixed(1), y1: tp.y.toFixed(1), x2: tp.x.toFixed(1), y2: (tp.y + 12).toFixed(1),
        stroke: "#8A6B45", "stroke-width": 1.5
      }, tg);
      el("circle", { cx: tp.x.toFixed(1), cy: (tp.y + 12).toFixed(1), r: 3, fill: "#8A6B45" }, tg);
      var cx0 = tp.x, cy0 = tp.y + 12 + 26;
      var bg = el("g", { transform: "rotate(" + rot + " " + cx0.toFixed(1) + " " + cy0.toFixed(1) + ")" }, tg);
      el("rect", {
        x: (cx0 - 84).toFixed(1), y: (cy0 - 26).toFixed(1), width: 168, height: 52, rx: 3,
        fill: "#FBF3DF", stroke: "#C2A87E", "stroke-width": 1.5
      }, bg);
      el("rect", {
        x: (cx0 - 84 + 2).toFixed(1), y: (cy0 - 26 + 2).toFixed(1), width: 164, height: 48, rx: 2,
        fill: "none", stroke: br.color, "stroke-width": 0.8, opacity: 0.55
      }, bg);
      var t1 = el("text", {
        x: cx0.toFixed(1), y: (cy0 - 3).toFixed(1), "text-anchor": "middle",
        "font-size": 16, fill: "#33291F"
      }, bg); t1.textContent = br.zh;
      var t2 = el("text", {
        x: cx0.toFixed(1), y: (cy0 + 15).toFixed(1), "text-anchor": "middle",
        "font-size": 9.5, "letter-spacing": "1", fill: "#7A6A55"
      }, bg); t2.textContent = br.en.toUpperCase();

      tg.addEventListener("click", function (e) { e.stopPropagation(); activate(br.id); });
      tg.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); activate(br.id); }
      });
    });

    drawCrossArcs();
  }

  /* ---------- 跨枝虚线 ---------- */
  function drawCrossArcs() {
    var g = $("apArcs");
    while (g.firstChild) g.removeChild(g.firstChild);
    var pair = {};
    D.crossLinks.forEach(function (l) {
      var a = kwById[l.from], b = kwById[l.to];
      if (!a || !b) return;
      var key = a.branch.id < b.branch.id ? a.branch.id + "|" + b.branch.id : b.branch.id + "|" + a.branch.id;
      pair[key] = (pair[key] || 0) + 1;
    });
    Object.keys(pair).forEach(function (key) {
      var ids = key.split("|");
      var b1 = D.branches.filter(function (x) { return x.id === ids[0]; })[0];
      var b2 = D.branches.filter(function (x) { return x.id === ids[1]; })[0];
      if (!b1 || !b2) return;
      var g1 = branchGeom(b1), g2 = branchGeom(b2);
      var p1 = g1.tip, p2 = g2.tip;
      var mx = (p1.x + p2.x) / 2, my = Math.min(p1.y, p2.y) - 90 - pair[key] * 8;
      var path = el("path", {
        d: "M" + p1.x.toFixed(1) + "," + p1.y.toFixed(1) + " Q" + mx.toFixed(1) + "," + my.toFixed(1) + " " + p2.x.toFixed(1) + "," + p2.y.toFixed(1),
        stroke: "#8A6B45", "stroke-width": 1, fill: "none", "stroke-dasharray": "4 5", opacity: 0.25,
        "class": "ap-cross"
      }, g);
      path.setAttribute("data-pair", key);
    });
  }

  /* ---------- 展开 / 收起 ---------- */
  function clearLeaves() {
    var g = $("apLeaves");
    while (g.firstChild) g.removeChild(g.firstChild);
  }

  function expand(branchId) {
    clearLeaves();
    var g = $("apLeaves");
    var br = D.branches.filter(function (x) { return x.id === branchId; })[0];
    if (!br) return;
    var geo = branchGeom(br);
    var items = [];
    br.clusters.forEach(function (c) {
      c.keywords.forEach(function (k) { items.push({ kw: k, cluster: c }); });
    });
    var rows = Math.ceil(items.length / COLS);
    var blockW = COLS * CELL_W, blockH = rows * CELL_H;
    var x0 = geo.s < 0 ? geo.tip.x - blockW - 24 : geo.tip.x + 24;
    x0 = geo.s < 0 ? Math.max(18, x0) : Math.min(VW - blockW - 18, x0);
    var y0 = clamp(geo.tip.y - blockH / 2, 150, VH - blockH - 120);

    // 支架：主枝末端 → 网格内缘中心
    var innerX = geo.s < 0 ? x0 + blockW : x0;
    el("path", {
      d: "M" + geo.tip.x.toFixed(1) + "," + geo.tip.y.toFixed(1) +
         " Q" + (geo.tip.x + geo.s * 14).toFixed(1) + "," + (y0 + blockH / 2).toFixed(1) +
         " " + innerX.toFixed(1) + "," + (y0 + blockH / 2).toFixed(1),
      stroke: "#7A5A3A", "stroke-width": 2, fill: "none", opacity: 0.7
    }, g);
    el("line", {
      x1: innerX.toFixed(1), y1: y0.toFixed(1), x2: innerX.toFixed(1), y2: (y0 + blockH).toFixed(1),
      stroke: "#7A5A3A", "stroke-width": 1.4, opacity: 0.55
    }, g);

    items.forEach(function (it, i) {
      var col = i % COLS, row = Math.floor(i / COLS);
      var x = x0 + col * CELL_W, y = y0 + row * CELL_H + 4;
      var edge = geo.s < 0 ? x + LEAF_W : x;
      el("line", {
        x1: innerX.toFixed(1), y1: (y + LEAF_H / 2).toFixed(1),
        x2: edge.toFixed(1), y2: (y + LEAF_H / 2).toFixed(1),
        stroke: br.color, "stroke-width": 1, opacity: 0.5
      }, g);

      var lg = el("g", {
        "class": "ap-leaf", "data-kw": it.kw.id, tabindex: "0", role: "button",
        "aria-label": it.kw.zh + "，" + it.kw.en + "，回车查看",
        transform: "translate(" + x.toFixed(1) + "," + y.toFixed(1) + ")"
      }, g);
      el("rect", {
        width: LEAF_W, height: LEAF_H, rx: 3, fill: "#FBF3DF",
        stroke: br.color, "stroke-width": 1.1, opacity: 0.97
      }, lg);
      var zh = el("text", { x: 10, y: 17, "font-size": 12.5, fill: "#33291F" }, lg);
      zh.textContent = it.kw.zh;
      var en = el("text", { x: 10, y: 30, "font-size": 8.5, fill: "#7A6A55" }, lg);
      en.textContent = it.kw.en.length > 26 ? it.kw.en.slice(0, 25) + "…" : it.kw.en;
      if (it.kw.tier === 1) el("circle", { cx: LEAF_W - 8, cy: 8, r: 2.4, fill: br.color }, lg);

      lg.addEventListener("click", function (e) { e.stopPropagation(); openKw(it.kw.id, true); });
      lg.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openKw(it.kw.id, true); }
      });
    });

    if (!reduced) {
      var nodes = g.querySelectorAll(".ap-leaf");
      for (var i = 0; i < nodes.length; i++) {
        nodes[i].style.opacity = "0";
        nodes[i].style.transition = "opacity .28s ease " + (i * 22) + "ms";
        (function (n) { requestAnimationFrame(function () { n.style.opacity = "1"; }); })(nodes[i]);
      }
    }
  }

  /* ---------- 镜头 ---------- */
  function focusOn(branchId) {
    var br = D.branches.filter(function (x) { return x.id === branchId; })[0];
    if (!br) return;
    var geo = branchGeom(br);
    var bb = { x1: Math.min(geo.p0.x, geo.tip.x), x2: Math.max(geo.p0.x, geo.tip.x), y1: geo.tip.y - 60, y2: geo.p0.y + 20 };
    var n = br.clusters.reduce(function (a, c) { return a + c.keywords.length; }, 0);
    var rows = Math.ceil(n / COLS);
    var blockH = rows * CELL_H, blockW = COLS * CELL_W;
    var spanW = Math.max(bb.x2 - bb.x1, blockW) + 140;
    var spanH = Math.max(bb.y2 - bb.y1, blockH) + 120;
    var s = clamp(Math.min((VW * 0.55) / spanW, (VH * 0.55) / spanH), 0.85, 1.6);
    var cx = (geo.p0.x + geo.tip.x) / 2 + (geo.s < 0 ? -blockW * 0.18 : blockW * 0.18);
    var cy = (geo.p0.y + geo.tip.y) / 2;
    $("apWorld").setAttribute("transform",
      "translate(" + (CX) + "," + (VH / 2) + ") scale(" + s.toFixed(3) + ") translate(" + (-cx).toFixed(1) + "," + (-cy).toFixed(1) + ")");
    setDim(branchId);
  }
  function resetFocus() {
    $("apWorld").setAttribute("transform", "");
    setDim(null);
  }
  function setDim(branchId) {
    var g = $("apBranches").childNodes, i, n;
    for (i = 0; i < g.length; i++) {
      n = g[i];
      if (n.getAttribute && n.getAttribute("data-branch")) {
        n.style.opacity = !branchId || n.getAttribute("data-branch") === branchId ? "1" : "0.35";
      }
    }
    var tags = $("apTags").querySelectorAll(".ap-tag");
    for (i = 0; i < tags.length; i++) {
      var b = tags[i].getAttribute("data-branch");
      tags[i].style.opacity = !branchId || b === branchId ? "1" : "0.35";
    }
  }

  /* ---------- 激活 ---------- */
  function activate(branchId) {
    if (state.branch === branchId) { collapse(); return; }
    state.branch = branchId;
    expand(branchId);
    focusOn(branchId);
    syncHash();
  }
  function collapse() {
    state.branch = null;
    clearLeaves();
    resetFocus();
    closeDrawer();
    syncHash();
  }

  /* ---------- 抽屉 ---------- */
  function openKw(id, fromLeaf) {
    var k = kwById[id];
    if (!k) return;
    state.kw = id;
    var d = $("apDrawer");
    $("apType").textContent = k.type;
    $("apType").style.borderColor = k.branch.color;
    $("apZh").textContent = k.zh;
    $("apEn").textContent = k.en;
    $("apGloss").textContent = k.gloss;
    var btn = $("apSep");
    btn.textContent = k.sep.verified ? "在 SEP 阅读全文" : "在 SEP 检索";
    btn.href = k.sep.url;
    var alt = $("apSepAlt");
    alt.href = "https://plato.stanford.edu/search/searcher.py?query=" + encodeURIComponent(k.en);
    alt.textContent = "打不开？用 SEP 检索「" + k.en + "」";
    var wiki = $("apWiki");
    if (k.wiki) { wiki.style.display = ""; wiki.href = k.wiki; } else { wiki.style.display = "none"; }
    $("apCrumb").textContent = k.branch.zh + " / " + k.cluster.zh;
    $("apSrc").textContent = "SEP · Stanford Encyclopedia of Philosophy";
    var rel = $("apRelated");
    while (rel.firstChild) rel.removeChild(rel.firstChild);
    k.related.forEach(function (rid) {
      var rk = kwById[rid];
      if (!rk) return;
      var b = h("button", "ap-chip", rel);
      b.type = "button";
      b.textContent = rk.zh;
      b.title = rk.en;
      b.addEventListener("click", function () { gotoKw(rid); });
    });
    var star = $("apStar");
    star.classList.toggle("is-on", isStarred(id));
    star.setAttribute("aria-pressed", isStarred(id) ? "true" : "false");
    d.classList.add("is-open");
    if (fromLeaf) syncHash();
  }
  function closeDrawer() {
    state.kw = null;
    $("apDrawer").classList.remove("is-open");
  }
  function gotoKw(id) {
    var k = kwById[id];
    if (!k) return;
    if (state.branch !== k.branch.id) { activate(k.branch.id); }
    openKw(id, false);
    var leaf = document.querySelector('.ap-leaf[data-kw="' + id + '"]');
    if (leaf) {
      leaf.classList.add("is-flash");
      setTimeout(function () { leaf.classList.remove("is-flash"); }, 900);
    }
  }
  function isStarred(id) {
    try { return (JSON.parse(localStorage.getItem("ap-stars") || "[]")).indexOf(id) >= 0; }
    catch (e) { return false; }
  }
  function toggleStar() {
    if (!state.kw) return;
    var list;
    try { list = JSON.parse(localStorage.getItem("ap-stars") || "[]"); } catch (e) { list = []; }
    var i = list.indexOf(state.kw);
    if (i >= 0) list.splice(i, 1); else list.push(state.kw);
    try { localStorage.setItem("ap-stars", JSON.stringify(list)); } catch (e) {}
    $("apStar").classList.toggle("is-on", isStarred(state.kw));
    $("apStar").setAttribute("aria-pressed", isStarred(state.kw) ? "true" : "false");
  }

  /* ---------- 搜索 ---------- */
  function buildIndex() {
    D.branches.forEach(function (br) {
      br.clusters.forEach(function (c) {
        c.keywords.forEach(function (k) {
          kwById[k.id] = k;
          k.branch = br; k.cluster = c;
          kwList.push(k);
        });
      });
    });
  }

  function score(k, q) {
    var ql = q.toLowerCase();
    if (k.zh === q) return 100;
    if (k.en.toLowerCase() === ql) return 100;
    if (k.zh.indexOf(q) === 0) return 80;
    if (k.en.toLowerCase().indexOf(ql) === 0) return 78;
    if (k.py && k.py === ql) return 76;
    if (k.py && k.py.indexOf(ql) === 0) return 70;
    if (k.zh.indexOf(q) > 0) return 60;
    if (k.en.toLowerCase().indexOf(ql) > 0) return 58;
    if (k.gloss && k.gloss.indexOf(q) >= 0) return 40;
    return 0;
  }

  function doSearch(q) {
    if (!q) return [];
    return kwList
      .map(function (k) { return { k: k, s: score(k, q) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s || a.k.zh.localeCompare(b.k.zh); })
      .slice(0, 8)
      .map(function (x) { return x.k; });
  }

  function renderResults(q) {
    var box = $("apResults");
    while (box.firstChild) box.removeChild(box.firstChild);
    if (!q) { box.classList.remove("is-on"); return; }
    var list = doSearch(q);
    var groupA = h("div", "ap-rgroup", box);
    h("div", "ap-rlabel", groupA).textContent = "本页词条";
    if (!list.length) {
      h("div", "ap-rempty", groupA).textContent = "没有直接匹配，试试英文或下方站外检索";
    }
    list.forEach(function (k, i) {
      var item = h("button", "ap-ritem" + (i === 0 ? " is-first" : ""), groupA);
      item.type = "button";
      h("span", "ap-rzh", item).textContent = k.zh;
      h("span", "ap-ren", item).textContent = k.en;
      h("span", "ap-rbr", item).textContent = k.branch.zh;
      item.addEventListener("mousedown", function (e) { e.preventDefault(); });
      item.addEventListener("click", function () {
        box.classList.remove("is-on");
        $("apInput").value = k.zh;
        gotoKw(k.id);
      });
      item.dataset.kw = k.id;
    });

    var groupB = h("div", "ap-rgroup", box);
    h("div", "ap-rlabel", groupB).textContent = "站外检索";
    var qq = encodeURIComponent(q);
    addExtLink(groupB, "在 SEP 检索 " + q, "https://plato.stanford.edu/search/searcher.py?query=" + qq);
    addExtLink(groupB, "中文维基：搜索 " + q, "https://zh.wikipedia.org/w/index.php?search=" + qq);
    addExtLink(groupB, "Google：site:plato.stanford.edu " + q, "https://www.google.com/search?q=" + encodeURIComponent("site:plato.stanford.edu " + q));
    box.classList.add("is-on");
    positionResults();
  }

  function addExtLink(parent, label, href) {
    var a = h("a", "ap-ritem ap-ext", parent);
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    h("span", "ap-rzh", a).textContent = label;
    h("span", "ap-rarrow", a).textContent = "↗";
  }

  function positionResults() {
    var box = $("apResults"), inp = $("apInput");
    if (!inp) return;
    var r = inp.getBoundingClientRect();
    box.style.left = Math.max(12, r.left) + "px";
    box.style.top = (r.bottom + 8) + "px";
    box.style.width = Math.max(340, r.width + 120) + "px";
  }

  /* ---------- 视图切换 ---------- */
  function setView(v) {
    state.view = v;
    var tree = $("apTree"), net = $("apGraph");
    tree.style.display = v === "tree" ? "" : "none";
    net.style.display = v === "net" ? "" : "none";
    $("apBtnTree").classList.toggle("is-on", v === "tree");
    $("apBtnNet").classList.toggle("is-on", v === "net");
    if (v === "net") {
      $("apWorld").setAttribute("transform", "");
      buildGraph();
    } else if (state.branch) {
      focusOn(state.branch);
    }
  }

  var graphBuilt = false;
  function buildGraph() {
    if (graphBuilt) return;
    graphBuilt = true;
    var g = $("apGraphNodes"), ge = $("apGraphEdges");
    var nodes = [];
    D.branches.forEach(function (br, i) {
      var ang = (i / D.branches.length) * Math.PI * 2 - Math.PI / 2;
      var bn = { id: br.id, kind: "branch", br: br, x: CX + Math.cos(ang) * 300, y: VH / 2 + Math.sin(ang) * 250, r: 26 };
      nodes.push(bn);
      br.clusters.forEach(function (c, j) {
        var a2 = ang + (j - (br.clusters.length - 1) / 2) * 0.34;
        nodes.push({ id: c.id, kind: "cluster", br: br, cl: c, x: bn.x + Math.cos(a2) * 105, y: bn.y + Math.sin(a2) * 100, r: 12 });
      });
    });
    var byId = {};
    nodes.forEach(function (n) { byId[n.id] = n; });

    nodes.forEach(function (n) {
      if (n.kind === "branch") return;
      var p = byId[n.br.id];
      el("line", { x1: p.x, y1: p.y, x2: n.x, y2: n.y, stroke: "#B9A98C", "stroke-width": 1, opacity: 0.6 }, ge);
    });
    D.crossLinks.forEach(function (l) {
      var a = kwById[l.from], b = kwById[l.to];
      if (!a || !b) return;
      var na = byId[a.cluster.id], nb = byId[b.cluster.id];
      if (!na || !nb) return;
      el("path", {
        d: "M" + na.x + "," + na.y + " Q" + ((na.x + nb.x) / 2) + "," + (((na.y + nb.y) / 2) - 60) + " " + nb.x + "," + nb.y,
        stroke: a.branch.color, "stroke-width": 1, fill: "none", "stroke-dasharray": "3 4", opacity: 0.45
      }, ge);
    });
    nodes.forEach(function (n) {
      var gNode = el("g", { "class": "ap-gnode", tabindex: "0", role: "button", "aria-label": (n.kind === "branch" ? n.br.zh : n.cl.zh) }, g);
      el("circle", { cx: n.x, cy: n.y, r: n.r, fill: n.kind === "branch" ? n.br.color : "#FBF3DF", stroke: n.br.color, "stroke-width": n.kind === "branch" ? 2 : 1.4, opacity: n.kind === "branch" ? 0.9 : 1 }, gNode);
      if (n.kind === "branch") {
        var tx = el("text", { x: n.x, y: n.y + 42, "text-anchor": "middle", "font-size": 13, fill: "#33291F" }, gNode);
        tx.textContent = n.br.zh;
      }
      var isBranch = n.kind === "branch";
      gNode.addEventListener("click", function () {
        setView("tree");
        activate(isBranch ? n.id : n.br.id);
      });
      gNode.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); gNode.dispatchEvent(new MouseEvent("click")); }
      });
      // 拖拽
      var dragging = false, dx = 0, dy = 0;
      gNode.addEventListener("pointerdown", function (e) {
        dragging = true; dx = e.clientX; dy = e.clientY;
        gNode.setPointerCapture(e.pointerId);
      });
      gNode.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var svg = $("apSvg"), pt = svg.createSVGPoint();
        pt.x = e.clientX; pt.y = e.clientY;
        var p = pt.matrixTransform(svg.getScreenCTM().inverse());
        var c = gNode.querySelector("circle");
        c.setAttribute("cx", p.x); c.setAttribute("cy", p.y);
      });
      gNode.addEventListener("pointerup", function () { dragging = false; });
    });
  }

  /* ---------- 深链 ---------- */
  function syncHash() {
    var hh = "#/";
    if (state.branch) hh += state.branch;
    if (state.kw) hh += "/" + state.kw;
    try { history.replaceState(null, "", hh === "#/" ? "#/" : hh); } catch (e) {}
  }
  function readHash() {
    var raw = (location.hash || "").replace(/^#\/?/, "");
    if (!raw) return;
    var parts = raw.split("/");
    var br = parts[0], kw = parts[1];
    if (!br) return;
    var b = D.branches.filter(function (x) { return x.id === br; })[0];
    if (!b) return;
    activate(b.id);
    if (kw && kwById[kw]) openKw(kw, false);
  }

  /* ---------- 平移缩放 ---------- */
  function applyView() {
    $("apRoot").setAttribute("transform",
      "translate(" + viewT.x.toFixed(1) + "," + viewT.y.toFixed(1) + ") translate(" + CX + "," + (VH / 2) + ") scale(" + viewT.k.toFixed(3) + ") translate(" + (-CX) + "," + (-VH / 2) + ")");
  }
  function bindPanZoom() {
    var svg = $("apSvg"), down = false, lx = 0, ly = 0;
    svg.addEventListener("wheel", function (e) {
      if (state.view !== "tree") return;
      e.preventDefault();
      viewT.k = clamp(viewT.k * Math.exp(-e.deltaY * 0.0012), 0.6, 2.2);
      applyView();
    }, { passive: false });
    svg.addEventListener("pointerdown", function (e) {
      if (e.target.closest && (e.target.closest(".ap-tag") || e.target.closest(".ap-leaf") || e.target.closest(".ap-gnode") || e.target.closest("foreignObject"))) return;
      down = true; lx = e.clientX; ly = e.clientY;
    });
    window.addEventListener("pointermove", function (e) {
      if (!down) return;
      var svg2 = $("apSvg");
      var r = svg2.getBoundingClientRect();
      var scale = VW / r.width;
      viewT.x += (e.clientX - lx) * scale;
      viewT.y += (e.clientY - ly) * scale;
      lx = e.clientX; ly = e.clientY;
      applyView();
    });
    window.addEventListener("pointerup", function () { down = false; });
    svg.addEventListener("dblclick", function () { viewT = { x: 0, y: 0, k: 1 }; applyView(); });
  }

  /* ---------- 移动端列表 ---------- */
  function buildList() {
    var box = $("apList");
    if (!box) return;
    D.branches.forEach(function (br) {
      var d = h("details", "ap-ld", box);
      var s = h("summary", "ap-ls", d);
      var dot = h("span", "ap-dot", s);
      dot.style.background = br.color;
      s.appendChild(document.createTextNode(br.zh + " "));
      h("span", "ap-len", s).textContent = br.en;
      br.clusters.forEach(function (c) {
        var cd = h("div", "ap-lc", d);
        h("div", "ap-lczh", cd).textContent = c.zh;
        c.keywords.forEach(function (k) {
          var a = h("button", "ap-lk", cd);
          a.type = "button";
          a.textContent = k.zh;
          a.addEventListener("click", function () { gotoKw(k.id); });
        });
      });
    });
  }

  /* ---------- 启动 ---------- */
  function init() {
    var data = window.PHIL_DATA;
    if (!data || !data.branches) {
      var msg = $("apLoadErr");
      if (msg) msg.style.display = "block";
      return;
    }
    buildIndex();
    buildStatic();
    buildList();
    bindPanZoom();

    var input = $("apInput");
    input.addEventListener("input", function () {
      var q = input.value.trim();
      clearTimeout(input._t);
      input._t = setTimeout(function () { renderResults(q); }, 120);
    });
    input.addEventListener("focus", function () {
      if (input.value.trim()) renderResults(input.value.trim());
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { $("apResults").classList.remove("is-on"); input.blur(); }
      if (e.key === "Enter") {
        var first = document.querySelector(".ap-ritem.is-first");
        if (first && first.dataset.kw) { first.click(); }
        else if (input.value.trim()) {
          window.open("https://plato.stanford.edu/search/searcher.py?query=" + encodeURIComponent(input.value.trim()), "_blank", "noopener");
        }
      }
      if (e.key === "ArrowDown") {
        var items = document.querySelectorAll(".ap-ritem");
        if (items.length) { e.preventDefault(); items[0].focus(); }
      }
    });
    window.addEventListener("resize", positionResults);
    window.addEventListener("scroll", positionResults, true);

    $("apClose").addEventListener("click", function () { closeDrawer(); });
    $("apStar").addEventListener("click", toggleStar);
    $("apCite").addEventListener("click", function () {
      var k = kwById[state.kw];
      if (!k) return;
      var txt = "「" + k.zh + "」, “" + k.en + "”, The Stanford Encyclopedia of Philosophy, " + k.sep.url;
      if (navigator.clipboard) { navigator.clipboard.writeText(txt); }
      var b = $("apCite");
      b.textContent = "已复制";
      setTimeout(function () { b.textContent = "复制引用"; }, 1400);
    });
    $("apReset").addEventListener("click", function () {
      viewT = { x: 0, y: 0, k: 1 };
      applyView();
      if (state.branch) focusOn(state.branch);
    });
    $("apBtnTree").addEventListener("click", function () { setView("tree"); });
    $("apBtnNet").addEventListener("click", function () { setView("net"); });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      if (state.kw) { closeDrawer(); return; }
      if (state.branch) { collapse(); }
    });
    $("apSvg").addEventListener("click", function (e) {
      if (e.target === $("apSvg") || e.target.id === "apBg") {
        if (state.kw) closeDrawer(); else if (state.branch) collapse();
      }
    });
    $("apLegendBtn").addEventListener("click", function () {
      $("apLegend").classList.toggle("is-collapsed");
    });

    // 图例
    var lg = $("apLegendItems");
    D.branches.forEach(function (br) {
      var row = h("div", "ap-lgi", lg);
      var dot = h("span", "ap-dot", row); dot.style.background = br.color;
      h("span", "ap-lgzh", row).textContent = br.zh;
    });

    readHash();
    if (!location.hash) {
      // 入场：主干与枝条由 opacity 轻微淡入
      if (!reduced) {
        $("apTree").style.opacity = "0";
        requestAnimationFrame(function () {
          $("apTree").style.transition = "opacity .9s ease";
          $("apTree").style.opacity = "1";
        });
      }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
