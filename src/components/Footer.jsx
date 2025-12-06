export default function Footer() {
  return (
    <footer className="mt-12 bg-white border-t border-slate-200">
      <div className="flex justify-between max-w-6xl px-4 py-6 mx-auto text-sm text-slate-600">
        <p>© 2025 WorkHub. All Rights Reserved.</p>
        <div className="flex gap-4">
          <button className="hover:text-slate-900">Privacy</button>
          <button className="hover:text-slate-900">Terms</button>
          <button className="hover:text-slate-900">Support</button>
        </div>
      </div>
    </footer>
  );
}
