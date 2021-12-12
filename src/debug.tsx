import { ComponentChildren, h } from "preact";

const Debug = (props: { children: ComponentChildren }) => {
  return <div class="border-red-500 border-4">{props.children}</div>;
};

export default Debug;
