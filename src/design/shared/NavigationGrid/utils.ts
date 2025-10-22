import type { FooterData, ProgramBuilder } from "#/sanity/lib";
import type { NavigationLink, NavigationSection } from "./NavigationGrid";

type PrepareNavigationDataConfig = {
  programsData: ProgramBuilder[];
  generalLinks?: NonNullable<FooterData>["generalLinks"];
};

// Map program type to display label
const PROGRAM_TYPE_LABELS: Record<
  NonNullable<ProgramBuilder["type"]>,
  string
> = {
  diet: "Дієти",
  training: "Послуги",
};

const GENERAL_LINKS_LABEL = "Інше";

export function prepareNavigationData(
  config: PrepareNavigationDataConfig,
): NavigationSection[] {
  const { programsData, generalLinks } = config;
  const sections: NavigationSection[] = [];

  const groupedPrograms = programsData.reduce<
    Record<NonNullable<ProgramBuilder["type"]>, ProgramBuilder[]>
  >(
    (acc, program) => {
      const type = program.type;
      if (!type) return acc;
      if (!(type in acc)) {
        acc[type] = [];
      }
      acc[type].push(program);
      return acc;
    },
    {} as Record<NonNullable<ProgramBuilder["type"]>, ProgramBuilder[]>,
  );

  Object.entries(groupedPrograms).forEach(([programType, programs]) => {
    const type = programType as NonNullable<ProgramBuilder["type"]>;
    const links: NavigationLink[] = programs.map((program) => ({
      _type: "link",
      _key: program._id,
      label: program.title ?? "Untitled",
      url: `/program/${program.slug?.current}`,
    }));

    sections.push({
      label: PROGRAM_TYPE_LABELS[type],
      links,
    });
  });

  // Add general links section if available
  if (generalLinks && generalLinks.length > 0) {
    sections.push({
      label: GENERAL_LINKS_LABEL,
      links: generalLinks,
    });
  }

  return sections;
}
