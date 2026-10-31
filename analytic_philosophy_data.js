/* 分析哲学知识树 —— 数据
 * 8 条主枝 / 32 个子簇 / 160 个词条
 * sep.verified=false 表示 slug 不确定，链接走 SEP 站内检索，按钮文案为「在 SEP 检索」
 */
window.PHIL_DATA = (function () {
  var E = "https://plato.stanford.edu/entries/";
  var Q = "https://plato.stanford.edu/search/searcher.py?query=";

  function K(id, zh, en, type, tier, gloss, slug, related, py) {
    var sep = slug
      ? { title: en, slug: slug, url: E + slug + "/", verified: true }
      : { title: en, slug: null, url: Q + encodeURIComponent(en), verified: false };
    return {
      id: id, zh: zh, en: en, type: type, tier: tier, gloss: gloss,
      sep: sep, wiki: null, related: related ? related.split("|") : [], py: py || ""
    };
  }
  function C(id, zh, en, kw) { return { id: id, zh: zh, en: en, keywords: kw }; }
  function B(id, zh, en, side, order, color, intro, cl) {
    return { id: id, zh: zh, en: en, side: side, order: order, color: color, intro: intro, clusters: cl };
  }
  function L(from, to, label) { return { from: from, to: to, label: label }; }

  var lang = B("lang", "语言哲学", "Philosophy of Language", "left", 1, "#7C9A6D",
    "语言如何承载意义、指称与世界的关系", [
    C("lang.meaning", "意义与指称", "Meaning and Reference", [
      K("meaning", "意义理论", "Theories of Meaning", "概念", 1, "解释表达式凭什么具有意义", "meaning", "reference|semantics", "yyll"),
      K("reference", "指称", "Reference", "概念", 1, "词语与它所指对象之间的关系", "reference", "meaning|names", "cz"),
      K("names", "专名", "Names", "概念", 1, "专名如何锁定对象、是否携带描述", "names", "reference|descriptions", "zm"),
      K("descriptions", "摹状词", "Descriptions", "概念", 1, "限定摹状词的语义与指称机制", "descriptions", "names|logical-form", "mzc"),
      K("rigid-designators", "刚性指示词", "Rigid Designators", "概念", 2, "在所有可能世界都指同一对象的词", "rigid-designators", "names|possible-worlds", "gxzsc")
    ]),
    C("lang.pragmatics", "语义与语用", "Semantics and Pragmatics", [
      K("speech-acts", "言语行为", "Speech Acts", "概念", 1, "说话同时也在做事的语言行动", "speech-acts", "assertion|pragmatics", "yyxw"),
      K("pragmatics", "语用学", "Pragmatics", "概念", 1, "语境如何补足字面意义", "pragmatics", "speech-acts|implicature", "yyx"),
      K("assertion", "断言", "Assertion", "概念", 1, "有真假可言、需承担辩护的言语行为", "assertion", "speech-acts|truth", "dy"),
      K("implicature", "会话含意", "Conversational Implicature", "概念", 2, "说出来的话暗示了未说出的内容", null, "pragmatics|assertion", "hhhy"),
      K("presupposition", "预设", "Presupposition", "概念", 2, "句子默认成立、被当作背景的内容", null, "pragmatics|descriptions", "ys")
    ]),
    C("lang.structure", "语义结构", "Semantic Structure", [
      K("compositionality", "组合性", "Compositionality", "概念", 1, "整体意义由部分与组合方式决定", "compositionality", "meaning|semantics", "zhx"),
      K("logical-form", "逻辑形式", "Logical Form", "概念", 1, "刻画真值条件的句法骨架", "logical-form", "descriptions|compositionality", "ljxs"),
      K("truth", "真", "Truth", "概念", 1, "句子与事实相合，还是一致、冗余", "truth", "meaning|assertion", "z"),
      K("propositions", "命题", "Propositions", "概念", 2, "承载真假、可被相信的抽象内容", "propositions", "truth|meaning", "mt"),
      K("semantics", "语义学", "Semantics", "概念", 1, "系统研究意义与真值条件", null, "pragmatics|compositionality", "yiyx")
    ]),
    C("lang.mind", "语言与心灵", "Language and Mind", [
      K("private-language", "私人语言论证", "Private Language Argument", "论证", 2, "不可能有原则上不可公共检验的语言", "private-language", "rule-following|meaning", "sryylz"),
      K("rule-following", "遵守规则", "Rule-Following", "问题", 2, "规则如何约束未来的用法", "rule-following", "private-language|meaning", "zsgz"),
      K("metaphor", "隐喻", "Metaphor", "概念", 2, "字面为假却仍传达内容的表达", "metaphor", "pragmatics|meaning", "yy"),
      K("slurs", "蔑称", "Slurs", "概念", 2, "携带贬损态度的指称词", "slurs", "reference|pragmatics", "mc"),
      K("innateness", "语言天赋", "Innateness and Language", "问题", 2, "语言能力有多少出自先天结构", null, "compositionality|rationalism-empiricism", "yytf")
    ])
  ]);

  var logic = B("logic", "逻辑与数学哲学", "Logic and Philosophy of Mathematics", "left", 2, "#B08968",
    "推理形式、真理与数学基础", [
    C("logic.systems", "逻辑系统", "Logical Systems", [
      K("logic-classical", "经典逻辑", "Classical Logic", "概念", 1, "以二值与真值函数为核心的逻辑", "logic-classical", "logical-consequence|logic-modal", "jdlj"),
      K("logic-modal", "模态逻辑", "Modal Logic", "概念", 1, "用必然、可能算子刻画模态", "logic-modal", "possible-worlds|logic-classical", "mtlj"),
      K("logic-intuitionistic", "直觉主义逻辑", "Intuitionistic Logic", "概念", 2, "拒斥排中律、以构造为真的逻辑", "logic-intuitionistic", "logic-classical|proof-theory", "zjzylj"),
      K("logic-paraconsistent", "次协调逻辑", "Paraconsistent Logic", "概念", 2, "容许矛盾而不使一切命题成立", "logic-paraconsistent", "logic-classical|truth-values", "ccxtlj"),
      K("logic-manyvalued", "多值逻辑", "Many-Valued Logic", "概念", 2, "真值多于两个的逻辑系统", "logic-manyvalued", "truth|logic-classical", "dzlj")
    ]),
    C("logic.philosophy", "逻辑哲学", "Philosophy of Logic", [
      K("logical-consequence", "逻辑后承", "Logical Consequence", "概念", 1, "前提真则结论必真的关系", "logical-consequence", "logic-classical|logical-constants", "ljhc"),
      K("logical-constants", "逻辑常项", "Logical Constants", "概念", 2, "决定论证形式的固定词项", "logical-constants", "logical-consequence|logical-form", "ljcx"),
      K("identity", "同一性", "Identity", "概念", 2, "对象与自身相同的逻辑关系", "identity", "properties|logic-classical", "tyx"),
      K("quantifiers", "量词", "Quantifiers", "概念", 2, "表达全部与部分关系的算子", null, "logical-consequence|logic-classical", "lc"),
      K("truth-values", "真值", "Truth Values", "概念", 2, "句子在真假维度上的取值", null, "truth|logic-manyvalued", "zz")
    ]),
    C("logic.math", "数学哲学", "Philosophy of Mathematics", [
      K("goedel-incompleteness", "哥德尔不完全性定理", "Gödel's Incompleteness Theorems", "论证", 1, "足够强的系统存在不可证的真命题", "goedel-incompleteness", "logicism|platonism-mathematics", "gdebwqxl"),
      K("set-theory", "集合论", "Set Theory", "概念", 1, "以集合为基本对象的数学基础", "set-theory", "russells-paradox|platonism-mathematics", "jhl"),
      K("russells-paradox", "罗素悖论", "Russell's Paradox", "问题", 1, "不包含自身的集合所构成的悖论", "russells-paradox", "set-theory|logicism", "lsbl"),
      K("logicism", "逻辑主义", "Logicism", "立场", 1, "数学可以归约为逻辑", "logicism", "frege|goedel-incompleteness", "ljzy"),
      K("platonism-mathematics", "数学柏拉图主义", "Platonism in the Philosophy of Mathematics", "立场", 1, "数学对象独立于心灵而存在", "platonism-mathematics", "set-theory|existence", "sxbltzy")
    ]),
    C("logic.proof", "证明与模型", "Proof and Models", [
      K("proof-theory", "证明论", "Proof Theory", "概念", 2, "把证明本身当作对象来研究", "proof-theory", "logic-intuitionistic|goedel-incompleteness", "zml"),
      K("model-theory", "模型论", "Model Theory", "概念", 2, "用结构解释形式语言的真", "model-theory", "set-theory|logical-consequence", "mxl"),
      K("type-theory", "类型论", "Type Theory", "概念", 2, "以类型分层避免悖论的基础理论", "type-theory", "russells-paradox|goedel-incompleteness", "lxl"),
      K("completeness", "完全性", "Completeness", "概念", 2, "有效式皆可证、语义与语法相合", null, "goedel-incompleteness|model-theory", "wqx"),
      K("computability", "可计算性", "Computability", "概念", 2, "哪些函数能被机械步骤算出", null, "goedel-incompleteness|type-theory", "kjsx")
    ])
  ]);

  var epist = B("epist", "认识论", "Epistemology", "left", 3, "#6E8FA8",
    "知识是什么、信念凭什么被辩护", [
    C("epist.nature", "知识的本性", "The Nature of Knowledge", [
      K("knowledge-analysis", "知识分析", "The Analysis of Knowledge", "问题", 1, "知识是否为有辩护的真信念", "knowledge-analysis", "gettier|epistemic-justification", "zsfx"),
      K("gettier", "葛梯尔问题", "Gettier Problem", "问题", 1, "有辩护的真信念仍可能不是知识", "gettier", "knowledge-analysis|epistemic-justification", "gtewt"),
      K("apriori", "先验知识", "A Priori Justification and Knowledge", "概念", 1, "不依赖经验即可获得辩护", "apriori", "epistemic-justification|necessity", "xyz s".replace(" ", "")),
      K("rationalism-empiricism", "理性主义与经验主义", "Rationalism vs. Empiricism", "立场", 2, "知识究竟源于理性还是经验", "rationalism-empiricism", "apriori|induction", "lxzyyjyzy"),
      K("certainty", "确定性", "Certainty", "概念", 2, "无可怀疑的认知状态", "certainty", "skepticism|apriori", "qdx")
    ]),
    C("epist.justification", "辩护", "Epistemic Justification", [
      K("epistemic-justification", "认知辩护", "Epistemic Justification", "概念", 1, "信念何以为真提供保证", "epistemic-justification", "knowledge-analysis|reliabilism", "rzbh"),
      K("justification-foundational", "基础主义", "Foundationalist Theories of Justification", "立场", 1, "辩护终止于自明的基础信念", "justification-foundational", "epistemic-justification|justification-coherentism", "jczy"),
      K("justification-coherentism", "融贯论", "Coherentist Theories of Justification", "立场", 1, "信念因相互支持而成环地辩护", "justification-coherentism", "justification-foundational|epistemic-justification", "rgl"),
      K("reliabilism", "可靠主义", "Reliabilism", "立场", 1, "由可靠过程产生的真信念即被辩护", "reliabilism", "epistemic-justification|epistemology-virtue", "kkzy"),
      K("evidentialism", "证据主义", "Evidentialism", "立场", 2, "信念的辩护取决于手中证据", "evidentialism", "epistemic-justification|disagreement", "zjzy")
    ]),
    C("epist.virtue", "德性与社会", "Virtue and Social Epistemology", [
      K("epistemology-virtue", "德性认识论", "Virtue Epistemology", "立场", 1, "知识出自主体的理智德性", "epistemology-virtue", "reliabilism|epistemic-justification", "dxrzl"),
      K("epistemology-social", "社会认识论", "Social Epistemology", "概念", 1, "知识如何依赖他人与社群", "epistemology-social", "testimony|epistemic-injustice", "shrzl"),
      K("testimony", "证言", "Testimony", "概念", 2, "听信他人而获得的知识", "testimony", "epistemology-social|epistemic-justification", "zy"),
      K("epistemic-injustice", "认知不正义", "Epistemic Injustice", "概念", 2, "因身份被削弱可信度或理解力", "epistemic-injustice", "epistemology-social|testimony", "rzbzy"),
      K("disagreement", "分歧", "Disagreement", "问题", 2, "同侪分歧时该如何调整信念", "disagreement", "epistemic-justification|epistemology-social", "fq")
    ]),
    C("epist.skepticism", "怀疑与语境", "Skepticism and Context", [
      K("skepticism", "怀疑论", "Skepticism", "立场", 1, "我们缺乏知识，或知识需更强条件", "skepticism", "closure-epistemic|certainty", "hyl"),
      K("skepticism-ancient", "古代怀疑论", "Ancient Skepticism", "概念", 2, "以悬置判断求得宁静的传统", "skepticism-ancient", "skepticism|certainty", "gdhyl"),
      K("closure-epistemic", "认知闭合", "Epistemic Closure", "概念", 2, "已知所蕴含者是否也被知", "closure-epistemic", "skepticism|epistemic-justification", "rzbi"),
      K("contextualism-epistemology", "认知语境主义", "Epistemic Contextualism", "立场", 2, "知识标准随语境高低变化", "contextualism-epistemology", "skepticism|epistemic-justification", "rzyjzy"),
      K("epistemology-bayesian", "贝叶斯认识论", "Bayesian Epistemology", "概念", 2, "用概率与条件化刻画信念更新", "epistemology-bayesian", "epistemic-justification|confirmation", "bysrzl")
    ])
  ]);

  var hist = B("hist", "分析哲学史与方法", "History and Method", "left", 4, "#9A9A6B",
    "从弗雷格到蒯因：方法如何成形", [
    C("hist.founders", "奠基者", "Founders", [
      K("frege", "弗雷格", "Frege", "人物", 1, "现代逻辑与分析哲学的共同起点", "frege", "logicism|meaning", "flg"),
      K("russell", "罗素", "Russell", "人物", 1, "摹状词理论与逻辑原子主义", "russell", "descriptions|logical-atomism", "ls"),
      K("moore", "摩尔", "Moore", "人物", 2, "以常识与直观反驳唯心论", "moore", "ordinary-language|conceptual-analysis", "me"),
      K("wittgenstein", "维特根斯坦", "Wittgenstein", "人物", 1, "从图像论走向语言游戏", "wittgenstein", "private-language|rule-following", "wtgst"),
      K("carnap", "卡尔纳普", "Carnap", "人物", 1, "逻辑经验主义与语言框架", "carnap", "logical-empiricism|analytic-synthetic", "kenp")
    ]),
    C("hist.method", "方法", "Method", [
      K("analysis", "分析", "Analysis", "概念", 1, "把复杂概念拆解为更基本成分", "analysis", "conceptual-analysis|ordinary-language", "fx"),
      K("logical-atomism", "逻辑原子主义", "Logical Atomism", "立场", 2, "世界由逻辑独立的原子事实构成", "logical-atomism", "russell|wittgenstein", "ljyzzy"),
      K("logical-empiricism", "逻辑经验主义", "Logical Empiricism", "立场", 1, "有意义者须可经验验证", "logical-empiricism", "carnap|analytic-synthetic", "ljjyyz"),
      K("ordinary-language", "日常语言哲学", "Ordinary Language Philosophy", "立场", 2, "回到用法本身消解哲学困惑", "ordinary-language", "wittgenstein|analysis", "rcyyzx"),
      K("conceptual-analysis", "概念分析", "Conceptual Analysis", "概念", 2, "以必要充分条件刻画概念", "conceptual-analysis", "analysis|experimental-philosophy", "gnfx")
    ]),
    C("hist.distinctions", "核心区分", "Key Distinctions", [
      K("analytic-synthetic", "分析/综合区分", "Analytic/Synthetic Distinction", "概念", 1, "凭意义为真与凭事实为真", "analytic-synthetic", "quine|logical-empiricism", "fxzhqc"),
      K("necessity", "必然性", "Necessity", "概念", 2, "不可能为假的存在方式", "necessity", "possible-worlds|apriori", "brx"),
      K("quine", "蒯因", "Quine", "人物", 1, "整体主义与自然化认识论", "quine", "analytic-synthetic|naturalism", "ky"),
      K("davidson", "戴维森", "Davidson", "人物", 2, "行动理由与语言解释", "davidson", "action|meaning", "dss"),
      K("grice", "格赖斯", "Grice", "人物", 2, "会话含意与意义理论", "grice", "implicature|meaning", "gls")
    ]),
    C("hist.contemporary", "当代走向", "Contemporary Turns", [
      K("naturalism", "自然主义", "Naturalism", "立场", 1, "哲学应与经验科学保持连续", "naturalism", "quine|reliabilism", "zrzy"),
      K("experimental-philosophy", "实验哲学", "Experimental Philosophy", "概念", 2, "用问卷检验哲学直觉", "experimental-philosophy", "conceptual-analysis|disagreement", "syzx"),
      K("sellars", "塞拉斯", "Sellars", "人物", 2, "在科学图像与显明图像之间", "sellars", "naturalism|conceptual-analysis", "sls"),
      K("ryle", "赖尔", "Ryle", "人物", 2, "以范畴错误批评笛卡尔式心灵", "ryle", "dualism|ordinary-language", "le"),
      K("dummett", "达米特", "Dummett", "人物", 2, "意义即使用、反实在论", "dummett", "meaning|truth", "dmt")
    ])
  ]);

  var mind = B("mind", "心灵哲学", "Philosophy of Mind", "right", 1, "#8C7AA8",
    "心灵与身体、意识与内容究竟是什么", [
    C("mind.body", "心物关系", "Mind-Body Problem", [
      K("dualism", "二元论", "Dualism", "立场", 1, "心灵与身体是两类不同实体", "dualism", "physicalism|mental-causation", "eyl"),
      K("physicalism", "物理主义", "Physicalism", "立场", 1, "一切存在最终都是物理的", "physicalism", "dualism|supervenience", "wlzy"),
      K("functionalism", "功能主义", "Functionalism", "立场", 1, "心灵状态由因果角色而定", "functionalism", "properties-emergent|qualia", "gnzy"),
      K("neutral-monism", "中性一元论", "Neutral Monism", "立场", 2, "心与物是同一中性材料的两面", "neutral-monism", "panpsychism|dualism", "zxyyl"),
      K("mind-body-problem", "心身问题", "Mind-Body Problem", "问题", 1, "心理状态如何与物理状态相关", "mind-body-problem", "dualism|physicalism", "xswt")
    ]),
    C("mind.consciousness", "意识", "Consciousness", [
      K("consciousness", "意识", "Consciousness", "概念", 1, "经验的主观在场", "consciousness", "qualia|hard-problem", "ys"),
      K("qualia", "感受质", "Qualia", "概念", 1, "经验中「像什么」那样的主观特征", "qualia", "consciousness|physicalism", "gsz"),
      K("hard-problem", "困难问题", "The Hard Problem of Consciousness", "问题", 1, "为何物理过程伴随主观经验", "hard-problem", "consciousness|qualia", "knwt"),
      K("panpsychism", "泛心论", "Panpsychism", "立场", 2, "意识是万物的基本特征", "panpsychism", "neutral-monism|hard-problem", "fxl"),
      K("properties-emergent", "突现属性", "Emergent Properties", "概念", 2, "整体层面出现、不可还原的新性质", "properties-emergent", "supervenience|reduction", "txsx")
    ]),
    C("mind.content", "内容与意向", "Content and Intentionality", [
      K("intentionality", "意向性", "Intentionality", "概念", 1, "心理状态指向对象与事态", "intentionality", "mental-content|meaning", "yxx"),
      K("mental-content", "心理内容", "Mental Content", "概念", 2, "信念与知觉所表征的内容", "mental-content", "intentionality|propositions", "xlnr"),
      K("chinese-room", "中文屋", "Chinese Room Argument", "论证", 1, "按规则操作符号不等于理解", "chinese-room", "intentionality|artificial-intelligence", "zww"),
      K("artificial-intelligence", "人工智能", "Artificial Intelligence", "概念", 2, "机器能否具有心灵", "artificial-intelligence", "chinese-room|turing-test", "rgzn"),
      K("turing-test", "图灵测试", "Turing Test", "概念", 2, "以对话行为判定机器智能", "turing-test", "artificial-intelligence|chinese-room", "tlcs")
    ]),
    C("mind.architecture", "心灵架构", "Architecture of Mind", [
      K("connectionism", "联结主义", "Connectionism", "概念", 2, "用网络权重解释认知", "connectionism", "modularity-mind|embodied-cognition", "lianjzy"),
      K("modularity-mind", "心智模块性", "Modularity of Mind", "概念", 2, "心灵由领域特殊的模块组成", "modularity-mind", "connectionism|extended-mind", "xzmkx"),
      K("extended-mind", "延展心灵", "Extended Mind", "立场", 2, "认知过程可以延伸到环境", "extended-mind", "embodied-cognition|intentionality", "yzxl"),
      K("embodied-cognition", "具身认知", "Embodied Cognition", "概念", 2, "认知依赖身体与行动", "embodied-cognition", "extended-mind|consciousness", "jsrz"),
      K("mental-causation", "心理因果", "Mental Causation", "问题", 1, "心理状态能否引起物理变化", "mental-causation", "dualism|physicalism", "xlyg")
    ])
  ]);

  var meta = B("meta", "形而上学", "Metaphysics", "right", 2, "#A8836B",
    "存在什么、如何存在、如何变化", [
    C("meta.ontology", "存在与范畴", "Existence and Categories", [
      K("existence", "存在", "Existence", "概念", 1, "说某物存在究竟意味着什么", "existence", "universals|ontological-commitment", "cz"),
      K("universals", "共相", "Universals", "概念", 1, "多个事物共享的性质是否实在", "universals", "properties|nominalism", "gx"),
      K("properties", "属性", "Properties", "概念", 1, "事物所具有的性质究竟是什么", "properties", "universals|dispositions", "sx"),
      K("nominalism", "唯名论", "Nominalism", "立场", 2, "只存在个别事物，没有共相", "nominalism", "universals|properties", "wml"),
      K("ontological-commitment", "本体论承诺", "Ontological Commitment", "概念", 2, "理论说有什么才算有什么", "ontological-commitment", "existence|quine", "btlcn")
    ]),
    C("meta.modality", "模态", "Modality", [
      K("possible-worlds", "可能世界", "Possible Worlds", "概念", 1, "刻画可能与必然的模型", "possible-worlds", "modality|necessity", "knsj"),
      K("modality", "模态", "Modality", "概念", 1, "必然、可能、不可能的存在方式", "modality", "possible-worlds|necessity", "mt"),
      K("essential-accidental", "本质与偶性", "Essential vs. Accidental Properties", "概念", 2, "哪些属性属于事物的本质", "essential-accidental", "properties|modality", "bzyx"),
      K("counterfactuals", "反事实条件句", "Counterfactuals", "概念", 2, "若怎样则怎样的虚拟条件", "counterfactuals", "causation-counterfactual|modality", "fssj"),
      K("dispositions", "倾向", "Dispositions", "概念", 2, "事物在特定条件下会如何反应", "dispositions", "properties|laws-nature", "qx")
    ]),
    C("meta.identity", "同一与构成", "Identity and Constitution", [
      K("identity-time", "历时同一性", "Identity over Time", "问题", 1, "对象在变化中如何保持同一", "identity-time", "identity-personal|persistence", "lstyx"),
      K("identity-personal", "人格同一性", "Personal Identity", "问题", 1, "什么使一个人跨时间还是同一个人", "identity-personal", "identity-time|moral-responsibility", "rgtyx"),
      K("material-constitution", "物质构成", "Material Constitution", "问题", 2, "同一堆材料能构成几个对象", "material-constitution", "identity-time|mereology", "wztc"),
      K("mereology", "分体论", "Mereology", "概念", 2, "部分与整体的形式关系", "mereology", "material-constitution|identity-time", "ftl"),
      K("persistence", "持存", "Persistence", "概念", 2, "对象如何在时间中延续", "persistence", "identity-time|time", "cx")
    ]),
    C("meta.causation", "因果与时间", "Causation and Time", [
      K("causation-metaphysical", "因果性", "Causation", "概念", 1, "一个事件何以产生另一个事件", "causation-metaphysical", "causation-counterfactual|laws-nature", "ygx"),
      K("causation-counterfactual", "反事实因果", "Counterfactual Theories of Causation", "立场", 2, "因果就是反事实依赖", "causation-counterfactual", "causation-metaphysical|counterfactuals", "fsyyg"),
      K("time", "时间", "Time", "概念", 1, "时间流逝与先后关系是否客观", "time", "persistence|causation-metaphysical", "sj"),
      K("determinism-causal", "因果决定论", "Causal Determinism", "立场", 2, "过去与定律决定未来", "determinism-causal", "freewill|causation-metaphysical", "ygjd"),
      K("supervenience", "随附性", "Supervenience", "概念", 2, "低层属性固定则高层随之固定", "supervenience", "properties-emergent|physicalism", "sfx")
    ])
  ]);

  var sci = B("sci", "科学哲学", "Philosophy of Science", "right", 3, "#A87A8A",
    "科学理论为真吗、说明与进步如何可能", [
    C("sci.realism", "实在论与理论", "Realism and Theory", [
      K("scientific-realism", "科学实在论", "Scientific Realism", "立场", 1, "成熟科学理论近似为真", "scientific-realism", "theory-observation|constructive-empiricism", "kxszl"),
      K("constructive-empiricism", "建构经验主义", "Constructive Empiricism", "立场", 2, "理论只求经验适当，不求为真", "constructive-empiricism", "scientific-realism|underdetermination", "jjjyyz"),
      K("theory-observation", "理论与观察", "Theory and Observation", "概念", 1, "观察是否独立于理论", "theory-observation", "scientific-realism|experiment", "llygc"),
      K("underdetermination", "不充分决定", "Underdetermination of Scientific Theory", "问题", 1, "证据不足以在理论间抉择", "underdetermination", "scientific-realism|theory-observation", "bcfjd"),
      K("scientific-revolution", "科学革命", "Scientific Revolutions", "概念", 1, "范式更替而非累积进步", "scientific-revolution", "thomas-kuhn|scientific-progress", "kxgm")
    ]),
    C("sci.explanation", "说明与定律", "Explanation and Laws", [
      K("scientific-explanation", "科学说明", "Scientific Explanation", "概念", 1, "说明比描述多出了什么", "scientific-explanation", "laws-nature|causation-manipulation", "kxsm"),
      K("laws-nature", "自然定律", "Laws of Nature", "概念", 1, "定律是必然关系还是规则性", "laws-nature", "dispositions|causation-metaphysical", "zrdl"),
      K("models-science", "科学模型", "Models in Science", "概念", 2, "模型如何中介理论与世界", "models-science", "scientific-explanation|reduction", "kxmx"),
      K("scientific-progress", "科学进步", "Scientific Progress", "概念", 1, "科学知识是否在逼近真理", "scientific-progress", "scientific-revolution|scientific-realism", "kxjb"),
      K("reduction", "还原", "Reduction", "概念", 2, "高层理论能否被低层理论吸收", "reduction", "physicalism|models-science", "hy")
    ]),
    C("sci.causation", "因果与推断", "Causation and Inference", [
      K("causation-probabilistic", "概率因果", "Probabilistic Causation", "概念", 2, "原因提高结果发生的概率", "causation-probabilistic", "causation-manipulation|confirmation", "glyg"),
      K("causation-manipulation", "干预主义因果", "Causation and Manipulability", "概念", 2, "因果就是干预之下的变化", "causation-manipulation", "causation-probabilistic|laws-nature", "gyzyyg"),
      K("induction", "归纳问题", "The Problem of Induction", "问题", 1, "归纳推理如何得到辩护", "induction", "confirmation|rationalism-empiricism", "glwt"),
      K("confirmation", "确证", "Confirmation", "概念", 2, "证据如何支持一个假说", "confirmation", "induction|epistemology-bayesian", "qz"),
      K("experiment", "实验", "Experiment in Physics", "概念", 2, "实验如何产生可信的事实", null, "theory-observation|scientific-realism", "sy")
    ]),
    C("sci.change", "科学变迁", "Scientific Change", [
      K("thomas-kuhn", "库恩", "Thomas Kuhn", "人物", 1, "范式、常规科学与危机", "thomas-kuhn", "scientific-revolution|popper", "ke"),
      K("popper", "波普尔", "Karl Popper", "人物", 1, "以可证伪性作为科学划界", "popper", "falsifiability|thomas-kuhn", "bpe"),
      K("falsifiability", "可证伪性", "Falsifiability", "概念", 2, "能被观察反驳的才算科学", "falsifiability", "popper|demarcation", "kzwx"),
      K("lakatos", "拉卡托斯", "Lakatos", "人物", 2, "研究纲领的硬核与保护带", "lakatos", "thomas-kuhn|popper", "lkts"),
      K("demarcation", "划界问题", "Demarcation", "问题", 2, "科学与非科学如何区分", null, "falsifiability|popper", "hjwt")
    ])
  ]);

  var action = B("action", "行动哲学", "Philosophy of Action", "right", 4, "#6F8F8A",
    "什么算行动、为何行动、谁该负责", [
    C("action.intention", "行动与意图", "Action and Intention", [
      K("action", "行动", "Action", "概念", 1, "什么使一个事件成为行动", "action", "intention|practical-reason", "xd"),
      K("intention", "意图", "Intention", "概念", 1, "意图是信念还是独特心理状态", "intention", "action|weakness-will", "yt"),
      K("practical-reason", "实践理性", "Practical Reason", "概念", 1, "如何从目的推出该做什么", "practical-reason", "action|intention", "sjlx"),
      K("reasons-internal-external", "内在与外在理由", "Reasons for Action", "概念", 2, "理由是否必然与动机相连", "reasons-internal-external", "practical-reason|moral-responsibility", "nzywzly"),
      K("instrumental-reason", "工具理性", "Instrumental Rationality", "概念", 2, "手段与目的之间的理性要求", null, "practical-reason|action", "gjlx")
    ]),
    C("action.will", "意志与自由", "Will and Freedom", [
      K("weakness-will", "意志薄弱", "Weakness of Will", "问题", 1, "明知该做却做不到", "weakness-will", "intention|practical-reason", "yzbr"),
      K("freewill", "自由意志", "Free Will", "问题", 1, "行动能否出于自己而非被决定", "freewill", "compatibilism|determinism-causal", "zyyz"),
      K("compatibilism", "相容论", "Compatibilism", "立场", 1, "自由与决定论可以并存", "compatibilism", "freewill|moral-responsibility", "xrl"),
      K("agent-causation", "行动者因果", "Agent Causation", "概念", 2, "行动者本身作为原因的开端", "agent-causation", "freewill|causation-metaphysical", "xdzyg"),
      K("moral-responsibility", "道德责任", "Moral Responsibility", "概念", 1, "何时该为行为负责", "moral-responsibility", "freewill|blame", "ddze")
    ]),
    C("action.collective", "集体与共享", "Collective and Shared", [
      K("collective-intentionality", "集体意向性", "Collective Intentionality", "概念", 1, "我们的意图如何不同于我的意图", "collective-intentionality", "shared-agency|convention", "jtyxx"),
      K("shared-agency", "共享能动性", "Shared Agency", "概念", 2, "多人如何共同行动", "shared-agency", "collective-intentionality|action", "gxdnx"),
      K("convention", "约定", "Convention", "概念", 2, "协调问题如何形成稳定预期", "convention", "collective-intentionality|joint-commitment", "yd"),
      K("joint-commitment", "联合承诺", "Joint Commitment", "概念", 2, "共同行动中的相互义务", null, "shared-agency|collective-intentionality", "lhcn"),
      K("blame", "责备", "Blame", "概念", 2, "责备是否预设自由与能力", "blame", "moral-responsibility|doing-allowing", "zb")
    ]),
    C("action.normative", "行动与规范", "Action and Norms", [
      K("double-effect", "双重效应", "Doctrine of Double Effect", "概念", 2, "副作用与作为手段的区分", "double-effect", "intention|doing-allowing", "scxy"),
      K("doing-allowing", "作为与放任", "Doing vs. Allowing Harm", "概念", 2, "主动伤害与放任伤害之别", "doing-allowing", "double-effect|moral-responsibility", "zwyfl"),
      K("autonomy-moral", "自主性", "Autonomy", "概念", 2, "自己为自己立法", "autonomy-moral", "practical-reason|moral-responsibility", "zzx"),
      K("action-individuation", "行动个体化", "Action Individuation", "概念", 2, "一个行动还是多个行动", null, "action|intention", "xdgth"),
      K("causal-theory-action", "行动的因果理论", "The Causal Theory of Action", "立场", 2, "行动由意图引起", null, "action|intention", "xdygll")
    ])
  ]);

  return {
    version: "1.0",
    branches: [lang, logic, epist, hist, mind, meta, sci, action],
    crossLinks: [
      L("chinese-room", "meaning", "语义与理解"),
      L("intentionality", "meaning", "意义与意向"),
      L("mental-content", "propositions", "内容与命题"),
      L("causation-metaphysical", "laws-nature", "因果与定律"),
      L("dispositions", "laws-nature", "倾向与定律"),
      L("freewill", "determinism-causal", "自由与决定"),
      L("davidson", "action", "理由与行动"),
      L("quine", "ontological-commitment", "承诺与存在"),
      L("frege", "logicism", "逻辑与数学"),
      L("russell", "descriptions", "摹状词"),
      L("wittgenstein", "rule-following", "规则与用法"),
      L("rationalism-empiricism", "induction", "经验与归纳"),
      L("reliabilism", "naturalism", "可靠与自然"),
      L("epistemology-bayesian", "confirmation", "概率与确证"),
      L("properties-emergent", "reduction", "突现与还原"),
      L("apriori", "necessity", "先验与必然"),
      L("analytic-synthetic", "meaning", "分析与意义")
    ]
  };
})();
