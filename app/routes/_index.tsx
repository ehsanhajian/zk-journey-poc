import type { MetaFunction, LoaderFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ name: "description", content: "Welcome to the Gacha Party!" }];
};

export const loader: LoaderFunction = async () => {
  return { message: "Hello World" };
};

export default function Index() {
  return <div>sdfs</div>;
}
