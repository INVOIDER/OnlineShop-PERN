import {makeAutoObservable} from "mobx";

class DeviceStore{
    constructor() {
        this._types =[
            {id:1, name: 'Телефоны'},
            {id:2, name: 'Телевизоры'},
        ]
        this._brands =[
            {id:1, name: 'Samsung'},
            {id:2, name: 'Apple'},
            {id:3, name: 'Xiaomi'}
        ]
        this._devices = [
            {id:1, name: 'Galaxy A73',brandID:1, typeID:1, price: 30000,amount:30, img: '4b9a06c1-a838-411e-9aa5-db9b2e20b8ab.jpg', description: "Galaxy S10 - это смартфон, разработанный компанией Samsung. Он был выпущен в феврале 2019 года и имеет множество функций и возможностей.\n" +
                    "\n" +
                    "Среди основных характеристик Galaxy S10 можно выделить:\n" +
                    "\n" +
                    "- 6,1-дюймовый дисплей с разрешением 3040x1440 пикселей и технологией Dynamic AMOLED.\n" +
                    "- Тройная основная камера на 12 МП с автофокусом и оптической стабилизацией изображения.\n" +
                    "- Фронтальная камера на 10 МП с поддержкой HDR и автофокусом.\n" +
                    "- Процессор Exynos 9820 или Qualcomm Snapdragon 855, в зависимости от региона.\n" +
                    "- 8 ГБ оперативной памяти и 128 ГБ встроенной памяти, расширяемой с помощью карт microSD до 512 ГБ.\n" +
                    "- Аккумулятор емкостью 3400 мАч с поддержкой быстрой зарядки и беспроводной зарядки.\n" +
                    "- Поддержка NFC, Bluetooth 5.0, Wi-Fi 6 и GPS.\n" +
                    "- Защита корпуса от воды и пыли по стандарту IP68.\n" +
                    "- Операционная система Android 9.0 Pie с пользовательским интерфейсом One UI.\n" +
                    "\n" +
                    "Galaxy S10 также имеет множество дополнительных функций, таких как сканер отпечатков пальцев, распознавание лица, фирменный ассистент Bixby и множество других функций, которые делают его одним из лучших смартфонов на рынке."},
            {id:2, name: 'Iphone X белый',brandID:2, typeID:1, price: 30000,amount:30, img: '7af45c2a-a6c5-421b-800a-db8db31d3075.jpg', description: "Стильный и надёжный смартфон Apple iPhone X оснащён ультра-производительным процессором А11 Bionic и стабильным программным обеспечением. Полноэкранный дисплей Super Retina с диагональю 5.8 дюйма демонстрирует невероятно яркую, контрастную и живую картинку. Корпус аппарата защищён от воды и пыли.\n" +
                    "Камера с матрицей 12 Мп, широкоугольным объективом и чувствительной диафрагмой снимает идеально чёткие фотографии и видео, а двойная система оптической стабилизации ещё больше повышает качество изображений. Фронтальная камера на 7 Мп с прогрессивной функцией портретного освещения не только делает красивые селфи, но и помогает обеспечивать безупречный уровень безопасности. Функция Face ID разблокирует устройство после сканирования лица.\n" +
                    "\n" +
                    "Корпус полностью выполнен из особенно прочного стекла, усиливающее покрытие которого на 50% толще по сравнению с предыдущими моделями. Благодаря специальному слою с поверхности легко удаляются все загрязнения."},
            {id:3, name: '50" Телевизор Samsung UE50AU7500U 2021 LED, HDR RU, titan gray',brandID:1, typeID:3, price: 39000,amount:512, img: 'ee4cca1c-e55a-4936-b829-2235e4b9abdc.jpg', description: "Благодаря технологии PurColor, зритель ощущает себя участником событий, происходящих на экране. Эта технология обеспечивает вывод на экран богатую палитру цветовых оттенков, в результате чего зритель испытывает эффект полного погружения в действие на экране.\n" +
                    "Интеллектуальный апскейлинг до 4K, позволит вам смотреть ваш любимый контент с более низким разрешением в сверхчетком разрешении 4К. Кроме того, благодаря улучшенной технологии обработки цвета, вы получите удовольствие от реалистичной цветопередачи.\n" +
                    "Экран 4K UHD телевизора содержит в 4 раза больше пикселей по сравнению с экраном FHD телевизора, благодаря чему вы видите исключительно четкое изображение с превосходной передачей мельчайших деталей. Теперь вы сможете различить в каждой сцене мельчайшие детали.\n" +
                    "Технология High Dynamic Range увеличивает диапазон яркости экрана вашего телевизора, благодаря чему вы сможете оценить все богатство цветовой палитры и великолепную детализацию даже в самых темных и светлых сценах."},
            {id:5, name: 'Смартфон Xiaomi Redmi Note 11 Pro 5G 8/128 ГБ RU, Dual nano SIM, серый графит',brandID:3, typeID:1, price: 20000,amount:10, img: 'e8aae01f-8091-4d25-bb73-687b0fd6b41a.jpg', description: "PartNumber/Артикул Производителя: 38088\n" +
                    "Вес: 202\n" +
                    "Цвет: серый\n" +
                    "Серия: Xiaomi Redmi Note 11 Pro\n" +
                    "Тип: Смартфон\n" +
                    "Интерфейс USB: USB Type-C\n" +
                    "Комплектация: Адаптер, USB Type-C кабель, Инструмент для извлечения sim-карты, Защитный чехол\n" +
                    "Чехол в комплекте: ДА\n" +
                    "Материал корпуса: стекло\n" +
                    "Размеры: 76.1x164.2x8.1мм\n" +
                    "Операционная система: Android 11\n" +
                    "Стандарт Bluetooth: v5.1\n" +
                    "Встроенный модуль GPS: ДА\n" +
                    "Поддержка карт памяти: microSD\n" +
                    "Вспышка: ДА\n" +
                    "Тип SIM-карты: nano SIM\n" +
                    "Встроенный модуль ГЛОНАСС: ДА\n" +
                    "Тип корпуса: моноблок\n" +
                    "Тип аккумулятора: Li-Pol\n" +
                    "Высота: 164.2\n" +
                    "Бренд: XIAOMI\n" +
                    "Поддержка 2 sim-карт: ДА\n" +
                    "Технология GSM 1900: ДА\n" +
                    "Технология GSM 900/1800: ДА\n" +
                    "Основная камера (млн. пикс.): 108\n" +
                    "Технология 3G: ДА\n" +
                    "Технология 4G: ДА\n" +
                    "Стандарт WiFi: 802.11 a/b/g/n/ac\n" +
                    "Сенсорный экран: ДА\n" +
                    "Максимальный объем карты памяти: 1024\n" +
                    "Сенсорный экран Multitouch: ДА\n" +
                    "Датчик освещенности: да\n" +
                    "Емкость стандартного аккумулятора: 5000\n" +
                    "Тип основного дисплея: AMOLED\n" +
                    "Сканер отпечатка пальца: ДА\n" +
                    "Встроенный модуль А-GPS: ДА\n" +
                    "Инфракрасный порт IrDA: да\n" +
                    "Ширина: 76.1\n" +
                    "Соотношение сторон экрана: 20:9\n" +
                    "Глубина: 8.1\n" +
                    "Цвет телефона: серый\n" +
                    "Частота процессора: 2200\n" +
                    "Поддержка карт памяти: да\n" +
                    "Количество ядер процессора: 8\n" +
                    "Операционная система: Android\n" +
                    "Запись видео: 1080p\n" +
                    "Особенность модели: 8/128Gb\n" +
                    "Поддержка Bluetooth: ДА\n" +
                    "Модель процессора: Snapdragon 695\n" +
                    "Количество камер: 3\n" +
                    "Возможность зарядки от USB: ДА\n" +
                    "Диагональ основного дисплея: 6.67\n" +
                    "Тип вспышки: светодиодная\n" +
                    "Разъем для подключения наушников: 3.5 мм\n" +
                    "Разъем для зарядного устройства: USB Type-C\n" +
                    "Маркетинговое название: Redmi Note 11 Pro 5G\n" +
                    "Модель граф. контроллера: Adreno 619\n" +
                    "Объем встроенной памяти (Гб): 128\n" +
                    "Объем оперативной памяти (Гб): 8\n" +
                    "Датчик приближения: да\n" +
                    "Прочие датчики: Датчик освещенности | Электронный компас | Гироскоп\n" +
                    "Модуль NFC: ДА\n" +
                    "Основная камера 2 (млн. пикс.): 8\n" +
                    "Встроенный модуль Beidou: ДА\n" +
                    "2.5D стекло: ДА\n" +
                    "Особенности камер: 108 Мп, камера профессионального уровня. Ультраширокий и макро объективы\n" +
                    "Диафрагма, фронтальная камера: F/2.4\n" +
                    "Диафрагма, основная камера: F/1.9\n" +
                    "Число пикселей на дюйм (PPI): 395\n" +
                    "Тройная камера: ДА\n" +
                    "Основная камера 3: 2\n" +
                    "Разблокировка по лицу: ДА\n" +
                    "Встроенный модуль Galileo: ДА\n" +
                    "Функция быстрой зарядки: ДА\n" +
                    "Режим работы 2 sim-карт: одновременная\n" +
                    "Разрешение экрана: 2400x1080\n" +
                    "Дисплей : 6.67\" 2400x1080 AMOLED 20:9\n" +
                    "Аккумулятор : Li-Pol 5000мAч\n" +
                    "Технология 5G: ДА\n" +
                    "Количество SIM-карт: 2\n" +
                    "Расположение сканера отпечатка пальцев: торцевой\n" +
                    "Производитель граф. контроллера: Qualcomm\n" +
                    "Тип фронтальной камеры: стандартная\n" +
                    "Частота обновления экрана: 120\n" +
                    "Фронтальная камера (млн. пикс.): 16\n" +
                    "Вес упаковки (ед): 0.488\n" +
                    "Длина упаковки (ед): 0.17\n" +
                    "Габариты упаковки (ед) ДхШхВ: 0.17x0.09x0.06\n" +
                    "Объем упаковки (ед): 0.000918\n" +
                    "Ширина упаковки (ед): 0.09\n" +
                    "Высота упаковки (ед): 0.06\n" +
                    "Ссылка на сайт поставщика/вендора: https://www. mi. com/global/product/redmi-note-11-pro-5g\n" +
                    "Фид для контекста: Redmi Note 11 Pro 5G\n" +
                    "Цвет для фильтра: серый\n" +
                    "Технология GSM 850: ДА\n" +
                    "Процессор смартфона: Snapdragon 695 2200МГц 8\n" +
                    "Разрешение основного экрана, горизонтальное: 1080\n" +
                    "Разрешение основного экрана, вертикальное: 2400\n" +
                    "Цвет (маркетинговый): Graphite Gray\n" +
                    "Степень защиты: IP53\n" +
                    "Страна производства: Китай\n" +
                    "Смартфон с «Монобровью»: ДА\n" +
                    "Ссылка на изображение товара: https://files. merlion. ru/c12516e6-b130-11ec-83ad-0050569d2f77\n" +
                    "Партномер: 38088\n" +
                    "Производитель процессора: Qualcomm\n" +
                    "Акселерометр (G-sensor): да\n" +
                    "Технология основного дисплея: FHD+\n" +
                    "Технология стекла экрана: Corning Gorilla Glass 5\n" +
                    "Датчик гироскопа: да\n" +
                    "Отдельный выход для подключения наушников: да\n" +
                    "Эффект экрана/стекла: 2.5D\n" +
                    "Режим работы нескольких SIM-карт: одновременный\n" +
                    "Система навигации: GPS / A-GPS / ГЛОНАСС / BeiDou / Galileo\n" +
                    "Материал экрана: стекло\n" +
                    "Сверхширокоугольный: ДА\n" +
                    "Макрообъектив: ДА\n" +
                    "Стандарт связи: 2G/3G/4G (LTE)/5G"},
            {id:6, name: 'Товар',brandID:1, typeID:1, price: 1,amount:1, img: 'e8aae01f-8091-4d25-bb73-687b0fd6b41a.jpg', description: "Это описание товара"},
            {id:7, name: 'Товар',brandID:1, typeID:1, price: 1,amount:0, img: 'e8aae01f-8091-4d25-bb73-687b0fd6b41a.jpg', description: "Это описание товара"},
        ]
        this._selectedBrand = {}
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevices(devices){
        this._devices = devices
    }
    setSelectedBrand(brand){
        this._selectedBrand = brand
    }
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._devices
    }
    get selectedBrand(){
        return this._selectedBrand
    }
}
export default DeviceStore