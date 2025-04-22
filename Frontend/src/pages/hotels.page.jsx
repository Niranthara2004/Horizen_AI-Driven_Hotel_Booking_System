import { useGetHotelsQuery } from "@/lib/api";
import { useState } from "react";
import HotelCard from "@/components/HotelCard";
import HotelFilters from "@/components/HotelFilters";

export default function HotelsPage() {
  const [filters, setFilters] = useState({ location: "", sortByPrice: "" });

  const {
    data: hotels,
    isLoading,
    isError,
    error,
  } = useGetHotelsQuery(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (isLoading) {
    return (
      <section className="container mx-auto px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Hotels
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our full collection of hotels worldwide.
          </p>
        </div>
        <HotelFilters onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container mx-auto px-8 py-8 lg:py-16">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Hotels
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our full collection of hotels worldwide.
          </p>
        </div>
        <HotelFilters onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          <p className="text-red-500">{error?.message || "An unexpected error occurred."}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-8 py-8 lg:py-16">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          All Hotels
        </h2>
        <p className="text-lg text-muted-foreground">
          Explore our full collection of hotels worldwide.
        </p>
      </div>
      <HotelFilters onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id} hotel={hotel} confidence={1} />
        ))}
      </div>
    </section>
  );
}