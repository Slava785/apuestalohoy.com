import type { GateResult } from "@/lib/types";

type AdSlotProps = {
  /** Placement id from the inventory in docs/02 (e.g. "sidebar_top"). */
  placement: string;
  /** Pre-evaluated gate result; the slot renders nothing unless allowed. */
  gate: GateResult;
  /** Reserved box so late-loading creatives cannot shift layout. */
  width: number;
  height: number;
  children: React.ReactNode;
};

/** Labelled, space-reserving container. Fails closed: denied gate renders nothing. */
export function AdSlot({ placement, gate, width, height, children }: AdSlotProps) {
  if (!gate.allowed) return null;
  return (
    <aside className="ad-slot" data-placement={placement} aria-label="Publicidad">
      <p className="ad-slot__label">Publicidad · +18</p>
      <div className="ad-slot__box" style={{ aspectRatio: `${width} / ${height}`, maxWidth: width }}>
        {children}
      </div>
    </aside>
  );
}
