import { Container } from "@/components/ui/Container";

export type AtAGlanceItem = {
  accentColor: string;
  text: string;
  icon?: React.ReactNode;
};

const DEFAULT_ITEMS: AtAGlanceItem[] = [
  {
    accentColor: "#C9E5D2",
    text: "3 evidence pillars: Colour • Materiality • Sensory",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.1574 18.7153C10.0538 18.0477 10.0001 17.3637 10.0001 16.6673C10.0001 9.30352 16.0089 3.33398 23.4212 3.33398C30.8334 3.33398 36.8422 9.30352 36.8422 16.6673C36.8422 18.3308 36.5356 19.9231 35.9754 21.3915C35.8591 21.6965 35.8009 21.8489 35.7745 21.968C35.7483 22.086 35.7382 22.1689 35.7354 22.2897C35.7325 22.4116 35.749 22.5459 35.7821 22.8145L36.4531 28.2649C36.5257 28.8549 36.562 29.1499 36.4639 29.3644C36.3779 29.5523 36.2252 29.7015 36.0353 29.7832C35.8186 29.8763 35.5245 29.8332 34.9364 29.747L29.6276 28.9688C29.3504 28.9282 29.2118 28.9079 29.0856 28.9086C28.9607 28.9093 28.8743 28.9185 28.7521 28.9442C28.6286 28.9702 28.4707 29.0293 28.1551 29.1475C26.683 29.6989 25.0875 30.0007 23.4212 30.0007C22.7242 30.0007 22.0396 29.9479 21.3713 29.8461M12.7195 36.6673C17.661 36.6673 21.6668 32.5633 21.6668 27.5007C21.6668 22.438 17.661 18.334 12.7195 18.334C7.77797 18.334 3.77209 22.438 3.77209 27.5007C3.77209 28.5183 3.93396 29.4972 4.23274 30.4119C4.35905 30.7985 4.4222 30.9918 4.44292 31.1239C4.46456 31.2618 4.46835 31.3392 4.4603 31.4785C4.45258 31.612 4.41919 31.7628 4.3524 32.0645L3.3335 36.6673L8.32483 35.9856C8.59727 35.9484 8.73349 35.9298 8.85244 35.9306C8.9777 35.9315 9.04417 35.9383 9.16701 35.9628C9.28367 35.986 9.4571 36.0472 9.80395 36.1696C10.7178 36.4922 11.6987 36.6673 12.7195 36.6673Z" stroke="#C9E5D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    accentColor: "#E0EFF4",
    text: "6 NBRS contributors across design and research disciplines",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.0002 20.0007L3.88646 15.7432C2.84973 19.6671 3.28038 23.8344 5.09761 27.4633C6.91484 31.0922 9.99376 33.9334 13.7567 35.4537L20.0002 20.0007ZM20.0002 20.0007L20.1747 3.3349C16.4761 3.29617 12.8697 4.48887 9.92353 6.72515C6.97733 8.96144 4.85874 12.1142 3.90142 15.687L20.0002 20.0007ZM36.6668 20.0007C36.6668 29.2054 29.2049 36.6673 20.0002 36.6673C10.7954 36.6673 3.33352 29.2054 3.33352 20.0007C3.33352 10.7959 10.7954 3.33398 20.0002 3.33398C29.2049 3.33398 36.6668 10.7959 36.6668 20.0007Z" stroke="#E0EFF4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    accentColor: "#FFD6CD",
    text: "12 peer-reviewed studies referenced",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M35 8.33398C35 11.0954 28.2843 13.334 20 13.334C11.7157 13.334 5 11.0954 5 8.33398M35 8.33398C35 5.57256 28.2843 3.33398 20 3.33398C11.7157 3.33398 5 5.57256 5 8.33398M35 8.33398V31.6673C35 34.434 28.3333 36.6673 20 36.6673C11.6667 36.6673 5 34.434 5 31.6673V8.33398M35 16.201C35 18.9677 28.3333 21.201 20 21.201C11.6667 21.201 5 18.9677 5 16.201M35 24.0673C35 26.834 28.3333 29.0673 20 29.0673C11.6667 29.0673 5 26.834 5 24.0673" stroke="#FFD6CD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
  {
    accentColor: "#FDFFEA",
    text: "1 case-study ward demonstrating increased patient mobility after chromatic retrofit",
    icon: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0002 20.0007L18.3335 23.334L25.8335 15.834M29.8355 8.3315C30.1787 9.16154 30.8374 9.82131 31.6669 10.1658L34.5756 11.3706C35.4056 11.7145 36.0651 12.374 36.409 13.2041C36.7528 14.0342 36.7528 14.9669 36.409 15.797L35.205 18.7037C34.861 19.5341 34.8606 20.4678 35.2061 21.2978L36.408 24.2036C36.5784 24.6148 36.6662 25.0555 36.6662 25.5006C36.6663 25.9456 36.5787 26.3864 36.4084 26.7976C36.2381 27.2088 35.9884 27.5824 35.6736 27.897C35.3589 28.2117 34.9852 28.4613 34.574 28.6314L31.6674 29.8354C30.8374 30.1786 30.1777 30.8374 29.8332 31.6669L28.6284 34.5757C28.2846 35.4058 27.6251 36.0653 26.795 36.4092C25.9649 36.753 25.0323 36.753 24.2022 36.4092L21.2956 35.2052C20.4655 34.8622 19.5332 34.8629 18.7036 35.2071L15.795 36.4102C14.9654 36.7533 14.0335 36.753 13.2041 36.4094C12.3747 36.0659 11.7156 35.4071 11.3715 34.5779L10.1664 31.6683C9.82316 30.8383 9.1644 30.1785 8.33491 29.834L5.42627 28.6292C4.59655 28.2855 3.93726 27.6264 3.5933 26.7968C3.24934 25.9671 3.24888 25.0349 3.592 24.2049L4.79594 21.2982C5.13892 20.4681 5.13822 19.5357 4.79399 18.7061L3.59178 15.7953C3.42133 15.3841 3.33357 14.9434 3.3335 14.4984C3.33342 14.0533 3.42105 13.6126 3.59137 13.2014C3.76168 12.7902 4.01135 12.4166 4.32611 12.1019C4.64086 11.7872 5.01454 11.5377 5.42577 11.3675L8.33232 10.1635C9.16161 9.8206 9.82097 9.16265 10.1657 8.33408L11.3705 5.42533C11.7143 4.59523 12.3738 3.93571 13.2039 3.59187C14.0339 3.24802 14.9666 3.24802 15.7967 3.59187L18.7032 4.79584C19.5333 5.13884 20.4657 5.13814 21.2953 4.7939L24.2051 3.59373C25.0351 3.25008 25.9675 3.25015 26.7975 3.59393C27.6274 3.9377 28.2868 4.59703 28.6307 5.42692L29.8358 8.33653L29.8355 8.3315Z" stroke="#FDFFEA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
  },
];

export function AtAGlanceSection({
  title = "AT A GLANCE",
  items = DEFAULT_ITEMS,
}: {
  title?: string;
  items?: AtAGlanceItem[];
}) {
  return (
    <section className="bg-white py-12 lg:py-20 text-black">
      <Container>
        {/* Title */}
        <h2
          data-aos="fade-up"
          className="font-heading text-3xl sm:text-4xl uppercase font-bold text-black leading-none mb-8 lg:mb-12"
        >
          {title}
        </h2>

        {/* 4 Black Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative bg-black pt-10 pb-8 px-6 flex flex-col justify-start items-center text-center rounded-sm min-h-[224px] h-full transition-transform duration-300 hover:-translate-y-1.5 shadow-md overflow-hidden group"
            >
              {/* Top Accent Color Bar (Edge-to-Edge at Top Border) */}
              <div
                className="absolute top-0 left-0 right-0 h-2.5"
                style={{ backgroundColor: item.accentColor }}
              />

              {/* Icon in Center */}
              <div className="w-10 h-10 mb-5 flex items-center justify-center text-white shrink-0">
                {typeof item.icon === "string" ? (
                  <div
                    className="w-10 h-10 flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                ) : item.icon ? (
                  item.icon
                ) : (
                  <div className="w-8 h-8 rounded-sm border-2 border-white/60 group-hover:border-white transition-colors" />
                )}
              </div>

              {/* Stat Card Text */}
              <p className="font-sans text-base sm:text-[18px] text-white font-normal max-w-[210px]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
