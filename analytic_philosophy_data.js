// ==========================================================================
// Strict Hierarchical Data Structure for D3.js Tree Layout
// ==========================================================================

const philosophyTreeData = {
    id: "trunk-base",
    title_en: "Historical Roots",
    title_zh: "历史根基",
    type: "Trunk",
    description: "The foundational period of Western philosophy.",
    links: {},
    children: [
        {
            id: "root-ancient", title_en: "Ancient Greek", title_zh: "古希腊哲学", type: "HistoricalSource", philosophers: ["Plato", "Aristotle"], links: { sep: "https://plato.stanford.edu/entries/ancient-greek-philosophy/" }
        },
        {
            id: "root-rationalism", title_en: "Rationalism", title_zh: "唯理论", type: "HistoricalSource", philosophers: ["Descartes", "Spinoza"], links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/" }
        },
        {
            id: "root-empiricism", title_en: "Empiricism", title_zh: "经验论", type: "HistoricalSource", philosophers: ["Locke", "Hume"], links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/" }
        },
        {
            id: "trunk-modern", title_en: "Early Modern & Foundations", title_zh: "近代与基础", type: "Trunk", description: "The bridge between classical thought and modern analysis.", links: {},
            children: [
                {
                    id: "logic", title_en: "Logic & Philosophy of Logic", title_zh: "逻辑学", type: "Field", philosophers: ["Frege", "Gödel", "Tarski"], links: { sep: "https://plato.stanford.edu/entries/logic-philosophy/" },
                    children: [
                        { id: "modal-logic", title_en: "Modal Logic", type: "Subfield", links: {sep: "https://plato.stanford.edu/entries/logic-modal/"}}
                    ]
                },
                {
                    id: "epistemology", title_en: "Epistemology", title_zh: "认识论", type: "Field", links: { sep: "https://plato.stanford.edu/entries/epistemology/" },
                    children: [
                        { 
                            id: "theory-of-knowledge", title_en: "Theory of Knowledge", type: "Subfield", links: { sep: "https://plato.stanford.edu/entries/knowledge-analysis/" },
                            children: [
                                { id: "gettier-problem", title_en: "The Gettier Problem", type: "Concept", philosophers: ["Gettier"], links: { sep: "https://plato.stanford.edu/entries/knowledge-analysis/#GettierProblem" } },
                                { id: "reliabilism", title_en: "Reliabilism", type: "Theory", philosophers: ["Goldman"], links: { sep: "https://plato.stanford.edu/entries/reliabilism/" } }
                            ]
                        }
                    ]
                },
                {
                    id: "trunk-analytic", title_en: "The Analytic Turn", title_zh: "分析哲学的转向", type: "Trunk", description: "The linguistic and logical turn of the 20th century.", links: {},
                    children: [
                        {
                            id: "philosophy-of-language", title_en: "Philosophy of Language", title_zh: "语言哲学", type: "Field", philosophers: ["Frege", "Russell", "Quine", "Kripke"], links: { sep: "https://plato.stanford.edu/entries/meaning/" },
                            children: [
                                { 
                                    id: "reference", title_en: "Reference", type: "Subfield", links: { sep: "https://plato.stanford.edu/entries/reference/" },
                                    children: [
                                        { id: "sense-and-reference", title_en: "Sense and Reference", type: "Theory", philosophers: ["Frege"], links: { sep: "https://plato.stanford.edu/entries/frege-meaning/" } },
                                        { id: "theory-of-descriptions", title_en: "Theory of Descriptions", type: "Theory", philosophers: ["Russell"], links: { sep: "https://plato.stanford.edu/entries/russell/#RusTheDes" } }
                                    ]
                                },
                                { id: "wittgenstein", title_en: "Ludwig Wittgenstein", type: "Concept", description: "Philosopher of language and logic.", links: { sep: "https://plato.stanford.edu/entries/wittgenstein/" } }
                            ]
                        },
                        {
                            id: "philosophy-of-mind", title_en: "Philosophy of Mind", title_zh: "心灵哲学", type: "Field", links: { sep: "https://plato.stanford.edu/entries/mind/" },
                            children: [
                                { 
                                    id: "mind-body-problem", title_en: "Mind-Body Problem", type: "Subfield", links: { sep: "https://plato.stanford.edu/entries/dualism/" },
                                    children: [
                                        { id: "dualism", title_en: "Dualism", type: "Theory", philosophers: ["Descartes"], links: { sep: "https://plato.stanford.edu/entries/dualism/" } },
                                        { id: "physicalism", title_en: "Physicalism", type: "Theory", philosophers: ["Smart", "Armstrong"], links: { sep: "https://plato.stanford.edu/entries/physicalism/" } }
                                    ]
                                }
                            ]
                        },
                        {
                            id: "trunk-contemporary", title_en: "Contemporary Branches", title_zh: "当代分析哲学领域", type: "Trunk", links: {},
                            children: [
                                {
                                    id: "metaphysics", title_en: "Metaphysics", title_zh: "形而上学", type: "Field", links: { sep: "https://plato.stanford.edu/entries/metaphysics/" },
                                    children: [
                                        { 
                                            id: "modality", title_en: "Modality", type: "Subfield", links: { sep: "https://plato.stanford.edu/entries/modality-varieties/" },
                                            children: [
                                                { id: "possible-worlds", title_en: "Possible Worlds", type: "Concept", philosophers: ["Leibniz", "Lewis", "Kripke"], links: { sep: "https://plato.stanford.edu/entries/possible-worlds/" } }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id: "philosophy-of-science", title_en: "Philosophy of Science", title_zh: "科学哲学", type: "Field", philosophers: ["Popper", "Kuhn"], links: { sep: "https://plato.stanford.edu/entries/science/" },
                                    children: [
                                        { id: "scientific-realism", title_en: "Scientific Realism", type: "Theory", links: { sep: "https://plato.stanford.edu/entries/scientific-realism/" } }
                                    ]
                                },
                                {
                                    id: "ethics", title_en: "Ethics & Metaethics", title_zh: "伦理学", type: "Field", philosophers: ["Kant", "Mill", "Moore"], links: { sep: "https://plato.stanford.edu/entries/metaethics/" },
                                    children: [
                                        { id: "consequentialism", title_en: "Consequentialism", type: "Theory", links: { sep: "https://plato.stanford.edu/entries/consequentialism/" } },
                                        { id: "deontology", title_en: "Deontology", type: "Theory", links: { sep: "https://plato.stanford.edu/entries/ethics-deontological/" } }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
};

// 独立的跨领域关系网络 (Cross-References)
// D3 引擎将在此处读取并在相关节点间绘制虚线
const crossLinksData = [
    { source: "mind-body-problem", target: "metaphysics", label: "Related Subfield" },
    { source: "modal-logic", target: "modality", label: "Formalizes" },
    { source: "wittgenstein", target: "logic", label: "Contributed to" },
    { source: "possible-worlds", target: "philosophy-of-language", label: "Semantics" }
];