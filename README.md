# Money, in Data: video engine

Vertical (1080×1920, 60s) explainer videos built in code with Remotion.

## Making a new video

1. **Calculate the numbers.** Copy `calc/coffee.py` to `calc/<topic>.py`, change the maths, and run it. It writes `src/<topic>.data.json`. Every figure on screen should come from this file and never be typed in by hand.
2. **Write the recipe.** Copy `src/videos/coffee.ts` to `src/videos/<topic>.ts`. Change the scene text and point it at the new data file. Scene types:
   - `hook`: the opening question (big lines; wrap words in `*stars*` for lime, use `\n` for line breaks)
   - `people`: two characters or choices, each with a stat
   - `race`: the animated line chart (series data, axis range, ticks, timed notes)
   - `reveal`: the big final numbers plus a punchline
   - `bars`: a "money in vs growth" breakdown
   - `outro`: the closing line plus the assumptions disclaimer
   
   Scenes can be reordered or repeated. Keep the total at about 1,800 frames (60s at 30fps).
3. **Register it.** Add the recipe to the `recipes` list in `src/Root.tsx`.
4. **Check stills, then render.**
   ```
   npx remotion still src/index.ts <Id> out/check.png --frame=700 --browser-executable=/tmp/chromium
   npx remotion render src/index.ts <Id> out/<topic>.mp4 --browser-executable=/tmp/chromium --crf=18
   ```

## Rules that keep the channel safe and credible

- Every number is calculated, with the assumptions shown on screen.
- Vary the characters, chart types and hook wording between videos, so it reads as a series rather than a template.
- Always end with the "Illustration only… Not financial advice" disclaimer.

## Look

Ink `#0B0F1A`, paper `#F4F1EA`, lime `#C6FF3D`, coral `#FF5C47` (used sparingly). Space Grotesk for headlines, JetBrains Mono for numbers. These are defined in `src/brand.tsx`.
