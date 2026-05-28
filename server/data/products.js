// product.js

const products = [
  {
    name: "Nordic Walnut Dining Chair",
    description:
      "Elevate your dining space with this minimalist masterpiece. Meticulously sculpted from premium solid American Walnut, it features an ergonomic contoured backrest and a high-density foam seat upholstered in a stain-resistant linen blend. Perfect for both contemporary home dining and refined corporate conference rooms, it delivers an unparalleled balance of form and long-lasting durability.",
    price: 249.99,
    discountPrice: 219.99,
    countInStock: 20,
    sku: "NEST-CH-001",
    category: "Dining Room",
    brand: "Nordic Minimalist",
    sizes: ["Standard Height", "Counter Height", "Bar Height"], // Maps to your frontend layout components
    colors: ["Natural Walnut", "Charcoal Fabric", "Bleached Ash"],
    collections: "Artisan Series",
    material: "Solid Walnut & Linen",
    gender: "Living", // Preserved key structure to maintain database schema safety
    images: [
      {
        url: "https://picsum.photos/500/500?random=39",
        altText: "Nordic Walnut Dining Chair Front Profile View",
      },
      {
        url: "https://picsum.photos/500/500?random=40",
        altText: "Nordic Walnut Dining Chair Ergonomic Back View",
      },
    ],
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "MCM Tufted Velvet Lounge Sofa",
    description:
      "A stunning mid-century modern showpiece designed to act as the structural focal point of your living space. Handcrafted with a kiln-dried hardwood interior framework, this luxury couch features premium channel-tufted velvet upholstery, clean track armrests, and tapered solid oak legs with protective floor pads.",
    price: 1299.99,
    discountPrice: 1149.99,
    countInStock: 8,
    sku: "NEST-SF-002",
    category: "Living Room",
    brand: "Heritage Craft",
    sizes: ["2-Seater Loveseat", "3-Seater Classic", "L-Shape Sectional"],
    colors: ["Emerald Green", "Royal Navy", "Smokey Quartz Velvet"],
    collections: "Mid-Century Icons",
    material: "Hardwood & Velvet",
    gender: "Living",
    images: [
      {
        url: "https://picsum.photos/500/500?random=41",
        altText: "MCM Tufted Velvet Lounge Sofa Front Profile View",
      },
      {
        url: "https://picsum.photos/500/500?random=42",
        altText: "MCM Tufted Velvet Lounge Sofa Angled Corner View",
      },
    ],
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: "Industrial Oak & Iron Coffee Table",
    description:
      "Constructed from 100% natural sustainably-sourced solid oak planks, this rustic industrial coffee table displays striking grain variations and natural knots. Set upon a heavy-duty, powder-coated raw steel geometric base, it provides dual-tier structural open storage shelves ideal for living books and curation trays.",
    price: 449.99,
    discountPrice: 399.99,
    countInStock: 15,
    sku: "NEST-TB-003",
    category: "Living Room",
    brand: "Ironwood Forge",
    sizes: ["Standard Rectangular", "Square Compact", "Grand Scale XL"],
    colors: ["Rustic Golden Oak", "Weathered Charcoal Oak"],
    collections: "Loft Elements",
    material: "Solid Oak & Steel",
    gender: "Living",
    images: [
      {
        url: "https://picsum.photos/500/500?random=43",
        altText: "Industrial Oak & Iron Coffee Table Top Angle View",
      },
      {
        url: "https://picsum.photos/500/500?random=44",
        altText: "Industrial Oak & Iron Coffee Table Storage Shelf Detail View",
      },
    ],
    rating: 4.6,
    numReviews: 8,
  },
  {
    name: "Travertine Stone Pedestal Side Table",
    description:
      "Carved with sculptural precision from a single monolithic block of premium Italian Travertine marble, this side table brings organic architectural lines indoors. Features a naturally pitted, honed matte texture surface that styles beautifully alongside accent armchairs or bedside setups.",
    price: 340.00,
    discountPrice: 299.99,
    countInStock: 25,
    sku: "NEST-ST-004",
    category: "Living Room",
    brand: "Earthy Textures",
    sizes: ["Classic Low Profile", "Tall Accent Column"],
    colors: ["Ivory Cream Travertine", "Noce Warm Beige"],
    collections: "Sculptural Forms",
    material: "Natural Marble Travertine",
    gender: "Living",
    images: [
      {
        url: "https://picsum.photos/500/500?random=45",
        altText: "Travertine Stone Pedestal Side Table Texture Close-Up",
      },
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Travertine Stone Pedestal Side Table Living Room Setup",
      },
    ],
    rating: 4.4,
    numReviews: 10,
  },
  {
    name: "Linear Oak 6-Drawer Dresser",
    description:
      "A beautiful bedroom storage solution presenting clean lines and integrated cut-out pull handles. Six wide drawersglide effortlessly on soft-close premium German under-mount tracks, offering immense storage capacity for linens and personal essentials. Protected with a clear matte water-resistant polyurethane protective finish.",
    price: 899.99,
    discountPrice: 799.99,
    countInStock: 12,
    sku: "NEST-DR-005",
    category: "Bedroom",
    brand: "Nordic Minimalist",
    sizes: ["Standard 6-Drawer", "Wide 8-Drawer Luxury"],
    colors: ["Natural Light Oak", "Smoked Charcoal Oak"],
    collections: "Serene Spaces",
    material: "Solid Oak & Veneer",
    gender: "Sleeping",
    images: [
      {
        url: "https://picsum.photos/500/500?random=47",
        altText: "Linear Oak 6-Drawer Dresser Front Profile View",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Linear Oak 6-Drawer Dresser Soft-Close Slider Detail",
      },
    ],
    rating: 5.0,
    numReviews: 14,
  },
  {
    name: "Bouclé Rounded Accent Armchair",
    description:
      "Immerse yourself in organic cozy comfort with this iconic rounded cocoon chair. Fully wrapped in a premium, ultra-tactile loop bouclé textile weave, its deep-cushioned seat shell rests perfectly balanced on an internal 360-degree hidden swivel metal plate mechanism.",
    price: 549.99,
    discountPrice: 479.99,
    countInStock: 30,
    sku: "NEST-AR-006",
    category: "Living Room",
    brand: "Earthy Textures",
    sizes: ["Standard Lounge", "Oversized Lounge XL"],
    colors: ["Off-White Bouclé", "Oatmeal Melange Bouclé", "Sage Bouclé"],
    collections: "Organic Curves",
    material: "Bouclé Textile & Metal Swivel",
    gender: "Living",
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Bouclé Rounded Accent Armchair Side Swivel Profile View",
      },
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Bouclé Rounded Accent Armchair Upholstery Detail View",
      },
    ],
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: "Architectural Fluted TV Console",
    description:
      "A clean-lined media credenza showcasing a spectacular tactile fluted oak wood sliding front face. Designed to elegant proportions, it contains internal wire-management routing cutouts, adjustable component glass shelving, and magnetic touch latches.",
    price: 799.99,
    discountPrice: 699.99,
    countInStock: 18,
    sku: "NEST-CN-007",
    category: "Living Room",
    brand: "Nordic Minimalist",
    sizes: ["60-inch Medium Media", "72-inch Large Media"],
    colors: ["Natural Honey Oak", "Matte Ebony Black"],
    collections: "Artisan Series",
    material: "Oak Wood & Veneer",
    gender: "Living",
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Architectural Fluted TV Console Sliding Panel Presentation",
      },
    ],
    rating: 4.6,
    numReviews: 30,
  },
  {
    name: "Woven Cane Bedside Nightstand",
    description:
      "Infuse raw textural balance into your bedroom spaces. This nightstand pairs solid ash wood outer profiling with a meticulously hand-woven natural rattan webbed drawer fascia panel, complete with lower open display book shelving.",
    price: 199.99,
    discountPrice: 179.99,
    countInStock: 35,
    sku: "NEST-NS-008",
    category: "Bedroom",
    brand: "Ironwood Forge",
    sizes: ["Single Unit Nightstand", "Set of 2 Bedside Matching Pairs"],
    colors: ["Natural Ash Wood", "Espresso Dark Ash"],
    collections: "Serene Spaces",
    material: "Ash Wood & Natural Rattan Cane",
    gender: "Sleeping",
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Woven Cane Bedside Nightstand Front Elevation Detail",
      },
    ],
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Solid Ash Inlay Writing Desk",
    description:
      "The ultimate ergonomic companion for architectural home offices. Crafted with premium solid ash construction, it highlights an elegant hand-stitched matte leather writing surface insert inlay, dual storage pen drawers, and hidden cable drop ports.",
    price: 649.99,
    discountPrice: 580.00,
    countInStock: 20,
    sku: "NEST-DK-009",
    category: "Office",
    brand: "Ironwood Forge",
    sizes: ["Compact 48-inch Desk", "Executive 60-inch Desk"],
    colors: ["Warm Ash & Black Leather", "Ebony Ash & Charcoal Leather"],
    collections: "Loft Elements",
    material: "Ash Wood & Top Grain Leather",
    gender: "Working",
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Solid Ash Inlay Writing Desk Home Office Setup Profile",
      },
    ],
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "Sleek Arch Metal Floor Mirror",
    description:
      "Expand visual space across your corridors with this striking minimal floor-leaning statement mirror. Constructed with a seamless shatter-proof HD glass membrane framed inside a heavy-gauge, oil-rubbed industrial metal archway wrapper.",
    price: 299.99,
    discountPrice: 249.99,
    countInStock: 40,
    sku: "NEST-MR-010",
    category: "Decor",
    brand: "Earthy Textures",
    sizes: ["Full Length Leaner", "Grand Scale Arch Wall Mount"],
    colors: ["Matte Powder Black", "Brushed Champagne Gold"],
    collections: "Organic Curves",
    material: "Aluminium Frame & HD Glass",
    gender: "Decorating",
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "Sleek Arch Metal Floor Mirror Reflective Spatial View",
      },
    ],
    rating: 4.7,
    numReviews: 28,
  }
];

module.exports = products;