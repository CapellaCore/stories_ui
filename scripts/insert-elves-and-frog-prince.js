/**
 * Insert: The Elves and the Shoemaker, The Frog Prince
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);
const CLASSIC = 'fd5817e5-d44a-46a8-a3b0-0a4abaeb09ad';
const ANIMALS = '06fa6aa9-deee-4c2a-a062-6ba48985e9bd';
const ASSETS = '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets';

async function insertStory({
  slug, title, age_group, reading_time, description,
  en, pl, ru, plTitle, plDesc, ruTitle, ruDesc, tags, images,
}) {
  const { data: existing } = await supabase.from('stories').select('id').eq('slug', slug).maybeSingle();
  if (existing) {
    console.log('Skip existing', slug);
    return;
  }

  const { data: inserted, error } = await supabase.from('stories').insert({
    title, description, content: en, reading_time, age_group, slug,
  }).select().single();
  if (error) throw error;
  const storyId = inserted.id;

  const { error: trError } = await supabase.from('story_translation').insert([
    { story_id: storyId, language: 'en', title, description, content: en, reading_time, hasaudio: false },
    { story_id: storyId, language: 'pl', title: plTitle, description: plDesc, content: pl, reading_time, hasaudio: false },
    { story_id: storyId, language: 'ru', title: ruTitle, description: ruDesc, content: ru, reading_time: Math.max(1, reading_time - 1), hasaudio: false },
  ]);
  if (trError) throw trError;

  const { error: tagError } = await supabase.from('story_tags').insert(tags.map((tag_id) => ({ story_id: storyId, tag_id })));
  if (tagError) throw tagError;

  for (const img of images) {
    if (!fs.existsSync(img.file)) {
      console.warn('Missing image', img.file);
      continue;
    }
    const buffer = fs.readFileSync(img.file);
    const fileName = path.basename(img.file);
    const storagePath = `stories/${storyId}/${Date.now()}-${fileName}`;
    const { error: uploadError } = await supabase.storage.from('story-images').upload(storagePath, buffer, {
      contentType: 'image/png', cacheControl: 'public, max-age=31536000, immutable', upsert: false,
    });
    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage.from('story-images').getPublicUrl(storagePath);
    const { error: imgDbError } = await supabase.from('story_images').insert({
      story_id: storyId, src: urlData.publicUrl, alt: img.alt, position: img.position,
      file_name: fileName, file_size: buffer.length, mime_type: 'image/png', storage_path: storagePath,
    });
    if (imgDbError) throw imgDbError;
  }
  console.log('Done', slug, storyId);
}

const elvesEn = `There once was a kind shoemaker who worked hard every day. But times were hard, and at last he had leather enough for only one more pair of shoes.

That evening he cut the leather carefully, laid it on his workbench, and went to bed with a hopeful heart. “Tomorrow I will sew,” he told his wife.

In the morning he could hardly believe his eyes. On the bench stood a perfect pair of shoes—stitched neatly, polished brightly, finished better than he had ever done himself.

A customer soon came, admired the shoes, and paid a good price. With the money the shoemaker bought leather for two more pairs. Again he cut the pieces at night. Again, by morning, two beautiful pairs stood ready.

So it went, night after night. The more leather he prepared, the more fine shoes appeared by dawn. Before long the shoemaker and his wife were no longer poor. Their little shop grew busy and bright.

One winter evening the wife said, “Let us stay awake and see who helps us so kindly.”

They lit no candle, hid behind a curtain, and watched. At midnight two tiny elves slipped in—barefoot, wearing only thin little shirts. They sat at the bench and sewed so quickly and cheerfully that the shoes were finished before the cock crowed. Then they skipped away into the dark.

“Poor little things,” whispered the wife. “They have helped us so much, and they have almost nothing to wear. I will sew them tiny coats, trousers, and caps. You make them two pairs of little boots.”

All day they worked with love. That night they laid the tiny clothes on the bench instead of leather, then hid again.

When the elves returned and saw the gifts, they laughed with joy. They dressed at once, smoothed their new caps, and danced around the room, singing:

“Now we are boys so fine to see,
No longer cobblers we will be!”

Then they hopped out the door and away down the street, waving farewell.

The elves never came to sew again—but they had given enough kindness for a lifetime. The shoemaker and his wife kept their shop with grateful hearts and always left a warm welcome for anyone in need.

And on quiet nights, if you listen closely near an old cobbler’s window, you might still hear tiny stitches singing in your dreams.

The end.

Based on the public domain tale by the Brothers Grimm, gently adapted for bedtime.`;

const elvesPl = `Żył kiedyś dobry szewc, który ciężko pracował każdego dnia. Lecz czasy były trudne i wreszcie zostało mu skóry tylko na jedną parę butów.

Wieczorem starannie wykroił skórę, położył ją na stole warsztatowym i poszedł spać z nadzieją w sercu. „Jutro będę szył” — powiedział żonie.

Rano nie mógł uwierzyć własnym oczom. Na stole stała doskonała para butów — starannie zszyta, lśniąco wypolerowana, lepsza niż kiedykolwiek zrobił sam.

Wkrótce przyszedł klient, zachwycił się butami i zapłacił dobrą cenę. Za te pieniądze szewc kupił skórę na dwie pary. Znów wieczorem wykroił kawałki. Znów rano stały gotowe dwie piękne pary.

Tak szło noc po nocy. Im więcej skóry przygotował, tym więcej wspaniałych butów pojawiało się o świcie. Wkrótce szewc i jego żona nie byli już biedni. Ich mały sklep stał się ruchliwy i jasny.

Pewnego zimowego wieczoru żona rzekła: „Czuwajmy i zobaczmy, kto tak życzliwie nam pomaga.”

Nie zapalili świecy, schowali się za zasłoną i patrzyli. O północy wślizgnęły się dwa maleńkie elfy — bose, w samych cienkich koszulkach. Usiadły przy stole i szyły tak szybko i wesoło, że buty były gotowe, zanim zapiał kogut. Potem odtańczyły w ciemność.

„Biedactwa” — szepnęła żona. „Tak nam pomogły, a nie mają prawie nic do noszenia. Uszyję im maleńkie kurtki, spodnie i czapeczki. Ty zrobisz dwie pary bucików.”

Cały dzień pracowali z miłością. Wieczorem zamiast skóry położyli na stole maleńkie ubranka i znów się schowali.

Gdy elfy wróciły i ujrzały dary, zaśmiały się z radości. Od razu się ubrały, poprawiły nowe czapeczki i zatańczyły po izbie, śpiewając:

„Teraz jesteśmy paniczami w stroju,
Nie będziemy już szyć po nocy w spokoju!”

Potem wyskoczyły za drzwi i pobiegły ulicą, machając na pożegnanie.

Elfy już nigdy nie przyszły szyć — lecz dały dość dobroci na całe życie. Szewc i żona prowadzili sklep z wdzięcznym sercem i zawsze gościli każdego potrzebującego.

A w ciche noce, jeśli przysuniesz ucho do starego szewskiego okna, może usłyszysz w snach maleńkie ściegi.

Koniec.

Na podstawie baśni braci Grimm z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const elvesRu = `Жил-был добрый сапожник, который трудился каждый день. Но времена были трудные, и в конце концов у него осталось кожи лишь на одну пару башмаков.

Вечером он аккуратно раскроил кожу, положил её на верстак и лёг спать с надеждой в сердце. «Завтра буду шить», — сказал он жене.

Утром он глазам своим не поверил. На верстаке стояла идеальная пара башмаков — аккуратно сшитая, начищенная до блеска, лучше, чем он когда-либо делал сам.

Вскоре пришёл покупатель, восхитился башмаками и хорошо заплатил. На эти деньги сапожник купил кожи на две пары. Снова вечером он раскроил куски. Снова к утру готовы были две прекрасные пары.

Так шло ночь за ночью. Чем больше кожи он готовил, тем больше отличных башмаков появлялось к рассвету. Вскоре сапожник с женой уже не были бедны. Их маленькая лавка стала бойкой и светлой.

Однажды зимним вечером жена сказала: «Давай не будем спать и посмотрим, кто так добро помогает нам.»

Они не зажгли свечу, спрятались за занавеской и смотрели. В полночь проскользнули два крошечных эльфа — босиком, в одних тонких рубашонках. Они сели за верстак и шили так быстро и весело, что башмаки были готовы, прежде чем прокричал петух. Потом они ускакали во тьму.

«Бедняжки, — прошептала жена. — Столько нам помогли, а носить почти нечего. Я сошью им крошечные кафтанчики, штанишки и шапочки. А ты сделай две пары сапожек.»

Весь день они работали с любовью. Вечером вместо кожи положили на верстак маленькую одёжку и снова спрятались.

Когда эльфы вернулись и увидели подарки, они рассмеялись от радости. Тут же оделись, поправили новые шапочки и заплясали по комнате, напевая:

«Теперь мы нарядны с головы до ног —
И шить по ночам нам больше не впрок!»

Потом они выскочили за дверь и убежали по улице, махая на прощание.

Эльфы больше никогда не приходили шить — но подарили достаточно доброты на всю жизнь. Сапожник с женой вели лавку с благодарным сердцем и всегда привечали нуждающихся.

А в тихие ночи, если приложить ухо к старому сапожному окошку, можно ещё услышать во сне крошечные стежки.

Конец.

По мотивам сказки братьев Гримм из общественного достояния, мягко адаптированной для чтения на ночь.`;

const frogEn = `Once a young princess loved to play with a golden ball in the castle garden. She tossed it high among the roses until—splash!—it fell into a deep, clear well.

“Oh, my ball!” she cried.

A frog poked his head from the water. “What will you give me if I fetch it?” he asked in a friendly croak.

“My jewels, my clothes—anything!” said the princess.

“I do not want jewels,” said the frog. “Promise that I may be your companion: sit by you at supper, eat from your plate, and sleep on a soft pillow near you.”

“Yes, yes,” said the princess quickly, thinking only of her ball. The frog dived deep and soon brought the golden ball up in his mouth. The princess snatched it happily and ran toward the castle without looking back.

That evening, as she sat at supper with the king, there came a soft knock and a little voice: “Princess, remember your promise!”

The frog had hopped all the way up the marble steps. The king listened kindly to the story.

“A promise is a promise,” he said gently. “We keep our word.”

So the princess set a tiny chair by her plate. The frog ate politely and spoke of garden rain and lily pads. At bedtime she made him a soft nest of cushions. She was still uneasy—but the frog was patient and polite.

For three days the frog visited as a true friend. On the third morning the princess found not a frog beside her cushions, but a kind young prince with bright eyes.

“A spell turned me into a frog,” he explained, “until someone kept a promise and treated me with care. Your kindness—and your father’s honesty—set me free.”

The princess smiled, a little shy and very glad. They became good friends, and often walked in the garden where the golden ball had fallen. Sometimes they still sat by the well and thanked the clear water for bringing them together.

And whenever the princess made a promise after that, she remembered the frog’s soft knock at the door—and she kept her word.

The end.

Based on the public domain tale by the Brothers Grimm, gently adapted for bedtime.`;

const frogPl = `Pewna młoda księżniczka uwielbiała bawić się złotą piłką w zamkowym ogrodzie. Podrzucała ją wysoko wśród róż, aż — plusk! — wpadła do głębokiej, czystej studni.

„Och, moja piłka!” — zawołała.

Żaba wyjrzała z wody. „Co mi dasz, jeśli ją wyjmę?” — zapytała przyjaznym kumkaniem.

„Klejnoty, suknie — wszystko!” — rzekła księżniczka.

„Nie chcę klejnotów” — odparła żaba. „Obiecaj, że będę twą towarzyszką: usiądę przy tobie przy wieczerzy, zjem z twojego talerza i pośpię na miękkiej poduszce obok ciebie.”

„Tak, tak” — szybko rzekła księżniczka, myśląc tylko o piłce. Żaba nurknęła głęboko i wkrótce wyniosła złotą piłkę w pyszczku. Księżniczka radośnie ją porwała i pobiegła do zamku, nie oglądając się za siebie.

Wieczorem, gdy siedziała przy wieczerzy z królem, rozległo się miękkie pukanie i cichy głos: „Księżniczko, pamiętaj o obietnicy!”

Żaba wskoczyła po marmurowych schodach. Król łagodnie wysłuchał historii.

„Obietnica to obietnica” — rzekł miękko. „Dotrzymujemy słowa.”

Więc księżniczka postawiła maleńkie krzesełko przy talerzu. Żaba jadła grzecznie i opowiadała o deszczu w ogrodzie i liściach lilii. Na noc zrobiła jej miękkie gniazdko z poduszek. Wciąż czuła niepokój — lecz żaba była cierpliwa i uprzejma.

Przez trzy dni żaba przychodziła jak prawdziwa przyjaciółka. Trzeciego poranka księżniczka znalazła obok poduszek nie żabę, lecz dobrego młodego księcia o jasnych oczach.

„Urok zamienił mnie w żabę” — wyjaśnił — „dopóki ktoś nie dotrzyma obietnicy i nie potraktuje mnie z troską. Twoja dobroć — i uczciwość twego ojca — mnie wyzwoliły.”

Księżniczka uśmiechnęła się, trochę nieśmiało i bardzo radośnie. Zostali dobrymi przyjaciółmi i często spacerowali po ogrodzie, gdzie spadła złota piłka. Czasem siadali jeszcze przy studni i dziękowali czystej wodzie za to, że ich połączyła.

A ilekroć księżniczka składała potem obietnicę, pamiętała miękkie pukanie żaby do drzwi — i dotrzymywała słowa.

Koniec.

Na podstawie baśni braci Grimm z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const frogRu = `Жила-была юная принцесса, которая любила играть золотым мячиком в замковом саду. Она подбрасывала его высоко среди роз, пока — плюх! — он не упал в глубокий чистый колодец.

«Ох, мой мячик!» — закричала она.

Лягушка высунула голову из воды. «Что ты дашь мне, если я достану его?» — спросила она дружелюбным кваканьем.

«Украшения, платья — всё что угодно!» — сказала принцесса.

«Мне не нужны украшения, — ответила лягушка. — Пообещай, что я буду твоей компаньонкой: сяду рядом за ужином, поем с твоей тарелки и посплю на мягкой подушке возле тебя.»

«Да, да», — быстро сказала принцесса, думая только о мячике. Лягушка нырнула глубоко и вскоре вынесла золотой мячик во рту. Принцесса радостно схватила его и побежала к замку, не оглядываясь.

Вечером, когда она сидела за ужином с королём, раздался мягкий стук и тихий голос: «Принцесса, вспомни своё обещание!»

Лягушка вскакала по мраморным ступеням. Король ласково выслушал историю.

«Обещание есть обещание, — мягко сказал он. — Мы держим слово.»

Тогда принцесса поставила крошечный стульчик у своей тарелки. Лягушка ела вежливо и рассказывала о дожде в саду и кувшинках. На ночь принцесса устроила ей мягкое гнёздышко из подушек. Ей всё ещё было неловко — но лягушка была терпеливой и учтивой.

Три дня лягушка приходила как настоящая подруга. На третье утро принцесса нашла у подушек не лягушку, а доброго молодого принца со светлыми глазами.

«Заклятие превратило меня в лягушку, — объяснил он, — пока кто-нибудь не сдержит обещание и не отнесётся ко мне с заботой. Твоя доброта — и честность твоего отца — освободили меня.»

Принцесса улыбнулась — немного смущённо и очень радостно. Они стали хорошими друзьями и часто гуляли в саду, где упал золотой мячик. Иногда они всё ещё сидели у колодца и благодарили чистую воду за то, что свела их вместе.

А когда принцесса после этого давала обещание, она вспоминала мягкий стук лягушки в дверь — и держала слово.

Конец.

По мотивам сказки братьев Гримм из общественного достояния, мягко адаптированной для чтения на ночь.`;

async function main() {
  await insertStory({
    slug: 'elves-and-the-shoemaker',
    title: 'The Elves and the Shoemaker',
    age_group: '3-5',
    reading_time: 8,
    description: 'A poor shoemaker discovers tiny helpful elves sewing shoes by night—and thanks them with gifts of tiny clothes.',
    en: elvesEn, pl: elvesPl, ru: elvesRu,
    plTitle: 'Elfy i szewc',
    plDesc: 'Biedny szewc odkrywa, że maleńkie elfy szyją buty nocą — i dziękuje im prezentami w postaci maleńkich ubranek.',
    ruTitle: 'Эльфы и сапожник',
    ruDesc: 'Бедный сапожник узнаёт, что крошечные эльфы шьют башмаки по ночам, — и благодарит их подарками: крошечной одёжкой.',
    tags: [CLASSIC],
    images: [
      { file: `${ASSETS}/elves-night.png`, alt: 'Tiny elves sew shoes by candlelight while the shoemaker sleeps', position: 0 },
      { file: `${ASSETS}/elves-gifts.png`, alt: 'The shoemaker and his wife leave tiny clothes as gifts for the elves', position: 2200 },
      { file: `${ASSETS}/elves-ending.png`, alt: 'The joyful elves dance away in their new little outfits', position: 4200 },
    ],
  });

  await insertStory({
    slug: 'frog-prince',
    title: 'The Frog Prince',
    age_group: '3-5',
    reading_time: 8,
    description: 'A princess retrieves her golden ball with a frog’s help and learns that keeping a promise can break a gentle spell.',
    en: frogEn, pl: frogPl, ru: frogRu,
    plTitle: 'Żabi książę',
    plDesc: 'Księżniczka odzyskuje złotą piłkę z pomocą żaby i uczy się, że dotrzymanie obietnicy może zdjąć łagodny urok.',
    ruTitle: 'Принц-лягушонок',
    ruDesc: 'Принцесса достаёт золотой мячик с помощью лягушки и узнаёт, что сдержанное обещание может снять доброе заклятие.',
    tags: [CLASSIC, ANIMALS],
    images: [
      { file: `${ASSETS}/frog-pond.png`, alt: 'A princess meets a friendly frog by the castle pond', position: 0 },
      { file: `${ASSETS}/frog-supper.png`, alt: 'The princess shares supper with the polite frog', position: 2200 },
      { file: `${ASSETS}/frog-ending.png`, alt: 'The princess and the freed prince walk in the sunny garden', position: 4200 },
    ],
  });
}

// Fix ru title after object - I put comment in wrong place. Fix in the call:
main().catch((e) => { console.error(e); process.exit(1); });
