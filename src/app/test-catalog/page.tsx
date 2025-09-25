import RepairCatalog from '@/components/repairs/RepairCatalog';
import { getModelById } from '@/data/apple/models';

export default function TestCatalogPage() {
  const modelSpec = getModelById('iphone-6');
  
  if (!modelSpec) {
    return <div>Model not found</div>;
  }

  return <RepairCatalog modelSpec={modelSpec} />;
}
