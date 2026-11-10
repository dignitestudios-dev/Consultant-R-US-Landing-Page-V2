import Link from "next/link";
import { LogoMark } from "./ui";

export function Footer() {
  return (
    <footer className="bg-navy-950 py-10">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-8 gap-y-5 text-[13px] text-muted">
        <div className="flex items-center gap-3">
          <LogoMark className="h-12" />
          <p>© {new Date().getFullYear()} Consultants R US Inc. All rights reserved.</p>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/term-conditions" className="hover:underline">Terms and Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
