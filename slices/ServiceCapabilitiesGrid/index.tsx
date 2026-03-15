import { FC } from "react";
import {
  type ImageField,
  type KeyTextField,
  type RichTextField,
} from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import AuroraPanel from "@/components/AuroraPanel";
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
  const hasIntro =
    slice.primary.eyebrow ||
    slice.primary.heading?.length ||
    slice.primary.description?.length;

  if (!hasIntro && !capabilities.length && !tools.length) {
    return null;
  }

  return (
    <Section
      className="py-12 rounded-sm"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AuroraPanel
        variant="panel"
        className="-mx-4 rounded-none sm:rounded-lg px-6 py-8 sm:mx-0  sm:px-8 sm:py-10 lg:px-12 lg:py-14"
      >
        <div>
          {hasIntro ? (
            <div className="mx-auto max-w-4xl text-center">
              {slice.primary.eyebrow ? (
                <p className="mb-4 text-xs font-semibold uppercase  sm:text-sm">
                  {slice.primary.eyebrow}
                </p>
              ) : null}

              <div className="font-black uppercase">
                <PrismicRichText
                  field={slice.primary.heading}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="text-4xl font-black uppercase sm:text-5xl lg:text-6xl">
                        {children}
                      </h2>
                    ),
                    paragraph: ({ children }) => (
                      <h2 className="text-lg">
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
                      <p className="text-base leading-relaxed sm:text-lg">
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
                  className="group px-6 py-7 border border-white/15 rounded-lg"
                >
              

                  <div className="relative z-10 flex h-full flex-col items-center text-center">
                    <div className="mb-4 flex w-10 items-center justify-center">
                      {capability.icon?.url ? (
                        <PrismicNextImage
                          field={capability.icon}
                          fallbackAlt=""
                          className=" object-contain opacity-90 fill-emerald-300"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-100/70">
                          {(index + 1).toString().padStart(2, "0")}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold uppercase">
                      {capability.title}
                    </h3>

                    {capability.description ? (
                      <p className=" text-base max-w-xs mt-1 ">
                        {capability.description}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {tools.length ? (
            <div className="mt-8 p-4 sm:p-6">
              {slice.primary.tools_heading ? (
                <p className="mb-4 text-center text-xs font-semibold uppercase  text-white/55 sm:text-sm">
                  {slice.primary.tools_heading}
                </p>
              ) : null}

              <div className="overflow-hidden sm:hidden">
                <div className="flex w-max gap-3 animate-scroll-horizontal pr-3">
                  {[0, 1].map((copyIndex) =>
                    tools.map((tool, index) => (
                      <div
                        key={`${tool.name ?? "tool"}-${copyIndex}-${index}`}
                        aria-hidden={copyIndex === 1}
                        className="inline-flex  items-center px-5 py-3"
                      >
                        <div className="flex w-15 shrink-0 items-center justify-center">
                          {tool.logo?.url ? (
                            <PrismicNextImage
                              field={tool.logo}
                              fallbackAlt=""
                              className="w-15"
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
                    )),
                  )}
                </div>
              </div>

              <div className="hidden flex-wrap items-stretch justify-center gap-3 sm:flex">
                {tools.map((tool, index) => (
                  <div
                    key={`${tool.name ?? "tool"}-${index}`}
                    className="inline-flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex w-15 shrink-0 items-center justify-center ">
                      {tool.logo?.url ? (
                        <PrismicNextImage
                          field={tool.logo}
                          fallbackAlt=""
                          className="w-15"
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
      </AuroraPanel>
    </Section>
  );
};

export default ServiceCapabilitiesGrid;
