/**
 * Insert gentle public-domain retelling: Puss in Boots
 * Based on Charles Perrault (public domain), adapted for bedtime.
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
const ANIMALS_TAG_ID = '06fa6aa9-deee-4c2a-a062-6ba48985e9bd';

const story = {
  title: 'Puss in Boots',
  slug: 'puss-in-boots',
  age_group: '3-5',
  reading_time: 10,
  description:
    'A clever cat in shiny boots helps a kind young miller with wit, courage, and friendship.',
};

const en = `Once there was a miller who had three sons. When he grew old, he left the mill to the oldest, the donkey to the second, and only a cat to the youngest.

The youngest son sat under a tree and sighed. “What can I do with a cat?” he asked. “I shall be hungry and alone.”

The cat rubbed against his legs and spoke—yes, truly spoke.

“Do not worry, Master,” said the cat. “Give me a bag and a pair of boots, and I will help you.”

The young man had little, yet he trusted the cat. He spent his last coins on soft leather boots and a small cloth bag. The cat pulled on the boots, stood tall, and tipped an imaginary hat.

“Call me Puss,” he said proudly. “Watch what a clever friend can do.”

Puss went to a field where rabbits hopped in the clover. He filled his bag with greens, left it open, and hid behind a bush. Soon a plump rabbit hopped inside. Puss quickly closed the bag.

He marched to the king’s palace and bowed low.

“Your Majesty,” he said, “a gift from my noble master, the Marquis of Carabas.”

The king was delighted. “Thank your master!” he cried.

Day after day Puss brought gifts—partridges, herbs, sweet berries—always in the name of the Marquis of Carabas. The young miller blushed when he heard the grand title.

“I am only a miller’s son,” he whispered.

“Today you are learning to be brave,” Puss replied. “Kindness and courage make a true noble heart.”

One sunny morning the king rode out with his daughter beside the river. Puss ran ahead to his master.

“Quick!” he said. “Swim in the river and leave your old clothes on the bank. Trust me.”

Though puzzled, the young man obeyed. Puss hid the worn clothes under a stone and waited. When the royal carriage came near, Puss shouted:

“Help! Help! The Marquis of Carabas is drowning!”

The king’s servants pulled the young man from the water. Puss explained that robbers had stolen his master’s fine clothes. The king gladly gave him a beautiful suit. In the new clothes the miller’s son looked handsome and kind. The princess smiled at him.

While they rode together, Puss raced ahead through meadows and fields.

“If the king asks whose land this is,” he told the workers, “say it belongs to the Marquis of Carabas!”

The workers liked the clever cat and agreed. So the king heard again and again: “These fields belong to the Marquis of Carabas.”

At last Puss came to a great castle where an ogre lived. The ogre could change his shape—into a lion, a mouse, or anything he wished. Puss bowed politely.

“I have heard you are wonderfully clever,” he said. “Can you truly become a lion?”

The ogre roared and became a huge lion. Puss pretended to tremble.

“Marvelous!” he said. “But surely becoming something tiny is harder. A mouse, for example?”

Proud of his magic, the ogre shrank into a little mouse. In a flash Puss caught him and ended the danger forever. Then he opened the castle doors wide.

When the king arrived, Puss bowed once more. “Welcome to the castle of my master, the Marquis of Carabas.”

The miller’s son welcomed them with honesty and warmth. The princess saw that he was gentle as well as brave. Before long they were married, and Puss sat at the feast in his shiny boots, whiskers twitching with joy.

The young man never forgot his true friend.

“You did not make me rich with tricks alone,” he told Puss. “You taught me to be brave, polite, and grateful.”

And every evening, after the castle lamps were lit, Puss would stretch by the fire, clean his boots, and purr a soft bedtime song.

The end.

Based on the public domain tale by Charles Perrault, gently adapted for bedtime.`;

const pl = `Dawno temu żył młynarz, który miał trzech synów. Gdy się zestarzał, najstarszemu zostawił młyn, średniemu osła, a najmłodszemu tylko kota.

Najmłodszy syn usiadł pod drzewem i westchnął. „Cóż pocznę z kotem?” — zapytał. „Będę głodny i samotny.”

Kot potarł się o jego nogi i przemówił — tak, naprawdę przemówił.

„Nie martw się, Paniczu” — rzekł kot. „Daj mi worek i parę butów, a ci pomogę.”

Młodzieniec miał niewiele, lecz zaufał kotu. Wydał ostatnie monety na miękkie skórzane buty i mały płócienny worek. Kot wsunął łapy w buty, stanął prosto i uniósł wyobrażony kapelusz.

„Nazywajcie mnie Kot w butach” — rzekł dumnie. „Zobaczycie, co potrafi sprytny przyjaciel.”

Kot poszedł na łąkę, gdzie króliki skakały w koniczynie. Napełnił worek zieleniną, zostawił go otwarty i schował się za krzakiem. Wkrótce pękaty królik wskoczył do środka. Kot szybko zawiązał worek.

Pomaszerował do pałacu króla i nisko się ukłonił.

„Wasza Królewska Mość” — rzekł — „dar od mojego szlachetnego pana, markiza de Carabas.”

Król ucieszył się bardzo. „Podziękuj swemu panu!” — zawołał.

Dzień po dniu Kot przynosił dary — kuropatwy, zioła, słodkie jagody — zawsze w imieniu markiza de Carabas. Młody młynarz rumienił się, słysząc ten wielki tytuł.

„Jestem tylko synem młynarza” — szeptał.

„Dziś uczysz się odwagi” — odparł Kot. „Dobroć i odwaga tworzą prawdziwie szlachetne serce.”

Pewnego słonecznego poranka król wyjechał z córką nad rzekę. Kot pobiegł naprzód do swego pana.

„Szybko!” — rzekł. „Płyń w rzece i zostaw stare ubranie na brzegu. Zaufaj mi.”

Choć zdziwiony, młodzieniec posłuchał. Kot schował znoszone szaty pod kamieniem i czekał. Gdy królewski powóz zbliżył się, Kot krzyknął:

„Na pomoc! Markiz de Carabas tonie!”

Słudzy króla wyciągnęli młodzieńca z wody. Kot wyjaśnił, że zbójcy ukradli pańskie piękne szaty. Król chętnie dał mu wspaniały strój. W nowych szatach syn młynarza wyglądał pięknie i życzliwie. Księżniczka uśmiechnęła się do niego.

Gdy jechali razem, Kot biegł naprzód przez łąki i pola.

„Jeśli król zapyta, czyje to ziemie” — mówił robotnikom — „powiedzcie, że należą do markiza de Carabas!”

Robotnicy lubili sprytnego kota i zgadzali się. Tak król słyszał wciąż: „Te pola należą do markiza de Carabas.”

Wreszcie Kot dotarł do wielkiego zamku, gdzie mieszkał ogr. Ogr potrafił zmieniać kształt — w lwa, mysz lub cokolwiek zechciał. Kot ukłonił się grzecznie.

„Słyszałem, że jesteś nadzwyczajnie zdolny” — rzekł. „Czy naprawdę możesz stać się lwem?”

Ogr zaryczał i zamienił się w ogromnego lwa. Kot udał, że drży.

„Wspaniale!” — rzekł. „Ale z pewnością trudniej stać się czymś maleńkim. Na przykład myszą?”

Dumny ze swej magii ogr skurczył się w małą myszkę. W mgnieniu oka Kot go złapał i niebezpieczeństwo minęło na zawsze. Potem szeroko otworzył drzwi zamku.

Gdy przybył król, Kot znów się ukłonił. „Witamy w zamku mego pana, markiza de Carabas.”

Syn młynarza przyjął gości z uczciwością i ciepłem. Księżniczka zobaczyła, że jest łagodny i odważny. Niedługo wzięli ślub, a Kot siedział na uczcie w lśniących butach, poruszając wąsami z radości.

Młodzieniec nigdy nie zapomniał prawdziwego przyjaciela.

„Nie wzbogaciłeś mnie samymi fortelami” — powiedział Kotu. „Nauczyłeś mnie odwagi, uprzejmości i wdzięczności.”

A każdego wieczoru, gdy zapalano lampy w zamku, Kot przeciągał się przy kominku, czyścił buty i mruczał miękką kołysankę.

Koniec.

Na podstawie baśni Charles’a Perraulta z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const ru = `Жил-был мельник, у которого было три сына. Когда он состарился, старшему оставил мельницу, среднему — осла, а младшему — только кота.

Младший сын сел под деревом и вздохнул. «Что мне делать с котом? — спросил он. — Буду голоден и одинок.»

Кот потёрся о его ноги и заговорил — да, правда заговорил.

«Не тревожься, хозяин, — сказал кот. — Дай мне мешок и пару сапог, и я тебе помогу.»

У юноши было мало денег, но он доверился коту. Потратил последние монеты на мягкие кожаные сапоги и маленький мешочек. Кот натянул сапоги, выпрямился и будто приподнял шляпу.

«Зови меня Кот в сапогах, — гордо сказал он. — Увидишь, на что способен умный друг.»

Кот отправился на поле, где кролики прыгали в клевере. Насыпал в мешок зелени, оставил его открытым и спрятался за кустом. Скоро упитанный кролик заскочил внутрь. Кот быстро затянул мешок.

Он прошествовал во дворец короля и низко поклонился.

«Ваше Величество, — сказал он, — подарок от моего знатного хозяина, маркиза де Карабаса.»

Король очень обрадовался. «Поблагодари своего господина!» — воскликнул он.

Изо дня в день Кот приносил дары — куропаток, травы, сладкие ягоды — всегда от имени маркиза де Карабаса. Молодой мельник краснел, слыша громкий титул.

«Я всего лишь сын мельника,» — шептал он.

«Сегодня ты учишься быть смелым, — отвечал Кот. — Доброта и храбрость делают сердце по-настоящему благородным.»

Однажды солнечным утром король выехал с дочерью к реке. Кот побежал вперёд к хозяину.

«Быстрее! — сказал он. — Купайся в реке и оставь старую одежду на берегу. Доверься мне.»

Хотя юноша удивился, он послушался. Кот спрятал ветхую одежду под камнем и стал ждать. Когда королевская карета приблизилась, Кот закричал:

«На помощь! На помощь! Маркиз де Карабас тонет!»

Слуги короля вытащили юношу из воды. Кот объяснил, что разбойники украли господское платье. Король охотно дал ему прекрасный наряд. В новой одежде сын мельника выглядел красивым и добрым. Принцесса улыбнулась ему.

Пока они ехали вместе, Кот бежал впереди через луга и поля.

«Если король спросит, чья это земля, — говорил он работникам, — скажите: маркиза де Карабаса!»

Работники любили умного кота и соглашались. Так король снова и снова слышал: «Эти поля принадлежат маркизу де Карабасу.»

Наконец Кот дошёл до большого замка, где жил людоед. Людоед умел менять облик — становиться львом, мышью или кем угодно. Кот вежливо поклонился.

«Я слышал, вы необыкновенно искусны, — сказал он. — Неужели вы и правда можете стать львом?»

Людоед зарычал и превратился в огромного льва. Кот притворился, что дрожит.

«Чудесно! — сказал он. — Но наверняка труднее стать чем-то крошечным. Например, мышкой?»

Гордясь своей магией, людоед сжался в маленькую мышку. В мгновение ока Кот поймал его, и опасность исчезла навсегда. Затем он широко распахнул двери замка.

Когда прибыл король, Кот снова поклонился. «Добро пожаловать в замок моего хозяина, маркиза де Карабаса.»

Сын мельника встретил гостей честно и тепло. Принцесса увидела, что он и добр, и смел. Вскоре они поженились, а Кот сидел на пиру в блестящих сапогах и радостно шевелил усами.

Юноша никогда не забывал настоящего друга.

«Ты обогатил меня не одними хитростями, — сказал он Коту. — Ты научил меня смелости, вежливости и благодарности.»

А каждый вечер, когда в замке зажигали лампы, Кот потягивался у огня, чистил сапоги и мурлыкал мягкую колыбельную.

Конец.

По мотивам сказки Шарля Перро из общественного достояния, мягко адаптированной для чтения на ночь.`;

async function main() {
  const imageFiles = [
    {
      file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/pib-hero.png',
      alt: 'A clever orange cat in tall boots stands proudly on a sunny country road',
      position: 0,
    },
    {
      file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/pib-palace.png',
      alt: 'The cat in boots bows before the king and princess in the palace',
      position: 2500,
    },
    {
      file: '/Users/kdylko/.cursor/projects/Users-kdylko-Projects-bedtime-stories-ui/assets/pib-ending.png',
      alt: 'The cat in boots celebrates happily with friends in a flower meadow',
      position: 5200,
    },
  ].filter((img) => fs.existsSync(img.file));

  if (imageFiles.length < 2) {
    throw new Error('Not enough generated images found');
  }

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
      reading_time: 10,
      hasaudio: false,
    },
    {
      story_id: storyId,
      language: 'pl',
      title: 'Kot w butach',
      description:
        'Sprytny kot w lśniących butach pomaga dobremu synowi młynarza dzięki dowcipowi, odwadze i przyjaźni.',
      content: pl,
      reading_time: 10,
      hasaudio: false,
    },
    {
      story_id: storyId,
      language: 'ru',
      title: 'Кот в сапогах',
      description:
        'Умный кот в блестящих сапогах помогает доброму сыну мельника умом, смелостью и дружбой.',
      content: ru,
      reading_time: 9,
      hasaudio: false,
    },
  ]);
  if (trError) throw trError;
  console.log('Inserted translations: en, pl, ru');

  const { error: tagError } = await supabase.from('story_tags').insert([
    { story_id: storyId, tag_id: CLASSIC_TAG_ID },
    { story_id: storyId, tag_id: ANIMALS_TAG_ID },
  ]);
  if (tagError) throw tagError;
  console.log('Linked tags: classic, animals');

  for (const img of imageFiles) {
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
