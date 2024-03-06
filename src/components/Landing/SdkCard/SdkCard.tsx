import StackIcons from "@components/assets/StackIcons";
import { useRouter } from "next/router";

import { cn } from "../../@helpers/utils";
import Link from "next/link";

interface Props {
  title: string;
  desc: string;
  typeArr: { title: string; url: string; icon: string }[];
}

const SdkCard: React.FC<Props> = ({ title, desc, typeArr }) => {
  const { push } = useRouter();
  return (
    <>
      <div className="px-6">
        <div className="mb-2 font-semibold text-2xl">{title}</div>
        <div className="max-w-md text-base text-slate-50">{desc}</div>
      </div>
      <div
        className={cn(
          "md:h-60 h-full bg-[#262626] rounded-2xl flex flex-col items-center justify-center px-5  gap-6 w-full"
        )}
      >
        {typeArr.map(({ icon, title, url }) => (
          <Link href={url}>
            <div
              key={title}
              className="flex items-center justify-start gap-4 cursor-pointer  w-full hover:bg-[#474747] p-1.5 rounded-lg transition-all duration-300 ease-in-out"
              role="presentation"
            >
              <div className="text-start">
                {StackIcons[icon as keyof typeof StackIcons]}
              </div>
              <div className="text-start text-xl font-bold">{title}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SdkCard;
