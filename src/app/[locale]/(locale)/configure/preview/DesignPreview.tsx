"use client";
import Confetti from "react-confetti";
import { ConfigurarionInterface } from "../interfaces/interfaceConfigure";

interface Props {
  configuration: ConfigurarionInterface;
}

export default function DesignPreview({  }: Props) {
  const width = window.innerWidth || 300;
  const height = window.innerHeight || 300;
  return (
    <div>
      <Confetti width={width} height={height} tweenDuration={5}  />
    </div>
  );
}
