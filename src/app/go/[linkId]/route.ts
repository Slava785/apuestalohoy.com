import { NextResponse } from "next/server";
import { canShowAffiliateLink } from "@/lib/eligibility";
import { getMarketBySlug } from "@/lib/markets";
import { isValidLinkId, safeDestination } from "@/lib/redirect";
import { repository } from "@/lib/repository";

const notFound = () => new NextResponse("Not found", { status: 404 });

/**
 * Outbound click-out. The destination comes only from the stored, approved
 * affiliate link, never from the request, and the Promotion Gate is re-run on
 * every click so a revoked market or expired verification stops redirecting
 * immediately. Event recording is not implemented yet (docs/02, milestone 7).
 */
export async function GET(_request: Request, ctx: RouteContext<"/go/[linkId]">) {
  const { linkId } = await ctx.params;
  if (!isValidLinkId(linkId)) return notFound();

  const link = await repository.getAffiliateLink(linkId);
  if (!link) return notFound();

  const market = getMarketBySlug(link.countryCode.toLowerCase());
  if (!market) return notFound();

  const brandMarkets = await repository.listBrandMarkets(market.code);
  const brandMarket = brandMarkets.find((bm) => bm.brandId === link.brandId) ?? null;

  const gate = canShowAffiliateLink({ now: new Date(), market, brandMarket, link });
  if (!gate.allowed) return notFound();

  const destination = safeDestination(link.destination, link.allowedHosts);
  if (!destination) return notFound();

  return NextResponse.redirect(destination, {
    status: 302,
    headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" },
  });
}
