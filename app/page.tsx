import Image from "next/image";
import { LoginForm } from "./(auth)/login/page";

export default function Home() {
  return (
    <main>
      <LoginForm/>
    </main>
  );
}
