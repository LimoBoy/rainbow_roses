import ProductFilters from "@/components/engagement-rings/filter";
import ProductCardGrid from "@/components/engagement-rings/products";
import ResultsToolbar from "@/components/engagement-rings/results-toolbar";

export default function EngagementRings() {
  return (
    <div>
      <ProductFilters/>
      <ResultsToolbar/>
      <ProductCardGrid/>
    </div>
  );
}