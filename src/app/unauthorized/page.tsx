import Image from "next/image";

export default function Unauthorized() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <Image
        src="/logo-primary.svg"
        alt="Box Office Puglia"
        width={540}
        height={196}
        className="w-64 md:w-80 h-auto"
        priority
      />
    </main>
  );
}
