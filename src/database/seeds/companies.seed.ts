import { Company } from '../entities/company.entity';

const COMPANIES = [
  {
    name: 'Xiaomi Inc.',
    slug: '1810',
    aliases: ['1810', 'Xiaomi'],
  },
  {
    name: 'Apple Inc.',
    slug: 'aapl',
    aliases: ['AAPL', 'Apple'],
  },
  {
    name: 'Accenture plc',
    slug: 'acn',
    aliases: ['ACN', 'Accenture'],
  },
  {
    name: 'Broadcom Inc.',
    slug: 'avgo',
    aliases: ['AVGO', 'Broadcom'],
  },
  {
    name: 'Adidas AG',
    slug: 'ads-de',
    aliases: ['ADS@DE', 'Adidas'],
  },
  {
    name: 'Аэрофлот',
    slug: 'aflt',
    aliases: ['AFLT', 'Aeroflot'],
  },
  {
    name: 'Акрон',
    slug: 'akrn',
    aliases: ['AKRN'],
  },
  {
    name: 'АЛРОСА',
    slug: 'alrs',
    aliases: ['ALRS'],
  },
  {
    name: 'Arconic Corporation',
    slug: 'arnc',
    aliases: ['ARNC', 'Arconic'],
  },
  {
    name: 'ATVL',
    slug: 'atvl',
    aliases: [],
  },
  {
    name: 'Группа Астра',
    slug: 'astr',
    aliases: ['ASTR', 'Astra', 'Астра'],
  },
  {
    name: 'Alibaba Group Holding Limited',
    slug: 'baba',
    aliases: ['BABA', 'Alibaba'],
  },
  {
    name: 'Bayer AG',
    slug: 'bayn-de',
    aliases: ['BAYN@DE', 'Bayer'],
  },
  {
    name: 'Booking Holdings Inc.',
    slug: 'bkng',
    aliases: ['BKNG', 'Booking'],
  },
  {
    name: 'Baker Hughes Company',
    slug: 'bkr',
    aliases: ['BKR', 'Baker Hughes', 'Baker'],
  },
  {
    name: 'Citigroup Inc.',
    slug: 'c',
    aliases: ['C', 'Citigroup'],
  },
  {
    name: 'Московский Кредитный Банк',
    slug: 'cbom',
    aliases: ['CBOM', 'МКБ'],
  },
  {
    name: 'Северсталь',
    slug: 'chmf',
    aliases: ['CHMF'],
  },
  {
    name: 'Cisco Systems, Inc.',
    slug: 'csco',
    aliases: ['CSCO', 'Cisco Systems', 'Cisco'],
  },
  {
    name: 'Chevron Corporation',
    slug: 'cvx',
    aliases: ['CVX', 'Chevron'],
  },
  {
    name: 'Дальневосточная Энергетическая Компания',
    slug: 'dvec',
    aliases: ['DVEC', 'ДЭК'],
  },
  {
    name: 'Энел Россия',
    slug: 'enru',
    aliases: ['ENRU', 'Энел'],
  },
  {
    name: 'ФСК ЕЭС',
    slug: 'fees',
    aliases: ['FEES'],
  },
  {
    name: 'Совкомфлот',
    slug: 'flot',
    aliases: ['FLOT'],
  },
  {
    name: 'Газпром',
    slug: 'gazp',
    aliases: ['GAZP'],
  },
  {
    name: 'ГМК Норильский никель',
    slug: 'gmkn',
    aliases: ['GMKN', 'Norilsk Nickel', 'Норильский Никель', 'Норникель'],
  },
  {
    name: 'The Goldman Sachs Group, Inc.',
    slug: 'gs',
    aliases: ['GS', 'Goldman Sachs'],
  },
  {
    name: 'Halliburton Company',
    slug: 'hal',
    aliases: ['HAL', 'Halliburton'],
  },
  {
    name: 'HSU',
    slug: 'hsu',
    aliases: [],
  },
  {
    name: 'International Business Machines Corporation',
    slug: 'ibm',
    aliases: ['IBM'],
  },
  {
    name: 'Johnson & Johnson',
    slug: 'jnj',
    aliases: ['JNJ'],
  },
  {
    name: 'JPMorgan Chase & Co.',
    slug: 'jpm',
    aliases: ['JPM', 'JPMorgan'],
  },
  {
    name: 'The Kraft Heinz Company',
    slug: 'khc',
    aliases: ['KHC', 'Heinz'],
  },
  {
    name: 'Красный Октябрь',
    slug: 'krot',
    aliases: ['KROT'],
  },
  {
    name: 'Лукойл',
    slug: 'lkoh',
    aliases: ['LKOH'],
  },
  {
    name: 'Lockheed Martin Corporation',
    slug: 'lmt',
    aliases: ['LMT', 'Lockhead Martin'],
  },
  {
    name: 'Mastercard Incorporated',
    slug: 'ma',
    aliases: ['MA', 'Mastercard'],
  },
  {
    name: "Moody's Corporation",
    slug: 'mco',
    aliases: ['MCO'],
  },
  {
    name: 'Магнит',
    slug: 'mgnt',
    aliases: ['MGNT'],
  },
  {
    name: 'МосЭнерго',
    slug: 'msng',
    aliases: ['MSNG'],
  },
  {
    name: 'МТС',
    slug: 'mtss',
    aliases: ['MTSS'],
  },
  {
    name: 'Netflix, Inc.',
    slug: 'nflx',
    aliases: ['NFLX', 'Netflix'],
  },
  {
    name: 'НЛМК',
    slug: 'nlmk',
    aliases: ['NLMK'],
  },
  {
    name: 'Новороссийксий Морской Торговый Порт',
    slug: 'nmtp',
    aliases: ['NMTP', 'НМТП'],
  },
  {
    name: 'Nokia Corporation',
    slug: 'nok',
    aliases: ['NOK', 'Nokia'],
  },
  {
    name: 'НОВАТЭК',
    slug: 'nvtk',
    aliases: ['NVTK'],
  },
  {
    name: 'The New York Times Company',
    slug: 'nyt',
    aliases: ['NYT', 'Times'],
  },
  {
    name: 'PepsiCo, Inc.',
    slug: 'pep',
    aliases: ['PEP', 'PepsiCo'],
  },
  {
    name: 'Pfizer Inc.',
    slug: 'pfe',
    aliases: ['PFE', 'Pfizer'],
  },
  {
    name: 'ФосАгро',
    slug: 'phor',
    aliases: ['PHOR'],
  },
  {
    name: 'ГК ПИК',
    slug: 'pikk',
    aliases: ['PIKK', 'ПИК'],
  },
  {
    name: 'Philip Morris International Inc.',
    slug: 'pm',
    aliases: ['PM', 'Philip Morris'],
  },
  {
    name: 'Polymetal International plc',
    slug: 'poly',
    aliases: ['POLY', 'Polymetal', 'Полиметалл'],
  },
  {
    name: 'QIWI plc',
    slug: 'qiwi',
    aliases: ['QIWI'],
  },
  {
    name: 'Роснефть',
    slug: 'rosn',
    aliases: ['ROSN'],
  },
  {
    name: 'Ростелеком',
    slug: 'rtkm',
    aliases: ['RTKM'],
  },
  {
    name: 'СПБ Биржа',
    slug: 'spbe',
    aliases: ['SPBE'],
  },
  {
    name: 'Sanofi',
    slug: 'sny',
    aliases: ['SNY'],
  },
  {
    name: 'Газпром нефть',
    slug: 'sibn',
    aliases: ['SIBN', 'Сибнефть'],
  },
  {
    name: 'TCS Group Holding PLC',
    slug: 'tcsg',
    aliases: ['TCSG', 'TCS Group', 'Тинькофф', 'Т-банк', 'Т-технологии'],
  },
  {
    name: 'ТГК-1',
    slug: 'tgka',
    aliases: ['TGKA', 'ТГК'],
  },
  {
    name: 'Twitter, Inc.',
    slug: 'twtr',
    aliases: ['TWTR', 'Twitter'],
  },
  {
    name: 'Uber Technologies, Inc.',
    slug: 'uber',
    aliases: ['UBER'],
  },
  {
    name: 'Visa Inc.',
    slug: 'v',
    aliases: ['V', 'Visa'],
  },
  {
    name: 'VEON Ltd.',
    slug: 'veon',
    aliases: ['VEON', 'VEON-RX'],
  },
  {
    name: 'ВКонтакте',
    slug: 'vkco',
    aliases: ['VKCO', 'VK Company', 'MAIL', 'Mail.ru', 'ВК'],
  },
  {
    name: 'VMware, Inc.',
    slug: 'vmw',
    aliases: ['VMW', 'VMware'],
  },
  {
    name: 'Whirlpool Corporation',
    slug: 'whr',
    aliases: ['WHR', 'Whirlpool'],
  },
  {
    name: 'Xerox Holdings Corporation',
    slug: 'xrx',
    aliases: ['XRX', 'Xerox'],
  },
];

export const COMPANIES_SEED: Partial<Company>[] = COMPANIES.map((company) => ({
  name: company.name,
  slug: company.slug,
  aliases: company.aliases.join('\t'),
}));
