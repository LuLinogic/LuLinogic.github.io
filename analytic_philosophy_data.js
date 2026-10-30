// ==========================================================================
// The Tree of Analytic Philosophy - Knowledge Base Data
// ==========================================================================

const philosophyData = {
    // ----------------------------------------------------------------------
    // 第一层：Roots (思想源流与历史基础)
    // ----------------------------------------------------------------------
    "root-ancient": {
        id: "root-ancient",
        title_en: "Ancient Greek Philosophy",
        title_zh: "古希腊哲学",
        type: "Historical Source",
        parent_id: "trunk",
        description: "The foundational period of Western philosophy.",
        philosophers: ["Plato", "Aristotle"],
        relations: { originates_from: [], influences: ["mind-body-problem", "virtue-ethics"] },
        links: { sep: "https://plato.stanford.edu/entries/ancient-greek-philosophy/", iep: "", wiki: "" }
    },
    "root-rationalism": {
        id: "root-rationalism",
        title_en: "Rationalism",
        title_zh: "唯理论",
        type: "Historical Source",
        parent_id: "trunk",
        description: "Emphasizes reason as the chief source and test of knowledge.",
        philosophers: ["Descartes", "Spinoza", "Leibniz"],
        relations: { opposes: ["root-empiricism"], influences: ["epistemology-rationalism", "dualism"] },
        links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/", iep: "", wiki: "" }
    },
    "root-empiricism": {
        id: "root-empiricism",
        title_en: "Empiricism",
        title_zh: "经验论",
        type: "Historical Source",
        parent_id: "trunk",
        description: "Emphasizes the role of experience and evidence in the formation of ideas.",
        philosophers: ["Locke", "Berkeley", "Hume"],
        relations: { opposes: ["root-rationalism"], influences: ["epistemology-empiricism", "logical-positivism"] },
        links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/", iep: "", wiki: "" }
    },
    "root-kantian": {
        id: "root-kantian",
        title_en: "Kantian Philosophy",
        title_zh: "康德哲学",
        type: "Historical Source",
        parent_id: "trunk",
        description: "A synthesis of rationalism and empiricism.",
        philosophers: ["Immanuel Kant"],
        relations: { develops: ["root-rationalism", "root-empiricism"], influences: ["deontology", "philosophy-of-science"] },
        links: { sep: "https://plato.stanford.edu/entries/kant/", iep: "", wiki: "" }
    },
    "root-formal-logic": {
        id: "root-formal-logic",
        title_en: "Foundations of Formal Logic",
        title_zh: "形式逻辑基础",
        type: "Historical Source",
        parent_id: "trunk",
        description: "The development of symbolic and mathematical logic.",
        philosophers: ["Aristotle", "Frege", "Boole"],
        relations: { influences: ["logic"] },
        links: { sep: "https://plato.stanford.edu/entries/logic-classical/", iep: "", wiki: "" }
    },

    // ----------------------------------------------------------------------
    // 第二层：Trunk (主干，作为虚拟父节点存在)
    // ----------------------------------------------------------------------
    "trunk": { id: "trunk", title_en: "The Tree of Philosophy", type: "Trunk" },

    // ----------------------------------------------------------------------
    // 第三层：Main Branches (12 大哲学领域)
    // ----------------------------------------------------------------------
    "epistemology": {
        id: "epistemology",
        title_en: "Epistemology",
        title_zh: "认识论",
        type: "Field",
        parent_id: "trunk",
        description: "The study of knowledge, belief, truth, and justification.",
        philosophers: [],
        relations: { related_to: ["metaphysics", "philosophy-of-mind"] },
        links: { sep: "https://plato.stanford.edu/entries/epistemology/", iep: "https://iep.utm.edu/epistemo/", wiki: "https://en.wikipedia.org/wiki/Epistemology" }
    },
    "philosophy-of-mind": {
        id: "philosophy-of-mind",
        title_en: "Philosophy of Mind",
        title_zh: "心灵哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of the mind, consciousness, and the mind-body problem.",
        philosophers: [],
        relations: { related_to: ["metaphysics", "epistemology", "philosophy-of-science"] },
        links: { sep: "https://plato.stanford.edu/entries/mind/", iep: "https://iep.utm.edu/mind/", wiki: "https://en.wikipedia.org/wiki/Philosophy_of_mind" }
    },
    "philosophy-of-language": {
        id: "philosophy-of-language",
        title_en: "Philosophy of Language",
        title_zh: "语言哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of language, meaning, reference, and truth.",
        philosophers: ["Frege", "Russell", "Wittgenstein", "Quine", "Kripke"],
        relations: { related_to: ["logic", "epistemology", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/meaning/", iep: "https://iep.utm.edu/lang-phi/", wiki: "https://en.wikipedia.org/wiki/Philosophy_of_language" }
    },
    "philosophy-of-action": {
        id: "philosophy-of-action",
        title_en: "Philosophy of Action",
        title_zh: "行动哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of action, intention, reasons, and free will.",
        philosophers: ["Davidson", "Anscombe"],
        relations: { related_to: ["ethics", "philosophy-of-mind", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/action/", iep: "https://iep.utm.edu/act-phil/", wiki: "https://en.wikipedia.org/wiki/Action_theory_(philosophy)" }
    },
    "philosophy-of-science": {
        id: "philosophy-of-science",
        title_en: "Philosophy of Science",
        title_zh: "科学哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of scientific knowledge, methods, explanation, and realism.",
        philosophers: ["Popper", "Kuhn", "Lakatos", "Feyerabend"],
        relations: { related_to: ["epistemology", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/science/", iep: "https://iep.utm.edu/sci-phil/", wiki: "https://en.wikipedia.org/wiki/Philosophy_of_science" }
    },
    "metaphysics": {
        id: "metaphysics",
        title_en: "Metaphysics",
        title_zh: "形而上学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of being, existence, identity, causation, and modality.",
        philosophers: [],
        relations: { related_to: ["epistemology", "logic", "philosophy-of-mind"] },
        links: { sep: "https://plato.stanford.edu/entries/metaphysics/", iep: "https://iep.utm.edu/metaphys/", wiki: "https://en.wikipedia.org/wiki/Metaphysics" }
    },
    "logic": {
        id: "logic",
        title_en: "Logic and Philosophy of Logic",
        title_zh: "逻辑学与逻辑哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of valid inference, formal systems, and logical truth.",
        philosophers: ["Frege", "Russell", "Gödel", "Tarski"],
        relations: { related_to: ["philosophy-of-mathematics", "philosophy-of-language", "metaphysics"] },
        links: { sep: "https://plato.stanford.edu/entries/logic-philosophy/", iep: "https://iep.utm.edu/log-phil/", wiki: "https://en.wikipedia.org/wiki/Philosophy_of_logic" }
    },
    "ethics": {
        id: "ethics",
        title_en: "Ethics and Metaethics",
        title_zh: "伦理学与元伦理学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of moral value, right and wrong, and moral language.",
        philosophers: ["Kant", "Mill", "Aristotle", "Moore"],
        relations: { related_to: ["political-philosophy", "philosophy-of-action"] },
        links: { sep: "https://plato.stanford.edu/entries/metaethics/", iep: "https://iep.utm.edu/ethics/", wiki: "https://en.wikipedia.org/wiki/Ethics" }
    },
    "philosophy-of-mathematics": {
        id: "philosophy-of-mathematics",
        title_en: "Philosophy of Mathematics",
        title_zh: "数学哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of mathematical objects, truth, and knowledge.",
        philosophers: ["Frege", "Russell", "Gödel"],
        relations: { related_to: ["logic", "metaphysics", "epistemology"] },
        links: { sep: "https://plato.stanford.edu/entries/philosophy-mathematics/", iep: "https://iep.utm.edu/mathphil/", wiki: "https://en.wikipedia.org/wiki/Philosophy_of_mathematics" }
    },
    "political-philosophy": {
        id: "political-philosophy",
        title_en: "Political Philosophy",
        title_zh: "政治哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of justice, liberty, rights, authority, and political institutions.",
        philosophers: ["Rawls", "Nozick", "Hobbes", "Locke", "Marx"],
        relations: { related_to: ["ethics", "philosophy-of-action"] },
        links: { sep: "https://plato.stanford.edu/entries/political-philosophy/", iep: "https://iep.utm.edu/pol-phil/", wiki: "https://en.wikipedia.org/wiki/Political_philosophy" }
    },
    "philosophy-of-religion": {
        id: "philosophy-of-religion",
        title_en: "Philosophy of Religion",
        title_zh: "宗教哲学",
        type: "Field",
        parent_id: "trunk",
        description: "The study of religious belief, arguments for God, and religious experience.",
        philosophers: ["Aquinas", "Plantinga", "Swinburne"],
        relations: { related_to: ["metaphysics", "epistemology", "ethics"] },
        links: { sep: "https://plato.stanford.edu/entries/philosophy-religion/", iep: "https://iep.utm.edu/religion/", wiki: "https://en.wikipedia.org/wiki/Philosophy_of_religion" }
    },
    "history-of-analytic": {
        id: "history-of-analytic",
        title_en: "History of Analytic Philosophy",
        title_zh: "分析哲学史",
        type: "Field",
        parent_id: "trunk",
        description: "The historical development of analytic philosophy.",
        philosophers: ["Frege", "Russell", "Moore", "Wittgenstein"],
        relations: { related_to: ["philosophy-of-language", "logic"] },
        links: { sep: "https://plato.stanford.edu/entries/analytic-philosophy/", iep: "https://iep.utm.edu/analytic/", wiki: "https://en.wikipedia.org/wiki/Analytic_philosophy" }
    },

    // ----------------------------------------------------------------------
    // 第四与第五层：Secondary Branches & Leaves (部分示例节点)
    // ----------------------------------------------------------------------
    
    // 心灵哲学 (Philosophy of Mind)
    "mind-body-problem": {
        id: "mind-body-problem", title_en: "Mind-Body Problem", title_zh: "心物问题", type: "Subfield", parent_id: "philosophy-of-mind",
        description: "The central issue in the philosophy of mind: how the mental relates to the physical.",
        links: { sep: "https://plato.stanford.edu/entries/dualism/" } // Dualism entry covers the problem broadly
    },
    "dualism": {
        id: "dualism", title_en: "Dualism", title_zh: "二元论", type: "Theory", parent_id: "mind-body-problem",
        description: "The view that mental and physical phenomena are, in some sense, fundamentally different kinds of things.",
        philosophers: ["Descartes"], relations: { opposes: ["physicalism"] },
        links: { sep: "https://plato.stanford.edu/entries/dualism/" }
    },
    "physicalism": {
        id: "physicalism", title_en: "Physicalism", title_zh: "物理主义", type: "Theory", parent_id: "mind-body-problem",
        description: "The thesis that everything is physical, or supervenes on the physical.",
        philosophers: ["Smart", "Armstrong"], relations: { opposes: ["dualism"] },
        links: { sep: "https://plato.stanford.edu/entries/physicalism/" }
    },
    "functionalism": {
        id: "functionalism", title_en: "Functionalism", title_zh: "功能主义", type: "Theory", parent_id: "mind-body-problem",
        description: "The theory that mental states are constituted solely by their functional role.",
        philosophers: ["Putnam", "Fodor"], relations: { related_to: ["physicalism", "artificial-intelligence"] },
        links: { sep: "https://plato.stanford.edu/entries/functionalism/" }
    },

    // 认识论 (Epistemology)
    "theory-of-knowledge": {
        id: "theory-of-knowledge", title_en: "Theory of Knowledge", title_zh: "知识论", type: "Subfield", parent_id: "epistemology",
        description: "The core analysis of what constitutes knowledge.",
        links: { sep: "https://plato.stanford.edu/entries/knowledge-analysis/" }
    },
    "gettier-problem": {
        id: "gettier-problem", title_en: "The Gettier Problem", title_zh: "盖梯尔问题", type: "Argument", parent_id: "theory-of-knowledge",
        description: "A challenge to the justified true belief (JTB) account of knowledge.",
        philosophers: ["Gettier"], relations: { influences: ["reliabilism", "virtue-epistemology"] },
        links: { sep: "https://plato.stanford.edu/entries/knowledge-analysis/#GettierProblem" }
    },
    "reliabilism": {
        id: "reliabilism", title_en: "Reliabilism", title_zh: "可靠主义", type: "Theory", parent_id: "theory-of-knowledge",
        description: "The view that a belief is justified (or knowledge) if it is produced by a reliable cognitive process.",
        philosophers: ["Goldman"], relations: { develops: ["gettier-problem"] },
        links: { sep: "https://plato.stanford.edu/entries/reliabilism/" }
    },

    // 语言哲学 (Philosophy of Language)
    "reference": {
        id: "reference", title_en: "Reference", title_zh: "指称", type: "Subfield", parent_id: "philosophy-of-language",
        description: "How words connect to objects in the world.",
        links: { sep: "https://plato.stanford.edu/entries/reference/" }
    },
    "sense-and-reference": {
        id: "sense-and-reference", title_en: "Sense and Reference", title_zh: "涵义与指称", type: "Theory", parent_id: "reference",
        description: "Frege's distinction between the reference (Bedeutung) of an expression and its sense (Sinn).",
        philosophers: ["Frege"], relations: { influences: ["theory-of-descriptions"] },
        links: { sep: "https://plato.stanford.edu/entries/frege-meaning/" }
    },
    "theory-of-descriptions": {
        id: "theory-of-descriptions", title_en: "Theory of Descriptions", title_zh: "摹状词理论", type: "Theory", parent_id: "reference",
        description: "Russell's logical analysis of definite descriptions.",
        philosophers: ["Russell"], relations: { develops: ["sense-and-reference"] },
        links: { sep: "https://plato.stanford.edu/entries/russell/#RusTheDes" }
    },
    "rigid-designators": {
        id: "rigid-designators", title_en: "Rigid Designators", title_zh: "严格指示词", type: "Concept", parent_id: "reference",
        description: "Kripke's concept of an expression that designates the same object in all possible worlds.",
        philosophers: ["Kripke"], relations: { related_to: ["possible-worlds"] },
        links: { sep: "https://plato.stanford.edu/entries/rigid-designators/" }
    },

    // 形而上学 (Metaphysics)
    "modality": {
        id: "modality", title_en: "Modality", title_zh: "模态", type: "Subfield", parent_id: "metaphysics",
        description: "The study of necessity, possibility, and contingency.",
        links: { sep: "https://plato.stanford.edu/entries/modality-varieties/" }
    },
    "possible-worlds": {
        id: "possible-worlds", title_en: "Possible Worlds", title_zh: "可能世界", type: "Concept", parent_id: "modality",
        description: "A way things could have been; used to analyze modal statements.",
        philosophers: ["Leibniz", "Lewis", "Kripke"], relations: { related_to: ["rigid-designators", "modal-logic"] },
        links: { sep: "https://plato.stanford.edu/entries/possible-worlds/" }
    },

    // 科学哲学 (Philosophy of Science)
    "scientific-realism": {
        id: "scientific-realism", title_en: "Scientific Realism", title_zh: "科学实在论", type: "Theory", parent_id: "philosophy-of-science",
        description: "The view that successful scientific theories are approximately true descriptions of the world.",
        relations: { opposes: ["scientific-anti-realism"] },
        links: { sep: "https://plato.stanford.edu/entries/scientific-realism/" }
    },

    // 伦理学 (Ethics)
    "consequentialism": {
        id: "consequentialism", title_en: "Consequentialism", title_zh: "后果主义", type: "Theory", parent_id: "ethics",
        description: "The view that the moral rightness of an act depends entirely on its consequences.",
        philosophers: ["Mill", "Bentham"], relations: { opposes: ["deontology"] },
        links: { sep: "https://plato.stanford.edu/entries/consequentialism/" }
    },
    "deontology": {
        id: "deontology", title_en: "Deontology", title_zh: "义务论", type: "Theory", parent_id: "ethics",
        description: "The normative ethical position that judges the morality of an action based on rules or duties.",
        philosophers: ["Kant"], relations: { opposes: ["consequentialism"] },
        links: { sep: "https://plato.stanford.edu/entries/ethics-deontological/" }
    }
};