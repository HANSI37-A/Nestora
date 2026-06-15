// products.js — Nestora Luxury Furniture — 30 Products

const products = [
  {
    name: "Nordic Walnut Dining Chair",
    description: "Elevate your dining space with this minimalist masterpiece. Meticulously sculpted from premium solid American Walnut, it features an ergonomic contoured backrest and a high-density foam seat upholstered in a stain-resistant linen blend. Perfect for both contemporary home dining and refined corporate conference rooms, it delivers an unparalleled balance of form and long-lasting durability.",
    price: 249.99, discountPrice: 219.99, countInStock: 20, sku: "NEST-CH-001",
    category: "Dining Room", brand: "Nordic Minimalist",
    sizes: ["Standard Height", "Counter Height", "Bar Height"],
    colors: ["Natural Walnut", "Charcoal Fabric", "Bleached Ash"],
    collections: "Artisan Series", material: "Solid Walnut & Linen", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500&q=80", altText: "Nordic Walnut Dining Chair Front Profile" },
      { url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80", altText: "Nordic Walnut Dining Chair Side View" },
    ],
    rating: 4.5, numReviews: 12, isFeatured: true,
  },

  {
    name: "Extendable Marble Dining Table",
    description: "Command your dining room with this architectural centrepiece. A genuine Carrara marble top with a precision-honed matte finish sits atop a hand-welded brushed stainless steel base. The hidden butterfly extension leaf mechanism expands the table from 180cm to 260cm, accommodating intimate dinners and grand gatherings alike.",
    price: 2499.99, discountPrice: 2199.99, countInStock: 6, sku: "NEST-DT-011",
    category: "Dining Room", brand: "Heritage Craft",
    sizes: ["180cm Compact", "220cm Standard", "260cm Extended"],
    colors: ["Carrara White", "Nero Marquina Black"],
    collections: "Sculptural Forms", material: "Carrara Marble & Stainless Steel", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=500&q=80", altText: "Extendable Marble Dining Table Top View" },
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", altText: "Extendable Marble Dining Table Room Setting" },
    ],
    rating: 4.9, numReviews: 7, isFeatured: true,
  },

  {
    name: "Rattan Wishbone Dining Chair",
    description: "Inspired by Hans Wegner's iconic design language, this handcrafted wishbone chair features a steam-bent solid beech wood frame with a hand-woven natural rattan seat. Lightweight yet remarkably strong, it stacks easily and complements both rustic farmhouse and modern Japandi dining rooms.",
    price: 189.99, discountPrice: 159.99, countInStock: 40, sku: "NEST-CH-012",
    category: "Dining Room", brand: "Earthy Textures",
    sizes: ["Standard Height"],
    colors: ["Natural Beech", "Smoked Oak", "Black Lacquer"],
    collections: "Organic Curves", material: "Solid Beech & Natural Rattan", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80", altText: "Rattan Wishbone Dining Chair Side Profile" },
      { url: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&q=80", altText: "Rattan Wishbone Dining Chair Set of Four" },
    ],
    rating: 4.6, numReviews: 19, isFeatured: false,
  },

  {
    name: "Solid Oak Farmhouse Dining Table",
    description: "Crafted from kiln-dried solid European oak with a live-edge inspired breadboard end construction, this farmhouse dining table brings warmth and permanence to your home. The protective oil finish enhances the natural grain while remaining food-safe and easy to maintain for generations.",
    price: 1599.99, discountPrice: 1399.99, countInStock: 10, sku: "NEST-DT-013",
    category: "Dining Room", brand: "Ironwood Forge",
    sizes: ["160cm 6-Seater", "200cm 8-Seater", "240cm 10-Seater"],
    colors: ["Natural Oak", "Whitewash Oak", "Dark Walnut Stain"],
    collections: "Loft Elements", material: "Solid European Oak", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80", altText: "Solid Oak Farmhouse Dining Table Top Grain View" },
      { url: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=500&q=80", altText: "Solid Oak Farmhouse Dining Table Full Room" },
    ],
    rating: 4.7, numReviews: 11, isFeatured: false,
  },

  {
    name: "Upholstered Velvet Dining Chair",
    description: "Add a touch of opulence to your dining ritual with this fully upholstered statement chair. The deep button-tufted backrest and generously padded seat are wrapped in performance velvet rated for 100,000 double rubs, mounted on solid brass-tipped tapered oak legs.",
    price: 319.99, discountPrice: 279.99, countInStock: 24, sku: "NEST-CH-014",
    category: "Dining Room", brand: "Heritage Craft",
    sizes: ["Standard Height", "Counter Height"],
    colors: ["Dusty Rose Velvet", "Forest Green Velvet", "Midnight Navy Velvet", "Champagne Velvet"],
    collections: "Mid-Century Icons", material: "Performance Velvet & Solid Oak", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80", altText: "Upholstered Velvet Dining Chair Front View" },
      { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80", altText: "Upholstered Velvet Dining Chair Detail" },
    ],
    rating: 4.4, numReviews: 16, isFeatured: false,
  },

  {
    name: "Minimal Steel & Glass Dining Table",
    description: "For the modernist who believes furniture should disappear into space. This ultra-minimal dining table features a 12mm tempered clear glass top suspended on a powder-coated geometric flat-bar steel base, creating an airy, weightless aesthetic in any contemporary dining room.",
    price: 899.99, discountPrice: 799.99, countInStock: 14, sku: "NEST-DT-015",
    category: "Dining Room", brand: "Nordic Minimalist",
    sizes: ["140cm 4-Seater", "180cm 6-Seater"],
    colors: ["Matte Black Steel", "Brushed Brass Steel"],
    collections: "Loft Elements", material: "Tempered Glass & Powder-Coated Steel", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500&q=80", altText: "Minimal Steel Glass Dining Table Angle" },
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80", altText: "Minimal Steel Glass Dining Table Setting" },
    ],
    rating: 4.3, numReviews: 9, isFeatured: false,
  },
  {
    name: "MCM Tufted Velvet Lounge Sofa",
    description: "A stunning mid-century modern showpiece designed to act as the structural focal point of your living space. Handcrafted with a kiln-dried hardwood interior framework, this luxury couch features premium channel-tufted velvet upholstery, clean track armrests, and tapered solid oak legs with protective floor pads.",
    price: 1299.99, discountPrice: 1149.99, countInStock: 8, sku: "NEST-SF-002",
    category: "Living Room", brand: "Heritage Craft",
    sizes: ["2-Seater Loveseat", "3-Seater Classic", "L-Shape Sectional"],
    colors: ["Emerald Green", "Royal Navy", "Smokey Quartz Velvet"],
    collections: "Mid-Century Icons", material: "Hardwood & Velvet", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", altText: "MCM Tufted Velvet Lounge Sofa Front" },
      { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80", altText: "MCM Tufted Velvet Lounge Sofa Angle" },
    ],
    rating: 4.8, numReviews: 15, isFeatured: true,
  },

  {
    name: "Industrial Oak & Iron Coffee Table",
    description: "Constructed from 100% natural sustainably-sourced solid oak planks, this rustic industrial coffee table displays striking grain variations and natural knots. Set upon a heavy-duty powder-coated raw steel geometric base, it provides dual-tier structural open storage shelves ideal for books and curation trays.",
    price: 449.99, discountPrice: 399.99, countInStock: 15, sku: "NEST-TB-003",
    category: "Living Room", brand: "Ironwood Forge",
    sizes: ["Standard Rectangular", "Square Compact", "Grand Scale XL"],
    colors: ["Rustic Golden Oak", "Weathered Charcoal Oak"],
    collections: "Loft Elements", material: "Solid Oak & Steel", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=500&q=80", altText: "Industrial Oak Iron Coffee Table Top" },
      { url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&q=80", altText: "Industrial Oak Iron Coffee Table Storage" },
    ],
    rating: 4.6, numReviews: 8, isFeatured: false,
  },

  {
    name: "Travertine Stone Pedestal Side Table",
    description: "Carved with sculptural precision from a single monolithic block of premium Italian Travertine marble, this side table brings organic architectural lines indoors. Features a naturally pitted, honed matte texture surface that styles beautifully alongside accent armchairs or bedside setups.",
    price: 340.00, discountPrice: 299.99, countInStock: 25, sku: "NEST-ST-004",
    category: "Living Room", brand: "Earthy Textures",
    sizes: ["Classic Low Profile", "Tall Accent Column"],
    colors: ["Ivory Cream Travertine", "Noce Warm Beige"],
    collections: "Sculptural Forms", material: "Natural Marble Travertine", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80", altText: "Travertine Stone Pedestal Side Table Texture" },
      { url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80", altText: "Travertine Stone Pedestal Side Table Setting" },
    ],
    rating: 4.4, numReviews: 10, isFeatured: false,
  },

  {
    name: "Bouclé Rounded Accent Armchair",
    description: "Immerse yourself in organic cozy comfort with this iconic rounded cocoon chair. Fully wrapped in a premium ultra-tactile loop bouclé textile weave, its deep-cushioned seat shell rests perfectly balanced on an internal 360-degree hidden swivel metal plate mechanism.",
    price: 549.99, discountPrice: 479.99, countInStock: 30, sku: "NEST-AR-006",
    category: "Living Room", brand: "Earthy Textures",
    sizes: ["Standard Lounge", "Oversized Lounge XL"],
    colors: ["Off-White Bouclé", "Oatmeal Melange Bouclé", "Sage Bouclé"],
    collections: "Organic Curves", material: "Bouclé Textile & Metal Swivel", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80", altText: "Bouclé Rounded Accent Armchair Swivel Profile" },
      { url: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500&q=80", altText: "Bouclé Rounded Accent Armchair Detail" },
    ],
    rating: 4.3, numReviews: 22, isFeatured: true,
  },

  {
    name: "Architectural Fluted TV Console",
    description: "A clean-lined media credenza showcasing a spectacular tactile fluted oak wood sliding front face. Designed to elegant proportions, it contains internal wire-management routing cutouts, adjustable component glass shelving, and magnetic touch latches.",
    price: 799.99, discountPrice: 699.99, countInStock: 18, sku: "NEST-CN-007",
    category: "Living Room", brand: "Nordic Minimalist",
    sizes: ["60-inch Medium Media", "72-inch Large Media"],
    colors: ["Natural Honey Oak", "Matte Ebony Black"],
    collections: "Artisan Series", material: "Oak Wood & Veneer", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=500&q=80", altText: "Architectural Fluted TV Console Sliding Panel" },
      { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80", altText: "Architectural Fluted TV Console Interior" },
    ],
    rating: 4.6, numReviews: 30, isFeatured: false,
  },

  {
    name: "Sleek Arch Metal Floor Mirror",
    description: "Expand visual space across your corridors with this striking minimal floor-leaning statement mirror. Constructed with a seamless shatter-proof HD glass membrane framed inside a heavy-gauge oil-rubbed industrial metal archway wrapper.",
    price: 299.99, discountPrice: 249.99, countInStock: 40, sku: "NEST-MR-010",
    category: "Living Room", brand: "Earthy Textures",
    sizes: ["Full Length Leaner", "Grand Scale Arch Wall Mount"],
    colors: ["Matte Powder Black", "Brushed Champagne Gold"],
    collections: "Organic Curves", material: "Aluminium Frame & HD Glass", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80", altText: "Sleek Arch Metal Floor Mirror Reflective View" },
      { url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80", altText: "Sleek Arch Metal Floor Mirror Room Context" },
    ],
    rating: 4.7, numReviews: 28, isFeatured: false,
  },

  {
    name: "Low Profile Modular Sectional Sofa",
    description: "Redefine your living room layout with complete freedom. This modular sectional system allows you to configure chaise, corner, and ottoman modules in any arrangement. Each module features individually pocket-sprung seating, down-blend cushion fills, and a tight-back upholstered construction in performance linen.",
    price: 3299.99, discountPrice: 2899.99, countInStock: 5, sku: "NEST-SF-016",
    category: "Living Room", brand: "Heritage Craft",
    sizes: ["3-Module Starter", "5-Module Standard", "7-Module Grand"],
    colors: ["Natural Linen", "Warm Sand", "Slate Grey", "Terracotta"],
    collections: "Organic Curves", material: "Kiln-Dried Hardwood & Performance Linen", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&q=80", altText: "Low Profile Modular Sectional Sofa Configuration" },
      { url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", altText: "Low Profile Modular Sectional Sofa Corner Detail" },
    ],
    rating: 4.9, numReviews: 6, isFeatured: true,
  },

  {
    name: "Japandi Wooden Bookshelf",
    description: "A refined open shelving system that bridges Japanese minimalism and Scandinavian functionality. Constructed from solid oak with a natural oil finish, its asymmetric shelf heights accommodate books, ceramics, and sculptural objects. Includes hidden wall-anchor hardware for safety.",
    price: 649.99, discountPrice: 579.99, countInStock: 22, sku: "NEST-BS-017",
    category: "Living Room", brand: "Nordic Minimalist",
    sizes: ["3-Shelf Compact", "5-Shelf Standard", "7-Shelf Tall"],
    colors: ["Natural Oak", "Bleached White Oak", "Smoked Dark Oak"],
    collections: "Artisan Series", material: "Solid Oak", gender: "Living",
    images: [
      { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80", altText: "Japandi Wooden Bookshelf Styled View" },
      { url: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=500&q=80", altText: "Japandi Wooden Bookshelf Detail Close-Up" },
    ],
    rating: 4.5, numReviews: 17, isFeatured: false,
  },

  {
    name: "Linear Oak 6-Drawer Dresser",
    description: "A beautiful bedroom storage solution presenting clean lines and integrated cut-out pull handles. Six wide drawers glide effortlessly on soft-close premium German under-mount tracks, offering immense storage capacity for linens and personal essentials. Protected with a clear matte water-resistant polyurethane finish.",
    price: 899.99, discountPrice: 799.99, countInStock: 12, sku: "NEST-DR-005",
    category: "Bedroom", brand: "Nordic Minimalist",
    sizes: ["Standard 6-Drawer", "Wide 8-Drawer Luxury"],
    colors: ["Natural Light Oak", "Smoked Charcoal Oak"],
    collections: "Serene Spaces", material: "Solid Oak & Veneer", gender: "Sleeping",
    images: [
      { url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80", altText: "Linear Oak 6-Drawer Dresser Front Profile" },
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80", altText: "Linear Oak 6-Drawer Dresser Drawer Detail" },
    ],
    rating: 5.0, numReviews: 14, isFeatured: true,
  },

  {
    name: "Woven Cane Bedside Nightstand",
    description: "Infuse raw textural balance into your bedroom spaces. This nightstand pairs solid ash wood outer profiling with a meticulously hand-woven natural rattan webbed drawer fascia panel, complete with lower open display book shelving.",
    price: 199.99, discountPrice: 179.99, countInStock: 35, sku: "NEST-NS-008",
    category: "Bedroom", brand: "Ironwood Forge",
    sizes: ["Single Unit Nightstand", "Set of 2 Bedside Matching Pairs"],
    colors: ["Natural Ash Wood", "Espresso Dark Ash"],
    collections: "Serene Spaces", material: "Ash Wood & Natural Rattan Cane", gender: "Sleeping",
    images: [
      { url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80", altText: "Woven Cane Bedside Nightstand Front Elevation" },
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80", altText: "Woven Cane Bedside Nightstand Drawer Detail" },
    ],
    rating: 4.5, numReviews: 25, isFeatured: false,
  },

  {
    name: "Upholstered Platform Bed Frame",
    description: "Sleep in architectural luxury with this low-profile platform bed. The solid poplar wood slat base requires no box spring and provides exceptional mattress support. The headboard is generously padded with high-resilience foam and upholstered in premium performance fabric with deep channel-tufting.",
    price: 1499.99, discountPrice: 1299.99, countInStock: 9, sku: "NEST-BD-018",
    category: "Bedroom", brand: "Heritage Craft",
    sizes: ["Queen 160x200cm", "King 180x200cm", "Super King 200x200cm"],
    colors: ["Warm Oatmeal Linen", "Charcoal Fabric", "Dove Grey Velvet", "Blush Pink Velvet"],
    collections: "Serene Spaces", material: "Solid Poplar & Performance Fabric", gender: "Sleeping",
    images: [
      { url: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80", altText: "Upholstered Platform Bed Frame Full View" },
      { url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=500&q=80", altText: "Upholstered Platform Bed Frame Headboard Detail" },
    ],
    rating: 4.8, numReviews: 11, isFeatured: true,
  },

  {
    name: "Minimal Wardrobe with Sliding Doors",
    description: "A floor-to-ceiling sliding door wardrobe engineered for modern bedrooms. Features full-length mirrored panels on alternating doors, interior adjustable shelf systems, double hanging rails, and a hidden drawer unit. The aluminium sliding track system operates in near silence.",
    price: 2199.99, discountPrice: 1899.99, countInStock: 7, sku: "NEST-WR-019",
    category: "Bedroom", brand: "Nordic Minimalist",
    sizes: ["150cm 2-Door", "200cm 3-Door", "250cm 4-Door"],
    colors: ["Matte White", "Warm Oak Veneer", "Anthracite Grey"],
    collections: "Serene Spaces", material: "MDF, Oak Veneer & Aluminium", gender: "Sleeping",
    images: [
      { url: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=500&q=80", altText: "Minimal Wardrobe Sliding Doors Open View" },
      { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80", altText: "Minimal Wardrobe Interior Organisation" },
    ],
    rating: 4.6, numReviews: 8, isFeatured: false,
  },

  {
    name: "Sculptural Rattan Bed Headboard",
    description: "Transform your bedroom with this freestanding architectural headboard. Hand-woven by skilled artisans using natural Ata rattan over a powder-coated steel frame, it creates a dramatic bohemian focal point. Fits any standard bed frame via included universal clamp brackets.",
    price: 449.99, discountPrice: 389.99, countInStock: 20, sku: "NEST-HB-020",
    category: "Bedroom", brand: "Earthy Textures",
    sizes: ["Queen 160cm Width", "King 180cm Width", "Super King 200cm Width"],
    colors: ["Natural Rattan", "Whitewash Rattan", "Black Lacquer Rattan"],
    collections: "Organic Curves", material: "Natural Ata Rattan & Steel", gender: "Sleeping",
    images: [
      { url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80", altText: "Sculptural Rattan Bed Headboard Full View" },
      { url: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=500&q=80", altText: "Sculptural Rattan Bed Headboard Weave Detail" },
    ],
    rating: 4.4, numReviews: 13, isFeatured: false,
  },

  {
    name: "Ottoman Storage Bench",
    description: "A versatile bedroom essential that serves as seating, storage, and sculptural accent. The hinged lid reveals a spacious cedar-lined interior compartment ideal for extra bedding. Upholstered in a durable performance bouclé, it sits on solid brass-capped tapered legs.",
    price: 379.99, discountPrice: 329.99, countInStock: 28, sku: "NEST-OT-021",
    category: "Bedroom", brand: "Heritage Craft",
    sizes: ["Small 90cm", "Medium 120cm", "Large 150cm"],
    colors: ["Cream Bouclé", "Camel Bouclé", "Charcoal Bouclé"],
    collections: "Mid-Century Icons", material: "Cedar, Bouclé & Solid Brass", gender: "Sleeping",
    images: [
      { url: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&q=80", altText: "Ottoman Storage Bench Bedroom Foot-of-Bed" },
      { url: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&q=80", altText: "Ottoman Storage Bench Open Storage View" },
    ],
    rating: 4.7, numReviews: 20, isFeatured: false,
  },

  {
    name: "Solid Ash Inlay Writing Desk",
    description: "The ultimate ergonomic companion for architectural home offices. Crafted with premium solid ash construction, it highlights an elegant hand-stitched matte leather writing surface insert inlay, dual storage pen drawers, and hidden cable drop ports.",
    price: 649.99, discountPrice: 580.00, countInStock: 20, sku: "NEST-DK-009",
    category: "Office", brand: "Ironwood Forge",
    sizes: ["Compact 48-inch Desk", "Executive 60-inch Desk"],
    colors: ["Warm Ash & Black Leather", "Ebony Ash & Charcoal Leather"],
    collections: "Loft Elements", material: "Ash Wood & Top Grain Leather", gender: "Working",
    images: [
      { url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80", altText: "Solid Ash Inlay Writing Desk Home Office" },
      { url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80", altText: "Solid Ash Inlay Writing Desk Leather Detail" },
    ],
    rating: 4.4, numReviews: 18, isFeatured: false,
  },

  {
    name: "Ergonomic Walnut Task Chair",
    description: "Where premium craftsmanship meets ergonomic science. This task chair features a solid walnut shell back with precision CNC-carved lumbar cutout, a fully adjustable pneumatic height mechanism, 360-degree swivel base in polished aluminium, and a seat cushion with memory foam layering.",
    price: 799.99, discountPrice: 699.99, countInStock: 15, sku: "NEST-TC-022",
    category: "Office", brand: "Nordic Minimalist",
    sizes: ["Standard"],
    colors: ["Natural Walnut & Black", "Natural Walnut & Cognac Leather"],
    collections: "Artisan Series", material: "Solid Walnut & Polished Aluminium", gender: "Working",
    images: [
      { url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80", altText: "Ergonomic Walnut Task Chair Profile View" },
      { url: "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?w=500&q=80", altText: "Ergonomic Walnut Task Chair Seat Detail" },
    ],
    rating: 4.8, numReviews: 24, isFeatured: true,
  },

  {
    name: "Floating Wall Desk System",
    description: "Maximise your workspace with zero floor footprint. This wall-mounted floating desk system includes a deep work surface, integrated open shelving column, and a hidden cable spine. Engineered aluminium wall brackets support up to 80kg and are compatible with any wall type.",
    price: 549.99, discountPrice: 479.99, countInStock: 18, sku: "NEST-DK-023",
    category: "Office", brand: "Nordic Minimalist",
    sizes: ["100cm Single", "140cm Extended", "180cm Dual"],
    colors: ["White & Chrome", "Oak & Black", "Walnut & Brass"],
    collections: "Loft Elements", material: "MDF, Oak Veneer & Aluminium", gender: "Working",
    images: [
      { url: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=500&q=80", altText: "Floating Wall Desk System Installed View" },
      { url: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&q=80", altText: "Floating Wall Desk System Storage Detail" },
    ],
    rating: 4.5, numReviews: 14, isFeatured: false,
  },

  {
    name: "Executive Leather Office Chair",
    description: "Command your workspace in uncompromising comfort. Full-grain aniline Italian leather wraps every surface of this executive chair, from the generous lumbar-supported backrest to the padded armrests. A die-cast aluminium five-star base with smooth-rolling casters completes this statement piece.",
    price: 1199.99, discountPrice: 999.99, countInStock: 10, sku: "NEST-EC-024",
    category: "Office", brand: "Heritage Craft",
    sizes: ["Standard Executive"],
    colors: ["Cognac Tan Leather", "Jet Black Leather", "Chocolate Brown Leather"],
    collections: "Mid-Century Icons", material: "Full-Grain Italian Leather & Aluminium", gender: "Working",
    images: [
      { url: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=500&q=80", altText: "Executive Leather Office Chair Full Profile" },
      { url: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80", altText: "Executive Leather Office Chair Armrest Detail" },
    ],
    rating: 4.9, numReviews: 9, isFeatured: true,
  },


  {
    name: "Hand-Thrown Ceramic Table Lamp",
    description: "Each piece unique by nature. These table lamps are individually hand-thrown by ceramicists using stoneware clay, resulting in subtle variations in form that make every lamp a one-of-a-kind object. The linen drum shade softens the warm Edison bulb glow into a perfect ambient reading light.",
    price: 189.99, discountPrice: 159.99, countInStock: 50, sku: "NEST-LP-025",
    category: "Decor", brand: "Earthy Textures",
    sizes: ["Small 35cm Height", "Large 50cm Height"],
    colors: ["Speckled Cream Glaze", "Matte Terracotta", "Sage Green Glaze", "Midnight Blue Glaze"],
    collections: "Sculptural Forms", material: "Stoneware Ceramic & Linen", gender: "Decorating",
    images: [
      { url: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&q=80", altText: "Hand-Thrown Ceramic Table Lamp Glaze Detail" },
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80", altText: "Hand-Thrown Ceramic Table Lamp Room Setting" },
    ],
    rating: 4.6, numReviews: 32, isFeatured: false,
  },

  {
    name: "Abstract Resin Wall Art Panel",
    description: "Commission-quality wall art made accessible. Each panel is individually cast and hand-poured using pigmented epoxy resin, creating depth and movement reminiscent of geological strata and ocean formations. Arrives ready to hang with concealed French cleat wall mounting.",
    price: 349.99, discountPrice: 299.99, countInStock: 20, sku: "NEST-WA-026",
    category: "Decor", brand: "Earthy Textures",
    sizes: ["60x60cm Square", "80x120cm Portrait", "120x80cm Landscape"],
    colors: ["Ocean Teal & Gold", "Desert Sand & Rust", "Marble White & Charcoal"],
    collections: "Sculptural Forms", material: "Pigmented Epoxy Resin", gender: "Decorating",
    images: [
      { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80", altText: "Abstract Resin Wall Art Panel Detail" },
      { url: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&q=80", altText: "Abstract Resin Wall Art Panel Installed" },
    ],
    rating: 4.5, numReviews: 15, isFeatured: false,
  },

  {
    name: "Wabi-Sabi Linen Throw Blanket",
    description: "Drape your sofa or armchair in understated luxury. Woven from 100% stonewashed European linen, this generously proportioned throw develops a beautifully soft, lived-in texture with every wash. The raw hemstitch border and natural palette complement any interior palette.",
    price: 129.99, discountPrice: 109.99, countInStock: 80, sku: "NEST-TH-027",
    category: "Decor", brand: "Earthy Textures",
    sizes: ["130x170cm Standard", "170x220cm Generous"],
    colors: ["Natural Undyed", "Warm Oatmeal", "Dusty Rose", "Sage Green", "Slate Blue"],
    collections: "Organic Curves", material: "100% Stonewashed European Linen", gender: "Decorating",
    images: [
      { url: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=500&q=80", altText: "Wabi-Sabi Linen Throw Blanket Draped on Sofa" },
      { url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&q=80", altText: "Wabi-Sabi Linen Throw Blanket Texture Close-Up" },
    ],
    rating: 4.7, numReviews: 45, isFeatured: false,
  },

  {
    name: "Brass & Marble Candle Holders Set",
    description: "A curated set of three graduated candle holders combining solid brushed brass stems with hand-cut Italian marble bases. Each holder is weighted for stability and features a non-drip bobeche collar. Displayed as a group, they create a layered architectural vignette on any surface.",
    price: 159.99, discountPrice: 139.99, countInStock: 60, sku: "NEST-CD-028",
    category: "Decor", brand: "Heritage Craft",
    sizes: ["Set of 3 Graduated"],
    colors: ["Brushed Brass & Carrara White", "Brushed Brass & Nero Black", "Antique Bronze & Travertine"],
    collections: "Sculptural Forms", material: "Solid Brass & Italian Marble", gender: "Decorating",
    images: [
      { url: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80", altText: "Brass Marble Candle Holders Set Styled" },
      { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80", altText: "Brass Marble Candle Holders Set Detail" },
    ],
    rating: 4.8, numReviews: 38, isFeatured: false,
  },

  {
    name: "Handwoven Wool Area Rug",
    description: "Anchor your living space with this heirloom-quality handwoven wool rug. Crafted by master weavers using a traditional flat-weave technique on wooden looms, each rug takes over 40 hours to complete. The high-twist New Zealand wool pile is naturally soil-resistant and inherently flame-retardant.",
    price: 899.99, discountPrice: 799.99, countInStock: 15, sku: "NEST-RG-029",
    category: "Decor", brand: "Earthy Textures",
    sizes: ["160x230cm Medium", "200x290cm Large", "250x350cm Extra Large"],
    colors: ["Warm Ivory & Camel", "Charcoal & Cream Geometric", "Terracotta & Sand Abstract"],
    collections: "Organic Curves", material: "100% New Zealand Wool", gender: "Decorating",
    images: [
      { url: "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=500&q=80", altText: "Handwoven Wool Area Rug Living Room Layout" },
      { url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&q=80", altText: "Handwoven Wool Area Rug Pile Texture Detail" },
    ],
    rating: 4.9, numReviews: 21, isFeatured: true,
  },

  {
    name: "Sculptural Vase Trio",
    description: "Three individually wheel-thrown porcelain vases in complementary organic forms — a squat wide-mouth vessel, a tall narrow-neck column, and a mid-height gourd silhouette. Each piece is glazed by hand using a reactive iron glaze that produces unique surface variations in the kiln firing process.",
    price: 219.99, discountPrice: 189.99, countInStock: 35, sku: "NEST-VS-030",
    category: "Decor", brand: "Earthy Textures",
    sizes: ["Set of 3 Mixed Heights"],
    colors: ["Iron Grey Reactive Glaze", "Celadon Green Glaze", "Tenmoku Black Glaze"],
    collections: "Sculptural Forms", material: "Wheel-Thrown Porcelain", gender: "Decorating",
    images: [
      { url: "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=500&q=80", altText: "Sculptural Vase Trio Styled on Shelf" },
      { url: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=500&q=80", altText: "Sculptural Vase Trio Glaze Detail" },
    ],
    rating: 4.6, numReviews: 27, isFeatured: false,
  },

];

module.exports = products;