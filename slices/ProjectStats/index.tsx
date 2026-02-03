import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { Icon } from "@/components/icons/Icon";

export type ProjectStatsProps =
  SliceComponentProps<Content.ProjectStatsSlice>;

const ProjectStats: FC<ProjectStatsProps> = ({ slice }) => {
  const stats = slice.primary.stats?.slice(0, 3) ?? [];

  if (!stats.length) {
    return null;
  }

  return (
    <Section
      className="py-6"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.heading ? (
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.35em] text-white/60">
          {slice.primary.heading}
        </p>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const iconName = stat.icon_name || "logo";
          return (
            <div
              key={`${stat.value ?? "stat"}-${index}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40">
                <Icon name={iconName} size="28" alt="" />
              </div>
              <div className="mt-4 text-3xl font-black text-emerald-400">
                {stat.value || "0"}
              </div>
              <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/60">
                {stat.description || "Result"}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ProjectStats;
