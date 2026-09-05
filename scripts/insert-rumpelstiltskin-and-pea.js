/**
 * Insert gentle PD retelling: Rumpelstiltskin (Brothers Grimm)
 */
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);
const CLASSIC_TAG_ID = 'fd5817e5-d44a-46a8-a3b0-0a4abaeb09ad';

const slug = 'rumpelstiltskin';
const title = 'Rumpelstiltskin';

const en = `Long ago a poor miller had a clever daughter. One day, hoping to seem important, he told the king, “My daughter can spin straw into gold!”

The king was amazed and curious. He took the girl to a castle room filled with straw and a spinning wheel.

“If you can spin this into gold by morning,” he said, “you shall be rewarded. If not, there will be trouble.”

When the door closed, the girl sat down and cried. She could not spin straw into gold. She could not spin straw into anything.

Suddenly a tiny man with a pointed hat appeared.

“Why are you weeping?” he asked.

She told him everything. The little man smiled. “What will you give me if I help?”

“My necklace,” she said.

He took it, sat at the wheel, and whirred all night. By dawn the straw had become shining gold.

The next night the king filled a bigger room with straw. Again the girl wept, and again the little man came.

“What will you give me now?”

“My ring,” she said.

Once more he spun until morning. Gold glittered everywhere.

On the third night the room was largest of all. The king said, “If you succeed tonight, you shall marry me and become queen.”

The girl had nothing left to give. The little man tilted his head.

“Promise me your first child when you are queen,” he said softly.

Afraid and alone, she promised. The little man spun the last of the straw into gold. In the morning the king kept his word, and the miller’s daughter became queen.

A year later she had a beautiful baby. She had almost forgotten her promise—until the little man returned.

“Now give me what you promised,” he said.

The queen held her child close. “Please take all my treasures instead.”

He shook his head. “I do not want treasures. But I will give you three days. If you can guess my name, you may keep your child.”

The first day the queen guessed every name she knew: Caspar, Melchior, Balthazar, Tim, Tom, and more. The little man laughed. “That is not my name!”

The second day she sent messengers through the kingdom for unusual names. Still he laughed. “Not my name!”

On the third evening a messenger returned breathless. “Beyond the mountains I saw a tiny man dancing around a fire and singing:

‘Today I brew, tomorrow I bake,
And then the queen’s child I will take.
How glad I am that no one knew
My name is Rumpelstiltskin!’”

The queen almost smiled with relief.

When the little man appeared, she asked calmly, “Is your name Conrad?”

“No!”

“Is it Harry?”

“No!”

“Then… is it Rumpelstiltskin?”

The little man’s eyes grew wide. “The goblins told you! The goblins told you!” he cried. He stamped his foot so hard that his boot stuck in the floor, then hopped away into the forest, never to trouble the queen again.

The queen hugged her baby and whispered thank-you to the kind messenger. From that day she told only honest stories, and her castle was filled with laughter, not boasts.

The end.

Based on the public domain tale by the Brothers Grimm, gently adapted for bedtime.`;

