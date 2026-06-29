import type { LessonData } from '@/data/lessons'

export const swLessons: Record<number, Partial<LessonData>> = {
  0: {
    title: "Karibu kwenye Wakati Ujao – Safari Yako ya AI Inaanza!",
    introduction: "Ingia kwenye maabara ya kiteknolojia ya ajabu ambapo kila kitu kinawezekana! Maya na Alex walikuwa wakitazama skrini inayometa wakati roboti rafiki anayeitwa Vision Vee aliposhuka kuwasalimia. 'Karibuni, wagunduzi wachanga!' Vee alisema kwa uchangamfu. 'Mko karibu kuanza safari ya kusisimua sana ya Akili Mnemba (AI), Roboti, na teknolojia za ajabu za kesho. Uko tayari kuona jinsi AI inavyobadilisha ulimwengu wetu?'",
    main_lesson: "Akili Mnemba (au AI) ni kama kupatia kompyuta aina maalum ya 'akili' ili ziweze kutusaidia kutatua matatizo, kutambua picha, kuelewa sauti zetu, na hata kutengeneza sanaa! Kama unavyojifunza kwa kusoma vitabu na kucheza michezo, kompyuta zinaweza kujifunza kutoka kwa mifumo na taarifa. Katika safari hii, utatembelea visiwa tofauti na kujifunza jinsi AI inavyofanya magari yajiendeshe yenyewe, inavyosaidia madaktari kutibu magonjwa, inavyolinda wanyama wa porini, na kufanya maisha ya baadaye kuwa bora kwa kila mtu.",
    examples: [{ type: "activity", content: "Tazama mazingira yako — kuanzia wasaidizi wa sauti hadi kufunga kwa uso, AI tayari ipo hapa kukusaidia kila siku. Je, unaweza kutambua vitu 3 vinavyotumia AI?" }],
    fun_facts: ["Je, wajua kwamba neno 'robot' lilitumika kwa mara ya kwanza kwenye mchezo wa kuigiza zaidi ya miaka 100 iliyopita? Leo, roboti halisi na AI zinatusaidia kugundua anga za juu na chini ya bahari!"]
  },
  1: {
    title: "Computer Vision – Kufundisha Kompyuta Kuona",
    introduction: "Ndani kabisa ya Maabara ya Heavenly Tech, Maya aligundua kitu cha kushangaza. 'Kibao changu kinajuaje ni mimi?' alijiuliza. Ghafla, Vision Vee alitokea, akiwa amezungukwa na mwanga wa holografia. 'Mambo Maya!' Vee alisema kwa uchangamfu. 'Kama vile tunavyoona uzuri ulimwenguni, mimi hutumia Computer Vision kuona na kuelewa mifumo mizuri inayotuzunguka! Je, ungependa kujiunga na safari yangu?'",
    main_lesson: "Computer Vision ni zawadi maalum kwa kompyuta! Inazifundisha kuona na kuelewa ulimwengu wetu mzuri, kama vile macho na mioyo yetu inavyofanya kazi pamoja kuwatambua watu tunaowapenda. Kompyuta hutumia kamera na vitambuzi ili kuchukua picha, kisha hutumia algoriti kupata mifumo kwenye picha hizo — kama vile kutambua nyuso, kusoma maandishi, au kuona paka kwenye picha. Kampuni kama Google na Apple hutumia Computer Vision katika kila programu ya picha na kipengele cha kufungua kwa uso unachotumia kila siku. Magari yanayojiendesha hutumia kusoma alama za barabarani. Madaktari hutumia kutambua magonjwa kwenye vipimo vya matibabu. Uwezekano hauna mwisho!",
    fun_facts: ["Je, wajua kuwa kamera ya simu yako hufanya hesabu karibu bilioni 1 kila sekunde ili tu kulenga uso wako wakati wa kupiga picha ya selfie? Hiyo ni haraka kuliko kufumba na kufumbua!", "Mifumo ya Computer Vision sasa inaweza kutambua zaidi ya aina 10,000 tofauti za vitu kwenye picha moja."],
    examples: [{ type: "activity", content: "Tazama chumba chako na uchague vitu 5. Viandike chini. Sasa wazia ukiifundisha kompyuta kutambua kila kimoja — ni vidokezo gani utaifundisha kutafuta? Rangi, umbo, ukubwa?" }]
  },
  2: {
    title: "Speech Recognition – Kufundisha Kompyuta Kusikiliza",
    introduction: "Alex anapenda kuzungumza na vifaa vyake vyenye akili nyumbani. Ghafla, Echo Ed anatokea, roboti mwenye mifumo ya mawimbi ya sauti yanayometa. 'Mambo Alex!' Echo Ed anaeleza kwa tabasamu. 'Sauti yako ni kama wimbo mzuri! Mimi husaidia kompyuta kupata maneno yako na kuyageuza kuwa mawazo mazuri. Ni kama kuwa mpelelezi wa muziki usioonekana wa mazungumzo!'",
    main_lesson: "Speech Recognition husaidia kompyuta kusikiliza kwa mioyo yao! Inageuza sauti zetu kuwa maneno yanayosaidia AI kuelewa jinsi inavyoweza kutusaidia vyema. Unapozungumza na Siri au Alexa, sauti yako inavunjwa katika mawimbi madogo ya sauti. AI inachambua mawimbi hayo, inayalinganisha na mifumo iliyojifunza kutoka kwa mamilioni ya sauti, na kuibadilisha kuwa maandishi kwa sekunde chache. Speech recognition inatumiwa katika vituo vya huduma kwa wateja, hospitalini, kwenye magari, na kusaidia watu wenye ulemavu kuwasiliana vyema.",
    fun_facts: ["Mfumo wa kwanza wa kutambua sauti ulitengenezwa mnamo 1952 na uliweza tu kuelewa nambari 0-9, lakini mifumo ya leo inaweza kuelewa mamilioni ya maneno katika mamia ya lugha!", "Spika zenye akili sasa zinaweza kuelewa lafudhi kutoka zaidi ya nchi 50."],
    examples: [{ type: "activity", content: "Sema sentensi moja wazi kisha jaribu kusema sentensi hiyo kwa kunong'ona. Mwombe rafiki au mwanafamilia ajaribu pia. Je, sauti inabadilikaje? Hili ndilo badiliko ambalo AI inapaswa kujifunza kushughulikia!" }]
  },
  3: {
    title: "Tafsiri ya AI – Kuvunja Vikwazo vya Lugha",
    introduction: "Sofia anataka kuwa rafiki wa Yuki kutoka Japan, lakini wanazungumza lugha tofauti. Ghafla, Linky Lex anatokea akiwa ameshikilia ulimwengu wa kidijitali unaometa. 'Nitakusaidia kujenga daraja la urafiki!' Lex anasema. 'Ninajua sheria za lugha nyingi na ninaweza kugeuza maneno yako kuwa Kijapani ili Yuki aelewe moyo wako. Ni kama daraja la wema la ajabu!'",
    main_lesson: "Tafsiri ya AI ni kama daraja la ajabu linalounganisha watu kutoka kote ulimwenguni! Mifumo ya kisasa ya tafsiri ya AI hutumia Njia ya Neural Machine Translation — AI husoma sentensi nzima badala ya neno kwa neno, ikielewa muktadha na maana ya maneno. Ilifundishwa kwa mabilioni ya sentensi katika jozi (kama sentensi ya Kiingereza karibu na toleo lake la Kifaransa) ili ijifunze jinsi lugha zinavyolingana. Leo, Google Translate inashughulikia zaidi ya maombi ya tafsiri milioni 500 kila siku, ikisaidia zaidi ya lugha 100.",
    fun_facts: ["Google Translate inaweza kutafsiri kati ya lugha zaidi ya 100 na inashughulikia zaidi ya maombi ya tafsiri milioni 500 kila siku!", "AI sasa inaweza kutafsiri lugha ya ishara kuwa maandishi na maandishi kurudi kwenye lugha ya ishara ya picha."],
    examples: [{ type: "activity", content: "Chagua salamu kutoka nchi 5 tofauti (k.m., Bonjour, Hola, Konnichiwa, Ciao, Salaam). Jaribu kuzisema! Sasa fikiria: AI ingejifunzaje kutafsiri kati ya lugha hizi zote?" }]
  }
}
