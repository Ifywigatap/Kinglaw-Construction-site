export default function SectionHeading({
  subtitle,
  title,
  description,
}) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      {subtitle && (
        <p className="text-primary font-semibold uppercase tracking-wider mb-3 transition-colors duration-300">
          {subtitle}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 transition-colors duration-300">
        {title}
      </h2>

      {description && (
        <p className="text-muted-foreground leading-relaxed transition-colors duration-300">
          {description}
        </p>
      )}
    </div>
  );
}