const pl = `Dawno temu biedny młynarz miał bystrą córkę. Pewnego dnia, chcąc wydać się ważnym, powiedział królowi: „Moja córka potrafi prząść złoto ze słomy!”

Król zdziwił się i zaintrygował. Zaprowadził dziewczynę do komnaty pełnej słomy, gdzie stało kołowrotek.

„Jeśli do rana uprzędziesz ze słomy złoto” — rzekł — „będziesz nagrodzona. Jeśli nie — będą kłopoty.”

Gdy drzwi się zamknęły, dziewczyna usiadła i zapłakała. Nie umiała prząść złota ze słomy. Nie umiała prząść ze słomy niczego.

Nagle pojawił się maleńki człowieczek w spiczastej czapce.

„Czemu płaczesz?” — zapytał.

Opowiedziała mu wszystko. Ludzik uśmiechnął się. „Co mi dasz, jeśli pomogę?”

„Mój naszyjnik” — rzekła.

Wziął go, usiadł do kołowrotka i przędł całą noc. O świcie słoma stała się lśniącym złotem.

Następnej nocy król napełnił większą komnatę słomą. Znów dziewczyna płakała i znów przyszedł ludzik.

„Co mi dasz teraz?”

„Mój pierścień” — rzekła.

Znów przędł do rana. Złoto błyszczało wszędzie.

Trzeciej nocy komnata była największa. Król rzekł: „Jeśli dziś się uda, poślubisz mnie i zostaniesz królową.”

Dziewczyna nie miała już nic do dania. Ludzik przechilił głowę.

„Obiecaj mi swoje pierwsze dziecko, gdy będziesz królową” — powiedział miękko.

Przestraszona i samotna, obiecała. Ludzik uprzędł resztę słomy w złoto. Rano król dotrzymał słowa i córka młynarza została królową.

Po roku urodziła piękne dziecko. Prawie zapomniała obietnicy — aż wrócił ludzik.

„Oddaj teraz, co obiecałaś” — rzekł.

Królowa tuliła dziecko. „Weź raczej wszystkie moje skarby.”

Pokręcił głową. „Nie chcę skarbów. Dam ci jednak trzy dni. Jeśli odgadniesz moje imię, dziecko zostanie z tobą.”

Pierwszego dnia królowa zgadywała wszystkie znane imiona: Kasper, Melchior, Baltazar, Tim, Tom i wiele innych. Ludzik śmiał się. „To nie moje imię!”

Drugiego dnia rozesłała posłańców po królestwie po niezwykłe imiona. On wciąż się śmiał. „Nie moje imię!”

Trzeciego wieczoru posłaniec wrócił zdyszany. „Za górami widziałem maleńkiego człowieka tańczącego wokół ognia i śpiewającego:

„Dziś warzę, jutro piekę,
Potem dziecko królowej wezmę.
Jakże się cieszę, że nikt nie wie,
Że na imię mam Rumpelsztyk!””

Królowa niemal uśmiechnęła się z ulgą.

Gdy ludzik się pojawił, spokojnie zapytała: „Czy masz na imię Konrad?”

„Nie!”

„A Harry?”

„Nie!”

„Więc… czy jesteś Rumpelsztykiem?”

Oczy ludzika zrobiły się wielkie. „Hobgobliny ci powiedziały! Hobgobliny ci powiedziały!” — krzyknął. Uderzył nogą tak mocno, że but utknął w podłodze, po czym odskoczył do lasu i już nigdy nie niepokoił królowej.

Królowa przytuliła dziecko i podziękowała dobremu posłańcowi. Od tego dnia opowiadała tylko prawdziwe historie, a jej zamek pełen był śmiechu, nie przechwałek.

Koniec.

Na podstawie baśni braci Grimm z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const ru = `Давным-давно у бедного мельника была смышлёная дочь. Однажды, желая показаться важным, он сказал королю: «Моя дочь умеет прясть из соломы золото!»

Король удивился и заинтересовался. Он привёл девушку в комнату, полную соломы, где стояла прялка.

«Если к утру спрядешь из этой соломы золото, — сказал он, — тебя наградят. Если нет — будут неприятности.»

Когда дверь закрылась, девушка села и заплакала. Она не умела прясть золото из соломы. Она не умела прясть из соломы ничего.

Вдруг появился крошечный человечек в остроконечной шапке.

«Почему ты плачешь?» — спросил он.

Она всё рассказала. Человечек улыбнулся. «Что ты дашь мне, если я помогу?»

«Моё ожерелье,» — сказала она.

Он взял его, сел за прялку и всю ночь прял. К рассвету солома стала сияющим золотом.

На следующую ночь король наполнил соломой комнату ещё больше. Девушка снова плакала, и снова пришёл человечек.

«Что дашь мне теперь?»

«Моё кольцо,» — сказала она.

Он снова прял до утра. Золото блестело повсюду.

На третью ночь комната была самой большой. Король сказал: «Если сегодня удастся, ты выйдешь за меня и станешь королевой.»

Девушке уже нечего было отдать. Человечек наклонил голову.

«Пообещай мне своего первого ребёнка, когда станешь королевой,» — мягко сказал он.

Испуганная и одинокая, она пообещала. Человечек спрял остатки соломы в золото. Утром король сдержал слово, и дочь мельника стала королевой.

Через год у неё родился прекрасный малыш. Она почти забыла обещание — пока не вернулся человечек.

«Отдай теперь то, что обещала,» — сказал он.

Королева прижала ребёнка. «Возьми лучше все мои сокровища.»

Он покачал головой. «Мне не нужны сокровища. Но я дам тебе три дня. Если угадаешь моё имя, ребёнок останется с тобой.»

В первый день королева называла все известные имена: Каспар, Мельхиор, Бальтазар, Тим, Том и многие другие. Человечек смеялся. «Это не моё имя!»

На второй день она разослала гонцов по королевству за необычными именами. Он всё смеялся. «Не моё имя!»

На третий вечер гонец вернулся запыхавшись. «За горами я видел крошечного человечка, который плясал вокруг костра и пел:

„Сегодня варю, завтра пеку,
Потом дитя королевы возьму.
Как рад я, что никто не знает:
Меня зовут Румпельштильцхен!”»

Королева чуть не улыбнулась от облегчения.

Когда человечек явился, она спокойно спросила: «Тебя зовут Конрад?»

