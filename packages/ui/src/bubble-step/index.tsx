import type { FC } from 'react';

type Props = {
  step: number;
  text: string;
};

export const BubbleStep: FC<Props> = ({ step, text }) => {
  return (
    <div className="flex items-center gap-3 min-h-16">
      <div className="flex justify-center items-center bg-gray-300 w-8 h-8 rounded-full">
        <p className=" text-primary text-xl">{step}</p>
      </div>
      <div className="w-[465px] bg-gray-100 rounded-xl p-3 min-h-16">
        <p className="font-medium">{text}</p>
      </div>
    </div>
  );
};
