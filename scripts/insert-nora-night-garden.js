/**
 * Insert original bedtime story: Nora and the Night Garden
 * with EN/PL/RU translations, Originals tag, and illustrations.
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);

const ORIGINALS_TAG_ID = '367734fa-c1a0-4142-8f6d-334893da2239';
const ANIMALS_TAG_ID = '06fa6aa9-deee-4c2a-a062-6ba48985e9bd';

const story = {
  title: 'Nora and the Night Garden',
  slug: 'nora-and-the-night-garden',
  age_group: '3-5',
  reading_time: 10,
  description:
    'A tiny mouse named Nora discovers a secret garden that blooms only at night, and learns that the quietest jobs can be the most wonderful.',
  content: `In a quiet meadow where the grass whispered and the moon hung like a silver button, lived a tiny mouse named Nora.

Nora had soft brown fur, bright curious eyes, and a little blue scarf that her grandmother had knitted for her. She loved cheese crumbs, soft moss beds, and listening to the wind tell secrets through the reeds.

But Nora had one small problem.

She was always too busy to sleep.

While other mice curled up in their nests, Nora raced through tunnels, counted seeds, and peeked out of her burrow again and again. “What if I miss something wonderful?” she whispered.

One evening, when the sky turned the color of blueberries, Nora heard a sound she had never heard before.

Ting… ting… ting…

It was soft, like tiny bells made of moonlight.

Nora wrapped her blue scarf tighter and followed the sound through the meadow. Past the old oak stump. Past the sleepy frogs. Past a puddle that held a piece of the moon.

At the edge of the meadow stood a gate of twisted vines.

It had never been there before.

Nora’s whiskers twitched. “Hello?” she squeaked.

The gate opened with a gentle sigh.

Beyond it lay the Night Garden.

Flowers as pale as milk glowed softly among the leaves. Silver petals opened one by one. Fireflies drifted like floating lanterns. The air smelled of honey and cool rain.

Nora’s paws sank into the softest moss she had ever felt.

“Oh,” she breathed. “How beautiful.”

From behind a cluster of moonblossoms stepped a tall hare with fur the color of fog. Around her neck hung a tiny bell.

“Welcome, Nora,” said the hare kindly. “I am Lumen, keeper of the Night Garden.”

“You know my name?” Nora asked.

“The Night Garden knows every little creature who cannot rest,” Lumen smiled. “Would you like to help us tonight?”

Nora’s heart fluttered like a moth. “Help? Me?”

“Yes,” said Lumen. “The night flowers bloom while children sleep. But some of them open in the wrong places. They need a gentle friend to tuck them into bed.”

Nora stood as tall as a tiny mouse can stand. “I can do that.”

Lumen gave her a basket woven from starlight grass. Inside it, three little night flowers shivered and glowed.

“These three are lost,” Lumen said. “Find them soft beds of moss, whisper something kind, and they will sleep until dawn.”

Nora nodded solemnly and set off along a path of glowing pebbles.

The first flower was shy and blue. It hid behind a pebble shaped like a heart.

“Don’t be afraid,” Nora whispered. “I will find you a quiet place.”

She carried it to a circle of moss under a fern. She pressed the soil gently, smoothed the petals, and sang a soft song her grandmother used to hum.

The flower stopped trembling and closed its petals with a happy sigh.

“One,” Nora whispered.

The second flower was bright and golden, bouncing in the basket as if it wanted to dance forever.

“You can dance tomorrow,” Nora giggled. “Tonight is for resting.”

She tucked it beside a sleeping beetle under a mushroom umbrella. The golden flower spun once more, then nestled down and glowed like a candle behind a curtain.

“Two,” Nora whispered.

The third flower was the smallest of all, pale as pearl, and it cried tiny silver tears.

“Why are you sad?” Nora asked.

“I am afraid of the dark,” the little flower sniffed.

Nora thought carefully. Then she took off her blue scarf and wrapped it loosely around the flower’s stem.

“My grandmother made this,” she said. “It always makes me feel brave. You can borrow it tonight.”

The pearl flower sniffed once more, then smiled with all its petals. Nora tucked it into a soft hollow beneath a stone painted with dew.

“Three,” Nora whispered.

When she returned, Lumen was waiting by the gate. The Night Garden seemed quieter now, as if the whole world was breathing slowly.

“You did beautifully,” Lumen said. “Because you helped others rest, you may take a gift.”

She placed something tiny in Nora’s paws: a seed that shimmered like frost.

“Plant this near your burrow,” Lumen said. “When you feel too busy to sleep, it will remind you that even the busiest hearts need quiet.”

Nora thanked her and bowed so deeply that her whiskers brushed the moss.

As she stepped back through the vine gate, the Night Garden faded into ordinary meadow grass. Only the moon remained, smiling.

At home, Nora planted the shimmering seed beside her door. She washed her paws, folded a leaf into a pillow, and curled into her nest.

For the first time in many nights, she did not peek outside again and again.

She closed her eyes.

She listened to the wind.

She thought of shy blue petals, dancing golden light, and a pearl flower wrapped in her scarf.

And Nora slept.

Outside her burrow, the little seed opened just a little, glowing gently until morning.

And from that night on, whenever Nora grew restless, she remembered the Night Garden: how quiet work can be wonderful, how kindness helps others rest, and how every brave little mouse deserves soft dreams.`,
};

const translations = {
  en: {
    title: story.title,
    description: story.description,
    content: story.content,
    reading_time: 10,
  },
  pl: {
    title: 'Nora i Ogród Nocy',
    description:
      'Mała myszka Nora odkrywa tajemny ogród, który kwitnie tylko nocą, i uczy się, że najcichsze obowiązki bywają najcudowniejsze.',
    reading_time: 10,
    content: `Na cichej łące, gdzie trawa szeptała, a księżyc wisiał jak srebrny guzik, mieszkała maleńka myszka o imieniu Nora.

Nora miała miękkie brązowe futerko, bystre, ciekawe oczy i mały niebieski szalik, który wydziergała dla niej babcia. Kochała okruszki sera, miękkie posłania z mchu i słuchanie, jak wiatr opowiada sekrety wśród trzcin.

Ale Nora miała jeden mały problem.

Zawsze była zbyt zajęta, by zasnąć.

Kiedy inne myszki zwijały się w gniazdkach, Nora biegała po norkach, liczyła ziarenka i znów i znów wyglądała z nory. „A co, jeśli przegapię coś wspaniałego?” — szeptała.

Pewnego wieczoru, gdy niebo zrobiło się koloru borówek, Nora usłyszała dźwięk, jakiego nigdy wcześniej nie słyszała.

Cing… cing… cing…

Był miękki, jak maleńkie dzwoneczki zrobione z światła księżyca.

Nora owinęła się ciaśniej niebieskim szalikiem i poszła za dźwiękiem przez łąkę. Obok starego pnia dębu. Obok śpiących żab. Obok kałuży, w której leżał kawałek księżyca.

Na skraju łąki stała brama ze splecionych pnączy.

Nigdy wcześniej jej tam nie było.

Wąsy Nory zadrżały. „Halo?” — pisnęła.

Brama otworzyła się z łagodnym westchnieniem.

Za nią leżał Ogród Nocy.

Kwiaty blade jak mleko świeciły miękko wśród liści. Srebrne płatki otwierały się jeden po drugim. Świetliki unosiły się jak latające latarenki. Powietrze pachniało miodem i chłodnym deszczem.

Łapki Nory zatonęły w najmiększym mchu, jaki kiedykolwiek czuła.

„Och” — wyszeptała. „Jakie to piękne.”

Spoza kępy księżycowych kwiatów wyszedł wysoki zając o futrze w kolorze mgły. Na szyi miał maleńki dzwoneczek.

„Witaj, Noro” — powiedział zając życzliwie. „Jestem Lumen, strażnik Ogrodu Nocy.”

„Znasz moje imię?” — zapytała Nora.

„Ogród Nocy zna każde małe stworzenie, które nie może odpocząć” — uśmiechnął się Lumen. „Czy chciałabyś nam dziś pomóc?”

Serce Nory zatrzepotało jak ćma. „Pomóc? Ja?”

„Tak” — rzekł Lumen. „Nocne kwiaty kwitną, gdy dzieci śpią. Ale niektóre otwierają się w niewłaściwych miejscach. Potrzebują delikatnego przyjaciela, który ułoży je do snu.”

Nora stanęła tak prosto, jak tylko maleńka myszka potrafi. „Dam radę.”

Lumen dał jej koszyk spleciony z trawy gwiazd. W środku drżały i świeciły trzy małe nocne kwiaty.

„Te trzy się zgubiły” — powiedział Lumen. „Znajdź im miękkie posłania z mchu, szepnij coś miłego, a będą spały aż do świtu.”

Nora skinęła poważnie głową i wyruszyła ścieżką ze świecących kamyków.

Pierwszy kwiat był nieśmiały i niebieski. Schował się za kamykiem w kształcie serca.

„Nie bój się” — szepnęła Nora. „Znajdę ci ciche miejsce.”

Zaniosła go do kręgu mchu pod paprocią. Delikatnie ugniotła ziemię, wygładziła płatki i zaśpiewała cichą piosenkę, którą kiedyś nuciła babcia.

Kwiat przestał drżeć i z westchnieniem szczęścia zamknął płatki.

„Jeden” — szepnęła Nora.

Drugi kwiat był jasny i złoty, podskakiwał w koszyku, jakby chciał tańczyć bez końca.

„Możesz zatańczyć jutro” — zachichotała Nora. „Dziś czas na odpoczynek.”

Ułożyła go obok śpiącego chrząszcza pod grzybowym parasolem. Złoty kwiat zakręcił się jeszcze raz, potem wtulił się i świecił jak świeca za firanką.

„Dwa” — szepnęła Nora.

Trzeci kwiat był najmniejszy ze wszystkich, blady jak perła, i płakał maleńkimi srebrnymi łzami.

„Dlaczego jesteś smutny?” — zapytała Nora.

„Boję się ciemności” — pociągnął noskiem mały kwiat.

Nora pomyślała uważnie. Potem zdjęła niebieski szalik i luźno owinęła nim łodygę kwiatu.

„Zrobiła go babcia” — powiedziała. „Zawsze dodaje mi odwagi. Możesz go pożyczyć na tę noc.”

Perłowy kwiat pociągnął noskiem jeszcze raz, a potem uśmiechnął się wszystkimi płatkami. Nora ułożyła go w miękkiej dziupli pod kamieniem ozdobionym rosą.

„Trzy” — szepnęła Nora.

Kiedy wróciła, Lumen czekał przy bramie. Ogród Nocy wydawał się teraz cichszy, jakby cały świat oddychał powoli.

„Poradziłaś sobie wspaniale” — rzekł Lumen. „Ponieważ pomogłaś innym odpocząć, możesz wziąć prezent.”

Położył coś maleńkiego w łapkach Nory: nasionko, które błyszczało jak szron.

„Zasadź je koło swojej nory” — powiedział Lumen. „Kiedy poczujesz, że jesteś zbyt zajęta, by spać, przypomni ci, że nawet najbardziej zabiegane serca potrzebują ciszy.”

Nora podziękowała i skłoniła się tak głęboko, że wąsy musnęły mech.

Gdy wróciła przez bramę z pnączy, Ogród Nocy zniknął wśród zwykłej łąkowej trawy. Został tylko uśmiechnięty księżyc.

W domu Nora zasadziła lśniące nasionko przy drzwiach. Umyła łapki, złożyła listek w poduszkę i zwinęła się w gniazdku.

Po raz pierwszy od wielu nocy nie wyglądała już na zewnątrz znów i znów.

Zamknęła oczy.

Posłuchała wiatru.

Pomyślała o nieśmiałych niebieskich płatkach, tańczącym złotym świetle i perłowym kwiecie owiniętym w jej szalik.

I Nora zasnęła.

Za norką maleńkie nasionko otworzyło się odrobinę, świecąc łagodnie aż do rana.

A od tamtej nocy, ilekroć Nora robiła się niespokojna, wspominała Ogród Nocy: że cicha praca może być wspaniała, że dobroć pomaga innym odpocząć i że każda dzielna mała myszka zasługuje na miękkie sny.`,
  },
  ru: {
    title: 'Нора и Ночной сад',
    description:
      'Маленькая мышка Нора открывает тайный сад, который цветёт только ночью, и узнаёт, что самые тихие дела бывают самыми чудесными.',
    reading_time: 9,
    content: `На тихом лугу, где шептала трава, а луна висела как серебряная пуговица, жила крошечная мышка по имени Нора.

У Норы был мягкий коричневый мех, яркие любопытные глазки и маленький синий шарфик, который связала ей бабушка. Она любила сырные крошки, мягкие постельки из мха и слушала, как ветер рассказывает секреты в камышах.

Но у Норы была одна маленькая беда.

Она всегда была слишком занята, чтобы уснуть.

Пока другие мышки сворачивались в гнёздышках, Нора носилась по норкам, считала зёрнышки и снова и снова выглядывала наружу. «А вдруг я пропущу что-то чудесное?» — шептала она.

Однажды вечером, когда небо стало цвета черники, Нора услышала звук, которого никогда раньше не слышала.

Динь… динь… динь…

Он был мягким, будто крошечные колокольчики из лунного света.

Нора потуже обернула синий шарфик и пошла за звуком через луг. Мимо старого дубового пня. Мимо сонных лягушек. Мимо лужицы, в которой лежал кусочек луны.

На краю луга стояли ворота из сплетённых лоз.

Раньше их здесь не было.

Усики Норы дрогнули. «Ау?» — пискнула она.

Ворота открылись с ласковым вздохом.

За ними лежал Ночной сад.

Цветы бледные, как молоко, мягко светились среди листьев. Серебряные лепестки раскрывались один за другим. Светлячки плыли, будто летающие фонарики. Воздух пах мёдом и прохладным дождём.

Лапки Норы утонули в самом мягком мхе, какой она когда-либо чувствовала.

«Ох, — выдохнула она. — Как красиво.»

Из-за куста лунных цветов вышел высокий заяц с шерстью цвета тумана. На шее у него висел крошечный колокольчик.

«Добро пожаловать, Нора, — сказал заяц ласково. — Я Люмен, хранитель Ночного сада.»

«Ты знаешь моё имя?» — спросила Нора.

«Ночной сад знает каждое маленькое существо, которое не может уснуть, — улыбнулся Люмен. — Хочешь помочь нам сегодня ночью?»

Сердце Норы затрепетало, как мотылёк. «Помочь? Мне?»

«Да, — сказал Люмен. — Ночные цветы распускаются, пока дети спят. Но некоторые открываются не там, где нужно. Им нужен нежный друг, который уложит их спать.»

Нора выпрямилась так гордо, как только может крошечная мышка. «Я смогу.»

Люмен дал ей корзинку, сплетённую из звёздной травы. Внутри дрожали и светились три маленьких ночных цветка.

«Эти трое заблудились, — сказал Люмен. — Найди им мягкие постельки из мха, прошепчи что-нибудь доброе — и они будут спать до рассвета.»

Нора важно кивнула и отправилась по тропинке из светящихся камешков.

Первый цветок был робким и голубым. Он спрятался за камешком в форме сердца.

«Не бойся, — прошептала Нора. — Я найду тебе тихое место.»

Она отнесла его в кружок мха под папоротником. Мягко прижала землю, разгладила лепестки и тихонько запела песенку, которую когда-то напевала бабушка.

Цветок перестал дрожать и счастливо закрыл лепестки.

«Один,» — прошептала Нора.

Второй цветок был ярким и золотым, подпрыгивал в корзинке, будто хотел танцевать вечно.

«Потанцуешь завтра, — хихикнула Нора. — А сегодня пора отдыхать.»

Она уложила его рядом со спящим жучком под грибным зонтиком. Золотой цветок ещё раз крутанулся, потом устроился и светился, как свеча за занавеской.

«Два,» — прошептала Нора.

Третий цветок был самым маленьким, бледным, как жемчужина, и плакал крошечными серебряными слезинками.

«Почему ты грустишь?» — спросила Нора.

«Я боюсь темноты,» — всхлипнул маленький цветок.

Нора подумала внимательно. Потом сняла синий шарфик и неплотно обвязала им стебелёк.

«Его связала бабушка, — сказала она. — Он всегда делает меня смелее. Можешь взять его на эту ночь.»

Жемчужный цветок ещё раз всхлипнул, а потом улыбнулся всеми лепестками. Нора уложила его в мягкую ямку под камешком, украшенным росой.

«Три,» — прошептала Нора.

Когда она вернулась, Люмен ждал у ворот. Ночной сад стал тише, будто весь мир медленно дышал.

«Ты замечательно справилась, — сказал Люмен. — За то, что помогла другим отдохнуть, можешь взять подарок.»

Он положил что-то крошечное в лапки Норы: семечко, сверкающее, как иней.

«Посади его у своей норки, — сказал Люмен. — Когда тебе снова покажется, что ты слишком занята для сна, оно напомнит: даже самым хлопотливым сердцам нужна тишина.»

Нора поблагодарила его и поклонилась так низко, что усики коснулись мха.

Когда она снова прошла через ворота из лоз, Ночной сад растаял в обычной луговой траве. Осталась только улыбающаяся луна.

Дома Нора посадила сверкающее семечко у двери. Вымыла лапки, сложила листик в подушку и свернулась в гнёздышке.

Впервые за много ночей она не выглядывала наружу снова и снова.

Она закрыла глаза.

Послушала ветер.

Подумала о робких голубых лепестках, о танцующем золотом свете и о жемчужном цветке в её шарфике.

И Нора уснула.

Возле норки крошечное семечко чуть-чуть раскрылось и мягко светилось до утра.

А с той ночи, когда бы Нора ни становилась беспокойной, она вспоминала Ночной сад: что тихая работа может быть чудесной, что доброта помогает другим отдыхать, и что каждая храбрая маленькая мышка заслуживает мягких снов.`,
  },
};

const images = [
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/nora-night-garden-hero.png',
    alt: 'Nora the mouse discovers the glowing Night Garden under the moon',
    position: 0,
  },
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/nora-tucking-flower.png',
    alt: 'Nora gently tucks a glowing night flower into soft moss',
    position: 2500,
  },
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/nora-asleep-moon.png',
    alt: 'Nora sleeps peacefully among night flowers under the moon',
    position: 5200,
  },
];

async function main() {
  // Idempotent: skip if slug exists
  const { data: existing } = await supabase
    .from('stories')
    .select('id, slug')
    .eq('slug', story.slug)
    .maybeSingle();

  if (existing) {
    console.error('Story already exists:', existing.id, existing.slug);
    process.exit(1);
  }

  const { data: inserted, error: storyError } = await supabase
    .from('stories')
    .insert({
      title: story.title,
      description: story.description,
      content: story.content,
      reading_time: story.reading_time,
      age_group: story.age_group,
      slug: story.slug,
    })
    .select()
    .single();

  if (storyError) throw storyError;
  const storyId = inserted.id;
  console.log('Created story', storyId);

  const translationRows = Object.entries(translations).map(([language, t]) => ({
    story_id: storyId,
    language,
    title: t.title,
    description: t.description,
    content: t.content,
    reading_time: t.reading_time,
    hasaudio: false,
  }));

  const { error: trError } = await supabase.from('story_translation').insert(translationRows);
  if (trError) throw trError;
  console.log('Inserted translations: en, pl, ru');

  const { error: tagError } = await supabase.from('story_tags').insert([
    { story_id: storyId, tag_id: ORIGINALS_TAG_ID },
    { story_id: storyId, tag_id: ANIMALS_TAG_ID },
  ]);
  if (tagError) throw tagError;
  console.log('Linked tags: originals, animals');

  for (const img of images) {
    const buffer = fs.readFileSync(img.file);
    const fileName = path.basename(img.file);
    const storagePath = `stories/${storyId}/${Date.now()}-${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('story-images')
      .upload(storagePath, buffer, {
        contentType: 'image/png',
        cacheControl: 'public, max-age=31536000, immutable',
        upsert: false,
      });
    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage.from('story-images').getPublicUrl(storagePath);

    const { error: imgDbError } = await supabase.from('story_images').insert({
      story_id: storyId,
      src: urlData.publicUrl,
      alt: img.alt,
      position: img.position,
      file_name: fileName,
      file_size: buffer.length,
      mime_type: 'image/png',
      storage_path: storagePath,
    });
    if (imgDbError) throw imgDbError;
    console.log('Uploaded image', fileName, '->', urlData.publicUrl);
  }

  console.log('\nDone!');
  console.log(`EN: /stories/originals/${story.slug}`);
  console.log(`PL: /pl/stories/originals/${story.slug}`);
  console.log(`RU: /ru/stories/originals/${story.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
