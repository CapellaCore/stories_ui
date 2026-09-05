/**
 * Insert gentle public-domain retelling: Beauty and the Beast
 * Based on Jeanne-Marie Leprince de Beaumont (public domain), adapted for bedtime.
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
  title: 'Beauty and the Beast',
  slug: 'beauty-and-the-beast',
  age_group: '6-8',
  reading_time: 12,
  description:
    'Kind Beauty looks beyond appearances and finds friendship—and a happy ending—in an enchanted castle.',
};

const en = `Once there lived a merchant with three daughters. The two older girls loved fine dresses and parties. The youngest loved books, gardens, and quiet kindness. Everyone called her Beauty.

One winter the merchant lost his ships at sea. The family left their grand house and moved to a small cottage. Beauty worked cheerfully. She baked bread, mended clothes, and read stories by the fire. Her sisters sighed and complained.

One day hopeful news arrived: one ship might be saved. The merchant prepared to travel to the city.

“What shall I bring you?” he asked his daughters.

“Jewels!” cried the first.

“Silk dresses!” cried the second.

Beauty smiled. “If you find a rose, Father, that would make me happy.”

On the way home a wild snowstorm rose. The merchant lost the road and stumbled into a dark forest. Through the trees he saw lights. He found a grand castle with open gates and warm halls. A fine supper waited on a table, though no one appeared.

“Thank you, kind host,” he said, and ate gratefully. He slept in a soft bed and woke to sunshine.

In the garden he saw roses glowing like velvet. Remembering Beauty’s wish, he picked one bloom.

Suddenly a great Beast stood before him—tall, furred, and fierce to look at, yet speaking with a deep, clear voice.

“I welcomed you with food and shelter,” said the Beast. “And you steal my rose?”

The merchant trembled and explained about his daughter.

The Beast grew quiet. “Then let Beauty come in your place,” he said. “If she comes willingly, you may go free. If not, return yourself in three months.”

Sadly the merchant went home and told the truth. Beauty’s sisters wept loudly. Beauty hugged her father.

“I asked for the rose,” she said gently. “I will go.”

At the castle Beauty was afraid at first. Yet invisible servants brought warm meals, soft clothes, and a library filled with more books than she had ever dreamed of. Every evening the Beast came and spoke kindly.

“Did you sleep well?” he asked.

“Yes, thank you,” Beauty answered.

They walked in the gardens. They talked of stars, stories, and kindness. Each night the Beast asked softly, “Beauty, will you marry me?”

And each night Beauty said, “You are my friend. But I cannot marry you yet.”

The Beast never grew angry. He only looked sad and wished her good night.

Beauty began to see that a gentle heart mattered more than a handsome face. Still she missed her father. One evening she asked to visit home for a week.

“Go,” said the Beast. “But if you stay too long, my heart will break. Take this mirror. It will show you the castle when you wish.”

Beauty promised to return and rode home with gifts. Her father wept with joy. Her sisters smiled with envy.

A week passed. Then another day. Then another. Beauty’s sisters begged her to stay. “He is only a Beast,” they said. “Why rush back?”

That night Beauty looked into the mirror. She saw the Beast lying in the rose garden, weak and alone.

“Oh!” she cried. “I have stayed too long!”

She raced back to the castle, ran through the halls, and found him among the roses.

“Beast! Dear Beast, please wake,” she whispered, holding his paw. “I love you. I will marry you.”

At her words soft light filled the garden. The Beast’s fur faded. In his place stood a young prince with kind eyes.

“A spell was cast on me,” he said, “to stay a Beast until someone loved me for my heart. Your kindness set me free.”

Beauty and the prince were married in the castle of roses. The merchant lived nearby in comfort. Even Beauty’s sisters learned, slowly, that envy makes a colder home than a cottage filled with love.

And on quiet evenings Beauty still read books in the library—sometimes alone, sometimes with the prince beside her—while the roses outside nodded in the moonlight.`;

const pl = `Dawno temu żył kupiec z trzema córkami. Dwie starsze kochały piękne suknie i zabawy. Najmłodsza kochała książki, ogrody i cichą dobroć. Wszyscy nazywali ją Piękną.

Pewnej zimy kupiec stracił statki na morzu. Rodzina opuściła wielki dom i przeniosła się do małej chatki. Piękna pracowała pogodnie. Pieczyła chleb, cerowała ubrania i czytała przy kominku. Siostry westchnęły i narzekały.

Pewnego dnia nadeszła nadzieja: jeden statek mógł być ocalony. Kupiec spakował się do miasta.

„Co wam przywieźć?” — zapytał córki.

„Klejnoty!” — zawołała pierwsza.

„Jedwabne suknie!” — druga.

Piękna uśmiechnęła się. „Jeśli znajdziesz różę, Ojcze, to mnie ucieszy.”

W drodze powrotnej zerwała się śnieżyca. Kupiec zgubił drogę i błądził po ciemnym lesie. Między drzewami zobaczył światła. Odkrył wspaniały zamek z otwartymi bramami i ciepłymi salami. Na stole czekała gotowa wieczerza, choć nikogo nie było widać.

„Dziękuję, dobry gospodarzu” — rzekł i zjadł z wdzięcznością. Przespał się w miękkim łożu i obudził w słońcu.

W ogrodzie ujrzał róże świecące jak aksamit. Wspomniawszy życzenie Pięknej, zerwał jeden kwiat.

Nagle stanął przed nim wielki Bestia — wysoki, owłosiony i groźny z wyglądu, lecz mówiący głębokim, wyraźnym głosem.

„Przywitałem cię jedzeniem i schronieniem” — rzekł Bestia. „A ty kradniesz moją różę?”

Kupiec zadrżał i opowiedział o córce.

Bestia umilkł. „Niech więc Piękna przyjdzie zamiast ciebie” — powiedział. „Jeśli przyjdzie z własnej woli, będziesz wolny. Jeśli nie — wróć sam za trzy miesiące.”

Ze smutkiem kupiec wrócił do domu i powiedział prawdę. Siostry Pięknej głośno płakały. Piękna uścisnęła ojca.

„To ja prosiłam o różę” — rzekła łagodnie. „Pójdę.”

W zamku Piękna najpierw się bała. Lecz niewidzialni słudzy przynosili ciepłe posiłki, miękkie szaty i bibliotekę pełną więcej książek, niż kiedykolwiek marzyła. Każdego wieczoru Bestia przychodził i mówił życzliwie.

„Czy dobrze spałaś?” — pytał.

„Tak, dziękuję” — odpowiadała Piękna.

Spacerowali po ogrodach. Rozmawiali o gwiazdach, bajkach i dobroci. Każdej nocy Bestia pytał miękko: „Piękna, czy wyjdziesz za mnie?”

I każdej nocy Piękna mówiła: „Jesteś moim przyjacielem. Ale jeszcze nie mogę.”

Bestia nigdy się nie gniewał. Tylko smutniał i życzył jej dobrej nocy.

Piękna zaczęła rozumieć, że łagodne serce znaczy więcej niż piękna twarz. Wciąż jednak tęskniła za ojcem. Pewnego wieczoru poprosiła o tydzień w domu.

„Idź” — rzekł Bestia. „Ale jeśli zostaniesz zbyt długo, serce mi pęknie. Weź to lustro. Pokaże ci zamek, gdy zechcesz.”

Piękna obiecała wrócić i pojechała do domu z podarkami. Ojciec płakał z radości. Siostry uśmiechały się z zazdrości.

Minął tydzień. Potem jeszcze dzień. I jeszcze jeden. Siostry błagały, by została. „To tylko Bestia” — mówiły. „Po co się spieszyć?”

Tej nocy Piękna spojrzała w lustro. Ujrzała Bestię leżącego w ogrodzie różanym, słabego i samotnego.

„Och!” — krzyknęła. „Zostałam za długo!”

Pędziła z powrotem do zamku, biegła przez sale i znalazła go wśród róż.

„Bestio! Drogi Bestio, obudź się” — szepnęła, trzymając jego łapę. „Kocham cię. Wyjdę za ciebie.”

Na te słowa miękkie światło wypełniło ogród. Futro Bestii zniknęło. Na jego miejscu stanął młody książę o łagodnych oczach.

„Rzucono na mnie urok” — rzekł — „abym pozostał Bestią, dopóki ktoś nie pokocha mnie za serce. Twoja dobroć mnie wyzwoliła.”

Piękna i książę wzięli ślub w zamku róż. Kupiec mieszkał niedaleko w spokoju. Nawet siostry Pięknej uczyły się powoli, że zazdrość czyni dom zimniejszym niż chatka pełna miłości.

A w ciche wieczory Piękna wciąż czytała w bibliotece — czasem sama, czasem z księciem u boku — podczas gdy róże za oknem kiwały się w świetle księżyca.`;

const ru = `Жил-был купец с тремя дочерьми. Две старшие любили нарядные платья и праздники. Младшая любила книги, сады и тихую доброту. Все звали её Красавицей.

Одной зимой купец потерял корабли в море. Семья оставила большой дом и переехала в маленький домик. Красавица трудилась весело. Пекла хлеб, чинила одежду и читала у огня. Сёстры вздыхали и жаловались.

Однажды пришла надежда: один корабль, возможно, спасён. Купец собрался в город.

«Что вам привезти?» — спросил он дочерей.

«Украшения!» — крикнула первая.

«Шёлковые платья!» — вторая.

Красавица улыбнулась. «Если найдёшь розу, отец, я буду рада.»

На обратном пути поднялась метель. Купец сбился с дороги и забрёл в тёмный лес. Сквозь деревья он увидел огни. Перед ним стоял прекрасный замок с открытыми воротами и тёплыми залами. На столе ждал готовый ужин, хотя никого не было видно.

«Спасибо, добрый хозяин,» — сказал он и с благодарностью поел. Он спал в мягкой постели и проснулся на солнце.

В саду он увидел розы, сияющие, как бархат. Вспомнив желание Красавицы, он сорвал один цветок.

Вдруг перед ним встал огромный Зверь — высокий, мохнатый и грозный на вид, но говоривший глубоким ясным голосом.

«Я встретил тебя едой и кровом, — сказал Зверь. — А ты крадёшь мою розу?»

Купец задрожал и рассказал о дочери.

Зверь замолчал. «Тогда пусть Красавица придёт вместо тебя, — сказал он. — Если она придёт по своей воле, ты будешь свободен. Если нет — вернись сам через три месяца.»

С грустью купец вернулся домой и рассказал правду. Сёстры Красавицы громко плакали. Красавица обняла отца.

«Это я просила розу, — мягко сказала она. — Я пойду.»

В замке Красавица сначала боялась. Но невидимые слуги приносили тёплую еду, мягкую одежду и библиотеку с книгами, о которых она даже не мечтала. Каждый вечер Зверь приходил и говорил ласково.

«Хорошо ли ты спала?» — спрашивал он.

«Да, спасибо,» — отвечала Красавица.

Они гуляли по садам. Говорили о звёздах, сказках и доброте. Каждую ночь Зверь тихо спрашивал: «Красавица, выйдешь ли ты за меня?»

И каждую ночь Красавица говорила: «Ты мой друг. Но пока я не могу.»

Зверь никогда не сердился. Он только грустил и желал ей спокойной ночи.

Красавица начала понимать, что доброе сердце важнее красивого лица. И всё же она скучала по отцу. Однажды вечером она попросила неделю дома.

«Иди, — сказал Зверь. — Но если останешься слишком долго, сердце моё сломается. Возьми это зеркало. Оно покажет тебе замок, когда пожелаешь.»

Красавица обещала вернуться и поехала домой с подарками. Отец плакал от радости. Сёстры улыбались от зависти.

Прошла неделя. Потом ещё день. И ещё один. Сёстры умоляли её остаться. «Он всего лишь Зверь, — говорили они. — К чему спешить?»

В ту ночь Красавица взглянула в зеркало. Она увидела Зверя, лежащего в розарии слабым и одиноким.

«Ох! — вскрикнула она. — Я задержалась слишком долго!»

Она помчалась обратно в замок, пробежала по залам и нашла его среди роз.

«Зверь! Дорогой Зверь, проснись, — прошептала она, держа его лапу. — Я люблю тебя. Я выйду за тебя.»

При этих словах мягкий свет наполнил сад. Шерсть Зверя исчезла. На его месте стоял молодой принц с добрыми глазами.

«На меня было наложено заклятие, — сказал он, — оставаться Зверем, пока кто-нибудь не полюбит меня за сердце. Твоя доброта освободила меня.»

Красавица и принц поженились в замке роз. Купец жил рядом в покое. Даже сёстры Красавицы медленно учились тому, что зависть делает дом холоднее, чем хижина, полная любви.

А в тихие вечера Красавица всё так же читала в библиотеке — иногда одна, иногда с принцем рядом, — пока розы за окном кивали в лунном свете.`;

const images = [
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/batb-castle.png',
    alt: 'Beauty arrives at the enchanted castle among glowing roses at dusk',
    position: 0,
  },
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/batb-library.png',
    alt: 'Beauty reading with the kind Beast in the castle library',
    position: 2800,
  },
  {
    file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/batb-ending.png',
    alt: 'Beauty and the prince celebrate happily in the rose garden',
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
      title: 'Piękna i Bestia',
      description:
        'Dobra Piękna patrzy w głąb serca i znajduje przyjaźń — oraz szczęśliwe zakończenie — w zaczarowanym zamku.',
      content: pl,
      reading_time: 12,
      hasaudio: false,
    },
    {
      story_id: storyId,
      language: 'ru',
      title: 'Красавица и Чудовище',
      description:
        'Добрая Красавица смотрит в сердце, а не на внешность, и находит дружбу — и счастливый конец — в заколдованном замке.',
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
