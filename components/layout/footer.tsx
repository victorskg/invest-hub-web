export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-row justify-center items-center border-t h-16">
      <h4 className="font-medium text-sm">&copy; {currentYear} | Invest Hub</h4>
    </footer>
  );
}
