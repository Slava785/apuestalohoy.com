import type { GuideBlock } from "@/content/guides";
import type { Lang } from "@/i18n/config";

export function Prose({ blocks }: { blocks: readonly GuideBlock[]; lang?: Lang }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h3 key={i}>{b.text}</h3>;
        if (b.type === "ul") return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
        return <p key={i}>{b.text}</p>;
      })}
    </>
  );
}
