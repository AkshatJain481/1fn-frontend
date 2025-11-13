import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu, ShoppingCart, Wallet, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Products", href: "/products", icon: ShoppingCart },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 mx-auto">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              PayEasy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Separator orientation="vertical" className="hidden h-6 md:block" />
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link to={item.href}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent dark:hover:bg-accent/50"
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mode Toggle */}
          <ModeToggle />

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden dark:border-border/50"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[280px] sm:w-[350px] dark:bg-background dark:border-border/50"
            >
              <div className="flex flex-col gap-4 pt-8">
                {/* Mobile Logo */}
                <div className="flex items-center gap-3 px-2">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
                    <Wallet className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-xl bg-linear-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    PayEasy
                  </span>
                </div>

                <Separator className="dark:bg-border/50" />

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 text-base dark:hover:bg-accent/50"
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </div>

                <Separator className="dark:bg-border/50" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