«Нет!»

«Гарри?»

«Нет!»

«Тогда… тебя зовут Румпельштильцхен?»

Глаза человечка стали огромными. «Лесные духи тебе сказали! Лесные духи тебе сказали!» — закричал он. Он топнул ногой так сильно, что сапог застрял в полу, а потом ускакал в лес и больше никогда не тревожил королеву.

Королева обняла малыша и поблагодарила доброго гонца. С того дня она рассказывала только правдивые истории, и её замок был полон смеха, а не хвастовства.

Конец.

По мотивам сказки братьев Гримм из общественного достояния, мягко адаптированной для чтения на ночь.`;

async function insertStory({ slug, title, age_group, reading_time, description, en, pl, ru, plTitle, plDesc, ruTitle, ruDesc, images, tags }) {
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
    { story_id: storyId, language: 'ru', title: ruTitle, description: ruDesc, content: ru, reading_time: reading_time - 1, hasaudio: false },
  ]);
  if (trError) throw trError;

  const { error: tagError } = await supabase.from('story_tags').insert(tags.map(tag_id => ({ story_id: storyId, tag_id })));
  if (tagError) throw tagError;

  for (const img of images) {
    if (!fs.existsSync(img.file)) continue;
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

async function main() {
  const assets = '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets';

  await insertStory({
    slug,
    title,
    age_group: '6-8',
    reading_time: 11,
    description: 'A miller’s daughter must guess a mysterious little man’s name to keep her child safe in this classic tale of wit and honesty.',
    en, pl, ru,
    plTitle: 'Rumpelsztyk',
    plDesc: 'Córka młynarza musi odgadnąć imię tajemniczego ludzika, by ochronić swoje dziecko, w tej klasycznej baśni o sprycie i uczciwości.',
    ruTitle: 'Румпельштильцхен',
    ruDesc: 'Дочь мельника должна угадать имя таинственного человечка, чтобы защитить своего ребёнка, в этой классической сказке об уме и честности.',
    tags: [CLASSIC_TAG_ID],
    images: [
      { file: `${assets}/rump-straw.png`, alt: 'The miller’s daughter sits by a spinning wheel in a room of straw', position: 0 },
      { file: `${assets}/rump-dance.png`, alt: 'The little man dances around a fire singing his secret name', position: 2800 },
      { file: `${assets}/rump-ending.png`, alt: 'The queen keeps her baby safe after guessing the little man’s name', position: 5500 },
    ],
  });

  const peaEn = `There once was a prince who wished to marry a true princess. He traveled far and wide, meeting many young ladies. Some were kind, some were clever, some wore splendid dresses—but he was never quite sure they were real princesses. So he came home a little sad.

One stormy evening rain poured and wind rattled the castle windows. Through the thunder came a knock at the gate.

Outside stood a young woman, soaked from head to toe. Water dripped from her hair, and her shoes squelched. Yet she stood politely and said, “Please, may I come in? I am a princess, and I have lost my way.”

The queen looked carefully. She was not sure. “We shall see,” she thought.

She went to the guest bedroom and took all the mattresses and quilts from the cupboard. At the very bottom of the bed she placed a single tiny green pea. Then she piled twenty soft mattresses on top, and twenty feather quilts above those.

“Sleep well, my dear,” she told the girl.

In the morning the queen asked, “How did you sleep?”

The princess sighed. “Oh, terribly! I barely closed my eyes. Something hard was under the bed, and now I am quite black and blue. I do not know what it was.”

The queen smiled. Only a real princess could feel a pea through so many mattresses!

The prince was overjoyed. Here at last was someone delicate, honest, and truly of royal heart. They were married with music and cake, and the little pea was placed in the royal museum—where, if you visit quietly, you may still hear people whisper, “Can you believe she felt that?”

And on rainy nights the princess slept on an ordinary soft bed, for she had already proved she was a princess—and now she was also loved.

The end.

Based on the public domain tale by Hans Christian Andersen, gently adapted for bedtime.`;

  const peaPl = `Żył kiedyś książę, który pragnął poślubić prawdziwą księżniczkę. Podróżował daleko i szeroko, spotykając wiele panien. Jedne były dobre, inne mądre, jeszcze inne nosiły wspaniałe suknie — lecz nigdy nie był pewien, czy to prawdziwe księżniczki. Wrócił więc do domu trochę smutny.

Pewnego burzliwego wieczoru lał deszcz i wiatr kołatał o okna zamku. Spośród grzmotów dobiło się pukanie do bramy.

Na zewnątrz stała młoda kobieta, przemoczona od stóp do głów. Woda spływała z jej włosów, a buty chlupotały. A jednak grzecznie rzekła: „Proszę, czy mogę wejść? Jestem księżniczką i zgubiłam drogę.”

