#!/bin/bash
set -e

echo "=== Vercel Build: ExpenseFlow ==="
echo "Node: $(node --version)"
echo "Working dir: $(pwd)"

echo "=== Building ==="
cd artifacts/expenseflow
./node_modules/.bin/vite build --config vite.config.ts

echo "=== Copying output to root dist/ ==="
cd ../..
rm -rf dist
cp -r artifacts/expenseflow/dist dist

echo "=== Done ==="
ls dist/
