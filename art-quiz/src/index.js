import { GameController } from './components/controller/GameController';
import { Game } from './components/model/Game';
import { GameRepository } from './components/repository/GameRepository';
import { GameService } from './components/service/GameService';
import { Categories } from './components/view/Categories';
import { CategoriesScore } from './components/view/CategoriesScore';
import { Finish } from './components/view/Finish';
import { Home } from './components/view/Home';
import { Questions } from './components/view/Questions';
import { Settings } from './components/view/Settings';

window.onload = () => {
  const repository = new GameRepository();
  const service = new GameService(repository);
  const controller = new GameController(service);

  const parent = 'main';

  const home = new Home({
    className: 'home',
    parentClassName: parent,
    controller,
    service,
  });

  const settings = new Settings({
    className: 'settings',
    parentClassName: parent,
    controller,
    service,
  });

  const categories = new Categories({
    className: 'categories',
    parentClassName: parent,
    controller,
    service,
  });

  const categoriesScore = new CategoriesScore({
    className: 'categories-score',
    parentClassName: parent,
    controller,
    service,
  });

  const questions = new Questions({
    className: 'questions',
    parentClassName: parent,
    controller,
    service,
  });
  const finish = new Finish({
    className: 'finish-popup',
    parentClassName: parent,
    controller,
    service,
  });
  const game = new Game({
    screens: {
      home,
      settings,
      categories,
      categoriesScore,
      questions,
      finish,
    },
    service,
  });

  controller.game = game;
  window.addEventListener('beforeunload', () => {
    repository.setItem('state', repository.state);
  });

  game.start();
  console.log(`Score: 220 / 220
  Структура и функционал приложения
  
  Стартовая страница и навигация +20
  o вёрстка, дизайн, UI стартовой страницы приложения. Выполняются требования к вёрстке и оформлению приложения +10
  На стартовой странице есть кнопка, при клике по которой открываются настройки викторины, и две кнопки, при кликах по которым можно выбрать тип вопроса:
   угадать художника по картине
   угадать картину по имени её автора
  o реализована навигация по страницам приложения +10
   со стартовой страницы при клике по кнопке с типом вопроса пользователь попадает на страницу категорий выбранного типа вопросов. Со страницы категорий пользователь может вернуться на стартовую страницу приложения
   со страницы категорий при клике по карточке категории пользователь попадает на страницу с вопросами категории. На карточке сыгранной категории есть кнопка, при клике по которой пользователь попадает на страницу с результатами прохождения раунда. Со страницы с вопросами и со страницы с результатами пользователь может вернуться на страницу категорий или на стартовую страницу приложения
  
  Настройки +40
  o в настройках есть возможность включать/выключать звук, есть регулятор громкости звука. Если звук включён, есть звуковая индикация разная для правильных и неправильных ответов, звуковое сопровождение окончания раунда +10
  o в настройках есть возможность включать/выключать игру на время. Если выбрана игра на время, на странице с вопросами викторины отображается таймер, отсчитывающий время, которое отведено для ответа на вопрос +10
  o в настройках можно указать время для ответа на вопрос в интервале от 5 до 30 секунд с шагом в 5 секунд. Если время истекает, а ответа нет, это засчитывается как неправильный ответ на вопрос +10
  o при перезагрузке страницы приложения выбранные настройки сохраняются +10
  
  Страница категорий +30
  o вёрстка, дизайн, UI страницы категории. Выполняются требования к вёрстке и оформлению приложения +10
   на странице категорий размещаются карточки категорий.
   карточки категорий могут иметь названия, или их можно просто пронумеровать.
   карточки категорий вопросов про художников и про картины внешне отличаются между собой, например, в их оформлении использутся разные изображения.
  o карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась +10
  o на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ +10
  Например, на скрине ниже первая категория вопросов уже сыграна (белый фон, синий шрифт, в правом верхнем углу отображается результат прохождения раунда), остальные ещё нет (цветной фон, белый шрифт, нет результатов прохождения раунда)
  
  Страница с вопросами +50
  o вёрстка, дизайн, UI страницы с вопросами. Выполняются требования к вёрстке и оформлению приложения +10
   ни в коем случае не ожидается, что вы вручную напишете все вопросы викторины и варианты ответов к ним - вопросы должны генерироваться средствами JavaScript на основе исходных данных.
   вопросы в викторине идут в том порядке, в каком информация про картины и их авторов размещается в коллекции исходных данных.
  Примеры вопросов про художников и про картины, которые можно сгенерировать на основании предложенных в задании исходных данных:
  
  o варианты ответов на вопросы генерируются случайным образом +10
   в вариантах ответов на вопросы викторины должен быть правильный ответ и только один.
   правильный ответ в разных вопросах должен находиться на разных местах, а не, например, всегда быть только первым.
   варианты ответов должны быть разными.
   в вариантах ответов не должны повторяться картины одного и того же художника.
  o правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета +10
  o после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории +10
  
  o после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. Есть кнопка "Продолжить" при клике по которой пользователь перенаправляется на страницу категорий данного типа вопросов +10
  5. Страница с результатами +50
  o вёрстка, дизайн, UI страницы с результатами. Выполняются требования к вёрстке и оформлению приложения +10
  o страница с результатами содержит превью всех картин категории +10
  o картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые +10
  o при клике по картине выводится информация о ней - название, автор, год создания +10
  o если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами +10
  
  Плавная смена изображений; картинки сначала загружаются, потом отображаются; нет ситуации, когда пользователь видит частично загрузившиеся изображения. Плавную смену изображений не проверяем: 1) при загрузке и перезагрузке приложения 2) при открытой консоли браузера +10
  Реализована анимация отдельных деталей интерфейса, также анимированы переходы и взаимодействия, чтобы работа с приложением шла плавным и непрерывным потоком +20
  Примеры анимаций можно увидеть в видео и gif
  o 5 баллов за каждую уникальную сложную анимацию, улучшающую интерфейс и удобство использования приложения, но не больше 20 баллов.
   для удобства проверки перечень и описание реализованных анимаций включите в самооценку, которую выведите в консоль браузера
  Дополнительный функционал на выбор +20
  • разные уведомления по окончанию раунда в зависимости от результата +2
  • возможность скачать картину на компьютер +5
  • ещё одна мини-игра, например, блиц: показываем пользователю картину и имя художника, нужно выбрать ответ "да" или "нет" в зависимости от того, является ли этот художник автором картины. Вопросы идут один за другим без необходимости кликать next. На мини-игру отводится 1 минута, за каждый правильный ответ добавляем к этому времени несколько секунд. Храним и отображаем статистику мини-игр +10
  Критерии оценки
  Максимальный балл за задание +220
  Для удобства проверки выведите в консоль браузера самооценку своего проекта по пунктам с указанием баллов за каждый выполненный вами пункт.
  Баллы за отдельные пункты требований указаны в разделе "Структура и функционал приложения"
  Разница между максимальной оценкой за приложение (220 баллов) и максимально возможным количеством баллов за выполнение всех пунктов требований (240 баллов) позволит сгладить возможные ошибки проверяющих в ходе кросс-чека, неточности в описании задания, разное понимание требований задания проверяющим и проверяемым.
  Проверка задания ментором
  Максимальный балл за задание +220
  Репозиторий +20
  o pull request выполнен в соответствии с требованиями +10
  o ведётся история коммитов, названия коммитов даются согласно гайдлайну +10
  Качество кода +150
  o правильное именование переменных и функций +10
  o используется prettier, код отформатирован, хорошо читается +10
  o нет дублирования кода, повторяющиеся фрагменты кода вынесены в функции, оптимальный размер функций, выполняется рекомендация: одна функция – одна задача +10
  o нет глубокой вложенности циклов, нет магических чисел +10
  o используется делегирование +10
  o используются фичи ES6 и выше: let, const для объявления переменных, стрелочные функции, Spread/Rest операторы, деструктуризация, async/await и т.д +10
  o код разбит на модули +10
  o для сборки кода используется webpack. Студенты могут использовать как свою собственную, так и готовую сборку webpack +10
  o используется eslint с конфигурацией eslint-config-airbnb-base, ошибки линтера исправлены, в eslint не добавляются собственные правила без согласования с ментором +10
  o в качестве источника данных используется JSON-файл, данные из которого получаются асинхронно +10
  o для написания компонентов приложения используются классы +10
  o создано одностраничное (SPA) приложение +10
  o html-код генерируется при помощи JavaScript. При этом нет требования чтобы весь код приложения генерировался динамически, достаточно динамически добавлять вопросы и ответы +10
  o у ментора нет замечаний к качеству кода, либо все замечания ментора исправлены +20
  Оформление и функционал приложения +50
  o у ментора нет замечаний к оформлению и функционалу приложения, либо все замечания ментора исправлены +50
  Требования к репозиторию
  • задание выполняется в приватном репозитории школы Как работать с приватным репозиторием
  • в приватном репозитории школы от ветки main создайте ветку с названием задания, в ней создайте папку с названием задания, в папке разместите файлы проекта
  • для деплоя используйте gh-pages Как сделать деплой задания из приватного репозитория школы
  • при невозможности использовать gh-pages, используйте для деплоя https://app.netlify.com/drop. Название страницы дайте по схеме: имя гитхаб аккаунта - название таска
  • история коммитов должна отображать процесс разработки приложения. Требования к коммитам
  • после окончания разработки необходимо сделать Pull Request из ветки приложения в ветку main Требования к Pull Request. Мержить Pull Request из ветки разработки в ветку main не нужно
  Технические требования
  • работа приложения проверяется в браузере Google Chrome последней версии
  • можно использовать bootstrap, material design, css-фреймворки, html и css препроцессоры
  • не разрешается использовать jQuery, другие js-библиотеки и фреймворки
  Рекомендации по написанию кода
  • если это ваше первое самостоятельно созданное приложение, основное и самое важное требование к коду - его работоспособность: работающий код лучше идеального, но не работающего
  • тем не менее, есть те рекомендации, которым нужно стараться следовать даже начинающему разработчику:
  o правильное именование переменных и функций
  o используйте prettier для форматирования кода, отформатированный код проще читается
  o избегайте дублирования кода, повторяющиеся фрагменты кода вынесите в функции
  o стремитесь к оптимальному размеру функций, следуйте правилу: одна функция – одна задача
  o избегайте глубокой вложенности циклов, магических чисел
  o используйте делегирование
  o используйте фичи ES6 и выше, например, let, const для объявления переменных, стрелочные функции и т.д
  • разбейте js-код на модули
  • для совершенствования навыков работы с асинхронным кодом, файл images.js рекомендуется преобразовать в JSON-файл и работать с ним асинхронно
  • для сборки приложения используйте Webpack. Это может быть как ваша собственная, так и готовая сборка, например, https://www.npmjs.com/package/create-rss-app
  • используйте eslint с конфигурацией eslint-config-airbnb-base
  • для написания компонентов приложения рекомендуется использовать классы
  • в ходе работы над данным проектом целесообразно разрабатывать одностраничное (SPA) приложение, html-код которого частично генерируется при помощи JavaScript.
  Требования к вёрстке и оформлению приложения
  • при вёрстке и оформлении приложения ориентируйтесь на демо, а также на созданные профессиональными разработчиками приложения-прототипы
  • при этом вам необходимо создать веб-приложение, которое будет одинаково хорошо отображаться и выглядеть на экранах с разными разрешениями
  • вёрстка адаптивная. Минимальная ширина страницы, при которой проверяется корректность отображения приложения - 360рх, максимальная ширина страницы, при которой проверяется корректность отображения приложения - 1920рх
  • при вёрстке данного приложения целесообразно применить подход mobile first - сначала сверстать мобильную версию приложения, а потом адаптировать её к экранам с большим разрешением
  • интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента
  • обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике не влияющее на соседние элементы
  • читабельность текста: минимальный размер шрифта на любом разрешении экрана не меньше 14рх, достаточная контрастность цвета фона и цвета шрифта в активном и неактивном состоянии. Проверить контрастность на соответствие стандартам можно здесь.
  • в футере приложения есть ссылка на гитхаб автора, год создания приложения, логотип курса со ссылкой на курс`);
};
