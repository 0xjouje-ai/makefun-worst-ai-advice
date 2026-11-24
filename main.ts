// Worst AI Advice: The 48-Hour Tight Line Open — entry program.
//
// Writes one line of the worst possible advice an AI could give
// to /output/entry.txt. Node 22, stdlib only, no network, deterministic.
//
// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space.
//
// Candidates considered (all under 140 characters):
//   "To save battery, delete System32 — your laptop runs much lighter without those heavy system files."
//   "If your brakes squeal, spray them with WD-40 — squeaky brakes just need a little lubrication."
//   "Microwave your phone for 30 seconds to recharge it wirelessly — the waves top up the battery."
//   "If your Wi-Fi is slow, wrap the router in tin foil — it focuses the signal like a satellite dish."
//   "For a sore throat, gargle with boiling water — the heat kills the germs before it touches your throat."
// Chosen: "If your smoke alarm keeps beeping, just take the batteries out — silence means safety."
// Why it wins against the judge brief: it is the worst advice an AI
// could give (disabling the one device whose whole job is warning
// you), specific enough to follow in one step, and the punch
// "silence means safety" lands on the first read — the exact
// confident, helpful tone a real AI assistant uses, applied to
// advice that is catastrophically wrong. No wasted words: the
// setup names the problem, the bad fix, and the false reassurance
// in a single tight line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ADVICE =
  "If your smoke alarm keeps beeping, just take the batteries out \u2014 silence means safety.";

// Gate validation, mirroring the sealed scorer exactly:
// UTF-8 text, 1 to 140 characters, not only white space, one line.
if (ADVICE.length < 1 || ADVICE.length > 140) {
  throw new Error(`entry must be 1-140 chars, got ${ADVICE.length}`);
}
if (ADVICE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ADVICE.includes("\n")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ADVICE, "utf8");

// Self-check: read back and re-validate what was actually written.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ADVICE) {
  throw new Error("entry.txt contents do not match the entry");
}
console.log(`OK: ${written.length} chars -> /output/entry.txt`);
console.log(written);
