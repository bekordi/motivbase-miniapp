Burası Türkçeleştirilecek.
# MotivBase - MiniApp (Mock Payment first version)

MotivBase showss a random motivational quote with a beautiful background.
Users can generate a shareable image and (mock) pay $0.1 to "share" it to their profile.

## Run locally

1. Install deps:
```
npm install
```

2. Run dev:
```
npm run dev
```

3. Open http://localhost:3000

## What this mock app does
- Displays random motivational quotes and background images.
- "Share" button simulates a $0.1 payment (mock).
- On successful mock payment, app renders a sharable image using canvas and provides a "Share (simulate Cast)" action that just shows a confirmation.
- Includes instructions for later integrating Base payment and Farcaster Cast API.

## Next steps (production)
- Integrate real Base wallet payment (use wallet SDK / Coinbase Wallet Connect) to collect 0.1 USDC.
- Verify payment server-side (optional) and call Farcaster API to create a real cast.
- Make sure to update farcaster.config.json homeUrl to your deployed Vercel domain.
"# motivbase-miniapp" 
