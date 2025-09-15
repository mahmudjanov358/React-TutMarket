// <==========> <==========> <==========>
// <==========> i18n/index.js <==========>
// <==========> <==========> <==========>
export const messages = {
  // <==========> UZ <==========>
  uz: {
    // <==========> Header_1 <==========>
    welcome: "Tut ga xush kelibsiz",

    // <==========> Header_2 <==========>
    catalog: "Katalog",
    search_placeholder:
      "Mahsulotlar, kategoriyalar, brendlar bo'yicha qidiruv...",
    wallet: "Hamyon",
    favorite: "Sevimlilar",
    cart: "Savat",
    profile: "Profil",
    logout: "Chiqish",
    sign_in: "Tizimga kirish",
    sign_up: "Ro'yxatdan o'tish",
    light: "Yorug'",
    dark: "Qorong'i",
    uzbek: "O'zbekcha",
    russian: "Русский",
    not_found: "Sahifa topilmadi",

    // <==========> Header_3 <==========>
    cat_gobozor: "GoBozor",
    cat_ikea: "IKEA",
    cat_decathlon: "Decathlon",
    cat_new_products: "Yangi mahsulotlar",
    cat_brands: "Brendlar",
    cat_gifts: "Sovg'alar",
    cat_discounts: "Chegirmalar",

    // <==========> Products <==========>
    products_title: "Mahsulotlar",
    sort_default: "Saralash: Standart",
    sort_price_asc: "Narx: arzon → qimmat",
    sort_price_desc: "Narx: qimmat → arzon",
    sort_title_asc: "Nom: A → Z",
    sort_title_desc: "Nom: Z → A",
    search_products: "Qidirish...",

    // <==========> Footer_3 <==========>
    help: "Yordam",
    faq: "Savollar va javoblar",
    privacy: "Maxfiylik siyosati",
    terms: "Foydalanish shartlari",
    about_company: "Kompaniya haqida",
    about_us: "Biz haqimizda",
    career: "TUTdagi martaba",
    sell_on_tut: "TUTda soting",
    powered_by_prefix: "uchun ishlaydi",
    copyright: "© 2025 CODY LLC. Barcha huquqlar himoyalangan.",
  },

  // <==========> RU <==========>
  ru: {
    // <==========> Header_1 <==========>
    welcome: "Добро пожаловать в Tut",

    // <==========> Header_2 <==========>
    catalog: "Каталог",
    search_placeholder: "Поиск по товарам, категориям и брендам...",
    wallet: "Кошелёк",
    favorite: "Избранное",
    cart: "Корзина",
    profile: "Профиль",
    logout: "Выйти",
    sign_in: "Войти",
    sign_up: "Регистрация",
    light: "Светлая",
    dark: "Тёмная",
    uzbek: "O'zbekcha",
    russian: "Русский",
    not_found: "Страница не найдена",

    // <==========> Header_3 <==========>
    cat_gobozor: "GoBozor",
    cat_ikea: "IKEA",
    cat_decathlon: "Decathlon",
    cat_new_products: "Новые товары",
    cat_brands: "Бренды",
    cat_gifts: "Подарки",
    cat_discounts: "Скидки",

    // <==========> Products <==========>
    products_title: "Товары",
    sort_default: "Сортировка: по умолчанию",
    sort_price_asc: "Цена: низкая → высокая",
    sort_price_desc: "Цена: высокая → низкая",
    sort_title_asc: "Название: A → Я",
    sort_title_desc: "Название: Я → A",
    search_products: "Поиск...",

    // <==========> Footer_3 <==========>
    help: "Помощь",
    faq: "Вопросы и ответы",
    privacy: "Политика конфиденциальности",
    terms: "Условия использования",
    about_company: "О компании",
    about_us: "О нас",
    career: "Карьера в TUT",
    sell_on_tut: "Продавайте на TUT",
    powered_by_prefix: "работает на",
    copyright: "© 2025 CODY LLC. Все права защищены.",
  },
};

// <==========> <==========> <==========>
// <==========> t <==========>
// <==========> <==========> <==========>
export function t(lang = "uz", key, fallback) {
  const dict = messages[lang] || messages.uz;
  return dict[key] || fallback || key;
}
