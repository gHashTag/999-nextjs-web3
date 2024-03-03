import Link from "next/link";

import Copyright from "./Copyright";
import FooterContent from "./FooterContent";

// Components

export function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const classes =
    "text-sm text-gray-500 no-underline betterhover:hover:text-gray-700 betterhover:hover:dark:text-white transition";
  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <div className={classes}>{children}</div>
    </Link>
  );
}

export function FooterHeader({ children }: { children: React.ReactNode }) {
  return <h3 className="text-sm text-gray-900 dark:text-white">{children}</h3>;
}

export function Footer() {
  return (
    <footer
      className="overflow-x-hidden w-full  pt-8 pb-4 px-6 border-t border-slate-700 bg-[#090a0b] relative z-20"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <FooterContent />
      <Copyright />
    </footer>
  );
}
