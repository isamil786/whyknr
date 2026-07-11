import { prisma } from "./prisma";
import { createSlug } from "./utils";

const categories = [
  { name: "Breaking News", slug: "breaking-news", color: "#DC2626" },
  { name: "Local News", slug: "local-news", color: "#E85D04" },
  { name: "Politics", slug: "politics", color: "#7C3AED" },
  { name: "Events", slug: "events", color: "#0891B2" },
  { name: "In Focus", slug: "in-focus", color: "#059669" },
  { name: "Lifestyle", slug: "lifestyle", color: "#DB2777" },
];

const sampleArticles = [
  {
    title: "Karimnagar Smart City Project Updates: New Roads & Parks Coming Soon",
    titleTe: "కరీంనగర్ స్మార్ట్ సిటీ ప్రాజెక్ట్ నవీకరణలు: కొత్త రోడ్లు మరియు పార్కులు త్వరలో",
    titleHi: "करीमनगर स्मार्ट सिटी प्रोजेक्ट अपडेट: जल्द बनेंगे नए रोड और पार्क",
    excerpt:
      "Major infrastructure developments are underway across Karimnagar as part of the Smart City initiative.",
    excerptTe:
      "స్మార్ట్ సిటీ ఉద్యమంలో భాగంగా కరీంనగర్ నలుమూలా పెద్ద చափల్య అభివృద్ధి పనులు జరుగుతున్నాయి.",
    excerptHi:
      "स्मार्ट सिटी पहल के तहत करीमनगर में बुनियादी ढांचे का विकास तेजी से चल रहा है।",
    content: `<p>Karimnagar is witnessing a transformation as the Smart City project picks up pace. New road widening works, modern street lighting, and green spaces are being developed across the district.</p>
<p>Residents can expect improved connectivity between key areas including the bus stand, hospital zone, and residential colonies. The municipal corporation has confirmed that several parks will be renovated with walking tracks and children's play areas.</p>
<p>Local officials stated that the project aims to make Karimnagar a model city for Telangana, combining heritage with modern urban planning.</p>`,
    contentTe: `<p>కరీంనగర్ స్మార్ట్ సిటీ ప్రాజెక్ట్ విస్సరణ గతిని పెంచుకుంటూ రూపాంతరణ చెందుతున్నది. కొత్త రోడ్ల వెడల్పుకరణ, ఆధునిక వీధి విద్యుత్, మరియు హరితమైన ప్రదేశాలు జిల్లా నలుమూలా అభివృద్ధి చేయబడుతున్నాయి.</p>
<p>నివాసులు బస్సు స్టాండ్, ఆసుపత్రి జోన్, మరియు నివాస కాలోనీల మధ్య ఎక్కువ సంధానం ఆశించవచ్చు. అనేక పార్కులు చేపట కోర్సులు మరియు చిల్డ్రన్ ప్లే ఎరియాలతో పునర్నిర్మితం చేయబడతాయని నగర కార్పోరేషన్ నిశ్చయం చేసింది.</p>
<p>స్థానిక అధికారులు ఈ ప్రాజెక్ట్ కరీంనగర్‌ను తెలంగాణకు మోడల్ నగరంగా మార్చడానికి లక్ష్యంగా ఉందని, సంప్రదాయానికి ఆధునిక పట్టణ ప్రణాళికను కలిపి చెప్పారు.</p>`,
    contentHi: `<p>करीमनगर स्मार्ट सिटी परियोजना के तहत जिला तेजी से विकास की राह पर है। पूरे जिले में सड़कों को चौड़ा करने, आधुनिक स्ट्रीट लाइट लगाने और नए पार्क विकसित करने का काम चल रहा है।</p>
<p>स्थानीय बस स्टैंड, अस्पताल क्षेत्र और आवासीय कॉलोनियों के बीच आवागमन और बेहतर होने की उम्मीद है। नगर निगम ने पुष्टि की है कि कई पार्कों में नए वॉकिंग ट्रैक और बच्चों के खेलने के क्षेत्र बनाए जाएंगे।</p>
<p>स्थानीय अधिकारियों ने कहा कि इस परियोजना का उद्देश्य विरासत को आधुनिक शहरी नियोजन के साथ मिलाकर करीमनगर को तेलंगाना का एक मॉडल शहर बनाना है।</p>`,
    mediaType: "IMAGE" as const,
    mediaUrl:
      "https://images.unsplash.com/photo-1582407947302-27d009a39959?w=1200&h=675&fit=crop",
    categorySlug: "local-news",
    featured: true,
  },
  {
    title: "V6 Bridge Area Traffic Diverted — Commuters Advised to Use Alternate Routes",
    titleTe: "V6 బ్రిడ్జ్ ఏరియా ట్రాఫిక్ మళ్లింపు - ప్రయాణికులకు ఇతర రూట్‌లను ఉపయోగించమని సూచన",
    titleHi: "V6 ब्रिज क्षेत्र में ट्रैफिक डायवर्ट — यात्रियों को वैकल्पिक मार्गों का उपयोग करने की सलाह",
    excerpt:
      "Temporary traffic arrangements in place near the V6 bridge area during repair works.",
    excerptTe:
      "V6 బ్రిడ్జ్ సమీపంలో మరమ్మత్ కార్యకు సంబంధించిన తాత్కాలిక ట్రాఫిక్ ఏర్పాటులు నిర్వహించబడుతున్నాయి.",
    excerptHi:
      "V6 ब्रिज क्षेत्र में मरम्मत कार्यों के दौरान अस्थायी यातायात व्यवस्था की गई है।",
    content: `<p>Traffic police have announced temporary diversions near the V6 bridge area in Karimnagar following ongoing repair and maintenance work. Commuters heading towards the city centre are advised to use alternate routes via the bypass road.</p>
<p>Officials expect the work to be completed within two weeks. Heavy vehicles have been restricted during peak hours to ease congestion for daily commuters.</p>`,
    contentTe: `<p>కరీంనగర్‌లో V6 బ్రిడ్జ్ సమీపంలో చేపట్టిన మరమ్మత్ మరియు నిర్వహణ కార్యకు సంబంధించిన తాత్కాలిక ట్రాఫిక్ మళ్లింపులను ట్రాఫిక్ పోలీసు ఘోషించారు. నగర కేంద్రం వైపు వెళ్ళే ప్రయాణికులు బైపాస్ రోడ్ ద్వారా ఇతర రూట్‌లను ఉపయోగించమని సూచించబడ్డారు.</p>
<p>ఈ పని రెండు వారాల్లో పూర్తయ్యేందుకు అధికారులు ఆశిస్తున్నారు. దైనిక ప్రయాణికుల ఉద్రిక్తత తగ్గించడానికి శిఖర సమయానికి భారీ వాహనాలను నిషేధించారు.</p>`,
    contentHi: `<p>करीमनगर में चल रहे मरम्मत और रखरखाव के काम के चलते यातायात पुलिस ने V6 ब्रिज के पास अस्थायी ट्रैफिक डायवर्जन की घोषणा की है। शहर के केंद्र की ओर जाने वाले यात्रियों को बाईपास रोड से वैकल्पिक मार्ग अपनाने की सलाह दी गई है।</p>
<p>अधिकारियों को उम्मीद है कि यह काम दो सप्ताह में पूरा हो जाएगा। दैनिक यात्रियों को जाम से बचाने के लिए व्यस्त समय में भारी वाहनों के प्रवेश पर रोक लगा दी गई है।</p>`,
    mediaType: "IMAGE" as const,
    mediaUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=675&fit=crop",
    categorySlug: "breaking-news",
    featured: false,
  },
  {
    title: "Karimnagar District Collector Reviews Monsoon Preparedness",
    titleTe: "కరీంనగర్ జిల్లా కలెక్టర్ వర్షకాల సన్నద్ధతను సమీక్షించారు",
    titleHi: "करीमनगर के जिला कलेक्टर ने मानसून की तैयारियों की समीक्षा की",
    excerpt:
      "District administration holds review meeting ahead of the monsoon season.",
    excerptTe:
      "జила పరిపాలన వర్షకాల సీజనుకు ముందుగా సమీక్ష సమావేశాన్ని నిర్వహించారు.",
    excerptHi:
      "मानसून सीजन से पहले जिला प्रशासन ने समीक्षा बैठक आयोजित की।",
    content: `<p>The District Collector convened a high-level meeting with department heads to review monsoon preparedness across Karimnagar district. Drainage clearing, reservoir monitoring, and emergency response teams were discussed.</p>
<p>Officials were directed to ensure all low-lying areas have adequate pumping arrangements and that helpline numbers are widely publicised among residents.</p>`,
    contentTe: `<p>జిల్లా కలెక్టర్ కరీంనగర్ జిల్లాలో వర్షకాల సన్నద్ధతను సమీక్షించుటకు విభాగ ప్రధానులతో ఉన్నత స్థర సమావేశాన్ని నిర్వహించారు. డ్రైనేజ్ శుభ్రతకరణ, రిజర్వాయర్ పర్యవేక్షణ, మరియు అత్యవసర ప్రతిస్పందన జట్లను చర్చించారు.</p>
<p>అన్ని నీచ ప్రదేశాలకు తగిన పంపింగ్ ఏర్పాటులు ఉన్నాయని మరియు హెల్పలైన్ నంబర్‌లు నివాసులలో విస్తృతంగా ప్రచారం చేయబడుతున్నాయని సూచించమని అధికారులకు సూచనలు ఇవ్వబడ్డాయి.</p>`,
    contentHi: `<p>करीमनगर के जिला कलेक्टर ने मानसून की तैयारियों की समीक्षा के लिए विभाग प्रमुखों के साथ एक उच्च स्तरीय बैठक बुलाई। बैठक में नालों की सफाई, जलाशयों की निगरानी और आपातकालीन प्रतिक्रिया टीमों पर चर्चा की गई।</p>
<p>अधिकारियों को निर्देश दिया गया है कि वे सभी निचले इलाकों में पानी निकालने के लिए पंपों की उचित व्यवस्था सुनिश्चित करें और आपातकालीन हेल्पलाइन नंबरों का व्यापक प्रचार करें।</p>`,
    mediaType: "VIDEO" as const,
    mediaUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    categorySlug: "politics",
    featured: false,
  },
  {
    title: "Weekend Food & Craft Mela at Tower Circle Attracts Huge Crowds",
    titleTe: "టవర్ సర్కిల్ వద్ద వీకెండ్ ఫూడ్ & క్రాఫ్ట్ మేల విశాల సంఘాలను ఆకర్షించింది",
    titleHi: "टावर सर्कल पर वीकेंड फूड एंड क्राफ्ट मेला, उमड़ी भारी भीड़",
    excerpt:
      "Local artisans and food vendors showcase Karimnagar's culture at the weekend mela.",
    excerptTe:
      "స్థానిక శిల్పులు మరియు ఆహార విక్రేతలు వీకెండ్ మేలలో కరీంనగర్ సంస్కృతిని ప్రదర్శించారు.",
    excerptHi:
      "टावर सर्कल पर आयोजित वीकेंड मेले में स्थानीय कारीगरों और खाद्य विक्रेताओं ने करीमनगर की संस्कृति का प्रदर्शन किया।",
    content: `<p>Tower Circle came alive this weekend with a vibrant food and craft mela celebrating local talent. Handloom weavers, pottery artisans, and home chefs from across the district set up stalls attracting thousands of visitors.</p>
<p>Organisers said the event will return next month with expanded cultural performances and live music sessions.</p>`,
    contentTe: `<p>టవర్ సర్కిల్ ఈ వీకెండ్‌లో స్థానిక ప్రతిభను జరుపుకునే శక్తివంతమైన ఆహార మరియు క్రాఫ్ట్ మేలతో జీవం సంతరించుకుంది. జిల్లా అంతటా చేతిలో అల్లిన వస్త్ర నిర్మాతలు, కుండలం కళాకారులు, మరియు గృహ చెఫ్‌లు వేలల మంది సందర్శకులను ఆకర్షించే స్టాల్‌లను ఏర్పాటు చేశారు.</p>
<p>సంఘటన నిర్వాహకులు ఈ ఈవెంట్ వచ్చే నెల విస్తృత సాంస్కృతిక ప్రదర్శనలు మరియు లైవ్ సంగీత సెషన్‌లతో తిరిగి రానుకుంటారని చెప్పారు.</p>`,
    contentHi: `<p>इस वीकेंड टावर सर्कल स्थानीय प्रतिभाओं को बढ़ावा देने वाले भोजन और शिल्प मेले से गुलजार रहा। जिले भर से आए बुनकरों, मिट्टी के बर्तन बनाने वाले कलाकारों और स्थानीय रसोइयों ने स्टॉल लगाए, जिन्हें देखने हजारों लोग पहुंचे।</p>
<p>आयोजकों ने बताया कि यह मेला अगले महीने फिर आयोजित किया जाएगा, जिसमें अधिक सांस्कृतिक प्रस्तुतियां और लाइव संगीत कार्यक्रम शामिल होंगे।</p>`,
    mediaType: "IMAGE" as const,
    mediaUrl:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&h=675&fit=crop",
    categorySlug: "events",
    featured: true,
  },
];

export async function seedDatabase() {
  const existing = await prisma.category.count();
  if (existing > 0) return;

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }

  for (const article of sampleArticles) {
    const category = await prisma.category.findUnique({
      where: { slug: article.categorySlug },
    });
    if (!category) continue;

    const slug = createSlug(article.title);
    await prisma.article.create({
      data: {
        title: article.title,
        titleTe: article.titleTe,
        titleHi: article.titleHi,
        slug,
        excerpt: article.excerpt,
        excerptTe: article.excerptTe,
        excerptHi: article.excerptHi,
        content: article.content,
        contentTe: article.contentTe,
        contentHi: article.contentHi,
        mediaType: article.mediaType,
        mediaUrl: article.mediaUrl,
        featured: article.featured,
        categoryId: category.id,
        publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      },
    });
  }
}
