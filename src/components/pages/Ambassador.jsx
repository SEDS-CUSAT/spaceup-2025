"use client";
import React from "react";
import { StickyBanner } from "@/components/ui/sticky-banner";
import Link from "next/link";

const AMBASSADOR_URL = "https://spaceup-ambassador.sedscusat.com/";

const Ambassador = () => {
  return (
    <StickyBanner
      className="bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-500 text-white"
      showCloseButton={false}
      hideOnScroll={false}
    >
      <Link
        href={AMBASSADOR_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-4 px-4 py-3 text-sm md:text-base"
        aria-label="Visit the SpaceUp Ambassador site"
      >
        <span className="font-semibold hover:underline">Join as an Ambassador</span>
        <span className="opacity-90 text-sm hover:ring-1 ring-white p-2 rounded">Click Here →</span>
      </Link>
    </StickyBanner>
  );
};

export default Ambassador;
