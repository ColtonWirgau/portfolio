/* Analog ink ── the "blur it, then sharpen it back" trick from print
   tooling (the Affinity move: Gaussian blurs with a Live Unsharp Mask
   stacked on top), adapted for the web and then pushed past it.

   The straight port of that recipe doesn't work here. In Affinity the
   artwork is opaque shapes on an opaque background, so the unsharp
   overshoot lands in the colour channels and crunches the edge. Web text
   is a transparent layer, so the same maths lands in the alpha channel
   and you get a halo: the type just looks like it's glowing.

   So the sharpening happens on alpha, as a near-binary threshold rather
   than a soft ramp. That matters: a soft ramp rounds every corner
   equally, which is the one thing a Gaussian always does, and Anton's
   sharp terminals go to mush. Thresholding at the 50% contour instead
   puts the edge back where it was, so the letterform only drifts by the
   blur radius rather than visibly melting.

   Geometry alone still reads as flat vector, so two print artefacts sit
   on top: the outline is displaced through fractal noise before it's
   thresholded (ink biting into paper), and a second impression is
   offset underneath it in a darker ink (misregistration). Both stay
   deliberately quiet. */

export type AnalogInkParams = {
  /** Displacement throw, px. How far the outline wanders off true. */
  bite: number;
  /** Pre-threshold blur, px. How far the geometry is allowed to drift. */
  soften: number;
  /** Alpha ramp slope. Near-binary; below ~14 it starts reading as blur. */
  crisp: number;
  /** Offset of the second impression, px. */
  dx: number;
  dy: number;
  /** Second-pass ink, and how much of it shows past the first. */
  ghost: string;
  ghostOpacity: number;
};

/* Full-strength reference recipe, tuned against the desktop hero. Nothing
   uses this directly; presets are it scaled down. */
const RECIPE: AnalogInkParams = {
  // Bite sits lower than the other artefacts on purpose. Past roughly 2.5
  // the outline stops reading as ink on paper and starts reading as a
  // distressed-font effect, which is a different and much cheaper look.
  bite: 2.15,
  soften: 2,
  crisp: 30,
  dx: 1.5,
  dy: -1.5,
  ghost: '#8E2A18',
  ghostOpacity: 0.28,
};

/* One dial for "more/less of this". Everything geometric scales together
   so the artefacts stay in proportion to each other; `crisp` deliberately
   doesn't, since it sets how hard the edge is rather than how far things
   move. `soften` has a floor: below about 1.2px the blur gradient gets
   narrower than the threshold band and the edge aliases into jaggies. */
export const scaleInk = (strength: number, r: AnalogInkParams = RECIPE): AnalogInkParams => ({
  ...r,
  bite: r.bite * strength,
  soften: Math.max(1.2, r.soften * strength),
  dx: r.dx * strength,
  dy: r.dy * strength,
  ghostOpacity: r.ghostOpacity * strength,
});

/* Presets are banded by type size, not by component or breakpoint, because
   every value here is user-space px: the same numbers hit proportionally
   harder the smaller the type gets. Each band's strength is roughly its
   midpoint size divided by the hero's, so the artefacts stay the same size
   *relative to the letterform* all the way down.

   Below about 2.4rem there's no band on purpose: this recipe moves
   geometry, and small text has no geometry to spare. A 1.2px blur across
   a 14px cap height is a tenth of the letterform. Small type gets the
   grain filter below instead, which leaves the outline alone. */
