// قائمة الدول الأعضاء في الأمم المتحدة مع القارات.
// بيانات البنوك والمحافظ فارغة عمداً حتى يتم التحقق منها من مصادر رسمية.
export type Status = "verified" | "partial" | "review" | "unavailable";
export const STATUS_LABEL: Record<Status, string> = {
  verified: "موثّق",
  partial: "موثّق جزئياً",
  review: "يحتاج مراجعة",
  unavailable: "غير متوفر",
};
export type Continent = "أفريقيا" | "آسيا" | "أوروبا" | "أمريكا الشمالية" | "أمريكا الجنوبية" | "أوقيانوسيا";
export const CONTINENTS: Continent[] = ["أفريقيا", "آسيا", "أوروبا", "أمريكا الشمالية", "أمريكا الجنوبية", "أوقيانوسيا"];

export const SIGNUP_METHODS = ["رقم الهاتف", "رقم الهوية الوطنية", "البريد الإلكتروني", "التحقق عبر SMS/OTP", "إنشاء PIN أو كلمة مرور", "التحقق من الهوية/الوجه"] as const;
export const LOGIN_METHODS = ["رقم الهاتف + PIN", "رقم الهوية + كلمة المرور", "اسم المستخدم + كلمة المرور", "OTP", "البصمة/التعرف على الوجه"] as const;

export type MethodMap = Record<string, Status>;
export interface Entity {
  name: string | null;
  officialName: string | null;
  logo: string | null;
  website: string | null;
  facebook: string | null;
  social: { instagram: string | null; x: string | null; linkedin: string | null };
  ownerType?: "bank" | "telecom" | "independent" | null;
  status: Status;
  sources: string[];
  signup: MethodMap;
  login: MethodMap;
}
export interface Country { code: string; nameAr: string; nameEn: string; continent: Continent; bank: Entity; wallet: Entity }

const empty = (): Entity => ({
  name: null, officialName: null, logo: null, website: null, facebook: null,
  social: { instagram: null, x: null, linkedin: null }, ownerType: null,
  status: "unavailable", sources: [],
  signup: Object.fromEntries(SIGNUP_METHODS.map((m) => [m, "unavailable"])),
  login: Object.fromEntries(LOGIN_METHODS.map((m) => [m, "unavailable"])),
});

