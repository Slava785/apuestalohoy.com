import Link from "next/link";

type Props = { kicker: string; title: string; text?: string; href?: string; linkLabel?: string };

export function SectionHead({ kicker, title, text, href, linkLabel }: Props) {
  return (
    <div className="section-head">
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {text ? <p>{text}</p> : null}
      </div>
      {href && linkLabel ? <Link className="see-all" href={href}>{linkLabel}</Link> : null}
    </div>
  );
}
