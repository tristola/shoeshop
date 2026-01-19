#!/bin/bash

echo "Adding Men and Women categories and products..."

# Create Categories (ignore error if exists)
docker compose exec --user 33 cli wp term create product_cat "Men" || true
docker compose exec --user 33 cli wp term create product_cat "Women" || true

# Get Category IDs
MEN_ID=$(docker compose exec --user 33 cli wp term list product_cat --name="Men" --field=term_id --format=count)
WOMEN_ID=$(docker compose exec --user 33 cli wp term list product_cat --name="Women" --field=term_id --format=count)

# Wait, format=count returns count. We need the ID.
# Removing format=count, default is list.
# Correct command:
MEN_ID=$(docker compose exec --user 33 cli wp term list product_cat --name="Men" --field=term_id)
WOMEN_ID=$(docker compose exec --user 33 cli wp term list product_cat --name="Women" --field=term_id)

echo "Men Category ID: $MEN_ID"
echo "Women Category ID: $WOMEN_ID"

# Clean up whitespace
MEN_ID=$(echo $MEN_ID | xargs)
WOMEN_ID=$(echo $WOMEN_ID | xargs)

# Add Men's Products
docker compose exec --user 33 cli wp wc product create \
    --name="Men's Trail Runner" \
    --type=simple \
    --regular_price=130 \
    --description="Durable trail shoes for men." \
    --short_description="Rugged outdoor footwear." \
    --categories="[{\"id\": $MEN_ID}]" \
    --user=admin

docker compose exec --user 33 cli wp wc product create \
    --name="Men's Street Kicks" \
    --type=simple \
    --regular_price=95 \
    --description="Stylish sneakers for everyday wear." \
    --short_description="Urban style." \
    --categories="[{\"id\": $MEN_ID}]" \
    --user=admin

# Add Women's Products
docker compose exec --user 33 cli wp wc product create \
    --name="Women's Yoga Flex" \
    --type=simple \
    --regular_price=85 \
    --description="Flexible and comfortable for studio work." \
    --short_description="Soft and light." \
    --categories="[{\"id\": $WOMEN_ID}]" \
    --user=admin

docker compose exec --user 33 cli wp wc product create \
    --name="Women's City Glide" \
    --type=simple \
    --regular_price=110 \
    --description="Perfect for city running." \
    --short_description="Smooth ride." \
    --categories="[{\"id\": $WOMEN_ID}]" \
    --user=admin

echo "Seeding Complete!"
