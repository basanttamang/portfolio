import { footer } from "../content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <p className="mx-auto max-w-[1080px] px-4 py-8 text-center text-sm text-muted sm:px-6">
        {footer.text}
      </p>
    </footer>
  );
}
