import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="mt-4 mb-4 md:mt-8">
      <p className="text-sm font-semibold text-center text-slate-500">
        Code by
        <Link
          href={"https://github.com/raymondtju"}
          target={"_blank"}
          className="font-bold text-gray-800"
        >
          {" @Ferropayo"}
        </Link>
        .
      </p>
    </footer>
  );
}