const AF = "أفريقيا", AS = "آسيا", EU = "أوروبا", NA = "أمريكا الشمالية", SA = "أمريكا الجنوبية", OC = "أوقيانوسيا";
const RAW: [string, string, string, string][] = [
["DZ","الجزائر","Algeria",AF],["AO","أنغولا","Angola",AF],["BJ","بنين","Benin",AF],["BW","بوتسوانا","Botswana",AF],["BF","بوركينا فاسو","Burkina Faso",AF],["BI","بوروندي","Burundi",AF],["CV","الرأس الأخضر","Cabo Verde",AF],["CM","الكاميرون","Cameroon",AF],["CF","أفريقيا الوسطى","Central African Republic",AF],["TD","تشاد","Chad",AF],["KM","جزر القمر","Comoros",AF],["CG","الكونغو","Congo",AF],["CD","الكونغو الديمقراطية","DR Congo",AF],["CI","ساحل العاج","Côte d'Ivoire",AF],["DJ","جيبوتي","Djibouti",AF],["EG","مصر","Egypt",AF],["GQ","غينيا الاستوائية","Equatorial Guinea",AF],["ER","إريتريا","Eritrea",AF],["SZ","إسواتيني","Eswatini",AF],["ET","إثيوبيا","Ethiopia",AF],["GA","الغابون","Gabon",AF],["GM","غامبيا","Gambia",AF],["GH","غانا","Ghana",AF],["GN","غينيا","Guinea",AF],["GW","غينيا بيساو","Guinea-Bissau",AF],["KE","كينيا","Kenya",AF],["LS","ليسوتو","Lesotho",AF],["LR","ليبيريا","Liberia",AF],["LY","ليبيا","Libya",AF],["MG","مدغشقر","Madagascar",AF],["MW","مالاوي","Malawi",AF],["ML","مالي","Mali",AF],["MR","موريتانيا","Mauritania",AF],["MU","موريشيوس","Mauritius",AF],["MA","المغرب","Morocco",AF],["MZ","موزمبيق","Mozambique",AF],["NA","ناميبيا","Namibia",AF],["NE","النيجر","Niger",AF],["NG","نيجيريا","Nigeria",AF],["RW","رواندا","Rwanda",AF],["ST","ساو تومي وبرينسيب","Sao Tome and Principe",AF],["SN","السنغال","Senegal",AF],["SC","سيشل","Seychelles",AF],["SL","سيراليون","Sierra Leone",AF],["SO","الصومال","Somalia",AF],["ZA","جنوب أفريقيا","South Africa",AF],["SS","جنوب السودان","South Sudan",AF],["SD","السودان","Sudan",AF],["TZ","تنزانيا","Tanzania",AF],["TG","توغو","Togo",AF],["TN","تونس","Tunisia",AF],["UG","أوغندا","Uganda",AF],["ZM","زامبيا","Zambia",AF],["ZW","زيمبابوي","Zimbabwe",AF],
["AF","أفغانستان","Afghanistan",AS],["AM","أرمينيا","Armenia",AS],["AZ","أذربيجان","Azerbaijan",AS],["BH","البحرين","Bahrain",AS],["BD","بنغلاديش","Bangladesh",AS],["BT","بوتان","Bhutan",AS],["BN","بروناي","Brunei",AS],["KH","كمبوديا","Cambodia",AS],["CN","الصين","China",AS],["GE","جورجيا","Georgia",AS],["IN","الهند","India",AS],["ID","إندونيسيا","Indonesia",AS],["IR","إيران","Iran",AS],["IQ","العراق","Iraq",AS],["IL","إسرائيل","Israel",AS],["JP","اليابان","Japan",AS],["JO","الأردن","Jordan",AS],["KZ","كازاخستان","Kazakhstan",AS],["KW","الكويت","Kuwait",AS],["KG","قيرغيزستان","Kyrgyzstan",AS],["LA","لاوس","Laos",AS],["LB","لبنان","Lebanon",AS],["MY","ماليزيا","Malaysia",AS],["MV","جزر المالديف","Maldives",AS],["MN","منغوليا","Mongolia",AS],["MM","ميانمار","Myanmar",AS],["NP","نيبال","Nepal",AS],["KP","كوريا الشمالية","North Korea",AS],["OM","عُمان","Oman",AS],["PK","باكستان","Pakistan",AS],["PH","الفلبين","Philippines",AS],["QA","قطر","Qatar",AS],["SA","السعودية","Saudi Arabia",AS],["SG","سنغافورة","Singapore",AS],["KR","كوريا الجنوبية","South Korea",AS],["LK","سريلانكا","Sri Lanka",AS],["SY","سوريا","Syria",AS],["TJ","طاجيكستان","Tajikistan",AS],["TH","تايلاند","Thailand",AS],["TL","تيمور الشرقية","Timor-Leste",AS],["TR","تركيا","Türkiye",AS],["TM","تركمانستان","Turkmenistan",AS],["AE","الإمارات","United Arab Emirates",AS],["UZ","أوزبكستان","Uzbekistan",AS],["VN","فيتنام","Vietnam",AS],["YE","اليمن","Yemen",AS],["CY","قبرص","Cyprus",AS],
["AL","ألبانيا","Albania",EU],["AD","أندورا","Andorra",EU],["AT","النمسا","Austria",EU],["BY","بيلاروسيا","Belarus",EU],["BE","بلجيكا","Belgium",EU],["BA","البوسنة والهرسك","Bosnia and Herzegovina",EU],["BG","بلغاريا","Bulgaria",EU],["HR","كرواتيا","Croatia",EU],["CZ","التشيك","Czechia",EU],["DK","الدنمارك","Denmark",EU],["EE","إستونيا","Estonia",EU],["FI","فنلندا","Finland",EU],["FR","فرنسا","France",EU],["DE","ألمانيا","Germany",EU],["GR","اليونان","Greece",EU],["HU","المجر","Hungary",EU],["IS","آيسلندا","Iceland",EU],["IE","أيرلندا","Ireland",EU],["IT","إيطاليا","Italy",EU],["LV","لاتفيا","Latvia",EU],["LI","ليختنشتاين","Liechtenstein",EU],["LT","ليتوانيا","Lithuania",EU],["LU","لوكسمبورغ","Luxembourg",EU],["MT","مالطا","Malta",EU],["MD","مولدوفا","Moldova",EU],["MC","موناكو","Monaco",EU],["ME","الجبل الأسود","Montenegro",EU],["NL","هولندا","Netherlands",EU],["MK","مقدونيا الشمالية","North Macedonia",EU],["NO","النرويج","Norway",EU],["PL","بولندا","Poland",EU],["PT","البرتغال","Portugal",EU],["RO","رومانيا","Romania",EU],["RU","روسيا","Russia",EU],["SM","سان مارينو","San Marino",EU],["RS","صربيا","Serbia",EU],["SK","سلوفاكيا","Slovakia",EU],["SI","سلوفينيا","Slovenia",EU],["ES","إسبانيا","Spain",EU],["SE","السويد","Sweden",EU],["CH","سويسرا","Switzerland",EU],["UA","أوكرانيا","Ukraine",EU],["GB","المملكة المتحدة","United Kingdom",EU],
["AG","أنتيغوا وباربودا","Antigua and Barbuda",NA],["BS","الباهاما","Bahamas",NA],["BB","باربادوس","Barbados",NA],["BZ","بليز","Belize",NA],["CA","كندا","Canada",NA],["CR","كوستاريكا","Costa Rica",NA],["CU","كوبا","Cuba",NA],["DM","دومينيكا","Dominica",NA],["DO","الدومينيكان","Dominican Republic",NA],["SV","السلفادور","El Salvador",NA],["GD","غرينادا","Grenada",NA],["GT","غواتيمالا","Guatemala",NA],["HT","هايتي","Haiti",NA],["HN","هندوراس","Honduras",NA],["JM","جامايكا","Jamaica",NA],["MX","المكسيك","Mexico",NA],["NI","نيكاراغوا","Nicaragua",NA],["PA","بنما","Panama",NA],["KN","سانت كيتس ونيفيس","Saint Kitts and Nevis",NA],["LC","سانت لوسيا","Saint Lucia",NA],["VC","سانت فنسنت والغرينادين","Saint Vincent and the Grenadines",NA],["TT","ترينيداد وتوباغو","Trinidad and Tobago",NA],["US","الولايات المتحدة","United States",NA],
["AR","الأرجنتين","Argentina",SA],["BO","بوليفيا","Bolivia",SA],["BR","البرازيل","Brazil",SA],["CL","تشيلي","Chile",SA],["CO","كولومبيا","Colombia",SA],["EC","الإكوادور","Ecuador",SA],["GY","غيانا","Guyana",SA],["PY","باراغواي","Paraguay",SA],["PE","بيرو","Peru",SA],["SR","سورينام","Suriname",SA],["UY","الأوروغواي","Uruguay",SA],["VE","فنزويلا","Venezuela",SA],
["AU","أستراليا","Australia",OC],["FJ","فيجي","Fiji",OC],["KI","كيريباتي","Kiribati",OC],["MH","جزر مارشال","Marshall Islands",OC],["FM","ميكرونيزيا","Micronesia",OC],["NR","ناورو","Nauru",OC],["NZ","نيوزيلندا","New Zealand",OC],["PW","بالاو","Palau",OC],["PG","بابوا غينيا الجديدة","Papua New Guinea",OC],["WS","ساموا","Samoa",OC],["SB","جزر سليمان","Solomon Islands",OC],["TO","تونغا","Tonga",OC],["TV","توفالو","Tuvalu",OC],["VU","فانواتو","Vanuatu",OC],
];

