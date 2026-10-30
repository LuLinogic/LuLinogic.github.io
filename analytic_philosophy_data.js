// ==========================================================================
// The Tree of Analytic Philosophy - Vertical Tree Knowledge Base
// ==========================================================================

const philosophyData = {
    // ----------------------------------------------------------------------
    // 虚拟根节点 (作为所有一级分支的挂载点)
    // ----------------------------------------------------------------------
    "trunk": { id: "trunk", title_en: "The Tree of Philosophy", type: "Virtual" },

    // ----------------------------------------------------------------------
    // 第一层：Roots (思想源流与历史基础，将向下生长)
    // ----------------------------------------------------------------------
    "root-ancient": {
        id: "root-ancient", title_en: "Ancient Greek Philosophy", title_zh: "古希腊哲学", type: "Historical Source", parent_id: "trunk",
        description: "The foundational period of Western philosophy.",
        philosophers: ["Plato", "Aristotle"],
        relations: { influences: ["mind-body-problem", "ethics"] },
        links: { sep: "https://plato.stanford.edu/entries/ancient-greek-philosophy/" }
    },
    "root-rationalism": {
        id: "root-rationalism", title_en: "Rationalism", title_zh: "唯理论", type: "Historical Source", parent_id: "trunk",
        description: "Emphasizes reason as the chief source and test of knowledge.",
        philosophers: ["Descartes", "Spinoza", "Leibniz"],
        relations: { opposes: ["root-empiricism"], influences: ["epistemology", "dualism"] },
        links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/" }
    },
    "root-empiricism": {
        id: "root-empiricism", title_en: "Empiricism", title_zh: "经验论", type: "Historical Source", parent_id: "trunk",
        description: "Emphasizes the role of experience and evidence in the formation of ideas.",
        philosophers: ["Locke", "Berkeley", "Hume"],
        relations: { opposes: ["root-rationalism"], influences: ["epistemology", "philosophy-of-science"] },
        links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/" }
    },
    "root-kantian": {
        id: "root-kantian", title_en: "Kantian Philosophy", title_zh: "康德哲学", type: "Historical Source", parent_id: "trunk",
        description: "A synthesis of rationalism and empiricism.",
        philosophers: ["Immanuel Kant"],
        relations: { develops: ["root-rationalism", "root-empiricism"], influences: ["ethics", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/kant/" }
    },
    "root-formal-logic": {
        id: "root-formal-logic", title_en: "Foundations of Formal Logic", title_zh: "形式逻辑基础", type: "Historical Source", parent_id: "trunk",
        description: "The development of symbolic and mathematical logic.",
        philosophers: ["Aristotle", "Frege", "Boole"],
        relations: { influences: ["logic", "trunk-logic-analysis"] },
        links: { sep: "https://plato.stanford.edu/entries/logic-classical/" }
    },

    // ----------------------------------------------------------------------
    // 第二层：Trunk Nodes (树干核心方法论，垂直排列)
    // ----------------------------------------------------------------------
    "trunk-formation": {
        id: "trunk-formation", title_en: "Formation of Analytic Philosophy", title_zh: "分析哲学的形成", type: "Trunk", parent_id: "trunk",
        description: "The historical turn towards logical and linguistic analysis.",
        philosophers: ["Frege", "Russell", "Moore"], relations: {}, links: { sep: "https://plato.stanford.edu/entries/analytic-philosophy/" }
    },
    "trunk-logic-analysis": {
        id: "trunk-logic-analysis", title_en: "Logical Analysis", title_zh: "逻辑分析", type: "Trunk", parent_id: "trunk",
        description: "Using formal logic to clarify philosophical problems.",
        philosophers: ["Russell", "Carnap"], relations: { influences: ["logic", "philosophy-of-science"] }, links: {}
    },
    "trunk-lang-analysis": {
        id: "trunk-lang-analysis", title_en: "Linguistic Analysis", title_zh: "语言分析", type: "Trunk", parent_id: "trunk",
        description: "Analyzing ordinary or ideal language to resolve confusions.",
        philosophers: ["Wittgenstein", "Austin"], relations: { influences: ["philosophy-of-language"] }, links: {}
    },
    "trunk-concept-analysis": {
        id: "trunk-concept-analysis", title_en: "Conceptual Analysis", title_zh: "概念分析", type: "Trunk", parent_id: "trunk",
        description: "Breaking down concepts into their constituent parts.",
        philosophers: ["Moore", "Strawson"], relations: { influences: ["epistemology", "philosophy-of-mind"] }, links: {}
    },

    // ----------------------------------------------------------------------
    // 第三层：Main Branches (12 大哲学领域，将挂载在树干两侧)
    // ----------------------------------------------------------------------
    "epistemology": {
        id: "epistemology", title_en: "Epistemology", title_zh: "认识论", type: "Field", parent_id: "trunk",
        description: "The study of knowledge, belief, truth, and justification.", philosophers: [],
        relations: { related_to: ["metaphysics", "philosophy-of-mind", "philosophy-of-science"] },
        links: { sep: "https://plato.stanford.edu/entries/epistemology/" }
    },
    "philosophy-of-mind": {
        id: "philosophy-of-mind", title_en: "Philosophy of Mind", title_zh: "心灵哲学", type: "Field", parent_id: "trunk",
        description: "The study of the mind, consciousness, and the mind-body problem.", philosophers: [],
        relations: { related_to: ["metaphysics", "epistemology"] },
        links: { sep: "https://plato.stanford.edu/entries/mind/" }
    },
    "philosophy-of-language": {
        id: "philosophy-of-language", title_en: "Philosophy of Language", title_zh: "语言哲学", type: "Field", parent_id: "trunk",
        description: "The study of language, meaning, reference, and truth.", philosophers: ["Frege", "Russell", "Quine", "Kripke"],
        relations: { related_to: ["logic", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/meaning/" }
    },
    "philosophy-of-action": {
        id: "philosophy-of-action", title_en: "Philosophy of Action", title_zh: "行动哲学", type: "Field", parent_id: "trunk",
        description: "The study of action, intention, reasons, and free will.", philosophers: ["Davidson", "Anscombe"],
        relations: { related_to: ["ethics", "philosophy-of-mind"] },
        links: { sep: "https://plato.stanford.edu/entries/action/" }
    },
    "philosophy-of-science": {
        id: "philosophy-of-science", title_en: "Philosophy of Science", title_zh: "科学哲学", type: "Field", parent_id: "trunk",
        description: "The study of scientific knowledge, methods, explanation, and realism.", philosophers: ["Popper", "Kuhn"],
        relations: { related_to: ["epistemology", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/science/" }
    },
    "metaphysics": {
        id: "metaphysics", title_en: "Metaphysics", title_zh: "形而上学", type: "Field", parent_id: "trunk",
        description: "The study of being, existence, identity, causation, and modality.", philosophers: [],
        relations: { related_to: ["epistemology", "logic", "philosophy-of-mind"] },
        links: { sep: "https://plato.stanford.edu/entries/metaphysics/" }
    },
    "logic": {
        id: "logic", title_en: "Logic and Philosophy of Logic", title_zh: "逻辑学与逻辑哲学", type: "Field", parent_id: "trunk",
        description: "The study of valid inference, formal systems, and logical truth.", philosophers: ["Frege", "Gödel", "Tarski"],
        relations: { related_to: ["philosophy-of-mathematics", "philosophy-of-language"] },
        links: { sep: "https://plato.stanford.edu/entries/logic-philosophy/" }
    },
    "ethics": {
        id: "ethics", title_en: "Ethics and Metaethics", title_zh: "伦理学与元伦理学", type: "Field", parent_id: "trunk",
        description: "The study of moral value, right and wrong, and moral language.", philosophers: ["Kant", "Mill", "Moore"],
        relations: { related_to: ["political-philosophy", "philosophy-of-action"] },
        links: { sep: "https://plato.stanford.edu/entries/metaethics/" }
    },
    "philosophy-of-mathematics": {
        id: "philosophy-of-mathematics", title_en: "Philosophy of Mathematics", title_zh: "数学哲学", type: "Field", parent_id: "trunk",
        description: "The study of mathematical objects, truth, and knowledge.", philosophers: ["Frege", "Russell", "Gödel"],
        relations: { related_to: ["logic", "metaphysics", "epistemology"] },
        links: { sep: "https://plato.stanford.edu/entries/philosophy-mathematics/" }
    },
    "political-philosophy": {
        id: "political-philosophy", title_en: "Political Philosophy", title_zh: "政治哲学", type: "Field", parent_id: "trunk",
        description: "The study of justice, liberty, rights, authority, and political institutions.", philosophers: ["Rawls", "Nozick", "Marx"],
        relations: { related_to: ["ethics", "philosophy-of-action"] },
        links: { sep: "https://plato.stanford.edu/entries/political-philosophy/" }
    },
    "philosophy-of-religion": {
        id: "philosophy-of-religion", title_en: "Philosophy of Religion", title_zh: "宗教哲学", type: "Field", parent_id: "trunk",
        description: "The study of religious belief, arguments for God, and religious experience.", philosophers: ["Plantinga", "Swinburne"],
        relations: { related_to: ["metaphysics", "epistemology"] },
        links: { sep: "https://plato.stanford.edu/entries/philosophy-religion/" }
    },

    // ----------------------------------------------------------------------
    // 第四与第五层：次级枝条与概念叶片 (包含跨领域关联测试节点)
    // ----------------------------------------------------------------------
    
    // 交叉测试节点：维特根斯坦
    "wittgenstein": {
        id: "wittgenstein", title_en: "Ludwig Wittgenstein", title_zh: "路德维希·维特根斯坦", type: "Philosopher", parent_id: "philosophy-of-language",
        description: "One of the most influential philosophers of the 20th century.",
        relations: { related_to: ["logic", "trunk-lang-analysis", "metaphysics"] }, // 跨领域关系，将生成虚线
        links: { sep: "https://plato.stanford.edu/entries/wittgenstein/" }
    },

    // 交叉测试节点：心物问题 (挂载在心灵哲学下，但交叉关联形而上学)
    "mind-body-problem": {
        id: "mind-body-problem", title_en: "Mind-Body Problem", title_zh: "心物问题", type: "Subfield", parent_id: "philosophy-of-mind",
        description: "The central issue in the philosophy of mind: how the mental relates to the physical.",
        relations: { related_to: ["metaphysics"] }, // 跨领域关系
        links: { sep: "https://plato.stanford.edu/entries/dualism/" }
    },
    "dualism": {
        id: "dualism", title_en: "Dualism", title_zh: "二元论", type: "Theory", parent_id: "mind-body-problem",
        description: "The view that mental and physical phenomena are fundamentally different.",
        philosophers: ["Descartes"], relations: { opposes: ["physicalism"] }, links: { sep: "https://plato.stanford.edu/entries/dualism/" }
    },
    "physicalism": {
        id: "physicalism", title_en: "Physicalism", title_zh: "物理主义", type: "Theory", parent_id: "mind-body-problem",
        description: "The thesis that everything is physical.",
        philosophers: ["Smart", "Armstrong"], relations: { opposes: ["dualism"] }, links: { sep: "https://plato.stanford.edu/entries/physicalism/" }
    },

    // 交叉测试节点：可能世界 (挂载在形而上学下，但交叉关联逻辑学)
    "modality": {
        id: "modality", title_en: "Modality", title_zh: "模态", type: "Subfield", parent_id: "metaphysics",
        description: "The study of necessity, possibility, and contingency.",
        relations: { related_to: ["logic"] },
        links: { sep: "https://plato.stanford.edu/entries/modality-varieties/" }
    },
    "possible-worlds": {
        id: "possible-worlds", title_en: "Possible Worlds", title_zh: "可能世界", type: "Concept", parent_id: "modality",
        description: "A way things could have been.",
        philosophers: ["Leibniz", "Lewis", "Kripke"], relations: { related_to: ["philosophy-of-language"] },
        links: { sep: "https://plato.stanford.edu/entries/possible-worlds/" }
    }
};