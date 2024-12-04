import { liquidFunds } from '@/data/liquidFunds';
import { SingleFundView } from '@/components/liquidfunds/SingleFundView';

export async function generateStaticParams() {
  return liquidFunds.map((fund) => ({
    id: fund.id,
  }));
}

export default function SingleFundPage({ params }: { params: { id: string } }) {
  return <SingleFundView id={params.id} />;
} 