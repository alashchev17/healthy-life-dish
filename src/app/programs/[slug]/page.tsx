import { PageContainer } from "#/design/shared/PageContainer";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return <PageContainer>Program page {slug}</PageContainer>;
}
