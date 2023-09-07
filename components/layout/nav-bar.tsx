import MainNav from "@/components/layout/main-nav";
import UserNav from "@/components/layout/user-nav";
import ThemeToggle from "@/components/theme-toggle";

export default function NavBar() {
  return (
    <>
      <header className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
