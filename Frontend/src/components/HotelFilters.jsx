import { useState } from "react";
import LocationTab from "@/components/LocationTab";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function HotelFilters({ onFilterChange }) {
  const locations = ["ALL", "France", "Italy", "Australia", "Japan"];
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [sortByPrice, setSortByPrice] = useState("");

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    onFilterChange({ location: location === "ALL" ? "" : location, sortByPrice });
  };

  const handleSortChange = (value) => {
    setSortByPrice(value);
    onFilterChange({ location: selectedLocation === "ALL" ? "" : selectedLocation, sortByPrice: value });
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
      <div className="flex items-center gap-x-4">
        {locations.map((location, i) => (
          <LocationTab
            key={i}
            selectedLocation={selectedLocation}
            name={location}
            onClick={handleLocationChange}
          />
        ))}
      </div>
      <Select onValueChange={handleSortChange} value={sortByPrice}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Price: Low to High</SelectItem>
          <SelectItem value="desc">Price: High to Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}