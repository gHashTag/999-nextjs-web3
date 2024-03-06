import { useRouter } from "next/router";

import { cn } from "../../@helpers/utils";

interface Props {
  text: string;
  variant: "primary" | "secondary";
  className?: string;
  isRouting: boolean;
  url: string;
}

export const Button: React.FC<Props> = ({
  text,
  variant,
  className,
  isRouting,
  url,
}) => {
  const { push } = useRouter();

  return (
    <div
      role="presentation"
      onClick={() => (isRouting ? push(url) : window.open(url))}
      className={cn(
        variant === "primary" ? "customPrimaryButton" : "customSecondaryButton",
        className,
        "transition-all flex items-center justify-center duration-300 ease-in-out h-14 w-auto border rounded-lg font-bold text-xl"
      )}
    >
      {text}
    </div>
  );
};
