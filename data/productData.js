const productData = {
  shampoos: [
    {
      productId: "101",
      name: "Kyren Moisture Nature Sweet Bouquet Shampoo 500ml",
      slug: "sweet-bouquet-shampoo-500ml",
      categoryId: "1",
      description: "A premium color-protecting shampoo with a gentle formula.",
      price: 20.0,
      discount: null,
      images: ["/image/shampoosweetbouquet.webp"],
      stock: 100,
      attributes: { size: "250ml", purpose: "Color Protection" },
      category: "shampoos",
    },
    {
      productId: "102",
      name: "Kyren Moisture Nature Baby Rose Shampoo 500ml",
      slug: "baby-rose-shampoo-500ml",
      categoryId: "1",
      description: "An anti-dandruff shampoo that soothes the scalp.",
      price: 22.0,
      discount: 10,
      images: ["/image/BabyRoseShampooandTreatment.webp"],
      stock: 80,
      attributes: { size: "300ml", purpose: "Anti-Dandruff" },
      category: "shampoos",
    },
    {
      productId: "103",
      name: "Kyren Moisture Nature Dear Lavender Shampoo 500ml",
      slug: "dear-lavender-shampoo-500ml",
      categoryId: "1",
      description: "A moisturizing shampoo to hydrate dry hair.",
      price: 18.0,
      discount: 5,
      images: ["/image/DearLavenderShampooandTreatment.webp"],
      stock: 120,
      attributes: { size: "200ml", purpose: "Moisturizing" },
      category: "shampoos",
    },
    {
      productId: "104",
      name: "Kyren Moisture Nature Daily Pure Shampoo 500ml",
      slug: "daily-pure-shampoo-500ml",
      categoryId: "1",
      description: "A moisturizing shampoo to hydrate dry hair.",
      price: 18.0,
      discount: 5,
      images: ["/image/ShampooDailyPure.webp"],
      stock: 120,
      attributes: { size: "200ml", purpose: "Moisturizing" },
      category: "shampoos",
    },
    {
      productId: "105",
      name: "Kyren Moisture Nature May Acacia Shampoo 500ml",
      slug: "may-acacia-shampoo-500ml",
      categoryId: "1",
      description: "A moisturizing shampoo to hydrate dry hair.",
      price: 18.0,
      discount: 5,
      images: ["/image/ShampooMayAcacia.webp"],
      stock: 120,
      attributes: { size: "200ml", purpose: "Moisturizing" },
      category: "shampoos",
    },
    {
      productId: "106",
      name: "Kyren Moisture Nature Fall in Calendula Shampoo 500ml",
      slug: "calendula-shampoo-500ml",
      categoryId: "1",
      description: "A moisturizing shampoo to hydrate dry hair.",
      price: 18.0,
      discount: 5,
      images: ["/image/FallinCalendulaShampooandTreatment.webp"],
      stock: 120,
      attributes: { size: "200ml", purpose: "Moisturizing" },
      category: "shampoos",
    },
  ],
  treatments: [
    {
      productId: "201",
      name: "Kyren Moisture Nature Sweet Bouquet Treatment 500ml",
      slug: "sweet-bouquet-treatment-500ml",
      categoryId: "2",
      description: "A deep-repairing treatment for damaged hair.",
      price: 25.0,
      discount: null,
      images: ["/image/SweetBouquetShampooandTreatment.webp"],
      stock: 60,
      attributes: { size: "150ml", purpose: "Repair" },
      category: "treatments",
    },
    {
      productId: "202",
      name: "Kyren Moisture Nature Baby Rose Treatment 500ml",
      slug: "baby-rose-treatment-500ml",
      categoryId: "2",
      description: "A soothing treatment to nourish the scalp.",
      price: 30.0,
      discount: 5,
      images: ["/image/TreatmentBabyRose.webp"],
      stock: 50,
      attributes: { size: "100ml", purpose: "Scalp Care" },
      category: "treatments",
    },
    {
      productId: "203",
      name: "Kyren Moisture Nature Dear Lavender Treatment 500ml",
      slug: "dear-lavender-treatment-500ml",
      categoryId: "2",
      description: "A soothing treatment to nourish the scalp.",
      price: 30.0,
      discount: 5,
      images: ["/image/DearLavenderTreatmentandShampoo.webp"],
      stock: 50,
      attributes: { size: "100ml", purpose: "Scalp Care" },
      category: "treatments",
    },
    {
      productId: "204",
      name: "Kyren Moisture Nature Daily Pure Treatment 500ml",
      slug: "daily-pure-treatment-500ml",
      categoryId: "2",
      description: "A soothing treatment to nourish the scalp.",
      price: 30.0,
      discount: 5,
      images: ["/image/ShampooDailyPure.webp"],
      stock: 50,
      attributes: { size: "100ml", purpose: "Scalp Care" },
      category: "treatments",
    },
    {
      productId: "205",
      name: "Kyren Moisture Nature May Acacia Treatment 500ml",
      slug: "may-acacia-treatment-500ml",
      categoryId: "2",
      description: "A soothing treatment to nourish the scalp.",
      price: 30.0,
      discount: 5,
      images: ["/image/ShampooMayAcacia.webp"],
      stock: 50,
      attributes: { size: "100ml", purpose: "Scalp Care" },
      category: "treatments",
    },
    {
      productId: "206",
      name: "Kyren Moisture Nature Fall in Calendula Treatment 500ml",
      slug: "calendula-treatment-500ml",
      categoryId: "2",
      description: "A soothing treatment to nourish the scalp.",
      price: 30.0,
      discount: 5,
      images: ["/image/TreatmentFallinCalendula.webp"],
      stock: 50,
      attributes: { size: "100ml", purpose: "Scalp Care" },
      category: "treatments",
    },
  ],
  bodyWash: [
    {
      productId: "301",
      name: "Kyren Moisture Nature Sweet Bouquet Body Wash 500ml",
      slug: "sweet-bouquet-body-wash-500ml",
      categoryId: "3",
      description: "A refreshing body wash with a citrus scent.",
      price: 15.0,
      discount: null,
      images: ["/image/BodyWashSweetBouquet.webp"],
      stock: 120,
      attributes: { size: "500ml", fragrance: "Citrus" },
      category: "bodywash",
    },
    {
      productId: "302",
      name: "Kyren Moisture Nature Baby Rose Body Wash 500ml",
      slug: "baby-rose-body-wash-500ml",
      categoryId: "3",
      description: "A citrus-scented body wash to rejuvenate the skin.",
      price: 14.0,
      discount: null,
      images: ["/image/BabyRoseBodyWashandBodyLotion.webp"],
      stock: 100,
      attributes: { size: "400ml", fragrance: "Citrus" },
      category: "bodywash",
    },
    {
      productId: "303",
      name: "Kyren Moisture Nature Dear Lavender Body Wash 500ml",
      slug: "dear-lavender-body-wash-500ml",
      categoryId: "3",
      description: "A citrus-scented body wash to rejuvenate the skin.",
      price: 14.0,
      discount: null,
      images: ["/image/BodyWashDearLavender.webp"],
      stock: 100,
      attributes: { size: "400ml", fragrance: "Citrus" },
      category: "bodywash",
    },
    {
      productId: "304",
      name: "Kyren Moisture Nature Daily Pure Body Wash 500ml",
      slug: "daily-pure-body-wash-500ml",
      categoryId: "3",
      description: "A citrus-scented body wash to rejuvenate the skin.",
      price: 14.0,
      discount: null,
      images: ["/image/DAILYPURE.webp"],
      stock: 100,
      attributes: { size: "400ml", fragrance: "Citrus" },
      category: "bodywash",
    },
    {
      productId: "305",
      name: "Kyren Moisture Nature May Acacia Body Wash 500ml",
      slug: "may-acacia-body-wash-500ml",
      categoryId: "3",
      description: "A citrus-scented body wash to rejuvenate the skin.",
      price: 14.0,
      discount: null,
      images: ["/image/ShampooMayAcacia.webp"],
      stock: 100,
      attributes: { size: "400ml", fragrance: "Citrus" },
      category: "bodywash",
    },
    {
      productId: "306",
      name: "Kyren Moisture Nature Fall in Calendula Body Wash 500ml",
      slug: "calendula-body-wash-500ml",
      categoryId: "3",
      description: "A citrus-scented body wash to rejuvenate the skin.",
      price: 14.0,
      discount: null,
      images: ["/image/BodyWashFallinCalendula.webp"],
      stock: 100,
      attributes: { size: "400ml", fragrance: "Citrus" },
      category: "bodywash",
    },
  ],
  bodyLotions: [
    {
      productId: "401",
      name: "Kyren Moisture Nature Sweet Bouquet Body Lotion 500ml",
      slug: "sweet-bouquet-body-lotion-500ml",
      categoryId: "4",
      description: "A hydrating body lotion for all-day moisture.",
      price: 18.0,
      discount: null,
      images: ["/image/SWEETBOUQUET.webp"],
      stock: 90,
      attributes: { size: "300ml", fragrance: "Neutral" },
      category: "bodylotions",
    },
    {
      productId: "402",
      name: "Kyren Moisture Nature Baby Rose Body Lotion 500ml",
      slug: "baby-rose-body-lotion-500ml",
      categoryId: "4",
      description: "A hydrating body lotion for all-day moisture.",
      price: 18.0,
      discount: null,
      images: ["/image/BabyRoseBodyWashandBodyLotion.webp"],
      stock: 90,
      attributes: { size: "300ml", fragrance: "Neutral" },
      category: "bodylotions",
    },
    {
      productId: "403",
      name: "Kyren Moisture Nature Dear Lavender Body Lotion 500ml",
      slug: "dear-lavender-body-lotion-500ml",
      categoryId: "4",
      description: "A hydrating body lotion for all-day moisture.",
      price: 18.0,
      discount: null,
      images: ["/image/DEARLAVENDER.webp"],
      stock: 90,
      attributes: { size: "300ml", fragrance: "Neutral" },
      category: "bodylotions",
    },
    {
      productId: "404",
      name: "Kyren Moisture Nature Daily Pure Body Lotion 500ml",
      slug: "daily-pure-body-lotion-500ml",
      categoryId: "4",
      description: "A hydrating body lotion for all-day moisture.",
      price: 18.0,
      discount: null,
      images: ["/image/BodyLotionDailyPure.webp"],
      stock: 90,
      attributes: { size: "300ml", fragrance: "Neutral" },
      category: "bodylotions",
    },
    {
      productId: "405",
      name: "Kyren Moisture Nature May Acacia Body Lotion 500ml",
      slug: "may-acacia-body-lotion-500ml",
      categoryId: "4",
      description: "A hydrating body lotion for all-day moisture.",
      price: 18.0,
      discount: null,
      images: ["/image/MayAcaciaBodyLotion.webp"],
      stock: 90,
      attributes: { size: "300ml", fragrance: "Neutral" },
      category: "bodylotions",
    },
    {
      productId: "406",
      name: "Kyren Moisture Nature Fall in Calendula Body Lotion 500ml",
      slug: "calendula-body-lotion-500ml",
      categoryId: "4",
      description: "A hydrating body lotion for all-day moisture.",
      price: 18.0,
      discount: null,
      images: ["/image/FallinCalendulaBodyLotion.webp"],
      stock: 90,
      attributes: { size: "300ml", fragrance: "Neutral" },
      category: "bodylotions",
    },
  ],
  handWash: [
    {
      productId: "501",
      name: "Kyren Moisture Nature Sweet Bouquet Hand Wash 500ml",
      slug: "sweet-bouquet-hand-wash-500ml",
      categoryId: "5",
      description: "An antibacterial hand wash for hygiene and care.",
      price: 12.0,
      discount: null,
      images: ["/image/SWEETBOUQUET.webp"],
      stock: 110,
      attributes: { size: "250ml", purpose: "Antibacterial" },
      category: "handwash",
    },
    {
      productId: "502",
      name: "Kyren Moisture Nature Baby Rose Hand Wash 500ml",
      slug: "baby-rose-hand-wash-500ml",
      categoryId: "5",
      description: "An antibacterial hand wash for hygiene and care.",
      price: 12.0,
      discount: null,
      images: ["/image/BABYROSE.webp"],
      stock: 110,
      attributes: { size: "250ml", purpose: "Antibacterial" },
      category: "handwash",
    },
    {
      productId: "503",
      name: "Kyren Moisture Nature May Acacia Hand Wash 500ml",
      slug: "may-acacia-hand-wash-500ml",
      categoryId: "5",
      description: "An antibacterial hand wash for hygiene and care.",
      price: 12.0,
      discount: null,
      images: ["/image/shampoo.jpg"],
      stock: 110,
      attributes: { size: "250ml", purpose: "Antibacterial" },
      category: "handwash",
    },
  ],
};

export default productData;
