import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Settings, UtensilsCrossed } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className="w-56 bg-[var(--color-ink)] text-white flex flex-col shrink-0"
        role="navigation"
        aria-label="Navigation administration"
      >
        <div className="p-4 border-b border-gray-700">
          <Link href="/" className="font-display text-lg font-bold text-[var(--color-accent)]">
            Kebab d&apos;Or
          </Link>
          <p className="text-xs text-gray-400 mt-0.5">Administration</p>
        </div>

        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {[
              { href: "/admin/commandes", label: "Commandes", icon: <ShoppingBag className="h-4 w-4" /> },
              { href: "/admin/menu", label: "Menu", icon: <UtensilsCrossed className="h-4 w-4" /> },
              { href: "/admin/parametres", label: "Paramètres", icon: <Settings className="h-4 w-4" /> },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-3 border-t border-gray-700">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <LayoutDashboard className="h-3 w-3" />
            Voir le site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  );
}
