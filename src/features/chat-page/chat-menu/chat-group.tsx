import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
}

export const ChatGroup = (props: Props) => {
  return (
    <div className="flex flex-col">
      <div className="text-lg text-white p-3">{props.title}</div>
      <div>{props.children}</div>
    </div>
  );
};
