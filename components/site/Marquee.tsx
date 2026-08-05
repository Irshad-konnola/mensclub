const items = [
  "MensClub", 
  "Malappuram", 
  "Est. 2001", 
  "Shirts", 
  "Trousers",
  "Dhothi", 
  "Ethnic Wear", 
  "Accessories", 
  "Bespoke Tailoring",
  "Unstitched Fabrics",
  "In-House Stitching"
];

export function Marquee() {
  const sequence = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-paper border-y border-ink/10 overflow-hidden py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {[0, 1].map(k => (
          <div key={k} className="flex shrink-0">
            {sequence.map((s, i) => (
              <span key={`${k}-${i}`} className="font-display text-ink text-3xl md:text-4xl tracking-tight px-6 flex items-center">
                {s}
                <span className="ml-12 text-accent-rust font-italic-serif">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
