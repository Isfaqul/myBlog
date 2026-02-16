import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { BASE_API_URL } from "../config/env";
import MarkDown from "../components/MarkDown";
import type { AboutResponse } from "../types";

export default function About() {
  const [data, setData] = useState<AboutResponse>();

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

  const likes =
    data?.likes &&
    data?.likes.map((item) => (
      <p className="inline font-body text-green-300/70 bg-green-900/20 w-max px-2 py-1 rounded-md">{item}</p>
    ));

  const dislikes =
    data?.dislikes &&
    data?.dislikes.map((item) => (
      <p className="inline font-body text-red-200/70 bg-red-400/20 w-max px-2 py-1 rounded-md">{item}</p>
    ));

  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="heading-b-border">
            About me
          </Heading>
        </hgroup>
        <div className="">
          <MarkDown>{data?.aboutMe ?? ""}</MarkDown>
        </div>
      </section>
      <section className="my-8">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} size="text-2xl" className="heading-b-border">
            About this page
          </Heading>
        </hgroup>
        <div className="">
          <MarkDown>{data?.aboutThisPage ?? ""}</MarkDown>
        </div>
      </section>
      <section className="my-8">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} size="text-2xl" className="heading-b-border">
            Likes 👍
          </Heading>
        </hgroup>
        <div className="flex flex-wrap gap-2">{likes}</div>
      </section>
      <section className="my-8">
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={2} size="text-2xl" className="heading-b-border">
            Dislikes 😒
          </Heading>
        </hgroup>
        <div className="flex flex-wrap gap-2">{dislikes}</div>
      </section>
    </>
  );
}