Królowa przyjrzała się uważnie. Nie była pewna. „Zobaczymy” — pomyślała.

Poszła do komnaty gościnnej i wyjęła z szafy wszystkie materace i kołdry. Na samym spodzie łóżka położyła jedno maleńkie ziarenko grochu. Potem ułożyła na nim dwadzieścia miękkich materacy, a na nich dwadzieścia pierzyn.

„Śpij dobrze, drogie dziecko” — powiedziała dziewczynie.

Rano królowa zapytała: „Jak spałaś?”

Księżniczka westchnęła. „Och, okropnie! Ledwie przymknęłam oczy. Coś twardego było pod łóżkiem, a teraz jestem całkiem potłuczona. Nie wiem, co to było.”

Królowa uśmiechnęła się. Tylko prawdziwa księżniczka mogła poczuć groch przez tyle materacy!

Książę był uradowany. Oto wreszcie ktoś delikatny, szczery i prawdziwie królewskiego serca. Wzięli ślub przy muzyce i cieście, a maleńki groch trafił do królewskiego muzeum — gdzie, jeśli przyjdziesz cicho, wciąż możesz usłyszeć szept: „Czy wierzysz, że ona to poczuła?”

A w deszczowe noce księżniczka spała już na zwykłym miękkim łóżku, bo udowodniła, że jest księżniczką — a teraz była także kochana.

Koniec.

Na podstawie baśni Hansa Christiana Andersena z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

  const peaRu = `Жил-был принц, который хотел жениться на настоящей принцессе. Он ездил далеко и широко и встречал много девушек. Одни были добры, другие умны, третьи носили пышные платья — но он никогда не был уверен, что это настоящие принцессы. Поэтому вернулся домой немного грустный.

Однажды ненастным вечером лил дождь, и ветер стучал в окна замка. Сквозь гром послышался стук в ворота.

Снаружи стояла молодая женщина, промокшая с головы до ног. С волос капала вода, ботинки хлюпали. И всё же она вежливо сказала: «Пожалуйста, можно войти? Я принцесса и сбилась с дороги.»

Королева внимательно посмотрела. Она не была уверена. «Посмотрим», — подумала она.

Она пошла в гостевую комнату и вынула из шкафа все матрасы и одеяла. На самое дно постели положила одну крошечную зелёную горошину. Потом навалила сверху двадцать мягких матрасов и ещё двадцать пуховых одеял.

«Спи спокойно, милая», — сказала она девушке.

Утром королева спросила: «Как ты спала?»

Принцесса вздохнула. «Ох, ужасно! Я едва сомкнула глаза. Под постелью было что-то твёрдое, и теперь я вся в синяках. Не знаю, что это было.»

Королева улыбнулась. Только настоящая принцесса могла почувствовать горошину сквозь столько матрасов!

Принц был в восторге. Наконец-то нашёлся кто-то нежный, честный и с поистине королевским сердцем. Они поженились под музыку и с тортом, а крошечную горошину положили в королевский музей — где, если прийти тихо, до сих пор можно услышать шёпот: «Веришь ли, что она её почувствовала?»

А в дождливые ночи принцесса спала уже на обычной мягкой кровати: она доказала, что она принцесса, — и теперь её ещё и любили.

Конец.

По мотивам сказки Ханса Кристиана Андерсена из общественного достояния, мягко адаптированной для чтения на ночь.`;

  await insertStory({
    slug: 'princess-and-the-pea',
    title: 'The Princess and the Pea',
    age_group: '3-5',
    reading_time: 6,
    description: 'A rain-soaked visitor proves she is a real princess by feeling a tiny pea under twenty mattresses.',
    en: peaEn,
    pl: peaPl,
    ru: peaRu,
    plTitle: 'Księżniczka na ziarnku grochu',
    plDesc: 'Przemoknięta przybyszka dowodzi, że jest prawdziwą księżniczką, czując maleńki groch pod dwudziestoma materacami.',
    ruTitle: 'Принцесса на горошине',
    ruDesc: 'Промокшая путница доказывает, что она настоящая принцесса, почувствовав крошечную горошину под двадцатью матрасами.',
    tags: [CLASSIC_TAG_ID],
    images: [
      { file: `${assets}/pea-arrival.png`, alt: 'A rain-soaked princess arrives at the castle door on a stormy night', position: 0 },
      { file: `${assets}/pea-mattresses.png`, alt: 'The princess lies awake on a tall stack of mattresses', position: 1800 },
      { file: `${assets}/pea-ending.png`, alt: 'The prince and princess smile beside the tiny pea in the morning', position: 3200 },
    ],
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
