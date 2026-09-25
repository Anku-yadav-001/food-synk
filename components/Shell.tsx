// Full-width page background. Content containers inside each page control max width.
// overflow-x-clip (not hidden) keeps position:sticky working for the bottom nav.
export default function Shell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <main className={`bg-canvas relative flex min-h-dvh w-full flex-col overflow-x-clip ${className}`}>{children}</main>;
}
