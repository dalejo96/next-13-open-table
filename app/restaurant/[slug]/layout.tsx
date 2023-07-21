import React from "react";
import Header from "./components/Header";

interface Props {
  children: React.ReactNode;
  params: ParamsType;
}

interface ParamsType {
  slug: string;
}

export default function RestaurantLayout({ children, params }: Props) {
  return (
    <main>
      <Header slug={params.slug} />
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">{children}</div>
    </main>
  );
}
