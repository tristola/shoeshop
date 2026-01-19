export const MOCK_PRODUCTS = [
  {
    id: "cHJvZHVjdDox",
    databaseId: 101,
    name: "Cyber Trekkers",
    shortDescription: "Futuristic footwear for the urban explorer. Engineered for comfort and style in the neon city.",
    productCategories: {
      nodes: [
        { name: "New Arrivals" },
        { name: "Men" }
      ]
    },
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop"
    },
    price: "$189.99"
  },
  {
    id: "cHJvZHVjdDoy",
    databaseId: 102,
    name: "Retro High",
    shortDescription: "Classic silhouette meets modern cushioning. A timeless piece for any collection.",
    productCategories: {
      nodes: [
        { name: "New Arrivals" },
        { name: "Women" }
      ]
    },
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    },
    price: "$159.00"
  },
  {
    id: "cHJvZHVjdDoz",
    databaseId: 103,
    name: "Ghost Runner",
    shortDescription: "Ultra-lightweight performance for speed demons. Designed for your fastest miles yet.",
    productCategories: {
      nodes: [
        { name: "Men" }
      ]
    },
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    },
    price: "$129.50"
  },
  {
    id: "cHJvZHVjdDo0",
    databaseId: 104,
    name: "Women's Yoga Flex",
    shortDescription: "Flexible, breathable, and supportive. The perfect companion for your flow.",
    productCategories: {
      nodes: [
        { name: "Women" }
      ]
    },
    image: {
      sourceUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    },
    price: "$95.00"
  }
];

export const MOCK_POSTS = [
  {
    id: "cG9zdDox",
    title: "The Future of Sustainable Footwear",
    excerpt: "Discover how we're using recycled ocean plastics and organic cotton to build the next generation of shoewear...",
    slug: "future-of-sustainable-footwear",
    date: "2026-01-15T12:00:00",
    author: { node: { name: "Alex Rivers" } },
    featuredImage: {
        node: { sourceUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop" }
    },
    content: `
        <p>Sustainability is no longer a choice; it's a responsibility. In this article, we dive deep into the materials and processes that make our latest collection our greenest yet.</p>
        <h2>Recycled Ocean Plastics</h2>
        <p>We've partnered with coastal communities to collect plastic waste before it enters our oceans, transforming it into high-performance yarn.</p>
        <h2>The Bloom Foam Midsole</h2>
        <p>Algae-based foam provides incredible cushioning while helping clean fresh water sources.</p>
    `
  },
  {
    id: "cG9zdDoy",
    title: "Finding the Perfect Fit",
    excerpt: "A guide to understanding shoe width, arch support, and finding the right model for your specific running style.",
    slug: "finding-the-perfect-fit",
    date: "2026-01-10T09:00:00",
    author: { node: { name: "Sarah Chen" } },
    featuredImage: {
      node: { sourceUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1000&auto=format&fit=crop" }
    },
    content: `
        <p>Choosing the right shoe can prevent injuries and improve performance. Here's what you need to look for.</p>
        <h3>1. Arch Support</h3>
        <p>Flat feet or high arches? Each requires a different level of stability.</p>
        <h3>2. Toe Box Width</h3>
        <p>Your toes need room to splay naturally during impact.</p>
    `
  }
];
