
"use client"
import HeroComponent from "@/components/HeroComponent";

import AlmaCuerpoMente from "@/components/AlmaCuerpoMente";
import MovementBar from "@/components/MovmentBar";
import DateContent from "@/components/DateContent";

import YesOrNot from "@/components/YesOrNot";
import WhyOol from "@/components/WhyOol";
import BigCollabs from "@/components/BigCollabs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
<>
<HeroComponent/>
<AlmaCuerpoMente/>
<MovementBar/>
<DateContent/>


    <YesOrNot />
<BigCollabs/>
<Footer/>
</>
  );
}
