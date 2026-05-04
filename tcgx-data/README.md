# TCGx Compiled Data

Compiled Pokémon TCG card data for Japanese and Korean, sourced from [tcgdex/cards-database](https://github.com/tcgdex/cards-database).

## Files

| File | Language | Sets | Cards |
|------|----------|------|-------|
| `sv.json` | JA/KR | 49 | ~5,300 |
| `s.json` | JA/KR | 48 | ~4,600 |

> **Note:** Only SV (Scarlet & Violet) and S (Sword & Shield) series have full card data available from the data-asia repository.

## Usage

Data is consumed via jsDelivr CDN:
```
https://cdn.jsdelivr.net/gh/chinoforeva/tcgx-data@main/sv.json
https://cdn.jsdelivr.net/gh/chinoforeva/tcgx-data@main/s.json
```

Card images (JP): `https://assets.tcgdex.net/ja/SV/{setId}/{num}/high.webp`

## Build

Run `node build-tcgx.js` to regenerate from `tcgdex/cards-database`.
