import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <section className="flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md">
        <div className="mb-6 flex h-20 w-20 mx-auto items-center justify-center rounded-full bg-primary/10 text-primary">
          <Search size={40} />
        </div>
        <h1 className="text-8xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>
        <div className="mt-10">
          <Button as={Link} to="/" size="lg">
            Go Back Home
          </Button>
        </div>
      </div>
    </section>
  );
}