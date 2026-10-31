# Platform integration

## Ownership

| Application | Authoritative responsibility |
| --- | --- |
| master_data | Equipment identities, lifecycle, specifications and maintenance standards |
| engineering_drawing | Drawing identities, released revisions, objects and sheet relationships |
| document_delivery | Handover packages, submitted document snapshots, review and acceptance |
| digital_twin | Spatial equipment context and synthetic monitoring/work examples |
| etl_monitoring | Ingestion runs, transformations, lineage and processing failures |

Acceptance criteria here govern document handover, not the equipment master or ETL.
The equipment and released-drawing registers are explicitly versioned demonstration
fixtures rather than a live query into another origin's localStorage. The drawing
baseline is the original sample set at engineering_drawing commit
5f176637954fbdee7171703e5b9f1101bc6bde14. Update these fixtures deliberately when the
drawing baseline changes. Reusing a common asset ID does not synchronize records.

## URLs and portable records

- Site ID: DEMO-PLANT-01; asset IDs: EQ-UT-00142 etc. Never translate to display names.
- Inbound: /document_delivery/?assetId=EQ-UT-00142&packageId=DEL-0001.
- packageId is optional; assetId finds an existing dossier. Unmapped assets get a
  visible notice and may be selected in New package; unknown IDs cannot be registered.
- Outbound links preserve assetId when opening the master, drawing app or twin.
- Dossier JSON exports schemaVersion 1.0.0, source document_delivery, siteId, synthetic,
  current requirement set and package including file contents and submission history.
- Release manifest exports packageId/assetId, release ID/date/role, standard version
  and immutable file ID/type/revision/filename/SHA-256 references without file contents.
- The frontend does not import arbitrary exported state or execute uploaded SVGs.

## Future backend

Use a shared identity provider with server-side RBAC and separate submit/review/accept
permissions. Master and drawing services expose versioned APIs; server validation
pins those registry versions on submission. Store object bytes in versioned object
storage, compute digests on receipt, scan/quarantine untrusted files and convert CAD/PDF
on isolated workers. Store package transitions and outbox events transactionally in
a database with optimistic concurrency. Preserve accepted manifests and prior file
versions through retention controls; introduce actual signatures and audit controls
when required by the intended deployment.

Events such as DossierSubmitted, DossierReturned and HandoverAccepted can feed ETL
monitoring without changing master-data standard ownership. The twin can read accepted
document references from delivery APIs and open the governed drawing revision.

These backend items are design extensions, not capabilities claimed by this static demo.

## ETL operations available

The etl_monitoring demo at https://leetj94-lab.github.io/etl_monitoring/
preserves assetId context and supports pipelineId/runId deep links. It processes
pinned synthetic master, observation, drawing and accepted-handover inputs, with
quarantine/retry/checkpoint evidence. It does not redefine equipment standards,
release drawings, accept handovers or synchronize browser-local edits across sites.

## Interactive drawing review

The bundled drawing-review core (catalog/domain/XML extractor) and seven original
SVGs mirror engineering_drawing commit 4186e43abf1841e422d5a610c40b8fd739372451.
The mirror is self-contained and built with SHA-256 source companions so review works
without another origin or live service. Actual package attachment bytes are opened
only when their hash matches the bundled attachment catalog. Reference navigation
uses its separate pinned library; it never mutates the handover package. The package
acceptance validator remains separate from reference-sheet inspection. Unknown local
SVGs remain text-only; no general SVG sanitizer or CAD converter is claimed.
