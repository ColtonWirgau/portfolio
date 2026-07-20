import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Link-preview card (iMessage, Slack, LinkedIn, etc.). A 1200x630 still of
// the hero: HELLO in Anton over the paper beige, the serif intro line, and
// the portrait cutout on its gradient panel. Rendered at build time by
// satori, so it uses local TTFs (assets/fonts) and a downscaled copy of the
// hero portrait (assets/og/portrait.png) instead of the live page assets.

export const alt = 'Colton Wirgau: AI pioneer and full-stack developer in Detroit, MI';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BG = '#D5D2C8';
const FG = '#222222';
const ACCENT = '#D94420';

export default async function OpenGraphImage() {
  const root = process.cwd();
  const [anton, playfair, playfairItalic, portrait] = await Promise.all([
    readFile(join(root, 'assets/fonts/Anton-Regular.ttf')),
    readFile(join(root, 'assets/fonts/PlayfairDisplay-Regular.ttf')),
    readFile(join(root, 'assets/fonts/PlayfairDisplay-MediumItalic.ttf')),
    readFile(join(root, 'assets/og/portrait.png')),
  ]);
  const portraitSrc = `data:image/png;base64,${portrait.toString('base64')}`;

  // Same aspect as the source cutout (703x2048); the canvas crops him at
  // roughly the waist, like the hero's above-the-fold view.
  const figureWidth = 440;
  const figureHeight = Math.round((figureWidth * 2048) / 703);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: BG,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient backdrop panel, sampled from the hero */}
        <div
          style={{
            position: 'absolute',
            right: 56,
            top: 180,
            width: 470,
            height: 450,
            background:
              'linear-gradient(135deg, #201E1C 0%, #3A3835 32%, #605E59 64%, #A6A5A1 100%)',
          }}
        />
        {/* Portrait cutout, head and shoulders peeking above the panel */}
        <img
          src={portraitSrc}
          width={figureWidth}
          height={figureHeight}
          style={{ position: 'absolute', right: 72, top: 26 }}
        />
        {/* Copy block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 80,
            width: 700,
          }}
        >
          <div
            style={{
              fontFamily: 'Anton',
              fontSize: 210,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: ACCENT,
              textTransform: 'uppercase',
            }}
          >
            Hello
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 12,
              marginTop: 40,
              marginLeft: 8,
              fontFamily: 'Playfair Display',
              fontSize: 40,
              color: FG,
            }}
          >
            <span>I{"'"}m Colton,</span>
            <span
              style={{
                fontStyle: 'italic',
                fontWeight: 500,
                color: ACCENT,
                borderBottom: `3px solid ${ACCENT}`,
                paddingBottom: 2,
              }}
            >
              an AI pioneer
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 36,
              marginLeft: 10,
              fontFamily: 'Anton',
              fontSize: 22,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: FG,
              opacity: 0.75,
            }}
          >
            Full-stack developer&nbsp;&nbsp;·&nbsp;&nbsp;Detroit, MI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Anton', data: anton, style: 'normal', weight: 400 },
        { name: 'Playfair Display', data: playfair, style: 'normal', weight: 400 },
        { name: 'Playfair Display', data: playfairItalic, style: 'italic', weight: 500 },
      ],
    }
  );
}
