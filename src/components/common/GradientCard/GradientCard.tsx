import React, { MouseEvent } from "react";

import {
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { useRouter } from "next/router";

import Icon from "./Icon";

interface IPatterns {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

const Pattern: React.FC<IPatterns> = ({ mouseX, mouseY }) => {
  const maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50" />
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-0 transition duration-300 group-hover:opacity-100 bg-white/10"
        style={style}
      />
    </div>
  );
};

export type TResourceType = {
  href: string;
  pattern: {
    y: number;
    squares: number[][];
  };
  name: string;
  description: string;
  icon: JSX.Element | any;
};

interface Props {
  resource: TResourceType;
  isShowcase?: boolean;
}

const GradientCard: React.FC<Props> = ({ resource, isShowcase }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { push } = useRouter();

  // Handlers
  function onMouseMove(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      key={resource.href}
      onMouseMove={(e) => onMouseMove(e)}
      className="group relative flex rounded-2xl transition-shadow hover:shadow-md bg-white/2.5 hover:shadow-black/5 cursor-pointer"
      onClick={() =>
        isShowcase ? window.open(resource.href) : push(resource.href)
      }
    >
      <Pattern {...resource.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 ring-white/10 group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pt-8 pb-4">
        <Icon Comp={resource.icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-white">
          <div>
            <span className="absolute inset-0 rounded-2xl" />
            {resource.name}
          </div>
        </h3>
        <p className="mt-1 text-sm text-zinc-400 group-hover:text-white">
          {resource.description}
        </p>
      </div>
    </div>
  );
};

export default React.memo(GradientCard);
