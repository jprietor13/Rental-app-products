export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-auto border-t border-slate-200/70 bg-slate-50/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
        <p>© {currentYear} — Desarrollado por <span className="font-semibold text-slate-700">Juan Prieto</span></p>
        <p>Email: <a href="mailto:jp1739@gmail.com" className="text-brand-600 hover:underline">jp1739@gmail.com</a></p>
      </div>
    </footer>
  );
};
