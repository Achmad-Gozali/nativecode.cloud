export function buatSlug(judul: string): string {
  return judul
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function buatSlugUnik(
  judul: string,
  cekSudahAda: (slug: string) => Promise<boolean>
): Promise<string> {
  const slugDasar = buatSlug(judul);
  let slug = slugDasar;
  let counter = 1;

  while (await cekSudahAda(slug)) {
    slug = `${slugDasar}-${counter}`;
    counter++;
  }

  return slug;
}