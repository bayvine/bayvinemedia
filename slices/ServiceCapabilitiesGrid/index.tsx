import { FC } from "react";
import {
  type ImageField,
  type KeyTextField,
  type RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";

type CapabilityItem = {
  icon: ImageField;
  title: KeyTextField;
  description: KeyTextField;
};

type ToolItem = {
  logo: ImageField;
  name: KeyTextField;
  detail: KeyTextField;
};

type ServiceCapabilitiesGridSlice = {
  slice_type: "service_capabilities_grid";
  variation: "default";
  primary: {
    eyebrow: KeyTextField;
    heading: RichTextField;
    description: RichTextField;
    capabilities: CapabilityItem[];
    tools_heading: KeyTextField;
    tools: ToolItem[];
  };
};

export type ServiceCapabilitiesGridProps =
  SliceComponentProps<ServiceCapabilitiesGridSlice>;

const ServiceCapabilitiesGrid: FC<ServiceCapabilitiesGridProps> = ({ slice }) => {
  const capabilities = slice.primary.capabilities ?? [];
  const tools = slice.primary.tools ?? [];
  const hasIntro = slice.primary.eyebrow || slice.primary.heading?.length || slice.primary.description?.length;

  if (!hasIntro && !capabilities.length && !tools.length) {
    return null;
  }

  return (
    <Section
      className="py-12"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-[#050816] px-6 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        <div
          aria-hidden
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: [
              "radial-gradient(circle at 18% 18%, rgba(113, 255, 215, 0.16) 0%, transparent 26%)",
              "radial-gradient(circle at 82% 22%, rgba(119, 194, 255, 0.18) 0%, transparent 24%)",
              "radial-gradient(circle at 50% 100%, rgba(245, 158, 11, 0.12) 0%, transparent 24%)",
              "linear-gradient(180deg, rgba(10, 14, 28, 0.96) 0%, rgba(5, 8, 22, 1) 100%)",
            ].join(", "),
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="absolute -left-8 top-1/3 h-32 w-32 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative z-10">
          {hasIntro ? (
            <div className="mx-auto max-w-4xl text-center">
              {slice.primary.eyebrow ? (
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.38em] text-white/55 sm:text-sm">
                  {slice.primary.eyebrow}
                </p>
              ) : null}

              <div className="text-balance">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={{
                    heading1: ({ children }) => (
                      <h2 className="text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                        {children}
                      </h2>
                    ),
                    heading2: ({ children }) => (
                      <h2 className="text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                        {children}
                      </h2>
                    ),
                    paragraph: ({ children }) => (
                      <h2 className="text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                        {children}
                      </h2>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-black text-white">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="not-italic text-emerald-200">{children}</em>
                    ),
                  }}
                />
              </div>

              <div className="mx-auto mt-4 max-w-3xl text-pretty">
                <PrismicRichText
                  field={slice.primary.description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-base leading-relaxed text-white/72 sm:text-lg">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="not-italic text-emerald-100">{children}</em>
                    ),
                  }}
                />
              </div>
            </div>
          ) : null}

          {capabilities.length ? (
            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {capabilities.map((capability, index) => (
                <article
                  key={`${capability.title ?? "capability"}-${index}`}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(12,16,30,0.82)_45%,rgba(7,10,20,0.92))] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 group-focus-within:opacity-100">
                    <div className="absolute inset-x-10 top-0 h-20 rounded-full bg-emerald-200/10 blur-3xl" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col items-center text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                      {capability.icon?.url ? (
                        <PrismicNextImage
                          field={capability.icon}
                          fallbackAlt=""
                          className="h-9 w-9 object-contain opacity-90"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-100/70">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      {capability.title}
                    </h3>

                    {capability.description ? (
                      <p className="mt-3 text-base leading-relaxed text-white/70">
                        {capability.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {tools.length ? (
            <div className="mt-8 rounded-[24px] border border-white/10 bg-black/25 p-4 sm:p-6">
              {slice.primary.tools_heading ? (
                <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.36em] text-white/55 sm:text-sm">
                  {slice.primary.tools_heading}
                </p>
              ) : null}

              <div className="flex flex-wrap items-stretch justify-center gap-3">
                {tools.map((tool, index) => (
                  <div
                    key={`${tool.name ?? "tool"}-${index}`}
                    className="inline-flex min-w-[180px] items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20">
                      {tool.logo?.url ? (
                        <PrismicNextImage
                          field={tool.logo}
                          fallbackAlt=""
                          className="h-7 w-7 object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm font-bold uppercase text-emerald-100/80">
                          {(tool.name || "T").slice(0, 1)}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-white">
                        {tool.name}
                      </p>
                      {tool.detail ? (
                        <p className="truncate text-xs text-white/55">{tool.detail}</p>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
};

export default ServiceCapabilitiesGrid;
