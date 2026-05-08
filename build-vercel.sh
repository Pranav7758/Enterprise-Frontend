#!/bin/bash
set -e

echo "=== Vercel Build: ExpenseFlow ==="
echo "Node: $(node --version)"
echo "pnpm: $(pnpm --version)"

echo "=== Building ==="
cd artifacts/expenseflow
pnpm run build

echo "=== Copying output to root dist/ ==="
cd ../..
rm -rf dist
cp -r artifacts/expenseflow/dist dist

echo "=== Done ==="
ls dist/
