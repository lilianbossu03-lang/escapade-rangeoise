export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-sand">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="font-playfair text-lg text-primary">Chargement&hellip;</p>
      </div>
    </div>
  );
}
