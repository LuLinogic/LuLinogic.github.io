// ==========================================================================
// The Tree of Analytic Philosophy - Core Academic Knowledge Database
// ==========================================================================

const philosophyTreeData = {
    id: "trunk_base",
    title_en: "Analytic Philosophy Root System",
    title_zh: "分析哲学根基与主干",
    nodeType: "Trunk",
    description: "The structural spine and historical foundation of analytic philosophy.",
    descriptionZh: "分析哲学的历史地基与方法论脊椎。",
    links: {},
    children: [
        // ==================================================================
        // 第一层：Roots (11 大历史思想源流，将向下生长至地下)
        // ==================================================================
        {
            id: "root_ancient_greek", title_en: "Ancient Greek Philosophy", titleZh: "古希腊哲学", nodeType: "Root",
            description: "Foundational ontology, epistemology, and dialectic of Western thought.",
            philosophers: ["Plato", "Aristotle", "Socrates"],
            sepUrl: "https://plato.stanford.sdu/entries/ancient-greek-philosophy/",
            links: { sep: "https://plato.stanford.edu/entries/ancient-greek-philosophy/" }
        },
        {
            id: "root_plato", title_en: "Plato: Theory of Forms", titleZh: "柏拉图：相论与灵魂", nodeType: "Root",
            description: "The metaphysics of abstract entities and tripartite soul.",
            philosophers: ["Plato"],
            links: { sep: "https://plato.stanford.edu/entries/plato/" }
        },
        {
            id: "root_aristotle", title_en: "Aristotle: Organon & Metaphysics", titleZh: "亚里士多德：工具论与形而上学", nodeType: "Root",
            description: "Substance, categories, and early syllogistic logic.",
            philosophers: ["Aristotle"],
            links: { sep: "https://plato.stanford.edu/entries/aristotle/" }
        },
        {
            id: "root_rationalism", title_en: "Rationalism", titleZh: "近代唯理论", nodeType: "Root",
            description: "Reason as the primary source of knowledge independent of sensory experience.",
            philosophers: ["René Descartes", "Baruch Spinoza", "Gottfried Wilhelm Leibniz"],
            links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/" }
        },
        {
            id: "root_empiricism", title_en: "Empiricism", titleZh: "近代经验论", nodeType: "Root",
            description: "Sense experience as the ultimate source of all concepts and knowledge.",
            philosophers: ["John Locke", "George Berkeley", "David Hume"],
            links: { sep: "https://plato.stanford.edu/entries/rationalism-empiricism/" }
        },
        {
            id: "root_kantian", title_en: "Kantian Philosophy", titleZh: "康德哲学", nodeType: "Root",
            description: "Synthetic a priori judgments and transcendental idealism.",
            philosophers: ["Immanuel Kant"],
            links: { sep: "https://plato.stanford.edu/entries/kant/" }
        },
        {
            id: "root_formal_logic", title_en: "Nineteenth-Century Logic", titleZh: "19世纪形式逻辑变革", nodeType: "Root",
            description: "Boole, De Morgan, and Peirce's algebraic logic precursors.",
            philosophers: ["George Boole", "Charles Sanders Peirce"],
            links: { sep: "https://plato.stanford.edu/entries/classic-logic/" }
        },
        {
            id: "root_math_foundations", title_en: "Foundations of Mathematics", titleZh: "数学基础危机", nodeType: "Root",
            description: "Cantor set theory and Hilbert's program.",
            philosophers: ["Georg Cantor", "David Hilbert", "Gottlob Frege"],
            links: { sep: "https://plato.stanford.edu/entries/mathimmert/" }
        },

        // ==================================================================
        // 第二层：Trunk (9 大历史演进与方法论阶段，自下而上沿树干主轴排列)
        // ==================================================================
        {
            id: "trunk_origins", title_en: "Origins of Analytic Philosophy", titleZh: "分析哲学的起源", nodeType: "Trunk",
            description: "The anti-idealist revolt led by Moore and Russell in Cambridge.",
            philosophers: ["G. E. Moore", "Bertrand Russell"],
            links: { sep: "https://plato.stanford.edu/entries/analytic-philosophy/" }
        },
        {
            id: "trunk_frege", title_en: "Frege & Modern Logic", titleZh: "弗雷格与现代逻辑奠基", nodeType: "Trunk",
            description: "Invention of predicate calculus, distinction of sense and reference.",
            philosophers: ["Gottlob Frege"],
            links: { sep: "https://plato.stanford.edu/entries/frege/" }
        },
        {
            id: "trunk_russell", title_en: "Russell's Logical Atomism", titleZh: "罗素的逻辑原子主义", nodeType: "Trunk",
            description: "Theory of descriptions and isomorphism between language and reality.",
            philosophers: ["Bertrand Russell"],
            links: { sep: "https://plato.stanford.edu/entries/russell/" }
        },
        {
            id: "trunk_logical_positivism", title_en: "Logical Positivism", titleZh: "逻辑实证主义与维也纳学派", nodeType: "Trunk",
            description: "Verificationism, elimination of metaphysics, and unity of science.",
            philosophers: ["Rudolf Carnap", "Moritz Schlick", "A. J. Ayer"],
            links: { sep: "https://plato.stanford.edu/entries/logical-empiricism/" }
        },
        {
            id: "trunk_ordinary_language", title_en: "Ordinary Language Philosophy", titleZh: "日常语言学派", nodeType: "Trunk",
            description: "Later Wittgenstein, Ryle, and Austin on therapy of philosophical confusions.",
            philosophers: ["Ludwig Wittgenstein", "Gilbert Ryle", "J. L. Austin"],
            links: { sep: "https://plato.stanford.edu/entries/wittgenstein/" }
        },
        {
            id: "trunk_post_war", title_en: "Post-War Analytic Transition", titleZh: "战后分析哲学转型", nodeType: "Trunk",
            description: "Quine's attack on dogma, Davidson's truth-conditional semantics.",
            philosophers: ["W. V. O. Quine", "Donald Davidson", "Wilfrid Sellars"],
            links: { sep: "https://plato.stanford.edu/entries/quine/" }
        },
        {
            id: "trunk_modal_revival", title_en: "The Modal Revival", titleZh: "模态复兴与克里普克革命", nodeType: "Trunk",
            description: "Kripkean semantics, rigid designators, and a posteriori necessities.",
            philosophers: ["Saul Kripke", "Hilary Putnam", "David Lewis"],
            links: { sep: "https://plato.stanford.edu/entries/kripke/" }
        },

        // ==================================================================
        // 第三层：Primary Branches (19 大核心哲学领域主枝)
        // ==================================================================
        {
            id: "logic", title_en: "1. Logic & Philosophy of Logic", titleZh: "1. 逻辑学与逻辑哲学", nodeType: "Field",
            description: "The study of valid inference, formal systems, and logical truth.",
            links: { sep: "https://plato.stanford.edu/entries/logic-philosophy/" },
            children: [
                {
                    id: "logic_classical", title_en: "Classical Logic", titleZh: "经典逻辑", nodeType: "Subfield",
                    children: [
                        { id: "prop_logic", title_en: "Propositional Logic", titleZh: "命题逻辑", nodeType: "Concept", links: { sep: "https://plato.stanford.sdu/entries/logic-classical/" } },
                        { id: "first_order", title_en: "First-Order Predicate Logic", titleZh: "一阶谓词逻辑", nodeType: "Concept", links: { sep: "https://plato.stanford.edu/entries/logic-classical/" } }
                    ]
                },
                {
                    id: "logic_non_classical", title_en: "Non-Classical Logic", titleZh: "非经典逻辑", nodeType: "Subfield",
                    children: [
                        { id: "modal_logic", title_en: "Modal Logic", titleZh: "模态逻辑", nodeType: "Theory", philosophers: ["C. I. Lewis", "Saul Kripke"], links: { sep: "https://plato.stanford.edu/entries/logic-modal/" } },
                        { id: "intuitionistic_logic", title_en: "Intuitionistic Logic", titleZh: "直觉主义逻辑", nodeType: "Theory", philosophers: ["L. E. J. Brouwer", "Arend Heyting"], links: { sep: "https://plato.stanford.edu/entries/logic-intuitionistic/" } },
                        { id: "paraconsistent_logic", title_en: "Paraconsistent Logic", titleZh: "次协调逻辑", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/logic-paraconsistent/" } }
                    ]
                },
                {
                    id: "logic_metatheory", title_en: "Logical Metatheory", titleZh: "逻辑元理论", nodeType: "Subfield",
                    children: [
                        { id: "completeness", title_en: "Completeness & Soundness", titleZh: "完全性与可靠性", nodeType: "Concept", philosophers: ["Kurt Gödel"], links: { sep: "https://plato.stanford.edu/entries/goedel/" } },
                        { id: "incompleteness", title_en: "Gödel's Incompleteness Theorems", titleZh: "哥德尔不完全性定理", nodeType: "Argument", philosophers: ["Kurt Gödel"], links: { sep: "https://plato.stanford.edu/entries/goedel-incompleteness/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_language", title_en: "2. Philosophy of Language", titleZh: "2. 语言哲学", nodeType: "Field",
            description: "The study of meaning, reference, truth, and speech acts.",
            links: { sep: "https://plato.stanford.edu/entries/meaning/" },
            children: [
                {
                    id: "lang_reference", title_en: "Reference & Descriptions", titleZh: "指称与摹状词", nodeType: "Subfield",
                    children: [
                        { id: "sense_reference", title_en: "Sense and Reference (Sinn & Bedeutung)", titleZh: "涵义与指称", nodeType: "Theory", philosophers: ["Gottlob Frege"], links: { sep: "https://plato.stanford.edu/entries/frege-meaning/" } },
                        { id: "theory_descriptions", title_en: "Theory of Descriptions", titleZh: "摹状词理论", nodeType: "Theory", philosophers: ["Bertrand Russell"], links: { sep: "https://plato.stanford.edu/entries/russell/#RusTheDes" } },
                        { id: "rigid_designator", title_en: "Rigid Designators", titleZh: "严格指示词", nodeType: "Concept", philosophers: ["Saul Kripke"], links: { sep: "https://plato.stanford.edu/entries/rigid-designators/" } }
                    ]
                },
                {
                    id: "lang_pragmatics", title_en: "Pragmatics & Speech Acts", titleZh: "语用学与言语行为", nodeType: "Subfield",
                    children: [
                        { id: "speech_acts", title_en: "Speech Act Theory", titleZh: "言语行为理论", nodeType: "Theory", philosophers: ["J. L. Austin", "John Searle"], links: { sep: "https://plato.stanford.edu/entries/speech-acts/" } },
                        { id: "gricean_implicature", title_en: "Gricean Implicature", titleZh: "格莱伊斯会话涵义", nodeType: "Concept", philosophers: ["H. P. Grice"], links: { sep: "https://plato.stanford.edu/entries/implicature/" } }
                    ]
                }
            ]
        },
        {
            id: "epistemology", title_en: "3. Epistemology", titleZh: "3. 认识论", nodeType: "Field",
            description: "The study of knowledge, justification, and skepticism.",
            links: { sep: "https://plato.stanford.edu/entries/epistemology/" },
            children: [
                {
                    id: "epist_analysis", title_en: "Analysis of Knowledge", titleZh: "知识的分析", nodeType: "Subfield",
                    children: [
                        { id: "jtb_account", title_en: "Justified True Belief (JTB)", titleZh: "证成的真信念账户", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/knowledge-analysis/" } },
                        { id: "gettier_problem", title_en: "The Gettier Problem", titleZh: "盖梯尔问题", nodeType: "Argument", philosophers: ["Edmund Gettier"], links: { sep: "https://plato.stanford.edu/entries/knowledge-analysis/#GettierProblem" } }
                    ]
                },
                {
                    id: "epist_justification", title_en: "Theories of Justification", titleZh: "证成理论", nodeType: "Subfield",
                    children: [
                        { id: "foundationalism", title_en: "Foundationalism", titleZh: "基础主义", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/justep-foundational/" } },
                        { id: "coherentism", title_en: "Coherentism", titleZh: "融贯主义", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/justep-coherence/" } },
                        { id: "reliabilism", title_en: "Reliabilism", titleZh: "可靠主义", nodeType: "Theory", philosophers: ["Alvin Goldman"], links: { sep: "https://plato.stanford.edu/entries/reliabilism/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_mind", title_en: "4. Philosophy of Mind", titleZh: "4. 心灵哲学", nodeType: "Field",
            description: "The study of mind, consciousness, qualia, and mental causation.",
            links: { sep: "https://plato.stanford.edu/entries/mind/" },
            children: [
                {
                    id: "mind_historical", title_en: "Historical Foundations of Mind", titleZh: "心灵哲学的历史思想源流", nodeType: "Subfield",
                    children: [
                        { id: "plato_soul", title_en: "Plato on the Soul", titleZh: "柏拉图论灵魂", nodeType: "HistoricalSource", philosophers: ["Plato"], links: { sep: "https://plato.stanford.edu/entries/plato-ethics/" } },
                        { id: "aristotle_anima", title_en: "Aristotle: De Anima (On the Soul)", titleZh: "亚里士多德：《论灵魂》", nodeType: "HistoricalSource", philosophers: ["Aristotle"], links: { sep: "https://plato.stanford.edu/entries/aristotle-psychology/" } },
                        { id: "descartes_dualism", title_en: "Descartes and Substance Dualism", titleZh: "笛卡尔的心物二元论", nodeType: "HistoricalSource", philosophers: ["René Descartes"], links: { sep: "https://plato.stanford.edu/entries/descartes-physics/" } }
                    ]
                },
                {
                    id: "mind_body_problem", title_en: "The Mind-Body Problem", titleZh: "心物问题", nodeType: "Subfield",
                    children: [
                        { id: "substance_dualism", title_en: "Substance Dualism", titleZh: "实体二元论", nodeType: "Theory", philosophers: ["René Descartes"], links: { sep: "https://plato.stanford.edu/entries/dualism/" } },
                        { id: "physicalism", title_en: "Physicalism & Materialism", titleZh: "物理主义与唯物主义", nodeType: "Theory", philosophers: ["J. J. C. Smart", "D. M. Armstrong"], links: { sep: "https://plato.stanford.edu/entries/physicalism/" } },
                        { id: "functionalism", title_en: "Functionalism", titleZh: "功能主义", nodeType: "Theory", philosophers: ["Hilary Putnam", "Jerry Fodor"], links: { sep: "https://plato.stanford.edu/entries/functionalism/" } },
                        { id: "anomalous_monism", title_en: "Anomalous Monism", titleZh: "异常一元论", nodeType: "Theory", philosophers: ["Donald Davidson"], links: { sep: "https://plato.stanford.edu/entries/davidson/" } }
                    ]
                },
                {
                    id: "consciousness", title_en: "Consciousness & Qualia", titleZh: "意识与感觉质", nodeType: "Subfield",
                    children: [
                        { id: "qualia", title_en: "Qualia", titleZh: "感觉质 (Qualia)", nodeType: "Concept", links: { sep: "https://plato.stanford.edu/entries/qualia/" } },
                        { id: "hard_problem", title_en: "The Hard Problem of Consciousness", titleZh: "意识的难问题", nodeType: "Argument", philosophers: ["David Chalmers"], links: { sep: "https://plato.stanford.edu/entries/consciousness-chic/" } }
                    ]
                }
            ]
        },
        {
            id: "metaphysics", title_en: "5. Metaphysics", titleZh: "5. 形而上学", nodeType: "Field",
            description: "The study of being, existence, modality, and causation.",
            links: { sep: "https://plato.stanford.edu/entries/metaphysics/" },
            children: [
                {
                    id: "meta_ontology", title_en: "Ontology & Universals", titleZh: "本体论与共相", nodeType: "Subfield",
                    children: [
                        { id: "universals_particulars", title_en: "Universals and Particulars", titleZh: "共相与殊相", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/universals/" } },
                        { id: "realism_nominalism", title_en: "Realism vs. Nominalism", titleZh: "实在论与唯名论", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/nominalism-metaphysics/" } }
                    ]
                },
                {
                    id: "meta_modality", title_en: "Modality & Possible Worlds", titleZh: "模态与可能世界", nodeType: "Subfield",
                    children: [
                        { id: "possible_worlds", title_en: "Possible Worlds", titleZh: "可能世界", nodeType: "Concept", philosophers: ["Gottfried Leibniz", "David Lewis", "Saul Kripke"], links: { sep: "https://plato.stanford.edu/entries/possible-worlds/" } },
                        { id: "essentialism", title_en: "Essentialism", titleZh: "本质主义", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/essential-accidental/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_science", title_en: "6. Philosophy of Science", titleZh: "6. 科学哲学", nodeType: "Field",
            description: "The study of scientific method, explanation, and realism.",
            links: { sep: "https://plato.stanford.edu/entries/science/" },
            children: [
                {
                    id: "sci_confirmation", title_en: "Confirmation & Falsification", titleZh: "确认与证伪", nodeType: "Subfield",
                    children: [
                        { id: "falsificationism", title_en: "Karl Popper & Falsificationism", titleZh: "波普尔与证伪主义", nodeType: "Theory", philosophers: ["Karl Popper"], links: { sep: "https://plato.stanford.edu/entries/popper/" } },
                        { id: "paradigm_shifts", title_en: "Thomas Kuhn & Paradigm Shifts", titleZh: "库恩与范式转换", nodeType: "Theory", philosophers: ["Thomas Kuhn"], links: { sep: "https://plato.stanford.edu/entries/thomas-kuhn/" } }
                    ]
                },
                {
                    id: "sci_realism", title_en: "Scientific Realism", titleZh: "科学实在论", nodeType: "Subfield",
                    children: [
                        { id: "scientific_realism_theory", title_en: "Scientific Realism vs. Anti-Realism", titleZh: "科学实在论与反实在论", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/scientific-realism/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_mathematics", title_en: "7. Philosophy of Mathematics", titleZh: "7. 数学哲学", nodeType: "Field",
            description: "The study of mathematical truth and ontological status of numbers.",
            links: { sep: "https://plato.stanford.edu/entries/philosophy-mathematics/" },
            children: [
                {
                    id: "math_schools", title_en: "Foundational Schools", titleZh: "数学基础流派", nodeType: "Subfield",
                    children: [
                        { id: "logicism", title_en: "Logicism", titleZh: "逻辑主义", nodeType: "Theory", philosophers: ["Gottlob Frege", "Bertrand Russell"], links: { sep: "https://plato.stanford.edu/entries/logicism/" } },
                        { id: "intuitionism_math", title_en: "Intuitionism", titleZh: "直觉主义数学", nodeType: "Theory", philosophers: ["L. E. J. Brouwer"], links: { sep: "https://plato.stanford.edu/entries/intuitionism-mathematics/" } },
                        { id: "platonism_math", title_en: "Mathematical Platonism", titleZh: "数学柏拉图主义", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/platonism-mathematics/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_action", title_en: "8. Philosophy of Action", titleZh: "8. 行动哲学", nodeType: "Field",
            description: "The study of agency, intention, and free will.",
            links: { sep: "https://plato.stanford.edu/entries/action/" },
            children: [
                {
                    id: "action_reasons", title_en: "Intentions & Reasons", titleZh: "意图与行动理由", nodeType: "Subfield",
                    children: [
                        { id: "davidson_action", title_en: "Davidson's Theory of Action", titleZh: "戴维森的行动因果理论", nodeType: "Theory", philosophers: ["Donald Davidson"], links: { sep: "https://plato.stanford.edu/entries/action/" } },
                        { id: "free_will_compatibilism", title_en: "Free Will & Compatibilism", titleZh: "自由意志与兼容论", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/compatibilism/" } }
                    ]
                }
            ]
        },
        {
            id: "ethics_metaethics", title_en: "9. Ethics & Metaethics", titleZh: "9. 伦理学与元伦理学", nodeType: "Field",
            description: "The study of moral facts, moral language, and normative duties.",
            links: { sep: "https://plato.stanford.edu/entries/metaethics/" },
            children: [
                {
                    id: "metaethics_realism", title_en: "Metaethical Theories", titleZh: "元伦理学流派", nodeType: "Subfield",
                    children: [
                        { id: "moral_realism", title_en: "Moral Realism", titleZh: "道德实在论", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/moral-realism/" } },
                        { id: "expressivism", title_en: "Expressivism & Emotivism", titleZh: "表达主义与情感主义", nodeType: "Theory", philosophers: ["A. J. Ayer", "C. L. Stevenson"], links: { sep: "https://plato.stanford.edu/entries/moral-cognitivism/" } }
                    ]
                },
                {
                    id: "normative_ethics", title_en: "Normative Ethics", titleZh: "规范伦理学", nodeType: "Subfield",
                    children: [
                        { id: "consequentialism", title_en: "Consequentialism", titleZh: "后果主义", nodeType: "Theory", philosophers: ["John Stuart Mill", "Jeremy Bentham"], links: { sep: "https://plato.stanford.edu/entries/consequentialism/" } },
                        { id: "deontology", title_en: "Deontology", titleZh: "义务论", nodeType: "Theory", philosophers: ["Immanuel Kant"], links: { sep: "https://plato.stanford.edu/entries/ethics-deontological/" } }
                    ]
                }
            ]
        },
        {
            id: "political_philosophy", title_en: "10. Political Philosophy", titleZh: "10. 政治哲学", nodeType: "Field",
            description: "The study of justice, rights, and legitimate authority.",
            links: { sep: "https://plato.stanford.edu/entries/political-philosophy/" },
            children: [
                {
                    id: "pol_justice", title_en: "Theories of Justice", titleZh: "正义论", nodeType: "Subfield",
                    children: [
                        { id: "rawlsian_justice", title_en: "John Rawls: Justice as Fairness", titleZh: "罗尔斯：作为公平的正义", nodeType: "Theory", philosophers: ["John Rawls"], links: { sep: "https://plato.stanford.edu/entries/rawls/" } },
                        { id: "libertarianism", title_en: "Robert Nozick's Libertarianism", titleZh: "诺齐克的自由至上主义", nodeType: "Theory", philosophers: ["Robert Nozick"], links: { sep: "https://plato.stanford.edu/entries/libertarianism/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_religion", title_en: "11. Philosophy of Religion", titleZh: "11. 宗教哲学", nodeType: "Field",
            description: "The study of religious belief, attributes of God, and problem of evil.",
            links: { sep: "https://plato.stanford.edu/entries/philosophy-religion/" },
            children: [
                {
                    id: "rel_existence_god", title_en: "Arguments for God & Problem of Evil", titleZh: "上帝存在论证与恶的问题", nodeType: "Subfield",
                    children: [
                        { id: "problem_of_evil", title_en: "The Problem of Evil", titleZh: "恶的问题", nodeType: "Argument", philosophers: ["Alvin Goldman", "J. L. Mackie"], links: { sep: "https://plato.stanford.edu/entries/evil/" } }
                    ]
                }
            ]
        },
        {
            id: "aesthetics", title_en: "12. Aesthetics", titleZh: "12. 美学与艺术哲学", nodeType: "Field",
            description: "The nature of beauty, art, and aesthetic experience.",
            links: { sep: "https://plato.stanford.edu/entries/aesthetics/" },
            children: [
                {
                    id: "aest_nature_art", title_en: "Ontology and Definition of Art", titleZh: "艺术的本体论与定义", nodeType: "Subfield",
                    children: [
                        { id: "definition_art", title_en: "Definition of Art", titleZh: "艺术的定义", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/art-definition/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_cognitive_science", title_en: "13. Philosophy of Cognitive Science", titleZh: "13. 认知科学哲学", nodeType: "Field",
            description: "Modularity of mind, connectionism, and embodied cognition.",
            links: { sep: "https://plato.stanford.edu/entries/cognitive-science/" },
            children: [
                {
                    id: "cog_architecture", title_en: "Cognitive Architecture", titleZh: "认知架构与具身认知", nodeType: "Subfield",
                    children: [
                        { id: "embodied_cognition", title_en: "Embodied & Extended Cognition", titleZh: "具身与延展认知", nodeType: "Theory", philosophers: ["Andy Clark", "David Chalmers"], links: { sep: "https://plato.stanford.edu/entries/embodied-cognition/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_ai", title_en: "14. Philosophy of Artificial Intelligence", titleZh: "14. 人工智能哲学", nodeType: "Field",
            description: "Machine consciousness, Turing test, and intentionality of AI.",
            links: { sep: "https://plato.stanford.edu/entries/artificial-intelligence/" },
            children: [
                {
                    id: "ai_chinese_room", title_en: "Machine Intentionality & Chinese Room", titleZh: "机器意向性与中文屋论证", nodeType: "Subfield",
                    children: [
                        { id: "chinese_room", title_en: "The Chinese Room Argument", titleZh: "中文屋论证", nodeType: "Argument", philosophers: ["John Searle"], links: { sep: "https://plato.stanford.edu/entries/chinese-room/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_social_science", title_en: "15. Philosophy of Social Science", titleZh: "15. 社会科学哲学", nodeType: "Field",
            description: "Methodological individualism, social ontology, and collective intentionality.",
            links: { sep: "https://plato.stanford.edu/entries/social-science/" },
            children: [
                {
                    id: "soc_ontology", title_en: "Social Ontology", titleZh: "社会本体论与集体意向性", nodeType: "Subfield",
                    children: [
                        { id: "collective_intentionality", title_en: "Collective Intentionality", titleZh: "集体意向性", nodeType: "Theory", philosophers: ["John Searle", "Raimo Tuomela"], links: { sep: "https://plato.stanford.edu/entries/collective-intentionality/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophy_of_law", title_en: "16. Philosophy of Law", titleZh: "16. 法哲学", nodeType: "Field",
            description: "Legal positivism, natural law, and constitutional interpretation.",
            links: { sep: "https://plato.stanford.edu/entries/law-phil-nature/" },
            children: [
                {
                    id: "law_positivism", title_en: "Legal Positivism vs. Natural Law", titleZh: "法律实证主义与自然法学", nodeType: "Subfield",
                    children: [
                        { id: "legal_positivism", title_en: "Legal Positivism", titleZh: "法律实证主义", nodeType: "Theory", philosophers: ["H. L. A. Hart", "Hans Kelsen"], links: { sep: "https://plato.stanford.edu/entries/legal-positivism/" } }
                    ]
                }
            ]
        },
        {
            id: "decision_theory", title_en: "17. Decision Theory & Rational Choice", titleZh: "17. 决策论与理性选择", nodeType: "Field",
            description: "Expected utility, game theory, and decision paradoxes.",
            links: { sep: "https://plato.stanford.edu/entries/decision-theory/" },
            children: [
                {
                    id: "dec_utility", title_en: "Expected Utility & Newcomb's Problem", titleZh: "期望效用与纽科姆悖论", nodeType: "Subfield",
                    children: [
                        { id: "newcombs_problem", title_en: "Newcomb's Problem", titleZh: "纽科姆悖论", nodeType: "Argument", philosophers: ["Robert Nozick"], links: { sep: "https://plato.stanford.edu/entries/newcomb-problem/" } }
                    ]
                }
            ]
        },
        {
            id: "philosophical_methodology", title_en: "18. Philosophical Methodology", titleZh: "18. 哲学方法论", nodeType: "Field",
            description: "Conceptual analysis, thought experiments, and experimental philosophy.",
            links: { sep: "https://plato.stanford.edu/entries/methods-philosophy/" },
            children: [
                {
                    id: "meth_analysis", title_en: "Conceptual Analysis & X-Phi", titleZh: "概念分析与实验哲学 (X-Phi)", nodeType: "Subfield",
                    children: [
                        { id: "experimental_philosophy", title_en: "Experimental Philosophy", titleZh: "实验哲学", nodeType: "Theory", links: { sep: "https://plato.stanford.edu/entries/experimental-philosophy/" } }
                    ]
                }
            ]
        },
        {
            id: "history_analytic", title_en: "19. History & Foundations of Analytic Phil.", titleZh: "19. 分析哲学史与思想基础", nodeType: "Field",
            description: "The historical evolution and meta-philosophical nature of analytic tradition.",
            links: { sep: "https://plato.stanford.edu/entries/analytic-philosophy/" },
            children: [
                {
                    id: "hist_tradition", title_en: "The Analytic Tradition", titleZh: "分析哲学传统的元哲学反思", nodeType: "Subfield",
                    children: [
                        { id: "analytic_nature", title_en: "Nature of Analytic Philosophy", titleZh: "分析哲学的基本特征", nodeType: "Concept", links: { sep: "https://plato.stanford.edu/entries/analytic-philosophy/" } }
                    ]
                }
            ]
        }
    ]
};

// 跨学科关联网络 (Cross-References - 用于绘制柔和曲线虚线)
const crossLinksData = [
    { source: "mind_body_problem", target: "metaphysics", relationType: "Ontological Implication" },
    { source: "modal_logic", target: "possible_worlds", relationType: "Formal Semantics" },
    { source: "wittgenstein", target: "logic", relationType: "Early Critique" },
    { source: "rigorous_designator", target: "metaphysics", relationType: "Essentialism Anchor" },
    { source: "chinese_room", target: "philosophy_of_mind", relationType: "Against Strong AI" }
];