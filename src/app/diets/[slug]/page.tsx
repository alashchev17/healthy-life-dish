import { PageContainer } from "#/design/shared/PageContainer";

export default async function DietPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return <PageContainer>Diet page {slug}</PageContainer>;
}
