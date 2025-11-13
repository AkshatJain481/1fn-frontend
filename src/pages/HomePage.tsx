import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import {
  Smartphone,
  CreditCard,
  Shield,
  Zap,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Percent,
} from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: CreditCard,
      title: "Flexible EMI Plans",
      description:
        "Choose from multiple EMI options tailored to your budget with zero hidden charges.",
    },
    {
      icon: TrendingDown,
      title: "Zero Interest Options",
      description:
        "Get premium products with 0% interest EMI plans on selected items.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Bank-grade security for all transactions with 100% buyer protection.",
    },
    {
      icon: Zap,
      title: "Instant Approval",
      description:
        "Get your EMI approved in seconds with our streamlined process.",
    },
  ];

  const benefits = [
    "No documentation required",
    "Instant approval process",
    "Flexible tenure options",
    "Cashback on select plans",
    "Premium brand collection",
    "24/7 customer support",
  ];

  const stats = [
    { value: "50K+", label: "Happy Customers", icon: Sparkles },
    { value: "0%", label: "Interest Plans", icon: Percent },
    { value: "24/7", label: "Support Available", icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20 dark:from-background dark:via-background dark:to-muted/10">
      {/* Hero Section */}
      <section className="container relative px-4 pt-20 pb-16 mx-auto max-w-7xl lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_35%_at_50%_50%,hsl(var(--primary)/0.1),transparent)] dark:bg-[radial-gradient(45%_35%_at_50%_50%,hsl(var(--primary)/0.15),transparent)]" />

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Smart EMI Solutions
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
                Buy Your Dream
                <span className="block mt-2 bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Smartphone Today
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl">
                Shop premium smartphones with flexible EMI plans starting from
                just ₹999/month. Zero paperwork, instant approval, and
                competitive interest rates.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto dark:bg-background/50 dark:hover:bg-accent/50"
              >
                How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-border/50">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Feature Card */}
          <div className="relative lg:ml-auto">
            <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-primary/10 blur-3xl rounded-full -z-10 dark:from-primary/30 dark:to-primary/20" />

            <Card className="border-2 shadow-2xl backdrop-blur dark:bg-card/50 dark:border-border/50">
              <CardHeader className="space-y-3 pb-6">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="dark:bg-secondary/50">
                    Featured
                  </Badge>
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">
                  Why Choose EMI Store?
                </CardTitle>
                <CardDescription className="text-base">
                  Experience hassle-free shopping with our customer-first
                  approach
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 dark:bg-muted/20 hover:bg-muted dark:hover:bg-muted/30 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-medium text-foreground">
                      {benefit}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container px-4 py-16 mx-auto max-w-7xl lg:py-24 bg-muted/30 dark:bg-muted/10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Powerful Features, Simple Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make smart purchasing decisions with
            confidence
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 dark:bg-card/50 dark:border-border/50 dark:hover:bg-card/70"
            >
              <CardHeader className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-16 mx-auto max-w-7xl lg:py-24">
        <Card className="relative overflow-hidden border-2 shadow-xl dark:bg-card/50 dark:border-border/50">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 dark:from-primary/20 dark:to-primary/10" />

          <CardContent className="relative p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our collection of premium smartphones and find the
                perfect EMI plan for you. No hidden charges, no surprises.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/products">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 shadow-lg"
                  >
                    View All Products
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
