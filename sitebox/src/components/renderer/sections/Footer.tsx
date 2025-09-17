export default function Footer({ links, tokens }: any) {
  return (
    <footer className="w-full py-8 bg-gray-900 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400">© 2024 Tu Empresa. Todos los derechos reservados.</p>
          </div>
          {links && links.length > 0 && (
            <div className="flex gap-6">
              {links.map((link: any, index: number) => (
                <a key={index} href={link.href} className="text-gray-400 hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
