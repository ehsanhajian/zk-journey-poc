import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ name: "description", content: "Welcome to the Gacha Party!" }];
};

import banner from "../images/title.png";
import details from "../images/details.png";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex-col space-y-12 container mx-auto p-6">
      <img src={banner} alt="" className="mx-auto" />
      <div>
        <Link to="/countryside">
          <img src={details} alt="" className="mx-auto" />
        </Link>
      </div>
    </div>
  );
}
