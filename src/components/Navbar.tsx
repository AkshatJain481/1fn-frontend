import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Menu, ShoppingCart, CreditCard, Home } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Products", href: "/products", icon: ShoppingCart },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CreditCard className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="hidden font-bold text-lg sm:inline-block from-primary to-primary/60 bg-clip-text text-transparent">
                EMI Store
              </span>
              <span className="hidden text-[10px] text-muted-foreground sm:inline-block">
                Smart Shopping
              </span>
            </div>
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
          {/* Cart Badge */}
          <Button
            variant="outline"
            size="sm"
            className="relative gap-2 hidden sm:flex dark:border-border/50 dark:hover:bg-accent/50"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden md:inline">Cart</span>
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              0
            </Badge>
          </Button>

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
                <div className="flex items-center gap-2 px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">EMI Store</span>
                    <span className="text-xs text-muted-foreground">
                      Smart Shopping
                    </span>
                  </div>
                </div>

                <Separator className="dark:bg-border/50" />

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

                <Button
                  variant="outline"
                  className="w-full gap-2 justify-start relative dark:border-border/50"
                  onClick={() => setOpen(false)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  View Cart
                  <Badge
                    variant="destructive"
                    className="ml-auto h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    0
                  </Badge>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
