/*
 * LuLinogic — Language Study Room Data
 * Version: 2.1.0
 *
 * Content is separated from interface behavior.
 *
 * Notes:
 * 1. Book descriptions are original academic summaries.
 * 2. Articles and collected writings are distinguished
 *    from single-volume books through itemType.
 * 3. No complete copyrighted book text is included.
 * 4. Empty URLs must be replaced with verified sources
 *    before displaying them as reading links.
 */

(function (global) {

    "use strict";


    /* =========================================
       1. LINGUISTICS TERMS TABLE OF CONTENTS
    ========================================= */

    const linguisticTermsTOC = [

        {
            id: "theoretical-linguistics",
            title: "理论语言学"
        },

        {
            id: "writing-systems",
            title: "文字学"
        },

        {
            id: "phonetics",
            title: "语音学"
        },

        {
            id: "grammar",
            title: "语法学"
        },

        {
            id: "semantics-lexicology",
            title: "语义学、词汇学"
        },

        {
            id: "lexicography",
            title: "辞书学"
        },

        {
            id: "dialectology",
            title: "方言学"
        },

        {
            id: "rhetoric",
            title: "修辞学"
        },

        {
            id: "historical-phonology",
            title: "音韵学"
        },

        {
            id: "exegesis",
            title: "训诂学"
        },

        {
            id: "computational-linguistics",
            title: "计算语言学"
        },

        {
            id: "sociolinguistics",
            title: "社会语言学"
        },

        {
            id: "ethnolinguistics",
            title: "民族语言学"
        }

    ];


    /* =========================================
       1. MAIN DATA OBJECT
    ========================================= */

    const data = {

        version: "2.1.0",


        /* =====================================
           2. PAGE INFORMATION
        ===================================== */

        page: {

            title: "Language",

            subtitle:
                "Linguistics and the Structure of Language",

            sceneTitle:
                "Welcome to My Linguistics Study Room",

            sceneInstruction:
                "Click on the objects to explore.",

            defaultLocation:
                "Linguistics Study Room",

            defaultCollection:
                "Study Room"

        },


        /* =====================================
           3. INTERACTIVE COLLECTIONS
        ===================================== */

        /*
         * These IDs must match the data-hotspot-id
         * attributes in Language.html.
         *
         * Multiple SVG shapes may share one ID.
         */

        collections: {

            "linguistics-bookshelf": {

                id: "linguistics-bookshelf",

                title: "Linguistics Bookshelf",

                category: "BOOK COLLECTION",

                description:
                    "A collection of foundational works on linguistic structure, syntax, semantics, philosophy of language, and semiotics. Explore each record for its bibliographic context, central questions, and a guided reading note.",

                status:
                    "Bookshelf discovered",

                itemCount: 8,

                icon: "book-open"

            },


            "computational-linguistics-lab": {

                id: "computational-linguistics-lab",

                title:
                    "Computational Linguistics Laboratory",

                category:
                    "RESEARCH WORKSTATION",

                description:
                    "A research space for computational approaches to language: corpora, natural language processing, syntax, semantics, machine translation, speech, information retrieval, and large language models.",

                status:
                    "Laboratory selected",

                itemCount: 10,

                icon: "monitor"

            },


            "linguistics-notes": {

                id: "linguistics-notes",

                title: "Linguistics Notes",

                category:
                    "KNOWLEDGE NOTEBOOK",

                description:
                    "A structured notebook covering the core levels of linguistic analysis, from speech sounds and word formation to sentence structure, meaning, language use, variation, and language processing.",

                status:
                    "Notebook opened",

                itemCount: 10,

                icon: "notebook-pen"

            },


            "world-languages": {

                id: "world-languages",

                title: "World Languages",

                category:
                    "HIDDEN COLLECTION",

                description:
                    "A hidden entrance to eleven language collections: English, German, French, Latin, Ancient Greek, Japanese, Chinese, Sanskrit, Russian, Spanish, and Arabic. Each collection is organized around grammars, dictionaries, classical texts, linguistic research, and open learning resources.",

                status:
                    "Hidden collection discovered",

                itemCount: 11,

                icon: "languages"

            },


            "reading-records": {

                id: "reading-records",

                title: "Reading Records",

                category:
                    "PERSONAL ARCHIVE",

                description:
                    "A personal reading log for books in progress, completed readings, marginal reflections, and questions worth revisiting. Entries can later be connected to the relevant authors and concepts.",

                status:
                    "Reading records selected",

                itemCount: 0,

                icon: "book-mark"

            },


            "my-vocabulary": {

                id: "my-vocabulary",

                title: "My Vocabulary",

                category:
                    "WORD COLLECTION",

                description:
                    "A growing collection of words, expressions, definitions, usage examples, etymological notes, and semantic distinctions encountered during study and reading.",

                status:
                    "Vocabulary collection selected",

                itemCount: 0,

                icon: "book-a"

            }

        },


        /* =====================================
           4. SVG HOTSPOT LABELS
        ===================================== */

        hotspotLabels: {

            "linguistics-bookshelf":
                "Linguistics Bookshelf",

            "computational-linguistics-lab":
                "Computational Linguistics Laboratory",

            "linguistics-notes":
                "Linguistics Notes",

            "world-languages":
                "World Languages",

            "reading-records":
                "Reading Records",

            "my-vocabulary":
                "My Vocabulary"

        },


        /* =====================================
           5. CLASSICAL LINGUISTICS BOOKS
        ===================================== */

        books: [

            {
                id: "saussure_course",

                title:
                    "Course in General Linguistics",

                author:
                    "Ferdinand de Saussure",

                itemType: "book",

                publicationInfo:
                    "First published posthumously in 1916; based on lecture materials and edited by his students.",

                category:
                    "General Linguistics / Structuralism",

                language: "English",

                description:
                    "A foundational account of language as a system of relations. The work introduces distinctions such as langue and parole, the synchronic and diachronic study of language, and the linguistic sign.",

                keywords: [
                    "linguistic sign",
                    "signifier",
                    "signified",
                    "langue",
                    "parole",
                    "synchronic",
                    "diachronic",
                    "structuralism"
                ],

                readingGuide:
                    "Read for the relational conception of linguistic value and for the methodological distinction between synchronic and diachronic analysis.",

                cover:
                    "assets/books/saussure.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "linguistic_terms",

                title: "语言学名词",

                author: "语言学名词审定委员会",

                itemType: "reference-dictionary",

                publicationInfo:
                    "北京：商务印书馆，2011",

                publisher: "商务印书馆",

                publicationYear: 2011,

                category:
                    "Linguistic Terminology",

                language: "Chinese",

                entryCount: 2939,

                partCount: 13,

                cover:
                    "./assets/books/linguistic-terms/cover.jpg",

                pdfUrl:
                    "./assets/books/linguistic-terms/original/linguistic-terms.pdf",

                tableOfContents: linguisticTermsTOC,

                keywords: [
                    "语言学名词",
                    "理论语言学",
                    "文字学",
                    "语音学",
                    "语法学",
                    "社会语言学"
                ],

                pages: []
            },


            {
                id: "bloomfield_language",

                title: "Language",

                author:
                    "Leonard Bloomfield",

                itemType: "book",

                publicationInfo:
                    "First published in 1933.",

                category:
                    "Descriptive Linguistics / Structural Linguistics",

                language: "English",

                description:
                    "A systematic account of language structure and linguistic analysis associated with American structural linguistics. It treats phonological and grammatical description as central tasks for the linguist.",

                keywords: [
                    "phoneme",
                    "morpheme",
                    "descriptive method",
                    "distribution",
                    "structural linguistics"
                ],

                readingGuide:
                    "Pay attention to the relationship between observable linguistic forms, distributional analysis, and the description of grammatical structure.",

                cover:
                    "assets/books/bloomfield.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "chomsky_syntactic_structures",

                title:
                    "Syntactic Structures",

                author:
                    "Noam Chomsky",

                itemType: "book",

                publicationInfo:
                    "First published in 1957.",

                category:
                    "Syntax / Generative Grammar",

                language: "English",

                description:
                    "A concise work that helped establish generative approaches to syntax. It argues for explicit formal models of sentence structure and examines the limits of finite-state descriptions of natural language.",

                keywords: [
                    "generative grammar",
                    "phrase structure",
                    "transformation",
                    "syntax",
                    "formal grammar"
                ],

                readingGuide:
                    "Follow the argument from phrase-structure description to transformations, and ask what a grammar must explain about the structure of possible sentences.",

                cover:
                    "assets/books/chomsky.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "wittgenstein_investigations",

                title:
                    "Philosophical Investigations",

                author:
                    "Ludwig Wittgenstein",

                itemType: "book",

                publicationInfo:
                    "First published in 1953.",

                category:
                    "Philosophy of Language / Ordinary Language Philosophy",

                language: "English",

                description:
                    "A collection of philosophical investigations into meaning, rule-following, understanding, and the diverse practices in which language is used. It challenges the idea that every meaningful expression works in one uniform way.",

                keywords: [
                    "meaning",
                    "language-games",
                    "rule-following",
                    "use",
                    "forms of life"
                ],

                readingGuide:
                    "Read the remarks slowly and compare examples of language use. The work is exploratory rather than a textbook organized around a single formal theory.",

                cover:
                    "assets/books/wittgenstein.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "frege_sense_reference",

                title:
                    "On Sense and Reference",

                author:
                    "Gottlob Frege",

                itemType: "article",

                publicationInfo:
                    "Essay originally published in 1892 as “Über Sinn und Bedeutung”.",

                category:
                    "Philosophy of Language / Semantics / Logic",

                language: "English",

                description:
                    "A landmark essay distinguishing the sense expressed by a linguistic expression from its reference. The distinction helps explain how identity statements can be informative even when their terms refer to the same object.",

                keywords: [
                    "sense",
                    "reference",
                    "identity",
                    "proper names",
                    "compositional semantics"
                ],

                readingGuide:
                    "Begin with the puzzle of informative identity statements. Track how the distinction between mode of presentation and referent is used to address it.",

                cover:
                    "assets/books/frege.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "russell_on_denoting",

                title: "On Denoting",

                author:
                    "Bertrand Russell",

                itemType: "article",

                publicationInfo:
                    "Article published in Mind, volume 14, issue 56 (1905), pages 479–493.",

                category:
                    "Philosophy of Language / Logic / Reference",

                language: "English",

                description:
                    "Russell analyzes definite descriptions through the theory of descriptions. The analysis connects ordinary linguistic expressions with quantificational structure and addresses puzzles involving non-denoting descriptions.",

                keywords: [
                    "definite descriptions",
                    "denoting phrases",
                    "quantification",
                    "scope",
                    "logical form"
                ],

                readingGuide:
                    "Compare the grammatical form of a sentence with the logical analysis Russell proposes, especially in examples involving descriptions that fail to denote.",

                cover:
                    "assets/books/russell.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "peirce_collected_papers",

                title:
                    "Collected Papers of Charles Sanders Peirce",

                author:
                    "Charles Sanders Peirce",

                itemType: "collected-papers",

                publicationInfo:
                    "An eight-volume scholarly collection published between 1931 and 1958.",

                category:
                    "Semiotics / Pragmatism / Logic",

                language: "English",

                description:
                    "A major collection of Peirce’s writings on signs, inference, logic, inquiry, and pragmatism. Its semiotic framework distinguishes different dimensions and types of sign relations.",

                keywords: [
                    "semiotics",
                    "sign",
                    "object",
                    "interpretant",
                    "icon",
                    "index",
                    "symbol",
                    "abduction"
                ],

                readingGuide:
                    "Use a subject index or a curated reading list to approach the collection by topic. Record the exact volume and section when citing a passage.",

                cover:
                    "assets/books/peirce.jpg",

                sourceUrl: "",

                pages: []

            },


            {
                id: "jakobson_selected_writings",

                title: "Selected Writings",

                author:
                    "Roman Jakobson",

                itemType: "selected-writings",

                publicationInfo:
                    "A multi-volume selection; record the specific volume and edition used in your catalogue.",

                category:
                    "Structural Linguistics / Phonology / Poetics",

                language: "English",

                description:
                    "A selected body of Jakobson’s work spanning phonology, linguistic structure, language acquisition, aphasia, and the relation between linguistics and poetics.",

                keywords: [
                    "distinctive features",
                    "phonology",
                    "markedness",
                    "communication functions",
                    "poetics"
                ],

                readingGuide:
                    "Choose a volume or essay by research topic. The collection is especially useful for tracing connections between phonological analysis and broader structural approaches.",

                cover:
                    "assets/books/jakobson.jpg",

                sourceUrl: "",

                pages: []

            }

        ],


        /* =====================================
           6. COMPUTATIONAL LINGUISTICS
        ===================================== */

        computationalTopics: [

            {
                id: "computational-linguistics",

                title:
                    "Computational Linguistics",

                description:
                    "The study of language through computational models, algorithms, and data-driven or rule-based methods.",

                keyQuestions: [
                    "How can linguistic knowledge be represented computationally?",
                    "How can language data be analyzed and generated?"
                ],

                keywords: [
                    "formal models",
                    "algorithms",
                    "language technology"
                ]

            },


            {
                id: "natural-language-processing",

                title:
                    "Natural Language Processing",

                description:
                    "Methods that enable computers to process, analyze, interpret, and generate human language.",

                keyQuestions: [
                    "How should a system represent text and context?",
                    "How can language tasks be evaluated?"
                ],

                keywords: [
                    "tokenization",
                    "language models",
                    "evaluation"
                ]

            },


            {
                id: "corpus-linguistics",

                title:
                    "Corpus Linguistics",

                description:
                    "The investigation of language through systematically collected and annotated bodies of spoken or written data.",

                keyQuestions: [
                    "What patterns occur in authentic language use?",
                    "How do corpus design and annotation affect conclusions?"
                ],

                keywords: [
                    "corpus design",
                    "concordance",
                    "frequency",
                    "annotation"
                ]

            },


            {
                id: "computational-semantics",

                title:
                    "Computational Semantics",

                description:
                    "The formal and computational analysis of meaning, including compositional interpretation, semantic representation, and inference.",

                keyQuestions: [
                    "How can sentence meaning be represented?",
                    "How can meaning be computed from parts and context?"
                ],

                keywords: [
                    "logical form",
                    "semantic parsing",
                    "inference"
                ]

            },


            {
                id: "computational-syntax",

                title:
                    "Computational Syntax",

                description:
                    "Computational representations and analyses of sentence structure, including parsing and grammatical modeling.",

                keyQuestions: [
                    "How can a sentence be assigned a syntactic structure?",
                    "How do grammar formalisms differ?"
                ],

                keywords: [
                    "parsing",
                    "constituency",
                    "dependency",
                    "grammar"
                ]

            },


            {
                id: "machine-translation",

                title:
                    "Machine Translation",

                description:
                    "The automatic translation of text or speech between languages, using rule-based, statistical, neural, or hybrid approaches.",

                keyQuestions: [
                    "How should translation quality be assessed?",
                    "How are ambiguity and cross-linguistic differences handled?"
                ],

                keywords: [
                    "parallel corpus",
                    "neural translation",
                    "alignment"
                ]

            },


            {
                id: "speech-recognition",

                title:
                    "Speech Recognition",

                description:
                    "The computational conversion of speech signals into linguistic representations, commonly including words or transcriptions.",

                keyQuestions: [
                    "How do acoustic signals map to linguistic units?",
                    "How do accent, noise, and speaking style affect recognition?"
                ],

                keywords: [
                    "acoustics",
                    "phonetics",
                    "decoding",
                    "ASR"
                ]

            },


            {
                id: "information-retrieval",

                title:
                    "Information Retrieval",

                description:
                    "Techniques for representing, indexing, searching, and ranking textual or multilingual information.",

                keyQuestions: [
                    "How can a system retrieve relevant documents?",
                    "How should relevance and ranking be evaluated?"
                ],

                keywords: [
                    "indexing",
                    "ranking",
                    "search",
                    "relevance"
                ]

            },


            {
                id: "large-language-models",

                title:
                    "Large Language Models",

                description:
                    "Large-scale neural models trained on language data and used for tasks such as text generation, summarization, and question answering.",

                keyQuestions: [
                    "What linguistic behavior emerges from training?",
                    "How should capability, reliability, and limitations be evaluated?"
                ],

                keywords: [
                    "transformers",
                    "pretraining",
                    "generation",
                    "evaluation"
                ]

            },


            {
                id: "computational-pragmatics",

                title:
                    "Computational Pragmatics",

                description:
                    "Computational approaches to meaning in context, including implicature, reference, dialogue, intention, and conversational structure.",

                keyQuestions: [
                    "How can a system interpret context-dependent meaning?",
                    "How can dialogue state and speaker intention be modeled?"
                ],

                keywords: [
                    "context",
                    "dialogue",
                    "implicature",
                    "reference"
                ]

            }

        ],


        /* =====================================
           7. BASIC LINGUISTICS
        ===================================== */

        linguisticsTopics: [

            {
                id: "phonetics",

                title: "Phonetics",

                description:
                    "The scientific study of speech sounds, including their articulation, acoustic properties, and perception.",

                example:
                    "A phonetic description can specify where and how a consonant is articulated, as well as its voicing.",

                keywords: [
                    "articulation",
                    "acoustics",
                    "perception",
                    "IPA"
                ]

            },


            {
                id: "phonology",

                title: "Phonology",

                description:
                    "The study of how speech sounds are organized into systems and patterns in particular languages.",

                example:
                    "A phonological analysis asks whether two sounds contrast to distinguish words in a language.",

                keywords: [
                    "phoneme",
                    "contrast",
                    "allophone",
                    "phonological rule"
                ]

            },


            {
                id: "morphology",

                title: "Morphology",

                description:
                    "The study of the internal structure of words and the ways morphemes combine to express grammatical or lexical meaning.",

                example:
                    "In English, the word ‘unhappiness’ can be analyzed into the morphemes un-, happy, and -ness.",

                keywords: [
                    "morpheme",
                    "inflection",
                    "derivation",
                    "word formation"
                ]

            },


            {
                id: "syntax",

                title: "Syntax",

                description:
                    "The study of how words combine into phrases and sentences, and of the structural relations among their parts.",

                example:
                    "The contrast between ‘The student read the book’ and ‘The book was read by the student’ illustrates different syntactic constructions.",

                keywords: [
                    "constituent",
                    "phrase structure",
                    "dependency",
                    "word order"
                ]

            },


            {
                id: "semantics",

                title: "Semantics",

                description:
                    "The study of linguistic meaning, including lexical meaning, compositionality, reference, and truth conditions.",

                example:
                    "A semantic analysis can ask under what circumstances a sentence such as ‘The door is open’ is true.",

                keywords: [
                    "sense",
                    "reference",
                    "truth conditions",
                    "compositionality"
                ]

            },


            {
                id: "pragmatics",

                title: "Pragmatics",

                description:
                    "The study of how speakers and hearers interpret utterances in context, including implicature, deixis, and speech acts.",

                example:
                    "‘Can you pass the salt?’ is often understood as a request rather than a question about ability.",

                keywords: [
                    "context",
                    "implicature",
                    "deixis",
                    "speech acts"
                ]

            },


            {
                id: "discourse-analysis",

                title: "Discourse Analysis",

                description:
                    "The study of language beyond isolated sentences, including cohesion, coherence, interaction, and the organization of texts and conversations.",

                example:
                    "Pronouns and connectives can link sentences and help readers identify relations across a text.",

                keywords: [
                    "cohesion",
                    "coherence",
                    "conversation",
                    "text structure"
                ]

            },


            {
                id: "historical-linguistics",

                title: "Historical Linguistics",

                description:
                    "The study of language change over time and the methods used to investigate relationships among languages.",

                example:
                    "Regular sound correspondences across related languages can provide evidence for historical relationships.",

                keywords: [
                    "sound change",
                    "reconstruction",
                    "language family",
                    "etymology"
                ]

            },


            {
                id: "sociolinguistics",

                title: "Sociolinguistics",

                description:
                    "The study of relationships between language and society, including variation, identity, style, and language contact.",

                example:
                    "A sociolinguistic study may compare how a pronunciation varies across age groups or speaking contexts.",

                keywords: [
                    "variation",
                    "register",
                    "identity",
                    "language contact"
                ]

            },


            {
                id: "psycholinguistics",

                title: "Psycholinguistics",

                description:
                    "The study of the mental processes involved in language comprehension, production, acquisition, and representation.",

                example:
                    "Reading-time experiments can investigate how readers process ambiguous words in context.",

                keywords: [
                    "language processing",
                    "acquisition",
                    "production",
                    "comprehension"
                ]

            }

        ],


        /* =====================================
           8. WORLD LANGUAGE RESOURCE TYPES
        ===================================== */

        worldLanguageResourceTypes: [

            {
                id: "grammars",

                title: "Grammar Textbooks",

                description:
                    "Descriptive grammars, reference grammars, and structured learning textbooks."

            },

            {
                id: "dictionaries",

                title: "Dictionaries",

                description:
                    "Monolingual, bilingual, historical, and specialist dictionaries."

            },

            {
                id: "classical-texts",

                title: "Classical Texts",

                description:
                    "Literary, philosophical, religious, and historical texts, with edition details."

            },

            {
                id: "linguistic-research",

                title: "Linguistic Research",

                description:
                    "Research monographs, journal articles, grammars, and linguistic corpora."

            },

            {
                id: "open-resources",

                title: "Open Access Resources",

                description:
                    "Legally accessible dictionaries, corpora, teaching materials, and digital texts."

            }

        ],


        /* =====================================
           9. WORLD LANGUAGES
        ===================================== */

        worldLanguages: [

            {
                id: "english",

                name: "English",

                nativeName: "English",

                family:
                    "Indo-European · Germanic · West Germanic",

                script: "Latin",

                focus:
                    "Grammar, historical development, dialects, literature, and contemporary usage.",

                resources: []

            },


            {
                id: "german",

                name: "German",

                nativeName: "Deutsch",

                family:
                    "Indo-European · Germanic · West Germanic",

                script: "Latin",

                focus:
                    "Inflection, grammatical gender, word order, dialect variation, and philosophical texts.",

                resources: []

            },


            {
                id: "french",

                name: "French",

                nativeName: "Français",

                family:
                    "Indo-European · Italic · Romance",

                script: "Latin",

                focus:
                    "Phonology, morphology, syntax, historical change, and literary traditions.",

                resources: []

            },


            {
                id: "latin",

                name: "Latin",

                nativeName: "Lingua Latina",

                family:
                    "Indo-European · Italic · Latino-Faliscan",

                script: "Latin",

                focus:
                    "Inflectional morphology, syntax, classical prose, poetry, and historical grammar.",

                resources: []

            },


            {
                id: "ancient-greek",

                name: "Ancient Greek",

                nativeName: "Ἑλληνική",

                family:
                    "Indo-European · Hellenic",

                script: "Greek",

                focus:
                    "Dialect history, morphology, syntax, epic and classical texts, and philology.",

                resources: []

            },


            {
                id: "japanese",

                name: "Japanese",

                nativeName: "日本語",

                family: "Japonic",

                script:
                    "Kanji, Hiragana, and Katakana",

                focus:
                    "Writing systems, particles, predicates, honorifics, phonology, and historical texts.",

                resources: []

            },


            {
                id: "chinese",

                name: "Chinese",

                nativeName: "中文 / 汉语",

                family:
                    "Sino-Tibetan · Sinitic",

                script: "Chinese characters",

                focus:
                    "Classical and modern Chinese, dialectology, tones, characters, and grammatical analysis.",

                resources: []

            },


            {
                id: "sanskrit",

                name: "Sanskrit",

                nativeName: "संस्कृतम्",

                family:
                    "Indo-European · Indo-Iranian · Indo-Aryan",

                script:
                    "Devanagari and other historical scripts",

                focus:
                    "Pāṇinian grammar, morphology, phonology, Vedic texts, and classical literature.",

                resources: []

            },


            {
                id: "russian",

                name: "Russian",

                nativeName: "Русский",

                family:
                    "Indo-European · Slavic · East Slavic",

                script: "Cyrillic",

                focus:
                    "Case, verbal aspect, word order, phonology, and literary language.",

                resources: []

            },


            {
                id: "spanish",

                name: "Spanish",

                nativeName: "Español",

                family:
                    "Indo-European · Italic · Romance",

                script: "Latin",

                focus:
                    "Verb morphology, dialect variation, phonetics, historical development, and literature.",

                resources: []

            },


            {
                id: "arabic",

                name: "Arabic",

                nativeName: "العربية",

                family:
                    "Afro-Asiatic · Semitic",

                script: "Arabic",

                focus:
                    "Root-and-pattern morphology, classical and modern varieties, dialects, and grammatical traditions.",

                resources: []

            }

        ],


        /* =====================================
           10. READING RECORDS
        ===================================== */

        readingRecords: [],


        /* =====================================
           11. VOCABULARY
        ===================================== */

        vocabulary: []

    };


    /* =========================================
       12. DEEP FREEZE
    ========================================= */

    /*
     * Prevent accidental modification of the
     * shared knowledge database by interface code.
     */

    function deepFreeze(value) {

        if (
            !value ||
            typeof value !== "object" ||
            Object.isFrozen(value)
        ) {

            return value;

        }


        Object.freeze(value);


        Object.keys(value).forEach(function (key) {

            deepFreeze(value[key]);

        });


        return value;

    }


    /* =========================================
       13. EXPORT TO GLOBAL SCOPE
    ========================================= */

    global.LANGUAGE_STUDY_DATA = deepFreeze(data);


})(window);