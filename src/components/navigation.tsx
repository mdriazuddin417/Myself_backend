"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { BookOpen, FileText, FolderOpen, Home, LogOut, Mail, Menu, Settings, User, X } from "lucide-react"
import { useState } from "react"

const publicNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/blog", label: "Blog", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/resume", label: "Resume", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
]

const adminNavItems = [
  { href: "/admin", label: "Dashboard", icon: Settings },
  { href: "/admin/blog", label: "Manage Blog", icon: BookOpen },
  { href: "/admin/projects", label: "Manage Projects", icon: FolderOpen },
  { href: "/admin/messages", label: "Messages", icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()
  // const { user, logout } = useAuth()
  const logout=()=>{}
  const user={
    id:"1",
    name:"John Doe",
    email:"john@example.com", role:"admin"
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user?.role === "admin"
  const isAdminRoute = pathname.startsWith("/admin")

  const navItems = isAdminRoute ? adminNavItems : publicNavItems

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">AJ</span>
            </div>
            <span className="font-bold text-xl text-foreground">Alex Johnson</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                {isAdmin && !isAdminRoute && (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                {isAdminRoute && (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/">Public Site</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={logout} className="flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button asChild variant="default" size="sm">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* Mobile user actions */}
              <div className="pt-4 border-t border-border mt-4">
                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-muted-foreground">Welcome, {user.name}</div>
                    {isAdmin && !isAdminRoute && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin</span>
                      </Link>
                    )}
                    {isAdminRoute && (
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <Home className="w-4 h-4" />
                        <span>Public Site</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground"
                  >
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
