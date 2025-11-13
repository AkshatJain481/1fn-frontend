import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router";
import { Home, ShoppingCart, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 404 Animation */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative">
            <h1 className="text-[150px] sm:text-[200px] font-bold leading-none bg-linear-to-br from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent select-none">
              404
            </h1>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Oops! Looks like you've wandered into uncharted territory. The page
            you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/">
            <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <Link to="/products">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto gap-2 dark:bg-background/50 dark:hover:bg-accent/50"
            >
              <ShoppingCart className="w-4 h-4" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Quick Links Card */}
        <Card className="mt-12 dark:bg-card/50 dark:border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Search className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Looking for something specific?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/" className="group">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 dark:bg-muted/20 hover:bg-muted dark:hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <Home className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      Homepage
                    </p>
                    <p className="text-xs text-muted-foreground">Start fresh</p>
                  </div>
                </div>
              </Link>

              <Link to="/products" className="group">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 dark:bg-muted/20 hover:bg-muted dark:hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">
                      Products
                    </p>
                    <p className="text-xs text-muted-foreground">
                      View catalog
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go back to previous page
        </button>
      </div>
    </div>
  );
};

export default NotFound;
