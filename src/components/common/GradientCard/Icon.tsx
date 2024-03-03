interface Props {
  Comp: React.ElementType;
}

const Icon = ({ Comp }: Props) => (
  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-400/25 backdrop-blur-[2px] transition duration-300  group-hover:ring-zinc-900/25 bg-white/7.5 ring-white/15 group-hover:bg-white/80 group-hover:ring-white">
    <Comp className="h-5 w-5 transition-colors duration-300 fill-white/10 stroke-zinc-400 group-hover:fill-emerald-300/10 group-hover:stroke-blue-500" />
  </div>
);

export default Icon;
