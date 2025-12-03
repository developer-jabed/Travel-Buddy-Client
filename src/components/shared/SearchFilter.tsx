"use client";
import { useDebounce } from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "../ui/input";

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
  type?: "text" | "number" | "date";
}

const SearchFilter = ({
  placeholder = "Search...",
  paramName = "searchTerm",
  type = "text",
}: SearchFilterProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(paramName) || "");
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const initialValue = searchParams.get(paramName) || "";

    if (debouncedValue === initialValue) return;

    if (debouncedValue) {
      params.set(paramName, debouncedValue);
      params.set("page", "1"); // reset page
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, paramName, router]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type={type}
        placeholder={placeholder}
        className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg border-gray-300 w-full transition-all duration-300"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPending}
      />
    </div>
  );
};

export default SearchFilter;
