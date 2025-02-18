const PROPERTY_TYPES = {
  0: "Not Specified",
  1: "Terraced House",
  2: "End of terrace house",
  3: "Semi-detached house",
  4: "Detached house",
  5: "Mews house",
  6: "Cluster house",
  7: "Ground floor flat",
  8: "Flat",
  9: "Studio flat",
  10: "Ground floor maisonette",
  11: "Maisonette",
  12: "Bungalow",
  13: "Terraced bungalow",
  14: "Semi-detached bungalow",
  15: "Detached bungalow",
  16: "Mobile home",
  20: "Land (Residential)",
  21: "Link detached house",
  22: "Town house",
  23: "Cottage",
  24: "Chalet",
  25: "Character Property",
  26: "House (unspecified)",
  27: "Villa",
  28: "Apartment",
  29: "Penthouse",
  30: "Finca",
  43: "Barn Conversion",
  44: "Serviced apartment",
  45: "Parking",
  46: "Sheltered Housing",
  47: "Reteirment property",
  48: "House share",
  49: "Flat share",
  50: "Park home",
  51: "Garages",
  52: "Farm House",
  53: "Equestrian facility",
  56: "Duplex",
  59: "Triplex",
  62: "Longere",
  65: "Gite",
  68: "Barn",
  71: "Trulli",
  74: "Mill",
  77: "Ruins",
  80: "Restaurant",
  83: "Cafe",
  86: "Mill",
  92: "Castle",
  95: "Village House",
  101: "Cave House",
  104: "Cortijo",
  107: "Farm Land",
  110: "Plot",
  113: "Country House",
  116: "Stone House",
  117: "Caravan",
  118: "Lodge",
  119: "Log Cabin",
  120: "Manor House",
  121: "Stately Home",
  125: "Off-Plan",
  128: "Semi-detached Villa",
  131: "Detached Villa",
  134: "Bar/Nightclub",
  137: "Shop",
  140: "Riad",
  141: "House Boat",
  142: "Hotel Room",
  143: "Block of Apartments",
  144: "Private Halls",
  178: "Office",
  181: "Business Park",
  184: "Serviced Office",
  187: "Retail Property (High Street)",
  190: "Retail Property (Out of Town)",
  193: "Convenience Store",
  196: "Garages",
  199: "Hairdresser/Barber Shop",
  202: "Hotel",
  205: "Petrol Station",
  208: "Post Office",
  211: "Pub",
  214: "Workshop & Retail Space",
  217: "Distribution Warehouse",
  220: "Factory",
  223: "Heavy Industrial",
  226: "Industrial Park",
  229: "Light Industrial",
  232: "Storage",
  235: "Showroom",
  238: "Warehouse",
  241: "Land (Commercial)",
  244: "Commercial Development",
  247: "Industrial Development",
  250: "Residential Development",
  253: "Commercial Property",
  256: "Data Centre",
  259: "Farm",
  262: "Healthcare Facility",
  265: "Marine Property",
  268: "Mixed Use",
  271: "Research & Development Facility",
  274: "Science Park",
  277: "Guest House",
  280: "Hospitality",
  283: "Leisure Facility",
  298: "Takeaway",
  301: "Childcare Facility",
  304: "Smallholding",
  307: "Place of Worship",
  310: "Trade Counter",
  511: "Coach House",
  512: "House of Multiple Occupation",
  535: "Sports facilities",
  538: "Spa",
  541: "Campsite & Holiday Village",
};

const PRICE_QUALIFIER_TYPES = {
  0: "Default",
  1: "POA",
  2: "Guide Price",
  3: "Fixed Price",
  4: "Offers in excess of",
  5: "OIRO",
  6: "Sale by Tender",
  7: "From",
  9: "Shared Ownership",
  10: "Offers over",
  11: "Part Buy, Part Rent",
  12: "Shared Equity",
  15: "Offers Invited",
  16: "Coming Soon",
};

const TENURE_TYPES = {
  1: "Freehold",
  2: "Leasehold",
  3: "Feudal",
  4: "Commonhold",
  5: "Share of Freehold",
};

const FREQUENCY_TYPES = {
  1: "Yearly",
  4: "Quarterly",
  12: "Monthly",
  52: "Weekly",
  365: "Daily",
};

export const adfProperty = (pdtfTransaction) => {
  const materialFacts = pdtfTransaction.propertyPack?.materialFacts;
  return {
    property_type:
      Object.keys(PROPERTY_TYPES).find(
        (key) => PROPERTY_TYPES(key) === materialFacts?.propertyType
      ) || 0,
    new_home: materialFacts?.isNewBuild,
    address: {
      house_name_number: materialFacts?.address?.line1,
      address_2: materialFacts?.address?.line2,
      town: materialFacts?.address?.town,
      postcode_1: materialFacts?.address?.postcode.split(" ")[0],
      postcode_2: materialFacts?.address?.postcode.split(" ")[1],
      display_address: materialFacts?.address?.line1,
      latitude: materialFacts?.location?.latitude,
      longitude: materialFacts?.location?.longitude,
    },
    price_information: {
      price: materialFacts?.price_information?.price,
      price_qualifier: materialFacts?.price_information?.priceQualifier,
    },
  };
};

export const pdtfClaims = (adfProperty) => {
  return {
    "/propertyPack/materialFacts/address": {
      line1: adfProperty?.address?.house_name_number,
      line2: adfProperty?.address?.line2,
      town: adfProperty?.address?.town,
      postcode: `${adfProperty?.address?.postcode_1} ${adfProperty?.address?.postcode_2}`,
    },
    "/propertyPack/materialFacts/location": {
      latitude: adfProperty?.address?.latitude,
      longitude: adfProperty?.address?.longitude,
    },
    "/propertyPack/materialFacts/priceInformation": {
      price: adfProperty?.price_information?.price,
      priceQualifier: adfProperty?.price_information?.price_qualifier,
    },
  };
};
