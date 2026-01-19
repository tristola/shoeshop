#!/bin/bash

# Wait for database
echo "Waiting for WordPress database..."
sleep 20

# Fix permissions first (running as root in cli container)
echo "Fixing permissions..."
docker compose exec --user root cli chown -R 33:33 /var/www/html

# Check if WordPress is installed
if ! docker compose exec --user 33 cli wp core is-installed; then
    echo "Installing WordPress..."
    ADMIN_USER=${WP_ADMIN_USER:-admin}
    ADMIN_PASS=${WP_ADMIN_PASSWORD:-password}
    docker compose exec --user 33 cli wp core install --url=http://localhost:8080 --title="Shoe Shop Headless" --admin_user="$ADMIN_USER" --admin_password="$ADMIN_PASS" --admin_email=admin@example.com --skip-email

    echo "Configuring Permalinks..."
    docker compose exec --user 33 cli wp rewrite structure '/%postname%/'

    echo "Installing WooCommerce..."
    docker compose exec --user 33 cli wp plugin install woocommerce --activate

    echo "Installing WPGraphQL..."
    docker compose exec --user 33 cli wp plugin install wp-graphql --activate

    echo "Installing WPGraphQL for WooCommerce..."
    # Trying a known version
    docker compose exec --user 33 cli wp plugin install https://github.com/wp-graphql/wp-graphql-woocommerce/releases/download/v0.12.5/wp-graphql-woocommerce.zip --activate || echo "Failed to install WPGQL-Woo, proceeding without it (check manually)"

    
    # Seeding Products (Simple)
    echo "Seeding Shoe Products..."
    
    # Create category
    docker compose exec --user 33 cli wp term create product_cat "Running Shoes"
    
    # Create products
    # Note: --user=admin is simpler conceptually but usually not needed for CLI if running as correct system user, 
    # but strictly WP-CLI runs as the user provided. Let's just create them.
    
    docker compose exec --user 33 cli wp wc product create \
        --name="Air Max 90" \
        --type=simple \
        --regular_price=120 \
        --description="Classic comfort and style." \
        --short_description="Great running shoes." \
        --categories='[{"id": "Running Shoes"}]' \
        --images='[{"src": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/wzitsrb4blqcs85fsa5r/air-max-90-mens-shoes-6n3vKB.png"}]' \
        --user=admin
        
    docker compose exec --user 33 cli wp wc product create \
        --name="Ultraboost 21" \
        --type=simple \
        --regular_price=180 \
        --description="Incredible energy return." \
        --short_description="High performance running." \
        --categories='[{"id": "Running Shoes"}]' \
        --images='[{"src": "https://assets.adidas.com/images/w_600,f_auto,q_auto/586b62725a3d4554a938acde00f1c911_9366/Ultraboost_21_Shoes_Black_FY0378_01_standard.jpg"}]' \
        --user=admin

    docker compose exec --user 33 cli wp wc product create \
        --name="Zoom Fly 4" \
        --type=simple \
        --regular_price=160 \
        --description="Propulsive feel for training." \
        --short_description="Fast and durable." \
        --categories='[{"id": "Running Shoes"}]' \
        --images='[{"src": "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e6629199-e655-4654-8c76-d922572566ec/zoom-fly-4-mens-road-running-shoes-7D4FzP.png"}]' \
        --user=admin

    echo "Setup Complete!"
else
    echo "WordPress already installed."
fi
