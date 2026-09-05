/**
 * Insert gentle public-domain retelling: Snow White and the Seven Dwarfs
 * Based on the Brothers Grimm tale (public domain), adapted for bedtime.
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

const story = {
  title: 'Snow White and the Seven Dwarfs',
  slug: 'snow-white',
  age_group: '6-8',
  reading_time: 12,
  description:
    'Kind Snow White finds safety with seven dwarfs in the forest, and goodness wins over jealousy.',
};

const en = `Long ago, in a kingdom wrapped in soft hills and silver forests, a queen sat by a winter window sewing. As she looked at the falling snow, she wished for a child as fair as snow, with lips as red as rose petals and hair as dark as ebony wood.

When her wish came true, she named the baby Snow White.

But the good queen did not live to see her daughter grow. In time the king married again. The new queen was beautiful, but her heart was cold with envy. Every morning she asked her magic mirror:

“Mirror, mirror, on the wall, who is the fairest of them all?”

And every morning the mirror answered, “You, my queen, are the fairest.”

Years passed. Snow White grew kind and gentle. She shared bread with birds, smiled at servants, and spoke softly even when she was sad. One morning the mirror said something new.

“You are fair, my queen, it is true. But Snow White is fairer than you.”

The queen’s face tightened. Jealousy filled her like a storm cloud. She ordered a huntsman to take Snow White deep into the forest and leave her there.

The huntsman led Snow White among the trees. When he saw her trusting eyes, his anger melted. “I cannot harm you,” he whispered. “Run, little one. Run far and do not return.”

Snow White ran until her legs ached. Evening painted the sky purple. At last she found a tiny cottage tucked between roots and stones.

Inside were seven little beds, seven little plates, and seven little chairs. Everything was neat, but dusty from a long day’s work. Snow White was so tired that she tasted a crumb of bread, sipped a drop of water, and fell asleep across the beds.

When night came, seven dwarfs returned from the mountains where they mined glittering stones. They found the cottage door ajar and a girl asleep like a quiet dream.

“Who is this?” whispered one.

“She looks kind,” said another.

They let her sleep until morning. When Snow White woke, she told them her story. The dwarfs listened carefully.

“You may stay with us,” they said. “Keep the cottage warm and safe. But be careful of strangers. Envy has long arms.”

Snow White stayed. She swept the floors, sang to the kettle, and filled the cottage with laughter. The dwarfs grew fond of her. Each evening they returned with stories of sparkling caves, and Snow White told them about birds and flowers.

Far away, the queen asked her mirror again. When she learned Snow White still lived, she disguised herself as an old peddler woman. She carried a basket of pretty things into the forest.

“Pretty laces for a pretty girl,” she called.

Snow White, polite as always, opened the door a little. The woman laced her dress so tightly that Snow White grew dizzy and sank to the floor. Luckily the dwarfs came home early. They loosened the lace, and Snow White breathed again.

“Do not open the door!” they begged.

But the queen tried once more. This time she brought a shining apple, half rosy red and half pale gold.

“A gift for you, my dear,” she smiled. “The red side is the sweetest.”

Snow White remembered the dwarfs’ warning. Still, the apple looked harmless, and the woman’s voice was soft. Snow White took one small bite of the red side.

At once she fell into a deep, strange sleep.

When the dwarfs found her, they could not wake her. They wept, then built a clear crystal bed so they could still see her gentle face. They watched over her day and night, taking turns beside the cottage path.

One spring morning a traveling prince rode through the forest. He saw Snow White sleeping like a snowflake held in glass. He spoke kindly to the dwarfs and asked to help protect her.

As they carefully moved the crystal bed, the piece of apple slipped from Snow White’s lips. She drew a long breath and opened her eyes.

“Where am I?” she asked softly.

“You are safe,” said the dwarfs, dancing with joy.

News of her waking traveled farther than birdsong. The jealous queen’s power faded when the kingdom learned the truth of her cruelty. Snow White forgave what could be forgiven and chose kindness again.

She visited the dwarfs often, bringing cakes and stories. And on quiet nights, when the moon hung above the silver forest, the seven friends still hummed the songs Snow White had taught them.

And so Snow White lived surrounded by friendship, and the cottage in the woods remained a place where goodness was always welcome.

The end.

Based on the public domain tale by the Brothers Grimm, gently adapted for bedtime.`;

const pl = `Dawno temu, w królestwie otulonym łagodnymi wzgórzami i srebrnymi lasami, królowa siedziała zimą przy oknie i szyła. Patrząc na padający śnieg, zapragnęła dziecka białego jak śnieg, z ustami czerwonymi jak płatki róży i włosami czarnymi jak heban.

Gdy życzenie się spełniło, nazwała córeczkę Śnieżką.

Dobra królowa nie dożyła jednak chwili, gdy córka podrosła. Z czasem król ożenił się ponownie. Nowa królowa była piękna, lecz jej serce chłodziła zazdrość. Codziennie rano pytała magiczne lustro:

„Lustereczko, powiedz przecie, kto jest najpiękniejszy w świecie?”

I codziennie lustro odpowiadało: „Ty, królowo, jesteś najpiękniejsza.”

Mijały lata. Śnieżka rosła dobra i łagodna. Dzieliła się chlebem z ptakami, uśmiechała do służby i mówiła miękko nawet wtedy, gdy było jej smutno. Pewnego ranka lustro powiedziało coś nowego.

„Jesteś piękna, to prawda. Lecz Śnieżka jest piękniejsza od ciebie.”

Twarz królowej stwardniała. Zazdrość wypełniła ją jak burzowa chmura. Rozkazała myśliwemu zaprowadzić Śnieżkę głęboko do lasu i tam ją zostawić.

Myśliwy prowadził Śnieżkę wśród drzew. Gdy zobaczył jej ufne oczy, gniew w nim zgasł. „Nie mogę cię skrzywdzić” — szepnął. „Biegnij, mała. Biegnij daleko i nie wracaj.”

Śnieżka biegła, aż zabolały ją nogi. Wieczór pomalował niebo na fioletowo. Wreszcie znalazła maleńką chatkę schowaną między korzeniami i kamieniami.

W środku stało siedem małych łóżek, siedem małych talerzyków i siedem małych krzesełek. Wszystko było schludne, choć zakurzone po długim dniu pracy. Śnieżka była tak zmęczona, że skubnęła okruszek chleba, łyknęła kroplę wody i zasnęła na łóżkach.

Gdy nadeszła noc, wróciło siedmiu krasnoludków z gór, gdzie wydobywali lśniące kamienie. Zastali uchylone drzwi i dziewczynkę śpiącą jak cichy sen.

„Któż to?” — szepnął jeden.

„Wygląda na dobrą” — rzekł drugi.

Pozwolili jej spać do rana. Gdy Śnieżka się obudziła, opowiedziała im swoją historię. Krasnoludki słuchały uważnie.

„Możesz z nami zostać” — powiedzieli. „Pilnuj, by w chatce było ciepło i bezpiecznie. Ale uważaj na obcych. Zazdrość ma długie ramiona.”

Śnieżka została. Zamiatła podłogi, śpiewała do czajnika i wypełniała chatkę śmiechem. Krasnoludki polubiły ją bardzo. Każdego wieczoru wracali z opowieściami o błyszczących jaskiniach, a Śnieżka opowiadała im o ptakach i kwiatach.

Daleko stąd królowa znów zapytała lustro. Gdy dowiedziała się, że Śnieżka żyje, przebrała się za starą handlarzę. Wniosła do lasu koszyk ładnych rzeczy.

„Piękne sznurówki dla pięknej dziewczyny!” — wołała.

Śnieżka, grzeczna jak zawsze, uchyliła drzwi. Kobieta sznurowała suknię tak mocno, że Śnieżce zakręciło się w głowie i osunęła się na podłogę. Na szczęście krasnoludki wróciły wcześniej. Poluzowali sznurówki i Śnieżka znów odetchnęła.

„Nie otwieraj drzwi!” — błagali.

Lecz królowa spróbowała jeszcze raz. Tym razem przyniosła lśniące jabłko, w połowie różowe, w połowie złotawe.

„Prezent dla ciebie, drogie dziecko” — uśmiechnęła się. „Czerwona strona jest najsłodsza.”

Śnieżka pamiętała ostrzeżenie. A jednak jabłko wyglądało niewinnie, a głos kobiety był łagodny. Śnieżka ugryzła odrobinę czerwonej strony.

Zaraz zapadła w głęboki, dziwny sen.

Gdy krasnoludki ją znaleźli, nie mogli jej obudzić. Płakali, a potem zbudowali przezroczyste kryształowe łoże, by nadal widzieć jej łagodną twarz. Czuwali przy niej dniem i nocą.

Pewnego wiosennego poranka przez las przejeżdżał podróżujący książę. Ujrzał Śnieżkę śpiącą jak płatek śniegu w szkle. Łagodnie odezwał się do krasnoludków i poprosił, by mógł pomóc jej strzec.

Gdy ostrożnie przesuwali kryształowe łoże, kawałek jabłka wypadł Śnieżce z ust. Dziewczynka głęboko odetchnęła i otworzyła oczy.

„Gdzie ja jestem?” — zapytała cicho.

„Jesteś bezpieczna” — odparli krasnoludki, tańcząc z radości.

Wieść o jej przebudzeniu pobiegła dalej niż śpiew ptaków. Władza zazdrosnej królowej osłabła, gdy królestwo poznało prawdę o jej okrucieństwie. Śnieżka wybaczyła to, co dało się wybaczyć, i znów wybrała dobroć.

Często odwiedzała krasnoludki, przynosząc ciasta i opowieści. A w ciche noce, gdy księżyc zawisał nad srebrnym lasem, siedmiu przyjaciół nadal nuciło piosenki, których nauczyła ich Śnieżka.

I tak Śnieżka żyła otoczona przyjaźnią, a chatka w lesie pozostała miejscem, gdzie dobro zawsze było mile widziane.

Koniec.

Na podstawie baśni braci Grimm z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const ru = `Давным-давно в королевстве среди мягких холмов и серебряных лесов королева сидела зимой у окна и шила. Глядя на падающий снег, она загадала желание: пусть родится ребёнок белый, как снег, с губами алыми, как лепестки розы, и волосами чёрными, как чёрное дерево.

Когда желание сбылось, она назвала малышку Белоснежкой.

Но добрая королева не дожила до того дня, когда дочь подросла. Со временем король женился снова. Новая королева была красива, но сердце её охлаждала зависть. Каждое утро она спрашивала волшебное зеркало:

«Свет мой, зеркальце, скажи, да всю правду доложи: кто на свете всех милее?»

И каждое утро зеркало отвечало: «Ты, королева, всех милее.»

Шли годы. Белоснежка росла доброй и ласковой. Она делилась хлебом с птицами, улыбалась слугам и говорила мягко даже тогда, когда ей было грустно. Однажды утром зеркало сказало иное.

«Ты прекрасна, это правда. Но Белоснежка прекраснее тебя.»

Лицо королевы окаменело. Зависть наполнила её, словно грозовая туча. Она приказала охотнику увести Белоснежку глубоко в лес и оставить там.

Охотник повёл Белоснежку между деревьями. Увидев её доверчивые глаза, он не смог причинить ей вреда. «Беги, маленькая, — прошептал он. — Беги далеко и не возвращайся.»

Белоснежка бежала, пока не заныли ноги. Вечер окрасил небо в лиловый. Наконец она нашла крошечный домик, спрятанный между корнями и камнями.

Внутри стояли семь маленьких кроватей, семь маленьких тарелок и семь маленьких стульев. Всё было аккуратно, хотя и покрыто пылью после долгого рабочего дня. Белоснежка так устала, что откусила крошку хлеба, сделала глоток воды и уснула на кроватях.

Ночью вернулись семь гномов с гор, где они добывали сверкающие камни. Они нашли приоткрытую дверь и девочку, спящую, как тихий сон.

«Кто это?» — прошептал один.

«Она кажется доброй,» — сказал другой.

Они дали ей поспать до утра. Когда Белоснежка проснулась, она рассказала им свою историю. Гномы слушали внимательно.

«Можешь остаться с нами, — сказали они. — Береги дом и держи его тёплым. Но остерегайся незнакомцев. У зависти длинные руки.»

Белоснежка осталась. Она подметала полы, напевала чайнику и наполняла дом смехом. Гномы полюбили её. Каждый вечер они возвращались с рассказами о сверкающих пещерах, а Белоснежка рассказывала им о птицах и цветах.

Вдалеке королева снова спросила зеркало. Узнав, что Белоснежка жива, она переоделась старой торговкой и понесла в лес корзинку красивых вещиц.

«Красивые шнурки для красивой девочки!» — звала она.

Белоснежка, вежливая как всегда, чуть приоткрыла дверь. Женщина затянула шнуровку так сильно, что у Белоснежки закружилась голова, и она опустилась на пол. К счастью, гномы вернулись раньше обычного. Они ослабили шнурки, и Белоснежка снова вздохнула.

«Не открывай дверь!» — умоляли они.

Но королева попробовала ещё раз. На этот раз она принесла блестящее яблоко — наполовину розовое, наполовину золотистое.

«Подарок для тебя, милая, — улыбнулась она. — Красная сторона самая сладкая.»

Белоснежка помнила предупреждение. И всё же яблоко казалось безобидным, а голос женщины — мягким. Белоснежка откусила маленький кусочек красной стороны.

И тут же погрузилась в глубокий, странный сон.

Когда гномы нашли её, они не смогли разбудить девочку. Они плакали, а потом сделали прозрачное хрустальное ложе, чтобы по-прежнему видеть её доброе лицо. День и ночь они сторожили её у тропинки.

Однажды весенним утром через лес проезжал странствующий принц. Он увидел Белоснежку, спящую, словно снежинка в стекле. Он ласково поговорил с гномами и попросил позволения помочь беречь её.

Когда они осторожно передвинули хрустальное ложе, кусочек яблока выскользнул изо рта Белоснежки. Она глубоко вздохнула и открыла глаза.

«Где я?» — тихо спросила она.

«Ты в безопасности,» — ответили гномы и заплясали от радости.

Весть о её пробуждении разлетелась дальше птичьего пения. Власть завистливой королевы ослабла, когда королевство узнало правду о её жестокости. Белоснежка простила то, что можно было простить, и снова выбрала доброту.

Она часто навещала гномов, принося пироги и истории. А в тихие ночи, когда луна висела над серебряным лесом, семь друзей всё так же напевали песни, которым научила их Белоснежка.

И так Белоснежка жила в окружении дружбы, а домик в лесу оставался местом, где доброте всегда были рады.

Конец.

По мотивам сказки братьев Гримм из общественного достояния, мягко адаптированной для чтения на ночь.`;

const images = [
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/sw-cottage-welcome.png',
    alt: 'Snow White welcomed at the dwarfs’ cottage in the moonlit forest',
    position: 0,
  },
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/sw-cottage-meal.png',
    alt: 'Snow White sharing a cozy meal with the seven dwarfs',
    position: 2800,
  },
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/sw-happy-ending.png',
    alt: 'Snow White celebrating happily with the seven dwarfs in a sunny meadow',
    position: 5800,
  },
];

async function main() {
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
      content: en,
      reading_time: story.reading_time,
      age_group: story.age_group,
      slug: story.slug,
    })
    .select()
    .single();

  if (storyError) throw storyError;
  const storyId = inserted.id;
  console.log('Created story', storyId);

  const { error: trError } = await supabase.from('story_translation').insert([
    {
      story_id: storyId,
      language: 'en',
      title: story.title,
      description: story.description,
      content: en,
      reading_time: 12,
      hasaudio: false,
    },
    {
      story_id: storyId,
      language: 'pl',
      title: 'Śnieżka i siedmiu krasnoludków',
      description:
        'Dobra Śnieżka znajduje schronienie u siedmiu krasnoludków, a dobroć zwycięża zazdrość.',
      content: pl,
      reading_time: 12,
      hasaudio: false,
    },
    {
      story_id: storyId,
      language: 'ru',
      title: 'Белоснежка и семь гномов',
      description:
        'Добрая Белоснежка находит защиту у семи гномов, и добро побеждает зависть.',
      content: ru,
      reading_time: 11,
      hasaudio: false,
    },
  ]);
  if (trError) throw trError;
  console.log('Inserted translations: en, pl, ru');

  const { error: tagError } = await supabase.from('story_tags').insert({
    story_id: storyId,
    tag_id: CLASSIC_TAG_ID,
  });
  if (tagError) throw tagError;
  console.log('Linked tag: classic');

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
    console.log('Uploaded image', fileName);
  }

  console.log('\nDone!');
  console.log(`EN: /stories/classic/${story.slug}`);
  console.log(`PL: /pl/stories/classic/${story.slug}`);
  console.log(`RU: /ru/stories/classic/${story.slug}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
