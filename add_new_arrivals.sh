#!/bin/bash

echo "Adding New Arrivals..."

# Create Category
docker compose exec --user 33 cli wp term create product_cat "New Arrivals" || true

# Get ID
NEW_ARRIVALS_ID=$(docker compose exec --user 33 cli wp term list product_cat --name="New Arrivals" --field=term_id)
NEW_ARRIVALS_ID=$(echo $NEW_ARRIVALS_ID | xargs)

echo "New Arrivals Category ID: $NEW_ARRIVALS_ID"

# Add Products
docker compose exec --user 33 cli wp wc product create \
    --name="Cyber Trekkers" \
    --type=simple \
    --regular_price=220 \
    --description="Futuristic aesthetic." \
    --short_description="Limited Edition." \
    --categories="[{\"id\": $NEW_ARRIVALS_ID}]" \
    --user=admin

docker compose exec --user 33 cli wp wc product create \
    --name="Retro High" \
    --type=simple \
    --regular_price=150 \
    --description="Classic high-top style." \
    --short_description="Old school cool." \
    --categories="[{\"id\": $NEW_ARRIVALS_ID}]" \
    --user=admin

echo "New Arrivals Seeding Complete!"