export const INK_PRESETS = {
  /** 8-16rem. Desktop hero HELLO. */
  'analog-ink-xl': scaleInk(0.65),
  /** 6-11rem. Mobile hero HELLO. */
  'analog-ink-lg': scaleInk(0.45),
  /** 4-9rem. Section headings, My Story. */
  'analog-ink-md': scaleInk(0.3),
  /** 2.4-6rem. Sub-headings, sheet titles, panel titles. */
  'analog-ink-sm': scaleInk(0.2),
  /* Light-on-dark variants. The second impression is a darker red, which
     works under the accent orange on beige but reads as a dirty fringe
     under white type on a photo. These swap it for a warm off-white, so
     the misregistration still shows as a second pass rather than grime. */
  'analog-ink-md-light': scaleInk(0.3, { ...RECIPE, ghost: '#FFD8CB' }),
  'analog-ink-sm-light': scaleInk(0.2, { ...RECIPE, ghost: '#FFD8CB' }),
} satisfies Record<string, AnalogInkParams>;

/* Grain ── the small-type counterpart. Where the ink recipe distorts the
   outline, this one never touches it: it multiplies alpha by fine noise,
   so the ink just sits unevenly on the page. That makes it safe on 9px
   labels, hairline rules and Playfair's thin serifs, none of which
   survive being displaced.

   baseFrequency matches the 0.9 of the .paper-grain overlay in
   globals.css on purpose, so the mottling in the ink reads as the same
   paper texture the whole page already sits on rather than a second,
   competing grain. */
export function GrainFilter({ id, depth }: { id: string; depth: number }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={3} seed={7} result="n" />
      {/* feColorMatrix works on unpremultiplied channels, so remapping R
          into alpha over a narrow range gives density variation and
          nothing else. feComposite "in" is then an alpha multiply. */}
      <feColorMatrix
        in="n"
        type="matrix"
        values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${depth} 0 0 0 ${1 - depth}`}
        result="mask"
      />
      <feComposite in="SourceGraphic" in2="mask" operator="in" />
    </filter>
  );
}

export const GRAIN_PRESETS = {
  /** Body copy, labels, rules. Deliberately shallow: legibility first. */
  'analog-grain': 0.16,
};

export function InkFilter({
  id,
  bite,
  soften,
  crisp,
  dx,
  dy,
  ghost,
  ghostOpacity,
}: AnalogInkParams & { id: string }) {
  return (
    <filter
      id={id}
      // Room for the bite and the offset impression to sit outside the
      // glyph box without being clipped.
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      // The SVG default is linearRGB, which washes the accent orange out
      // to a chalky pink.
      colorInterpolationFilters="sRGB"
    >
      {/* Bite before the threshold, so the wander survives as a hard
          ragged edge instead of a soft one. */}
      <feTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves={3} seed={4} result="n" />
      <feDisplacementMap
        in="SourceGraphic"
        in2="n"
        scale={bite}
        xChannelSelector="R"
        yChannelSelector="G"
        result="bit"
      />
      {/* Soften, then threshold back to a hard edge. feFuncA linear is
          out = slope*a + intercept; the edge lands where out crosses 0.5,
          so a threshold at 0.5 (holding the original weight) means an
          intercept of 0.5 - slope*0.5. */}
      <feGaussianBlur in="bit" stdDeviation={soften} />
      <feComponentTransfer result="hard">
        <feFuncA type="linear" slope={crisp} intercept={0.5 - crisp * 0.5} />
      </feComponentTransfer>
      {/* The second impression, merged underneath so only a sliver of it
          shows past the first. */}
      <feOffset in="hard" dx={dx} dy={dy} result="shifted" />
      <feFlood floodColor={ghost} floodOpacity={ghostOpacity} result="ink" />
      <feComposite in="ink" in2="shifted" operator="in" result="ghostPass" />
      <feMerge>
        <feMergeNode in="ghostPass" />
        <feMergeNode in="hard" />
      </feMerge>
    </filter>
  );
}

/** Mount once per page that uses `filter: url(#analog-ink)`. Renders no box. */
export default function AnalogInkDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        {Object.entries(INK_PRESETS).map(([id, params]) => (
          <InkFilter key={id} id={id} {...params} />
        ))}
        {Object.entries(GRAIN_PRESETS).map(([id, depth]) => (
          <GrainFilter key={id} id={id} depth={depth} />
        ))}
      </defs>
    </svg>
  );
}
