# ShoeShop - Headless E-commerce Demo

A modern, headless e-commerce application built with Next.js, Apollo Client, and WordPress (WooCommerce) via WPGraphQL.

## 🏗 Architecture

This project follows a **headless architecture**, separating the frontend presentation layer from the backend content management system.

### Frontend (`/frontend`)
- **Framework**: [Next.js](https://nextjs.org/) (v15)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Data Fetching**: [Apollo Client](https://www.apollographql.com/docs/react/)
- **API**: Connects to the WordPress GraphQL endpoint

### Backend (Dockerized)
- **CMS**: WordPress with [WooCommerce](https://woocommerce.com/)
- **API Layer**: [WPGraphQL](https://www.wpgraphql.com/) + WPGraphQL for WooCommerce
- **Database**: MySQL 8.0
- **Orchestration**: Docker Compose manages the services:
  - `wordpress`: The core application server (Port 8080)
  - `db`: MySQL database
  - `cli`: WP-CLI container for automated setup and management

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/) & Docker Compose
- [Node.js](https://nodejs.org/) (v18+ recommended)

### 1. Backend Setup

Start the backend services and run the automated setup script. This will provision a WordPress instance, install necessary plugins, and seed sample products.

```bash
# Start Docker services
docker compose up -d

# Run the setup script
./setup.sh
```

The `./setup.sh` script performs the following:
- Waits for the database to be ready.
- Installs WordPress and sets up the admin user.
- Configures permalinks.
- Installs and activates **WooCommerce**, **WPGraphQL**, and **WPGraphQL for WooCommerce**.
- Creates a "Running Shoes" category and seeds sample products (Air Max 90, Ultraboost 21, Zoom Fly 4).

**WordPress Admin Credentials:**
- **URL**: [http://localhost:8080/wp-admin](http://localhost:8080/wp-admin)
- **Username**: `admin`
- **Password**: `password` (or as defined in `setup.sh`)

### 2. Frontend Setup

Navigate to the frontend directory and start the development server.

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🛠 Usage

- **Browse**: Visit the homepage to see the seeded products.
- **Cart**: Add items to the cart (managed via React Context and Apollo Client).
- **Checkout**: The checkout process integrates with the WooCommerce checkout flow.

## 📂 Project Structure

```
├── docker-compose.yml      # define backend services (WP, MySQL, CLI)
├── setup.sh                # automated backend provisioning script
├── add_gender_products.sh  # script to add gender-specific product data
├── frontend/               # Next.js application
│   ├── app/                # App router pages
│   ├── components/         # Reusable UI components
│   ├── context/            # Global state (CartContext)
│   ├── lib/                # Utilities and GraphQL queries
│   └── public/             # Static assets
└── ...
```

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.