export const COUNTRIES: Country[] = RAW.map(([code, nameAr, nameEn, continent]) => ({
  code, nameAr, nameEn, continent: continent as Continent, bank: empty(), wallet: empty(),
}));

export const flag = (code: string) =>
  String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

// تحويل سجل قاعدة البيانات إلى نموذج الدولة مع ملء الحقول الناقصة.
export type CountryRow = { code: string; name_ar: string; name_en: string; continent: string; bank: unknown; wallet: unknown };
const fill = (raw: unknown): Entity => {
  const r = (raw ?? {}) as Partial<Entity>;
  const base = empty();
  const ms: Status = r.name ? "review" : "unavailable";
  return {
    ...base, ...r,
    social: { ...base.social, ...(r.social ?? {}) },
    sources: r.sources ?? [],
    status: r.status ?? "unavailable",
    signup: { ...Object.fromEntries(SIGNUP_METHODS.map((m) => [m, ms])), ...(r.signup ?? {}) },
    login: { ...Object.fromEntries(LOGIN_METHODS.map((m) => [m, ms])), ...(r.login ?? {}) },
  };
};
export const fromRow = (r: CountryRow): Country => ({
  code: r.code.trim(), nameAr: r.name_ar, nameEn: r.name_en, continent: r.continent as Continent,
  bank: fill(r.bank), wallet: fill(r.wallet),
});
