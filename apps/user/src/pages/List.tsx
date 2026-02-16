import Heading from "../components/Heading";

function List() {
  return (
    <>
      <section>
        <hgroup className="flex justify-between items-baseline mb-6">
          <Heading level={1} className="text-center heading-b-border">
            Testing Ground
          </Heading>
        </hgroup>
      </section>
      <section className="max-w-2xl mx-auto mt-12 mb-12"></section>
    </>
  );
}

export default List;
