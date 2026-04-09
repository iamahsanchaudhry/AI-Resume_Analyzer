interface Props {
  title?: string;
  children: React.ReactNode;
}

export default function SectionWrapper({ title, children }: Props) {
  return (
    <section className="space-y-4">
      {title && (
        <h2 className="text-sm font-medium text-muted-foreground">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}