/**
 * Insert: Thumbelina, Emperor's New Clothes, Bremen Town Musicians
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

const thumbEn = `Once a kind woman longed for a child of her own. A friendly witch gave her a magic barley seed. She planted it in a flowerpot, and soon a beautiful blossom opened. Inside sat a tiny girl, no bigger than a thumb.

“I shall call you Thumbelina,” the woman said joyfully.

Thumbelina slept in a polished walnut shell and played on a water-lily leaf. One night a mother toad saw her through the window.

“What a pretty wife for my son!” croaked the toad. She carried the sleeping Thumbelina to the marsh and set her on a broad leaf in the stream.

When Thumbelina woke, she cried softly. Kind little fish chewed through the stem of the leaf, and the current carried her away from the toad family. A butterfly helped pull her leaf like a boat until a big beetle snatched her up and then, finding her too strange, left her alone in the summer wood.

All summer Thumbelina lived among flowers and moss. When autumn came, cold winds blew. She found shelter with a field mouse who offered food and a warm corner.

“You must marry my neighbor, the mole,” said the mouse. “He is rich and has a fine underground house.”

Thumbelina did not wish to live forever in the dark. In a passage of the mole’s tunnel she found a swallow lying still and cold. Everyone thought the bird was gone, but Thumbelina covered him with soft hay and brought him water drop by drop. Slowly the swallow opened his eyes.

“You saved me,” he whispered. “When spring comes, I will carry you to a warmer land.”

Spring arrived in golden light. Thumbelina climbed onto the swallow’s back. They flew over forests and seas to a bright country of blossoms. There, in a white flower, lived a tiny prince with a golden crown—no bigger than Thumbelina herself.

“Will you stay and be my friend?” he asked kindly.

Thumbelina smiled. She had found a place where she truly belonged. The swallow sang above them, and the flower petals shone like little lanterns of joy.

The end.

Based on the public domain tale by Hans Christian Andersen, gently adapted for bedtime.`;

const thumbPl = `Pewna dobra kobieta bardzo pragnęła mieć dziecko. Przyjazna wróżka dała jej magiczne ziarenko jęczmienia. Kobieta zasadziła je w doniczce, a wkrótce otworzył się piękny kwiat. W środku siedziała maleńka dziewczynka, nie większa od kciuka.

„Nazwę cię Calineczką” — rzekła radośnie kobieta.

Calineczka spała w wypolerowanej skorupce orzecha i bawiła się na liściu lilii wodnej. Pewnej nocy matka ropucha zobaczyła ją przez okno.

„Jaka ładna żona dla mego syna!” — rzekła ropucha. Zabrała śpiącą Calineczkę na bagno i położyła ją na szerokim liściu w strumieniu.

Gdy Calineczka się obudziła, cicho zapłakała. Dobre rybki przegryzły łodygę liścia, a prąd uniósł ją z dala od ropuch. Motyl pomagał ciągnąć liść jak łódkę, aż wielki żuk porwał ją, a potem, uznawszy za zbyt dziwną, zostawił samą w letnim lesie.

Całe lato Calineczka mieszkała wśród kwiatów i mchu. Gdy nadeszła jesień, zawiał zimny wiatr. Znalazła schronienie u polnej myszy, która dała jej jedzenie i ciepły kącik.

„Musisz poślubić mego sąsiada, kreta” — rzekła mysz. „Jest bogaty i ma piękny podziemny dom.”

Calineczka nie chciała żyć wiecznie w ciemności. W korytarzu kreta znalazła jaskółkę leżącą nieruchomo i zimną. Wszyscy myśleli, że ptak odszedł na zawsze, lecz Calineczka okryła go miękkim sianem i przynosiła kroplę po kropli wody. Powoli jaskółka otworzyła oczy.

„Uratowałaś mnie” — szepnęła. „Gdy przyjdzie wiosna, zabiorę cię do cieplejszego kraju.”

Wiosna nadeszła w złotym świetle. Calineczka wspięła się na grzbiet jaskółki. Lecieli nad lasami i morzami do jasnego kraju kwiatów. Tam, w białym kwiecie, mieszkał maleńki książę ze złotą koroną — nie większy od samej Calineczki.

„Czy zostaniesz i będziesz moją przyjaciółką?” — zapytał łagodnie.

Calineczka uśmiechnęła się. Znalazła miejsce, gdzie naprawdę należała. Jaskółka śpiewała nad nimi, a płatki kwiatów świeciły jak małe latarenki radości.

Koniec.

Na podstawie baśni Hansa Christiana Andersena z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const thumbRu = `Жила-была добрая женщина, которая очень хотела ребёнка. Добрая волшебница дала ей волшебное ячменное зёрнышко. Женщина посадила его в горшок, и вскоре раскрылся прекрасный цветок. Внутри сидела крошечная девочка ростом не больше большого пальца.

«Я назову тебя Дюймовочкой», — радостно сказала женщина.

Дюймовочка спала в отполированной скорлупке ореха и играла на листе кувшинки. Однажды ночью мать-жаба увидела её в окне.

«Какая хорошенькая жена для моего сына!» — квакнула жаба. Она унесла спящую Дюймовочку на болото и положила на широкий лист в ручье.

Когда Дюймовочка проснулась, она тихо заплакала. Добрые рыбки перегрызли стебель листа, и течение унесло её прочь от жаб. Бабочка помогала тянуть лист, как лодку, пока большой жук не схватил её, а потом, сочтя слишком странной, не оставил одну в летнем лесу.

Всё лето Дюймовочка жила среди цветов и мха. Когда пришла осень, подул холодный ветер. Она нашла приют у полевой мыши, которая дала ей еду и тёплый уголок.

«Ты должна выйти замуж за моего соседа, крота, — сказала мышь. — Он богат и у него прекрасный подземный дом.»

Дюймовочка не хотела жить вечно в темноте. В проходе кротовой норы она нашла ласточку, лежавшую неподвижно и холодную. Все думали, что птица пропала, но Дюймовочка укрыла её мягким сеном и приносила воду по капле. Медленно ласточка открыла глаза.

«Ты спасла меня, — прошептала она. — Когда придёт весна, я унесу тебя в тёплую страну.»

Весна пришла в золотом свете. Дюймовочка взобралась на спину ласточки. Они летели над лесами и морями в яркую страну цветов. Там, в белом цветке, жил крошечный принц с золотой короной — не больше самой Дюймовочки.

«Останешься ли ты и будешь моей подругой?» — ласково спросил он.

Дюймовочка улыбнулась. Она нашла место, где ей было по-настоящему хорошо. Ласточка пела над ними, а лепестки сияли, словно маленькие фонарики радости.

Конец.

По мотивам сказки Ханса Кристиана Андерсена из общественного достояния, мягко адаптированной для чтения на ночь.`;

const empEn = `Long ago there lived an emperor who loved new clothes more than anything else. He spent his gold on robes, coats, and shining hats, and cared little for walking in his gardens.

One day two clever weavers came to the city. They were not truly weavers at all—they were tricksters. They bowed low before the emperor.

“We can weave the most wonderful cloth in the world,” they said. “It is invisible to anyone who is foolish or unfit for his work.”

The emperor’s eyes widened. “I must have that cloth!” he cried. “Then I will know who is wise in my kingdom.”

He gave the men gold, silk, and a fine room. The tricksters set up empty looms and pretended to weave late into the night. They cut the air with scissors and stitched nothing with golden needles.

The emperor sent his honest old minister to look. The minister saw no cloth at all—but he was afraid to seem foolish.

“How beautiful!” he said, though his heart felt uneasy.

Other servants said the same. Soon the whole court praised the invisible cloth. The tricksters asked for more gold, and more, and more.

At last the emperor himself came to see. He stared at the empty looms. He saw nothing. His cheeks grew warm.

“If I say there is no cloth,” he thought, “they will call me unfit to be emperor.” So he nodded wisely. “Magnificent! I shall wear it in the great parade.”

On parade day the tricksters pretended to dress him. They lifted invisible coats and tied invisible sashes. The emperor stepped into the street in his ordinary under-robes, believing he wore magic cloth.

Crowds lined the road. “What splendid clothes!” people whispered—because no one wanted to seem foolish.

Then a little child tugged a mother’s sleeve and said clearly, “But he hasn’t got anything special on!”

A soft laugh moved through the crowd. Then another. The truth spread like sunshine. The emperor felt silly, yet he stood taller and finished the parade with quiet dignity.

That evening he thanked the child. “You reminded me that honesty is better than empty praise,” he said. He sent the tricksters away and spent more time with his people than with his wardrobe.

And if anyone ever brought him “invisible” gifts again, he only smiled and asked for something he could truly see and share.

The end.

Based on the public domain tale by Hans Christian Andersen, gently adapted for bedtime.`;

const empPl = `Dawno temu żył cesarz, który kochał nowe ubrania bardziej niż cokolwiek innego. Wydawał złoto na szaty, płaszcze i lśniące kapelusze, a mało dbał o spacery po ogrodach.

Pewnego dnia do miasta przybyło dwóch przebiegłych tkaczy. Nie byli prawdziwymi tkaczami — byli oszustami. Nisko pokłonili się cesarzowi.

„Potrafimy utkać najwspanialszą tkaninę na świecie” — rzekli. „Jest niewidzialna dla każdego, kto jest głupi lub niegodny swego urzędu.”

Oczy cesarza się rozszerzyły. „Muszę mieć tę tkaninę!” — zawołał. „Wtedy będę wiedział, kto w królestwie jest mądry.”

Dał im złoto, jedwab i piękną komnatę. Oszuści ustawili puste krosna i udawali, że tkają do późna w nocy. Cięli powietrze nożyczkami i zszywali nic złotymi igłami.

Cesarz posłał swego uczciwego starego ministra, by spojrzał. Minister nie widział żadnej tkaniny — lecz bał się wydać głupim.

„Jakże pięknie!” — rzekł, choć serce miał niespokojne.

Inni słudzy mówili to samo. Wkrótce cały dwór chwalił niewidzialną tkaninę. Oszuści prosili o więcej złota i jeszcze więcej.

Wreszcie sam cesarz przyszedł zobaczyć. Patrzył na puste krosna. Nic nie widział. Policzki mu się zarumieniły.

„Jeśli powiem, że nie ma tkaniny” — pomyślał — „nazwą mnie niegodnym cesarza.” Skinął więc mądrze głową. „Wspaniale! Włożę to na wielką paradę.”

W dniu parady oszuści udawali, że go ubierają. Podnosili niewidzialne płaszcze i wiązali niewidzialne szarfy. Cesarz wyszedł na ulicę w zwykłych spodnich szatach, wierząc, że nosi magiczne sukno.

Tłumy stały wzdłuż drogi. „Co za wspaniałe ubranie!” — szeptano — bo nikt nie chciał wydać się głupim.

Wtedy małe dziecko pociągnęło matkę za rękaw i powiedziało wyraźnie: „Przecież on nie ma nic szczególnego na sobie!”

Miękki śmiech przeszedł przez tłum. Potem kolejny. Prawda rozeszła się jak słońce. Cesarz poczuł się głupi, lecz wyprostował się i dokończył paradę z cichą godnością.

Tego wieczoru podziękował dziecku. „Przypomniałeś mi, że uczciwość jest lepsza niż puste pochwały” — rzekł. Odesłał oszustów i spędzał więcej czasu z ludźmi niż z garderobą.

A jeśli ktoś znów przynosił mu „niewidzialne” dary, tylko się uśmiechał i prosił o coś, co naprawdę można zobaczyć i podzielić.

Koniec.

Na podstawie baśni Hansa Christiana Andersena z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const empRu = `Давным-давно жил император, который любил новую одежду больше всего на свете. Он тратил золото на мантии, плащи и блестящие шляпы и мало заботился о прогулках по садам.

Однажды в город пришли двое ловких ткачей. На самом деле они вовсе не были ткачами — они были обманщиками. Они низко поклонились императору.

«Мы умеем ткать самую чудесную ткань на свете, — сказали они. — Она невидима для всякого, кто глуп или недостоин своей должности.»

Глаза императора расширились. «Я должен иметь эту ткань! — воскликнул он. — Тогда я узнаю, кто в королевстве мудр.»

Он дал им золото, шёлк и прекрасную комнату. Обманщики поставили пустые ткацкие станки и делали вид, что ткут до поздней ночи. Они резали воздух ножницами и сшивали пустоту золотыми иглами.

Император послал честного старого министра посмотреть. Министр не увидел никакой ткани — но боялся показаться глупым.

«Как прекрасно!» — сказал он, хотя на сердце было неспокойно.

Другие слуги говорили то же. Вскоре весь двор хвалил невидимую ткань. Обманщики просили ещё золота и ещё.

Наконец сам император пришёл посмотреть. Он смотрел на пустые станки. Ничего не видел. Щёки его загорелись.

«Если скажу, что ткани нет, — подумал он, — меня назовут недостойным императора.» Поэтому он мудро кивнул. «Великолепно! Я надену это на большой парад.»

В день парада обманщики делали вид, что одевают его. Они поднимали невидимые плащи и завязывали невидимые пояса. Император вышел на улицу в обычном нижнем платье, веря, что на нём волшебная ткань.

Толпы стояли вдоль дороги. «Какая великолепная одежда!» — шептали люди, потому что никто не хотел казаться глупым.

Тогда маленький ребёнок потянул маму за рукав и ясно сказал: «Да на нём же нет ничего особенного!»

Мягкий смех пробежал по толпе. Потом ещё один. Правда разошлась, как солнечный свет. Императору стало стыдно, но он выпрямился и закончил парад с тихим достоинством.

Тем же вечером он поблагодарил ребёнка. «Ты напомнил мне, что честность лучше пустой похвалы», — сказал он. Он прогнал обманщиков и стал больше времени проводить с народом, чем с гардеробом.

А если кто-нибудь снова приносил ему «невидимые» дары, он только улыбался и просил что-нибудь такое, что можно по-настоящему увидеть и разделить.

Конец.

По мотивам сказки Ханса Кристиана Андерсена из общественного достояния, мягко адаптированной для чтения на ночь.`;

const bremenEn = `A donkey grew old and could no longer carry heavy sacks. His master planned to send him away. So the donkey set off down the road toward the town of Bremen. “I can still make music,” he thought. “I shall become a town musician.”

On the way he met a tired dog panting by the hedge.

“I am too old to hunt,” sighed the dog. “My master does not want me.”

“Come with me,” said the donkey. “We will make music in Bremen.”

Soon they found a cat with dull eyes sitting on a fence.

“I cannot catch mice as I once did,” said the cat. “They say I am useless.”

“Join us,” said the donkey and the dog. “Three musicians are better than two.”

Before long a rooster crowed sadly from a gate.

“Tomorrow they will put me in the pot,” he cried.

“Nonsense,” said the donkey. “Sing with us in Bremen!”

So the four friends walked on together. As night fell they saw a cottage light in the woods. Robbers sat inside counting coins and eating a fine supper.

“I have a plan,” whispered the donkey.

He stood by the window. The dog climbed on his back. The cat climbed on the dog. The rooster flew to the very top. Then all at once they made music—hee-haw, bow-wow, meow, cock-a-doodle-doo!—so loud the window rattled.

The robbers leaped up in fright and fled into the forest, leaving supper and coins behind.

The animals went inside, ate politely, and settled to sleep: the donkey on straw, the dog by the door, the cat by the hearth, the rooster on a beam.

Late at night one bold robber crept back. In the dark he saw the cat’s shining eyes and thought they were coals. When he bent near, the cat scratched, the dog barked, the donkey kicked, and the rooster crowed from the rafters. The robber ran off for good.

The four friends looked at one another.

“Perhaps we do not need Bremen after all,” said the donkey gently. “We have a warm house, good company, and music enough.”

And so they stayed, singing soft songs each evening—four true friends who had found a home.

The end.

Based on the public domain tale by the Brothers Grimm, gently adapted for bedtime.`;

const bremenPl = `Osioł się zestarzał i nie mógł już nosić ciężkich worków. Pan chciał go odesłać. Więc osioł wyruszył drogą ku miastu Brema. „Wciąż potrafię robić muzykę” — pomyślał. „Zostanę miejskim muzykantem.”

Po drodze spotkał zmęczonego psa dyszącego przy żywopłocie.

„Jestem za stary do polowania” — westchnął pies. „Pan mnie nie chce.”

„Chodź ze mną” — rzekł osioł. „Będziemy robić muzykę w Bremie.”

Wkrótce znaleźli kota o przygaszonych oczach siedzącego na płocie.

„Nie łapię już myszy jak kiedyś” — rzekł kot. „Mówią, że jestem bezużyteczny.”

„Dołącz do nas” — rzekli osioł i pies. „Trzech muzykantów jest lepszych niż dwóch.”

Niedługo potem kogut smutno piał z furtki.

„Jutro włożą mnie do garnka!” — zawołał.

„Bzdura” — rzekł osioł. „Śpiewaj z nami w Bremie!”

Tak czterej przyjaciele szli razem. Gdy zapadła noc, ujrzeli w lesie światło chatki. W środku siedzieli zbójcy, licząc monety i jedząc wyśmienitą wieczerzę.

„Mam plan” — szepnął osioł.

Stanął przy oknie. Pies wspiął się na jego grzbiet. Kot wspiął się na psa. Kogut wzleciał na sam szczyt. I nagle wszyscy zrobili muzykę — i-ha, hau-hau, miau, kukuryku! — tak głośno, że okno zadrżało.

Zbójcy poderwali się ze strachu i uciekli do lasu, zostawiając wieczerzę i monety.

Zwierzęta weszły do środka, grzecznie zjadły i ułożyły się do snu: osioł na słomie, pies przy drzwiach, kot przy palenisku, kogut na belce.

Późną nocą jeden śmiały zbój wrócił. W ciemności ujrzał świecące oczy kota i wziął je za węgle. Gdy się nachylił, kot podrapał, pies zaszczekał, osioł kopnął, a kogut zapiał z belki. Zbój uciekł na dobre.

Czterech przyjaciół spojrzało na siebie.

„Może wcale nie potrzebujemy Bremy” — rzekł łagodnie osioł. „Mamy ciepły dom, dobre towarzystwo i dość muzyki.”

I tak zostali, śpiewając miękkie piosenki każdego wieczoru — czterej prawdziwi przyjaciele, którzy znaleźli dom.

Koniec.

Na podstawie baśni braci Grimm z domeny publicznej, łagodnie zaadaptowanej na dobranoc.`;

const bremenRu = `Осёл состарился и уже не мог носить тяжёлые мешки. Хозяин собирался его прогнать. Тогда осёл отправился по дороге в город Бремен. «Я всё ещё умею делать музыку, — подумал он. — Стану городским музыкантом.»

По пути он встретил усталую собаку, тяжело дышавшую у изгороди.

«Я слишком стара для охоты, — вздохнула собака. — Хозяин меня не хочет.»

«Пойдём со мной, — сказал осёл. — Будем делать музыку в Бремене.»

Вскоре они нашли кота с тусклыми глазами, сидевшего на заборе.

«Я уже не ловлю мышей, как прежде, — сказал кот. — Говорят, я бесполезен.»

«Присоединяйся, — сказали осёл и собака. — Трое музыкантов лучше, чем двое.»

Немного спустя петух грустно кукарекал у калитки.

«Завтра меня сварят в котле!» — крикнул он.

«Пустяки, — сказал осёл. — Пой с нами в Бремене!»

Так четверо друзей пошли вместе. Когда стемнело, они увидели в лесу огонёк хижины. Внутри сидели разбойники, считали монеты и ели славный ужин.

«У меня есть план,» — прошептал осёл.

Он встал у окна. Собака вскарабкалась ему на спину. Кот — на собаку. Петух взлетел на самый верх. И вдруг все разом заиграли музыку — иа, гав-гав, мяу, кукареку! — так громко, что окно задрожало.

Разбойники вскочили от страха и убежали в лес, оставив ужин и монеты.

Звери вошли внутрь, вежливо поели и улеглись спать: осёл на соломе, собака у двери, кот у очага, петух на балке.

Поздней ночью один смелый разбойник пробрался обратно. В темноте он увидел блестящие глаза кота и принял их за угли. Когда наклонился, кот оцарапал, собака залаяла, осёл лягнул, а петух прокукарекал с балки. Разбойник убежал насовсем.

Четверо друзей посмотрели друг на друга.

«Может, нам и не нужен Бремен, — мягко сказал осёл. — У нас тёплый дом, хорошая компания и достаточно музыки.»

И они остались, напевая мягкие песни каждый вечер — четверо верных друзей, нашедших дом.

Конец.

По мотивам сказки братьев Гримм из общественного достояния, мягко адаптированной для чтения на ночь.`;

async function main() {
  await insertStory({
    slug: 'thumbelina',
    title: 'Thumbelina',
    age_group: '3-5',
    reading_time: 11,
    description: 'A tiny girl no bigger than a thumb journeys through marsh, wood, and sky until she finds a place where she truly belongs.',
    en: thumbEn, pl: thumbPl, ru: thumbRu,
    plTitle: 'Calineczka',
    plDesc: 'Maleńka dziewczynka nie większa od kciuka podróżuje przez bagno, las i niebo, aż znajduje miejsce, gdzie naprawdę należy.',
    ruTitle: 'Дюймовочка',
    ruDesc: 'Крошечная девочка ростом с большой палец путешествует через болото, лес и небо, пока не находит место, где ей по-настоящему хорошо.',
    tags: [CLASSIC, ANIMALS],
    images: [
      { file: `${ASSETS}/thumb-flower.png`, alt: 'Tiny Thumbelina sits inside a blooming flower', position: 0 },
      { file: `${ASSETS}/thumb-swallow.png`, alt: 'Thumbelina flies on a swallow’s back toward a warm land', position: 2800 },
      { file: `${ASSETS}/thumb-ending.png`, alt: 'Thumbelina meets the flower prince among blossoms', position: 5200 },
    ],
  });

  await insertStory({
    slug: 'emperors-new-clothes',
    title: "The Emperor's New Clothes",
    age_group: '6-8',
    reading_time: 9,
    description: 'A vain emperor is fooled by tricky weavers until a honest child speaks the truth for everyone to hear.',
    en: empEn, pl: empPl, ru: empRu,
    plTitle: 'Nowe szaty cesarza',
    plDesc: 'Próżny cesarz daje się oszukać przebiegłym tkaczom, aż uczciwe dziecko mówi prawdę na głos.',
    ruTitle: 'Новое платье короля',
    ruDesc: 'Тщеславного императора обманывают хитрые ткачи, пока честный ребёнок не говорит правду вслух.',
    tags: [CLASSIC],
    images: [
      { file: `${ASSETS}/emperor-weavers.png`, alt: 'Two tricksters pretend to weave invisible cloth', position: 0 },
      { file: `${ASSETS}/emperor-parade.png`, alt: 'The emperor walks in a parade while townsfolk watch', position: 2200 },
      { file: `${ASSETS}/emperor-ending.png`, alt: 'A child speaks the truth during the royal parade', position: 4500 },
    ],
  });

  await insertStory({
    slug: 'bremen-town-musicians',
    title: 'The Bremen Town Musicians',
    age_group: '3-5',
    reading_time: 8,
    description: 'A donkey, a dog, a cat, and a rooster set off to become musicians and find a cozy home together.',
    en: bremenEn, pl: bremenPl, ru: bremenRu,
    plTitle: 'Bremieńscy muzykanci',
    plDesc: 'Osioł, pies, kot i kogut wyruszają zostać muzykantami i znajdują razem przytulny dom.',
    ruTitle: 'Бременские музыканты',
    ruDesc: 'Осёл, собака, кот и петух отправляются стать музыкантами и вместе находят уютный дом.',
    tags: [CLASSIC, ANIMALS],
    images: [
      { file: `${ASSETS}/bremen-road.png`, alt: 'Four animal friends walk the road toward Bremen at dusk', position: 0 },
      { file: `${ASSETS}/bremen-window.png`, alt: 'The animals stack up at a cottage window to make loud music', position: 2000 },
      { file: `${ASSETS}/bremen-ending.png`, alt: 'The four friends rest peacefully by the cottage fire', position: 4000 },
    ],
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
