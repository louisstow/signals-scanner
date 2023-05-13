mkdir -p dist
if [ -f dist/scan.sh ]; then
    rm dist/scan.sh
fi
touch dist/scan.sh

cat src/prologue.sh >> dist/scan.sh
cat src/os/*.sh >> dist/scan.sh
cat src/pkg/*.sh >> dist/scan.sh
cat src/epilogue.sh >> dist/scan.sh

chmod +x dist/scan.sh