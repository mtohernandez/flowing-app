"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { HomePageFilters } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const HomeFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");

  /**
   * Handles the click event for filter buttons.
   * Toggles the active state of the clicked filter,
   * updates the URL accordingly, and triggers a router navigation.
   *
   * @param {string} item - The value of the clicked filter.
   */
  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex">
      {HomePageFilters.map((item) => (
        <Button
          key={item.value}
          onClick={() => {
            handleTypeClick(item.value);
          }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === item.value
              ? "bg-primary-100 text-primary-500 dark:bg-dark-400"
              : "bg-light-800 text-light-500  hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
          }`}
        >
          {item.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
