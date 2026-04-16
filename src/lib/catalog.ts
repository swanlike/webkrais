import { readItems } from '@directus/sdk';
import { directus, getImageUrl, hasDirectusConfig, type Machine, type ToolGroup } from './directus';
import { machines as mockMachines } from '../features/products/data/mockData';

export interface CategorySummary {
  id: string;
  name: string;
  count: number;
}

export interface GroupedCategory extends CategorySummary {
  machines: Machine[];
}

export interface CatalogData {
  machines: Machine[];
  categories: CategorySummary[];
  groupedCategories: GroupedCategory[];
  featuredMachines: Machine[];
  source: 'directus' | 'mock';
}

function normalizeCategory(machine: Machine): CategorySummary {
  if (machine.grupa_narzedzi && typeof machine.grupa_narzedzi === 'object') {
    return {
      id: String(machine.grupa_narzedzi.id),
      name: machine.grupa_narzedzi.name || 'Other tools',
      count: 0,
    };
  }

  if (machine.grupa_narzedzi) {
    return {
      id: String(machine.grupa_narzedzi),
      name: String(machine.grupa_narzedzi),
      count: 0,
    };
  }

  return {
    id: 'other',
    name: 'Other tools',
    count: 0,
  };
}

function enrichMachinesWithGroups(machines: Machine[], groups: ToolGroup[]): Machine[] {
  const normalizedGroups = groups.map((group) => ({
    ...group,
    name: group.name || group.Name || '',
  }));

  const groupsById = new Map(normalizedGroups.map((group) => [String(group.id), group]));

  return machines.map((machine) => {
    if (!machine.grupa_narzedzi) {
      return machine;
    }

    if (typeof machine.grupa_narzedzi === 'object') {
      const resolvedGroup = groupsById.get(String(machine.grupa_narzedzi.id));

      if (resolvedGroup) {
        return {
          ...machine,
          grupa_narzedzi: resolvedGroup,
        };
      }

      return machine;
    }

    const resolvedGroup = groupsById.get(String(machine.grupa_narzedzi));

    if (!resolvedGroup) {
      return machine;
    }

    return {
      ...machine,
      grupa_narzedzi: resolvedGroup,
    };
  });
}

export async function loadMachines(): Promise<{ machines: Machine[]; source: 'directus' | 'mock' }> {
  if (!hasDirectusConfig) {
    return { machines: mockMachines, source: 'mock' };
  }

  try {
    const machines = (await directus.request(
      readItems('Beveling_machines', {
        fields: ['*', { grupa_narzedzi: ['id'] }],
      }),
    )) as Machine[];

    let enrichedMachines = machines;

    try {
      const groups = await directus.request(readItems('tool_group', { fields: ['id', 'Name'] })) as ToolGroup[];
      enrichedMachines = enrichMachinesWithGroups(machines, groups);
    } catch (error) {
      console.warn('Failed to load tool_group names, keeping machine data without group labels:', error);
    }

    return {
      machines: enrichedMachines.length ? enrichedMachines : mockMachines,
      source: enrichedMachines.length ? 'directus' : 'mock',
    };
  } catch (error) {
    console.error('Failed to load Directus data:', error);
    return { machines: mockMachines, source: 'mock' };
  }
}

export async function loadCatalog(): Promise<CatalogData> {
  const { machines, source } = await loadMachines();
  const categoriesMap = new Map<string, GroupedCategory>();

  for (const machine of machines) {
    const category = normalizeCategory(machine);

    if (!categoriesMap.has(category.id)) {
      categoriesMap.set(category.id, {
        ...category,
        count: 0,
        machines: [],
      });
    }

    const group = categoriesMap.get(category.id);
    if (group) {
      group.machines.push(machine);
      group.count += 1;
    }
  }

  const groupedCategories = Array.from(categoriesMap.values())
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((group) => ({
      ...group,
      machines: group.machines.sort((left, right) => left.name.localeCompare(right.name)),
    }));

  const categories = groupedCategories.map(({ machines: _, ...category }) => category);

  const featuredMachines = machines.filter((machine) => machine.featured).slice(0, 3);

  return {
    machines,
    categories,
    groupedCategories,
    featuredMachines: featuredMachines.length ? featuredMachines : machines.slice(0, 3),
    source,
  };
}

export async function loadCategory(id: string): Promise<GroupedCategory | null> {
  const { machines } = await loadMachines();
  const categoriesMap = new Map<string, GroupedCategory>();

  for (const machine of machines) {
    const category = normalizeCategory(machine);

    if (!categoriesMap.has(category.id)) {
      categoriesMap.set(category.id, {
        ...category,
        count: 0,
        machines: [],
      });
    }

    const group = categoriesMap.get(category.id);
    if (group) {
      group.machines.push(machine);
      group.count += 1;
    }
  }

  return categoriesMap.get(id) || null;
}

export function getMachineHref(machine: Machine): string {
  return `/machine/${machine.id}`;
}

export function getCategoryHref(categoryId: string): string {
  return `/category/${categoryId}`;
}

export function getMachineImage(machine: Machine): string {
  return getImageUrl(machine.main_photo);
}
