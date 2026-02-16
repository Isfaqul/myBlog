import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { BASE_API_URL } from "../config/env";
import MarkDown from "../components/MarkDown";
import type { AboutResponse } from "../types";

export default function About() {
  const [data, setData] = useState<AboutResponse>({ aboutMe: "", aboutThisPage: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/content/about`, {
          method: "GET",
        });

        if (!response.ok) {
          return;
        }

        const aboutPageData: AboutResponse = await response.json();

        setData(aboutPageData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="heading-b-border">
            About me
          </Heading>
        </hgroup>
        <div className="">
          <MarkDown>{data.aboutMe}</MarkDown>
        </div>
      </section>
      <section className="my-16">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} size="text-2xl" className="heading-b-border">
            About this page
          </Heading>
        </hgroup>
        <div className="space-y-6">
          <MarkDown>{data.aboutThisPage}</MarkDown>
        </div>
      </section>
    </>
  );
}
