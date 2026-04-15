import Image from "next/image";
import logoWhite from "../../public/logo-white.svg";

export default function Unauthorized() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <Image
        src={logoWhite}
        alt="Box Office Puglia"
        width={300}
        priority
        className="object-contain"
      />
    </main>
  );
}
