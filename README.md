# Delivery Workspace

Equipment document handover demo: prepare a dossier, validate the actual structured
files, submit for review, return/correct/resubmit, approve and accept a frozen release.

**GitHub Pages:** https://leetj94-lab.github.io/document_delivery/

Original synthetic content only. No employer documents, workflows, code or facility
layouts are reproduced. Engineering content is illustrative and not for construction.

## Working features

- Three seeded dossiers: a pump draft with two deliberate blockers, an accepted chiller
  dossier, and an air-handling dossier awaiting review. Create more for the eight
  canonical equipment IDs shared with master_data, engineering_drawing and digital_twin.
- Thirty-four generated file samples: equipment-specific SVG drawings, JSON specifications
  and test certificates, TXT O&M guides, plus a superseded drawing and failed certificate.
- Extract metadata from the actual file content, not the filename alone. Validate required
  categories, canonical asset/site IDs, identity consistency, duplicate categories/IDs,
  naming, released drawing revision, drawing equipment reference and certificate result.
- Calculate SHA-256 from UTF-8 file contents. Bundled source hashes are verified on load;
  altered content/registered-digest mismatches are blocked by domain checks.
- Replace/attach/download samples or attach a compatible structured UTF-8 local file
  (SVG/JSON/TXT, max 200 KB). Local file content stays in browser memory/localStorage.
  Allowlisted bundled drawings open in an interactive SVG/XML review workspace;
  unrecognized local SVGs remain source text.
- Open drawing from the document table to inspect the exact attached revision, zoom,
  pan, select objects, identify red-boxed invalid objects and click findings to focus.
  Follow actual OPC arrows to reciprocal endpoints on another reference sheet and use
  Previous sheet to return. Extracted title fields and object checks use actual XML.
- The seven-sheet pinned reference library includes a deliberate draft with five
  violations. Reference navigation is clearly labeled and never replaces an attachment
  or changes a submitted/accepted package. Superseded attachment revisions remain
  visible with their package-level revision finding.
- Demo roles: Supplier prepares/submits; Reviewer returns or approves; Admin accepts.
  Domain actions enforce the role/status matrix and validation before state transitions.
  Submitted/approved/accepted packages are locked; returned packages can be corrected.
- Every submission preserves file IDs/revisions/hashes. Corrections and resubmissions
  preserve older snapshots. Decisions require a reason and produce a local history trace.
- Admin publishes versioned document requirements. A pending approval under a prior
  version cannot be accepted until returned, resubmitted and reviewed under the new one.
- Acceptance creates a frozen release manifest, preserving original criteria and digests.
  Accepted releases remain unchanged when later requirement versions are published.
- Equipment search, package status filter, shared-ID links, dossier JSON export and
  release-manifest JSON download; malformed storage recovery and a local reset.

## Try the workflow

1. Open DEL-0001. Its missing certificate and revision-B drawing block submission.
2. Inspect the drawing; use Replace to choose revision C and Attach for a passing test.
   **Apply conforming sample set** is a shortcut for replacing all four documents.
3. Submit as Supplier. Select Reviewer in Demo role. Return with a reason, then switch
   to Supplier to correct and resubmit; History keeps each submission snapshot.
4. Approve as Reviewer, then accept as Admin. Download its release manifest.
5. Requirements → Admin → publish a change. Pending approvals need review again;
   the accepted baseline retains its original version.
6. Inspect the seeded accepted chiller dossier in Release register.

## Main-branch deployment

Configure **Pages → Deploy from a branch → main → /(root)**.
Root HTML/JS/CSS, catalog.json, files/ and .nojekyll are committed ready to serve.
GitHub's branch Pages workflow deploys them; our workflow validates the publication.
No ChatGPT hosting or runtime backend is required.

```sh
npm run build
npm test
python3 -m http.server 8000
```

Requires Node.js 22+. No package installation or runtime framework is necessary.
Edit src/ or the deterministic generator, build, then commit source and root outputs
to main. Optional Google Fonts fall back to system fonts.

- src/domain.js: rules, state transitions, snapshots, persistence and release contract.
- src/hash.js: portable SHA-256, tested against Node's platform crypto implementation.
- scripts/generate-fixtures.mjs: deterministic files and catalog.
- fixtures/source-drawings/: original synthetic SVGs from engineering_drawing.
- SVG .source.txt companions preserve exact authoritative source bytes through preview
  servers that inject live-reload scripts into SVG responses. Build/tests ensure the
  companion and rendered SVG bytes are identical; downloads use the verified source.
- docs/INTEGRATION.md: ownership, cross-site URL contract and backend roadmap.

## Scope

This is a working frontend simulation, not a production document-control system.
Role switching is not authentication; the local history is not tamper-resistant.
File hashes establish content identity/integrity against stored values, not authorship,
digital signatures, malware safety or engineering validity. The SVG metadata extractor
supports the bundled conventions; it is not a general XML/CAD parser or sanitizer.
PDF/DWG extraction, OCR, large binary uploads, e-signatures, notifications and shared
server storage are not implemented. There is no automatic cross-app synchronization.

MIT for original code, generated sample documents and copied original drawings.
See QA.md for verification and docs/INTEGRATION.md for the production extension plan.
