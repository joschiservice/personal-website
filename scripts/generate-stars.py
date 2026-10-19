"""Renders the starfield tiles in public/img/space as PNGs at 2x density.

Deterministic, no dependencies. Usage: python3 scripts/generate-stars.py public/img/space
"""
import math, random, struct, sys, zlib

OUT = sys.argv[1]
SCALE = 2  # physical pixels per CSS pixel
COLORS = [(255, 255, 255)] * 5 + [(220, 230, 255), (180, 205, 255), (200, 215, 255), (190, 210, 255), (255, 245, 230)]

def sepia_saturate(rgb, s=0.5, sat=1.3):
    r, g, b = [c / 255 for c in rgb]
    # CSS sepia(s)
    r, g, b = (
        (0.393 + 0.607 * (1 - s)) * r + (0.769 - 0.769 * (1 - s)) * g + (0.189 - 0.189 * (1 - s)) * b,
        (0.349 - 0.349 * (1 - s)) * r + (0.686 + 0.314 * (1 - s)) * g + (0.168 - 0.168 * (1 - s)) * b,
        (0.272 - 0.272 * (1 - s)) * r + (0.534 - 0.534 * (1 - s)) * g + (0.131 + 0.869 * (1 - s)) * b,
    )
    # CSS saturate(sat)
    r, g, b = (
        (0.213 + 0.787 * sat) * r + (0.715 - 0.715 * sat) * g + (0.072 - 0.072 * sat) * b,
        (0.213 - 0.213 * sat) * r + (0.715 + 0.285 * sat) * g + (0.072 - 0.072 * sat) * b,
        (0.213 - 0.213 * sat) * r + (0.715 - 0.715 * sat) * g + (0.072 + 0.928 * sat) * b,
    )
    return tuple(max(0, min(255, round(c * 255))) for c in (r, g, b))

def render(name, size, count, radii, alphas, seed, warm=False):
    rnd = random.Random(seed)
    w = size * SCALE
    px = bytearray(w * w * 4)
    for _ in range(count):
        cx, cy = rnd.uniform(4, size - 4), rnd.uniform(4, size - 4)
        radius, peak = rnd.choice(radii), rnd.uniform(*alphas)
        color = rnd.choice(COLORS)
        if warm: color = sepia_saturate(color)
        x0, x1 = int((cx - radius) * SCALE) - 1, int((cx + radius) * SCALE) + 2
        y0, y1 = int((cy - radius) * SCALE) - 1, int((cy + radius) * SCALE) + 2
        for py in range(y0, y1):
            for qx in range(x0, x1):
                acc = 0.0
                for sy in range(4):
                    for sx in range(4):
                        d = math.hypot((qx + (sx + 0.5) / 4) / SCALE - cx, (py + (sy + 0.5) / 4) / SCALE - cy)
                        acc += max(0.0, 1 - d / radius)
                a = peak * acc / 16
                if a <= 0: continue
                i = (py * w + qx) * 4
                if a * 255 > px[i + 3]:
                    px[i:i + 4] = bytes((*color, round(a * 255)))
    raw = b"".join(b"\x00" + bytes(px[y * w * 4:(y + 1) * w * 4]) for y in range(w))
    chunk = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d) & 0xFFFFFFFF)
    png = b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, w, 8, 6, 0, 0, 0)) + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b"")
    open(f"{OUT}/{name}.png", "wb").write(png)
    print(name, f"{size}px", count, "stars", f"{len(png) / 1024:.1f} KB")

for warm in (False, True):
    suffix = "-warm" if warm else ""
    # Two base layers with unrelated tile sizes, so the repeat never lines up.
    render(f"stars-a{suffix}", 1024, 40, [1, 1, 1, 1.4, 1.6], (0.7, 0.9), 11, warm)
    render(f"stars-b{suffix}", 701, 13, [1, 1, 1.4], (0.7, 0.9), 23, warm)
    # The sparser set that twinkles.
    render(f"stars-twinkle{suffix}", 877, 13, [1, 1.2, 1.5, 1.8], (0.85, 0.95), 37, warm)
