interface JsonLdProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

// Encode characters that could break out of a <script> tag.
// JSON.stringify does not escape <, >, & so we do it manually via unicode escapes.
function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
    />
  );
}
