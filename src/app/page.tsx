import { titleFont } from "./fonts/fonts";

export default function Home() {
  return (
    <div className="">
      <h1>Hola mundo</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola mundo</h1>
    </div>
  );
}
