/*
 * LuLinogic — Reader Companion Data
 * Version: 1.0.0
 *
 * IMPORTANT:
 * All pages below are original educational reading companions.
 * They are NOT transcriptions of the copyrighted books.
 *
 * Each book contains:
 * - 6 original reading pages
 * - 3 table-of-contents entries
 * - original explanations and study questions
 */

(function (global) {
  "use strict";

  const page = (
    section,
    title,
    paragraphs,
    bullets = [],
    note = ""
  ) => ({
    section,
    title,
    paragraphs,
    bullets,
    note
  });


  const books = {

    /* =====================================
       1. SAUSSURE
    ===================================== */

    saussure_course: {

      label: "Original Reader's Companion",

      subtitle: "An introduction to structural linguistics",

      chapters: [
        { title: "I. Language as a System", page: 0 },
        { title: "II. Sign and Linguistic Value", page: 2 },
        { title: "III. Methods and Questions", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "Language as a System",
          [
            "Saussure's lectures provide one of the major foundations of modern structural linguistics. A central methodological move is to investigate language not merely as a collection of words, but as a structured system whose elements acquire value through their relations.",
            "This perspective changes the researcher's question. Rather than asking only what an individual expression refers to, one asks how it functions within a linguistic system."
          ],
          [
            "Language is organized through relations among signs.",
            "An element cannot be fully understood in isolation.",
            "Linguistic analysis requires an explicit account of the system being studied."
          ],
          "Reading orientation: focus on the relational conception of language rather than treating structuralism as a simple catalogue of linguistic elements."
        ),

        page(
          "PART I · ORIENTATION",
          "Langue and Parole",
          [
            "The distinction between langue and parole separates the socially shared linguistic system from particular acts of speaking. It makes possible a distinction between a system of conventions and the individual events in which speakers use it.",
            "The distinction is methodological, not a claim that actual speech is irrelevant. Individual utterances provide evidence, but the linguist also seeks the regularities that make them intelligible."
          ],
          [
            "Langue: the shared system of linguistic conventions.",
            "Parole: particular acts of language use.",
            "The relation between system and use remains an important question for later theories."
          ],
          "Study prompt: what kinds of evidence allow a linguist to infer a shared system from individual utterances?"
        ),

        page(
          "PART II · CONCEPTS",
          "The Linguistic Sign",
          [
            "The linguistic sign is analyzed through two inseparable sides: the signifier and the signified. The signifier is the sound-image or form associated with a sign; the signified is the concept associated with it.",
            "The sign is not simply a label attached to an independently given object. Its identity and value depend on conventions and contrasts within a linguistic system."
          ],
          [
            "Signifier: the form side of the sign.",
            "Signified: the conceptual side of the sign.",
            "Arbitrariness: the relation is not generally dictated by a natural resemblance.",
            "Systematic relations help determine linguistic value."
          ],
          "Do not confuse the signified with the external object to which an expression may refer."
        ),

        page(
          "PART II · CONCEPTS",
          "Difference and Value",
          [
            "A linguistic unit has value partly through what distinguishes it from other units. The identity of a sound or word is therefore connected to its place in a system of contrasts.",
            "This idea encourages the analyst to study oppositions, substitutions, and distributions instead of describing elements as though they possessed their linguistic properties independently."
          ],
          [
            "Identify the relevant unit.",
            "Determine which other units it contrasts with.",
            "Ask what changes when one unit is replaced by another.",
            "Explain the unit's role within the system."
          ],
          "Analytical exercise: choose two words in a language and identify the contrast that distinguishes them."
        ),

        page(
          "PART III · METHOD",
          "Synchronic and Diachronic Study",
          [
            "Synchronic analysis investigates a linguistic system at a particular state or period. Diachronic analysis investigates changes and developments through time.",
            "The distinction helps prevent the researcher from explaining the present structure of a language simply by listing its historical origins. A system at a given moment has patterns that deserve independent description."
          ],
          [
            "Synchronic question: how does the system work at a given time?",
            "Diachronic question: how has the system changed?",
            "Historical evidence and structural description answer related but distinct questions."
          ],
          "Research prompt: when studying a grammatical form, which claims concern its present function and which concern its historical development?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Structural analysis is powerful because it directs attention to relations and contrasts. Its influence can be traced through phonology, anthropology, literary theory, semiotics, and later approaches to language.",
            "A critical reading should also ask how a system is inferred from variation, how language use affects structure, and how linguistic change interacts with synchronic organization."
          ],
          [
            "How should dialectal and social variation be represented?",
            "Can a linguistic system be described without reference to use?",
            "How do signs acquire value in changing communities?",
            "What is gained and lost when language is modeled as a system?"
          ],
          "Further connection: compare Saussure's account of the sign with Peirce's triadic semiotic framework and Frege's distinction between sense and reference."
        )

      ]

    },


    /* =====================================
       2. BLOOMFIELD
    ===================================== */

    bloomfield_language: {

      label: "Original Reader's Companion",

      subtitle: "Description, distribution, and linguistic structure",

      chapters: [
        { title: "I. The Descriptive Project", page: 0 },
        { title: "II. Units and Structure", page: 2 },
        { title: "III. Method and Evaluation", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "The Descriptive Project",
          [
            "Bloomfield's Language is a major work in the development of American structural linguistics. It presents language as an object of systematic investigation and emphasizes disciplined procedures for describing linguistic forms.",
            "Its methodological setting is associated with efforts to make linguistic analysis explicit, reproducible, and attentive to observable patterns."
          ],
          [
            "Describe the linguistic data carefully.",
            "Identify recurring forms and distributions.",
            "Distinguish descriptive claims from unsupported speculation.",
            "Build an analysis that accounts for the observed patterns."
          ],
          "Reading orientation: examine how a general theory of scientific description shapes the treatment of language."
        ),

        page(
          "PART I · ORIENTATION",
          "Language, Speech, and Evidence",
          [
            "A descriptive linguist must work from actual linguistic behavior, including speech forms and their distribution. The task is not simply to classify expressions according to intuition but to explain recurring patterns.",
            "Bloomfield's intellectual background includes behaviorist influences. These should be understood historically and not reduced to the claim that language can be described without any difficult theoretical questions."
          ],
          [
            "Collect and organize examples.",
            "Identify similarities and contrasts.",
            "Specify the procedures behind an analysis.",
            "Recognize the assumptions that guide observation."
          ],
          "Study prompt: what counts as adequate evidence for a grammatical generalization?"
        ),

        page(
          "PART II · CONCEPTS",
          "Phonemes and Morphemes",
          [
            "Phonemes and morphemes are central units in structural description. Phonemic analysis concerns contrastive sound organization, while morphological analysis concerns recurring forms associated with grammatical or lexical functions.",
            "These units are not merely physical pieces of speech. They are identified through their role in a language's patterning."
          ],
          [
            "Phoneme: a contrastive unit in a sound system.",
            "Morpheme: a minimal recurring unit associated with meaning or grammatical function.",
            "Distribution and contrast help guide the analysis.",
            "The relevant patterns vary across languages."
          ],
          "Analytical exercise: compare the English forms walk, walks, walked, and walking. Identify recurring forms and grammatical contrasts."
        ),

        page(
          "PART II · CONCEPTS",
          "Distribution and Constituency",
          [
            "Distributional analysis examines the environments in which linguistic units occur. Patterns of occurrence can help establish classes and identify structural relationships.",
            "Constituent analysis investigates how larger expressions are organized from smaller units. Both approaches help transform a collection of utterances into an explicit account of structure."
          ],
          [
            "Record the environments of a form.",
            "Compare the environments of related forms.",
            "Identify recurring structural units.",
            "Test whether a proposed classification explains the data."
          ],
          "Methodological caution: distributional evidence is informative, but the choice of categories and the interpretation of meaning require theoretical care."
        ),

        page(
          "PART III · METHOD",
          "A Procedure for Description",
          [
            "A disciplined descriptive analysis begins with a defined body of data. The researcher identifies recurring patterns, proposes categories, and checks whether the categories account for the observed distribution.",
            "The goal is not to impose labels on every expression but to construct a coherent description that can be examined and revised."
          ],
          [
            "Define the data and its scope.",
            "Identify recurring forms.",
            "Formulate distributional generalizations.",
            "Compare the analysis against new examples.",
            "Record exceptions and unresolved cases."
          ],
          "Research prompt: how would a corpus change the descriptive evidence available to a linguist?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Bloomfield's work remains important for the history of linguistic methodology. Its emphasis on explicit description influenced the development of phonology, morphology, field linguistics, and structural approaches.",
            "A contemporary reader can compare this descriptive orientation with generative grammar, usage-based approaches, and corpus-driven research."
          ],
          [
            "Can distribution alone establish grammatical categories?",
            "How should a theory explain meaning and interpretation?",
            "What is the relationship between description and explanation?",
            "Which parts of Bloomfield's method remain useful in computational linguistics?"
          ],
          "Further connection: compare Bloomfield's descriptive procedures with Chomsky's formal approach to grammatical knowledge."
        )

      ]

    },


    /* =====================================
       3. CHOMSKY
    ===================================== */

    chomsky_syntactic_structures: {

      label: "Original Reader's Companion",

      subtitle: "Formal grammar and the structure of sentences",

      chapters: [
        { title: "I. The Formal Study of Syntax", page: 0 },
        { title: "II. Phrase Structure and Transformation", page: 2 },
        { title: "III. Explanatory Questions", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "Why Formalize Grammar?",
          [
            "Syntactic Structures is a concise and influential contribution to generative approaches to grammar. It argues that a linguistic theory should provide an explicit account of sentence structure rather than merely list observed strings.",
            "The problem is explanatory: a grammar should characterize the structural possibilities of a language and distinguish them from sequences that do not belong to its system."
          ],
          [
            "A grammar is a formal description of structural possibilities.",
            "Surface strings do not reveal every relation directly.",
            "The adequacy of a grammar must be assessed against a range of data."
          ],
          "Reading orientation: distinguish the description of observed sentences from the formal system proposed to generate or characterize them."
        ),

        page(
          "PART I · ORIENTATION",
          "The Limits of Simple Models",
          [
            "The work examines whether simple finite-state procedures can adequately characterize the structure of natural language. The issue is not whether a finite-state model is useful in every context, but whether it captures the relevant grammatical dependencies.",
            "The discussion encourages a comparison between different formal devices and the kinds of structural relations they can express."
          ],
          [
            "Specify the model being considered.",
            "Identify the structural patterns it can represent.",
            "Find cases that challenge its descriptive capacity.",
            "Compare it with alternatives."
          ],
          "Study prompt: what kind of sentence pattern would require a model to represent dependencies beyond a simple sequence?"
        ),

        page(
          "PART II · CONCEPTS",
          "Phrase-Structure Grammar",
          [
            "Phrase-structure rules represent hierarchical organization. They specify how larger constituents can be built from smaller categories and how sentence structure can be represented beyond a flat sequence of words.",
            "This hierarchical perspective is crucial because many syntactic facts concern relations among constituents rather than only the order of adjacent items."
          ],
          [
            "Categories classify grammatical units.",
            "Rules specify possible structural combinations.",
            "Hierarchical structure differs from a simple word list.",
            "A grammar must account for constituent relations."
          ],
          "Illustrative pattern: a sentence can be analyzed as a subject phrase combined with a predicate phrase, each with internal structure."
        ),

        page(
          "PART II · CONCEPTS",
          "Transformational Relations",
          [
            "Transformational rules provide a way of relating structural representations. In the work, transformations are used to address patterns that cannot be adequately captured by phrase-structure rules alone.",
            "The important question is how formal operations should be constrained so that they explain systematic relations without allowing arbitrary structures."
          ],
          [
            "Identify the structures to be related.",
            "Specify the formal operation.",
            "State the conditions under which it applies.",
            "Examine whether the analysis makes correct predictions."
          ],
          "Analytical exercise: compare active and passive sentence patterns and ask which structural relations a grammar must represent."
        ),

        page(
          "PART III · METHOD",
          "What Makes a Grammar Explanatory?",
          [
            "A formal grammar is not evaluated only by whether it can reproduce familiar examples. It must also characterize the range of possible structures and provide a principled account of their organization.",
            "This shifts the discussion from collecting sentences to constructing and comparing explicit systems."
          ],
          [
            "Descriptive coverage: what data does the grammar account for?",
            "Formal explicitness: are the rules clearly specified?",
            "Empirical constraint: what would count as a counterexample?",
            "Comparative adequacy: how does the proposal differ from alternatives?"
          ],
          "Research prompt: how can a theory avoid becoming so powerful that it permits every imaginable string?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Syntactic Structures helped establish the importance of formal grammar in modern linguistics. Later generative theories developed many of the questions raised in this work, while also revising the technical framework.",
            "A careful reading should distinguish the arguments made in the 1957 book from concepts and terminology that became central in later stages of generative grammar."
          ],
          [
            "What is the difference between a grammar and a parser?",
            "How should hierarchical structure be represented?",
            "Which linguistic facts motivate transformations?",
            "How can competing grammatical theories be evaluated?"
          ],
          "Further connection: compare formal syntax with computational parsing and with descriptive approaches to constituency and dependency."
        )

      ]

    },


    /* =====================================
       4. WITTGENSTEIN
    ===================================== */

    wittgenstein_investigations: {

      label: "Original Reader's Companion",

      subtitle: "Meaning, use, rules, and language-games",

      chapters: [
        { title: "I. The Question of Meaning", page: 0 },
        { title: "II. Language-Games and Rules", page: 2 },
        { title: "III. Philosophical Method", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "The Question of Meaning",
          [
            "Philosophical Investigations examines how language functions in human activities. Rather than assume that every meaningful expression names an object, Wittgenstein explores the variety of ways words are used.",
            "The work is organized through remarks, examples, and comparisons. Its method asks the reader to examine familiar linguistic practices before accepting a general theory of meaning."
          ],
          [
            "Different expressions can function in different ways.",
            "Meaning is connected with use in language.",
            "Examples can reveal assumptions hidden by abstract theories."
          ],
          "Reading orientation: treat the examples as philosophical tools, not as decorative illustrations."
        ),

        page(
          "PART I · ORIENTATION",
          "From Naming to Use",
          [
            "A picture of language based exclusively on naming is too narrow. Many expressions do not operate by naming objects; they can command, ask, promise, calculate, joke, explain, or coordinate action.",
            "The point is not that naming never occurs. It is that naming is one activity within a much wider range of linguistic practices."
          ],
          [
            "Identify what a speaker is doing with an expression.",
            "Examine the circumstances in which it is used.",
            "Avoid assuming that one semantic model fits every case.",
            "Compare different language activities."
          ],
          "Study prompt: how does the meaning of 'I promise' differ from the meaning of a simple object name?"
        ),

        page(
          "PART II · CONCEPTS",
          "Language-Games",
          [
            "The notion of a language-game directs attention to language embedded in particular practices. Asking, reporting, greeting, calculating, and instructing can be understood as activities with different norms and purposes.",
            "The concept does not claim that every linguistic activity is literally a game. It highlights the practical contexts within which expressions acquire their roles."
          ],
          [
            "Language is connected with activities and forms of practice.",
            "Rules and conventions guide the use of expressions.",
            "A linguistic act is understood within a context of activity."
          ],
          "Analytical exercise: compare the phrase 'That is enough' in a classroom, a laboratory, and a social conversation."
        ),

        page(
          "PART II · CONCEPTS",
          "Rule-Following and Understanding",
          [
            "Following a rule is not merely having a private mental image of what the rule means. Rule-following belongs to practices in which correct and incorrect applications can be distinguished.",
            "This leads to questions about agreement, training, examples, correction, and the public criteria through which linguistic understanding is manifested."
          ],
          [
            "A rule must be connected with standards of application.",
            "Interpretation alone cannot settle every question of correct use.",
            "Learning a practice involves examples and correction.",
            "Shared practices make agreement and disagreement intelligible."
          ],
          "Study prompt: what makes an application of a mathematical or grammatical rule correct rather than merely familiar?"
        ),

        page(
          "PART III · METHOD",
          "Philosophical Description",
          [
            "Wittgenstein often attempts to dissolve philosophical confusion by comparing uses of words and exposing misleading analogies. Instead of proposing a single explanatory theory, he investigates how language already works.",
            "The method is especially useful when a philosophical problem depends on treating different linguistic practices as though they were instances of the same structure."
          ],
          [
            "Identify the assumption generating the puzzle.",
            "Compare the different uses of the relevant expression.",
            "Describe the practice instead of inventing a hidden mechanism.",
            "Check whether the original problem still arises."
          ],
          "Research prompt: when does philosophical analysis require a theory, and when does it require clarification of our concepts?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Philosophical Investigations has influenced philosophy of language, philosophy of mind, epistemology, and the study of social practices. Its importance lies partly in the range of problems it invites readers to reconsider.",
            "It can be placed in dialogue with formal semantics, pragmatics, and theories of communication, provided the differences in philosophical method are preserved."
          ],
          [
            "Can formal semantics capture every dimension of linguistic use?",
            "How do public rules relate to individual understanding?",
            "What is the role of context in determining meaning?",
            "How should examples be used in philosophical argument?"
          ],
          "Further connection: compare Wittgenstein's emphasis on use with Frege's semantic distinctions and contemporary pragmatics."
        )

      ]

    },


    /* =====================================
       5. FREGE
    ===================================== */

    frege_sense_reference: {

      label: "Original Reader's Companion",

      subtitle: "Sense, reference, and informative identity",

      chapters: [
        { title: "I. The Puzzle of Identity", page: 0 },
        { title: "II. Sense and Reference", page: 2 },
        { title: "III. Semantic Consequences", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "The Puzzle of Identity",
          [
            "Frege's essay 'On Sense and Reference' addresses a central problem in the philosophy of language: how can two expressions refer to the same object while an identity statement involving them remains informative?",
            "If two names merely contributed the object they designate, sentences identifying that object with itself would seem to provide no new information. Frege's distinction offers a way to explain the difference."
          ],
          [
            "Identity statements can differ in cognitive significance.",
            "Reference alone does not explain every semantic difference.",
            "The way an object is presented matters to understanding."
          ],
          "Reading orientation: begin with the difference between discovering that two names co-refer and merely repeating an identity."
        ),

        page(
          "PART I · ORIENTATION",
          "A Semantic Problem",
          [
            "Consider two expressions that designate the same object but present it in different ways. A person may understand each expression without knowing that they have the same reference.",
            "This creates a distinction between knowing what an expression designates and understanding the particular cognitive route through which its designation is presented."
          ],
          [
            "Two expressions may share a reference.",
            "Their semantic contributions need not be identical.",
            "Identity can be informative when the expressions differ in sense."
          ],
          "Study prompt: why might learning that the Morning Star is the Evening Star be informative?"
        ),

        page(
          "PART II · CONCEPTS",
          "Sense and Reference",
          [
            "Frege distinguishes sense from reference. The reference of a proper name is the object it designates, while its sense is the mode of presentation associated with that object.",
            "This distinction explains how two names can designate one object while differing in the information they convey."
          ],
          [
            "Reference: the designated object.",
            "Sense: the mode in which the object is presented.",
            "Co-reference does not entail sameness of sense.",
            "Semantic analysis must account for both dimensions."
          ],
          "Terminological note: Frege's German terms are often translated as Sinn and Bedeutung. Translation choices should be checked against the edition being used."
        ),

        page(
          "PART II · CONCEPTS",
          "Indirect Reference",
          [
            "Frege also examines contexts in which an expression does not contribute its ordinary reference in the usual way. In indirect or oblique contexts, the relevant semantic contribution is connected with the expression's customary sense.",
            "This matters for reported speech, belief contexts, and other constructions where substituting co-referring expressions may change the truth or content of the whole sentence."
          ],
          [
            "Context can affect how an expression contributes to a sentence.",
            "Substitution of co-referring expressions is not always transparent.",
            "Reported speech provides a useful testing ground."
          ],
          "Analytical exercise: compare a direct assertion with a sentence reporting what another person believes."
        ),

        page(
          "PART III · METHOD",
          "A Framework for Semantic Analysis",
          [
            "Frege's distinction helps separate questions about designation from questions about cognitive significance. It provides a framework for examining names, identity statements, and intensional contexts.",
            "A careful analysis must specify whether a claim concerns the object designated, the way it is presented, or the role an expression plays inside a larger construction."
          ],
          [
            "Identify the expressions under analysis.",
            "Determine their ordinary references.",
            "Compare their senses.",
            "Examine whether the surrounding context changes their semantic contribution."
          ],
          "Research prompt: what assumptions about names and propositions are required for Frege's account?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "The sense-reference distinction has become central to discussions of semantics, philosophy of language, and formal logic. Later theories have developed alternative accounts of meaning, reference, and intensionality.",
            "Frege's essay can be compared with Russell's theory of descriptions, which approaches certain problems of reference through logical analysis of quantified structure."
          ],
          [
            "Does every meaningful expression have a sense and a reference?",
            "How should empty names be treated?",
            "What is the relation between sense and thought?",
            "How do intensional contexts challenge simple substitution principles?"
          ],
          "Further connection: read Russell's 'On Denoting' to compare two influential approaches to reference and logical form."
        )

      ]

    },


    /* =====================================
       6. RUSSELL
    ===================================== */

    russell_on_denoting: {

      label: "Original Reader's Companion",

      subtitle: "Descriptions, quantification, and logical form",

      chapters: [
        { title: "I. The Problem of Denoting", page: 0 },
        { title: "II. The Theory of Descriptions", page: 2 },
        { title: "III. Scope and Analysis", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "The Problem of Denoting",
          [
            "Russell's 1905 essay 'On Denoting' addresses expressions such as 'the present King of France' and asks how sentences containing them should be analyzed.",
            "The grammatical appearance of a phrase may suggest that it functions as a name. Russell argues that definite descriptions can instead be analyzed through quantificational structure."
          ],
          [
            "Distinguish grammatical form from logical form.",
            "Ask what existence commitments a sentence makes.",
            "Analyze descriptions in relation to the whole proposition."
          ],
          "Reading orientation: focus on the problem of apparently meaningful sentences containing descriptions that do not designate an existing object."
        ),

        page(
          "PART I · ORIENTATION",
          "Why Logical Analysis Matters",
          [
            "Natural language can conceal logical structure. A sentence may look as though it contains a name for an object, while its logical analysis involves claims about existence, uniqueness, and predication.",
            "Russell's method aims to make these commitments explicit and thereby resolve puzzles that arise from taking surface grammar at face value."
          ],
          [
            "Identify the descriptive phrase.",
            "Determine whether the sentence asserts existence.",
            "Determine whether it asserts uniqueness.",
            "Specify what is predicated of the described object."
          ],
          "Study prompt: what must be true for the phrase 'the current director of this institution' to successfully describe someone?"
        ),

        page(
          "PART II · CONCEPTS",
          "The Theory of Descriptions",
          [
            "A definite description can be analyzed as involving three components: existence, uniqueness, and predication. The sentence does not need to presuppose a special object corresponding to the description in the way a simple name is often taken to do.",
            "This analysis allows Russell to explain how a sentence containing a non-denoting description can still be assessed logically."
          ],
          [
            "Existence: at least one object satisfies the description.",
            "Uniqueness: no more than one object satisfies it.",
            "Predication: the object satisfying the description has the stated property."
          ],
          "Illustrative form: 'The F is G' can be analyzed by stating that exactly one thing is F and that this thing is G."
        ),

        page(
          "PART II · CONCEPTS",
          "Scope and Negation",
          [
            "The position and scope of negation matter when analyzing descriptions. A sentence that denies that a described object has a property can differ from a sentence that denies the existence of any object satisfying the description.",
            "Logical analysis helps distinguish these readings by making quantifier structure explicit."
          ],
          [
            "Compare negation inside and outside the description.",
            "Identify the scope of quantifiers.",
            "Test whether the reading requires an existing object.",
            "Explain the difference in truth conditions."
          ],
          "Analytical exercise: compare 'The present King of France is not bald' with 'It is not the case that the present King of France is bald.'"
        ),

        page(
          "PART III · METHOD",
          "Descriptions as Logical Constructions",
          [
            "Russell's central strategy is to avoid unnecessary commitments to entities supposedly named by descriptive phrases. Analysis translates the apparent grammatical structure into a logical form that reveals its commitments.",
            "This strategy became influential in analytic philosophy, logic, and the theory of reference."
          ],
          [
            "Do not infer ontology directly from grammatical appearance.",
            "Represent existence and uniqueness explicitly.",
            "Compare alternative scope readings.",
            "Check whether the analysis resolves the original puzzle."
          ],
          "Research prompt: what does a theory of descriptions explain that a simple name-based semantics leaves unresolved?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Russell's essay can be compared with Frege's account of sense and reference. Both address problems about designation, but their explanatory strategies and theoretical commitments differ.",
            "Later debates about definite descriptions include whether descriptions are quantificational, referential, context-sensitive, or interpreted differently in particular uses."
          ],
          [
            "How should empty descriptions be interpreted?",
            "When is a description used referentially?",
            "How do contextual assumptions affect interpretation?",
            "What is the relation between logical form and ordinary grammar?"
          ],
          "Further connection: investigate later developments in the semantics and pragmatics of definite descriptions."
        )

      ]

    },


    /* =====================================
       7. PEIRCE
    ===================================== */

    peirce_collected_papers: {

      label: "Original Reader's Companion",

      subtitle: "Signs, interpretation, and semiosis",

      chapters: [
        { title: "I. The Study of Signs", page: 0 },
        { title: "II. Sign Relations", page: 2 },
        { title: "III. Inference and Interpretation", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "The Study of Signs",
          [
            "Peirce's collected papers contain a wide-ranging body of work on signs, logic, inquiry, and pragmatism. His semiotic framework investigates how signs relate to objects and how they are interpreted.",
            "The collection should be approached by topic and by the exact volume and section being cited, because it brings together writings produced across different periods."
          ],
          [
            "Semiotics investigates sign processes.",
            "Signs are connected with objects and interpretation.",
            "Signification is not reducible to a simple two-term relation."
          ],
          "Reading orientation: use a selected topical path rather than treating the collected papers as a single continuous book."
        ),

        page(
          "PART I · ORIENTATION",
          "A Triadic Conception",
          [
            "Peirce's account of semiosis is commonly presented through three interrelated elements: sign, object, and interpretant. The sign stands for an object in some respect and produces or determines an interpretant within a process of interpretation.",
            "The interpretant is not simply another person. It concerns the interpretive effect or further sign through which the sign relation develops."
          ],
          [
            "Sign: that which functions as a sign.",
            "Object: that to which the sign relates.",
            "Interpretant: the interpretive dimension of the sign relation."
          ],
          "Study prompt: how does a traffic sign relate to its object and to the interpretive response it is designed to produce?"
        ),

        page(
          "PART II · CONCEPTS",
          "Icon, Index, and Symbol",
          [
            "Peirce's familiar classification distinguishes signs by the kind of relation they bear to their objects. Icons involve resemblance, indices involve factual or existential connection, and symbols operate through habits, conventions, or rules.",
            "These categories describe dimensions of sign relations. A particular sign can participate in more than one mode of signification."
          ],
          [
            "Icon: signification through resemblance or shared qualities.",
            "Index: signification through an actual connection.",
            "Symbol: signification through convention or habit.",
            "The categories should not be treated as rigid classes in every concrete case."
          ],
          "Analytical exercise: compare a portrait, smoke indicating fire, and a conventional written word."
        ),

        page(
          "PART II · CONCEPTS",
          "Semiosis and Interpretation",
          [
            "Semiosis describes the process through which signs generate interpretation. The meaning of a sign is not exhausted by a fixed relation between a word and an object; it unfolds through interpretive relations and habits.",
            "This dynamic framework is one reason Peirce's semiotics has been influential beyond linguistics, including communication theory, philosophy, and the study of visual signs."
          ],
          [
            "Interpretation can lead to further signs.",
            "Habits and conventions shape sign use.",
            "The process of signification is potentially open-ended.",
            "Context affects how signs function."
          ],
          "Study prompt: how might the meaning of an unfamiliar symbol change as a community learns to use it?"
        ),

        page(
          "PART III · METHOD",
          "Abduction and Inquiry",
          [
            "Peirce's work on logic includes a distinctive account of abduction, the form of inference through which a hypothesis is proposed to explain an unexpected observation.",
            "Abduction differs from deduction and induction. It suggests an explanatory possibility that can then be examined through further reasoning and evidence."
          ],
          [
            "Deduction: derive consequences from premises.",
            "Induction: assess patterns through cases and evidence.",
            "Abduction: propose a hypothesis that could explain an observation."
          ],
          "Illustrative question: what explanatory hypothesis might account for an unexpected linguistic pattern, and what evidence would test it?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Peirce's semiotics offers a framework for studying linguistic and non-linguistic signs, while his logic connects interpretation with inquiry and the evaluation of hypotheses.",
            "A productive next step is to compare his triadic framework with dyadic models of signs and with structural accounts of linguistic value."
          ],
          [
            "Can a sign be interpreted without an interpretant?",
            "How do conventions shape symbolic meaning?",
            "How does abductive reasoning contribute to linguistic research?",
            "What distinguishes Peirce's sign relation from Saussure's linguistic sign?"
          ],
          "Further connection: compare Peirce and Saussure without assuming that their theories use the concept of a sign in exactly the same way."
        )

      ]

    },


    /* =====================================
       8. JAKOBSON
    ===================================== */

    jakobson_selected_writings: {

      label: "Original Reader's Companion",

      subtitle: "Phonological structure, communication, and poetics",

      chapters: [
        { title: "I. Structural Phonology", page: 0 },
        { title: "II. Language and Communication", page: 2 },
        { title: "III. Language in Use", page: 4 }
      ],

      pages: [

        page(
          "PART I · ORIENTATION",
          "Jakobson's Linguistic Project",
          [
            "Roman Jakobson's writings range across phonology, grammatical structure, language acquisition, aphasia, communication, and poetics. They connect detailed linguistic analysis with broader questions about how language is organized and used.",
            "Because Selected Writings is a multi-volume collection, readers should identify the particular essay, volume, and edition relevant to each argument."
          ],
          [
            "Linguistic structure involves systems of oppositions.",
            "Phonological analysis can reveal distinctive features.",
            "Language can be studied in communication and in artistic form."
          ],
          "Reading orientation: follow one topic across essays and record the changing context of Jakobson's terminology."
        ),

        page(
          "PART I · ORIENTATION",
          "Distinctive Features",
          [
            "Jakobson's phonological work emphasizes distinctive features: properties through which sound units contrast within a language system. Instead of treating every phoneme as an indivisible object, analysis can identify the features that distinguish it from other units.",
            "This perspective connects phonological description with structural relations and later developments in feature-based models."
          ],
          [
            "Identify a contrast between sound units.",
            "Determine which feature distinguishes them.",
            "Examine how the contrast functions in a language.",
            "Avoid assuming that phonetic similarity always entails phonological identity."
          ],
          "Analytical exercise: select a language and identify a pair of sounds that contrast in voicing or place of articulation."
        ),

        page(
          "PART II · CONCEPTS",
          "Oppositions and Markedness",
          [
            "Structural phonology analyzes units through oppositions. The notion of markedness offers a way to describe asymmetries among forms, categories, or features.",
            "Markedness has been used in several related theoretical traditions, so its exact definition should be checked in the specific essay under discussion."
          ],
          [
            "Opposition: a relation of contrast within a system.",
            "Markedness: an asymmetry between related forms or categories.",
            "Feature analysis can make contrasts explicit.",
            "Theoretical definitions may differ across periods and authors."
          ],
          "Study prompt: when does a linguistic contrast involve a neutral opposition, and when does one term behave asymmetrically?"
        ),

        page(
          "PART II · CONCEPTS",
          "Language and Communication",
          [
            "Jakobson's work on communication identifies different functions associated with aspects of a communicative event. These include orientations toward the context, addresser, addressee, contact, code, and message.",
            "The framework helps explain why language use cannot be reduced to the transmission of factual information alone."
          ],
          [
            "Referential function: orientation toward context.",
            "Emotive function: orientation toward the addresser.",
            "Conative function: orientation toward the addressee.",
            "Phatic, metalingual, and poetic functions highlight other dimensions of communication."
          ],
          "Analytical exercise: compare a factual report, a greeting, a command, and a poetic message."
        ),

        page(
          "PART III · METHOD",
          "Language, Poetry, and Verbal Art",
          [
            "Jakobson's account of the poetic function examines how a message can draw attention to its own organization. Sound patterns, parallelism, repetition, and structural correspondences may become central to how a verbal work functions.",
            "This approach creates a bridge between linguistic analysis and literary study without reducing poetry to a collection of decorative devices."
          ],
          [
            "Examine repetition and parallel structure.",
            "Identify sound and grammatical correspondences.",
            "Ask how formal organization contributes to interpretation.",
            "Distinguish linguistic description from literary evaluation."
          ],
          "Study prompt: how can parallelism affect the reader's perception of a poem's meaning?"
        ),

        page(
          "PART III · METHOD",
          "Questions for Further Study",
          [
            "Jakobson's selected writings allow readers to trace connections among phonological structure, communication, language disorders, acquisition, and poetics.",
            "The collection is especially useful for studying how a structural analysis of small linguistic units can inform research on broader forms of communication."
          ],
          [
            "How do distinctive features relate to phonetic evidence?",
            "How should markedness be defined in a specific theory?",
            "What is the relationship between linguistic form and poetic function?",
            "How can language disorders illuminate linguistic organization?"
          ],
          "Further connection: compare Jakobson's feature-based analysis with contemporary phonological theory and computational speech processing."
        )

      ]

    }

  };


  const readerData = {

    version: "1.0.0",

    pagePairSize: 2,

    storageKey: "lulinogic.reader.progress.v1",

    contentNotice:
      "This is an original educational Reader's Companion, not the original text of the published work.",

    books

  };


  global.LANGUAGE_READER_DATA = Object.freeze(readerData);


})(window);