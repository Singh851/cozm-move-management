export interface Mover {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  email: string;
}

export const PANEL_MOVERS: Mover[] = [
  { id: "sf-paris",     name: "Santa Fe Paris",             city: "Paris",     country: "France",          flag: "🇫🇷", email: "paris.quotes@santaferelo.com" },
  { id: "sf-london",    name: "Santa Fe London",            city: "London",    country: "United Kingdom",  flag: "🇬🇧", email: "london.quotes@santaferelo.com" },
  { id: "sf-brussels",  name: "Santa Fe Brussels",          city: "Brussels",  country: "Belgium",         flag: "🇧🇪", email: "brussels.quotes@santaferelo.com" },
  { id: "sf-frankfurt", name: "Santa Fe Frankfurt",         city: "Frankfurt", country: "Germany",         flag: "🇩🇪", email: "frankfurt.quotes@santaferelo.com" },
  { id: "sf-geneva",    name: "Santa Fe Geneva",            city: "Geneva",    country: "Switzerland",     flag: "🇨🇭", email: "geneva.quotes@santaferelo.com" },
  { id: "sf-singapore", name: "Santa Fe Singapore",         city: "Singapore", country: "Singapore",       flag: "🇸🇬", email: "singapore.quotes@santaferelo.com" },
  { id: "sf-hk",        name: "Santa Fe Hong Kong",         city: "Hong Kong", country: "Hong Kong",       flag: "🇭🇰", email: "hk.quotes@santaferelo.com" },
  { id: "sf-mumbai",    name: "Santa Fe Mumbai Moving",     city: "Mumbai",    country: "India",           flag: "🇮🇳", email: "mumbai.quotes@santaferelo.com" },
  { id: "sf-amsterdam", name: "Santa Fe Amsterdam",         city: "Amsterdam", country: "Netherlands",     flag: "🇳🇱", email: "amsterdam.quotes@santaferelo.com" },
  { id: "sf-lisbon",    name: "Santa Fe Lisbon",            city: "Lisbon",    country: "Portugal",        flag: "🇵🇹", email: "lisbon.quotes@santaferelo.com" },
  { id: "sf-madrid",    name: "Santa Fe Madrid",            city: "Madrid",    country: "Spain",           flag: "🇪🇸", email: "madrid.quotes@santaferelo.com" },
  { id: "sf-sydney",    name: "Chess Moving Sydney",        city: "Sydney",    country: "Australia",       flag: "🇦🇺", email: "chess@chessmoving.com.au" },
  { id: "premium",      name: "Premium Removals Solutions", city: "London",    country: "United Kingdom",  flag: "🇬🇧", email: "quotes@premiumremovals.com" },
  { id: "grospiron",    name: "Grospiron International",   city: "Paris",     country: "France",          flag: "🇫🇷", email: "quotes@grospiron.com" },
  { id: "elite",        name: "Elite Moving System LTD",   city: "London",    country: "United Kingdom",  flag: "🇬🇧", email: "quotes@elitemoving.co.uk" },
  { id: "lux-connex",   name: "LUX-CONNEX S.A.",           city: "Luxembourg",country: "Luxembourg",      flag: "🇱🇺", email: "quotes@luxconnex.lu" },
  { id: "hasenkamp",    name: "Hasenkamp Relocation",      city: "Frankfurt", country: "Germany",         flag: "🇩🇪", email: "quotes@hasenkamp.de" },
  { id: "oss",          name: "OSS World Wide Movers",     city: "Sydney",    country: "Australia",       flag: "🇦🇺", email: "quotes@oss.com.au" },
  { id: "premier",      name: "Premier International Movers", city: "London", country: "United Kingdom",  flag: "🇬🇧", email: "quotes@premierintl.com" },
  { id: "global-intl",  name: "Global International Inc.", city: "Lisbon",    country: "Portugal",        flag: "🇵🇹", email: "quotes@globalintl.pt" },
];
