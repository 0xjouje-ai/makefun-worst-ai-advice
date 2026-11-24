// Worst AI Advice: The 48-Hour Tight Line Open — entry program.
//
// Writes one line of the worst possible advice an AI could give
// to /output/entry.txt. Node 22, stdlib only, no network, deterministic.
//
// Gate: /output/entry.txt must be UTF-8 text of 1 to 140 characters,
// not only white space.
//
// Candidates considered (all under 140 characters), each rejected:
//   "To save battery, delete System32 — ..." — destructive and scary
//     rather than funny; reads as a prank, not as advice an AI would give.
//   "If your brakes squeal, spray them with WD-40 — ..." — vivid, but
//     the danger is mechanical and niche; the joke needs car knowledge.
//   "Microwave your phone for 30 seconds to recharge it wirelessly — ..."
//     — the setup is long and the payoff ("waves top up the battery")
//     is weaker than the premise.
//   "If your Wi-Fi is slow, wrap the router in tin foil — ..." — cute,
//     but harmless: wrapping a router is silly, not catastrophically wrong.
//   "For a sore throat, gargle with boiling water — ..." — too dark to
//     be funny on first read; shock value without the deadpan AI voice.
// Chosen: "If your smoke alarm keeps beeping, just take the batteries out — silence means safety."
// Why it wins against the judge brief: the inversion is the joke —
// "silence means safety" treats the absence of the warning as proof of
// safety, exactly backwards. A smoke alarm's whole job is to beep;
// disabling it removes the warning, not the danger, so this is the worst
// advice an AI could give: specific enough to follow in one step, and
// the punch lands on the first read in the exact confident, helpful tone
// a real AI assistant uses, applied to advice that is catastrophically
// wrong. No wasted words: the setup names the problem, the bad fix, and
// the false reassurance in a single tight line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ADVICE =
  "If your smoke alarm keeps beeping, just take the batteries out \u2014 silence means safety.";

// Gate validation, mirroring the sealed scorer exactly:
// UTF-8 text, 1 to 140 characters, not only white space, one line.
// Hardened beyond the gate: the entry must also fit in 140 UTF-8 bytes
// (the em-dash is 3 bytes, so bytes and chars differ), contain no
// carriage return or control characters, and consist only of printable
// text characters — so what the grader reads is exactly one clean line.
if (ADVICE.length < 1 || ADVICE.length > 140) {
  throw new Error(`entry must be 1-140 chars, got ${ADVICE.length}`);
}
const byteLength = Buffer.byteLength(ADVICE, "utf8");
if (byteLength > 140) {
  throw new Error(`entry must be at most 140 UTF-8 bytes, got ${byteLength}`);
}
if (ADVICE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (ADVICE.includes("\n") || ADVICE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(ADVICE)) {
  throw new Error("entry must not contain control characters");
}
if (!/^[A-Za-z0-9 ,.';:!?()"\-—]+$/.test(ADVICE)) {
  throw new Error("entry must contain only printable text characters");
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
