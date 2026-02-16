import Heading from "../components/Heading";
import MarkDown from "../components/MarkDown";

const string = `
Last year, I realized that my biggest productivity **problem** wasn’t lack of intelligence or motivation — it was constant context switching. Notifications, quick “just one minute” checks, and random browsing were silently draining my cognitive energy. Over time, I began experimenting with structured focus sessions and intentional breaks.

One simple habit made a measurable difference: defining clear time blocks for deep work. During these blocks, I mute notifications, close unnecessary tabs, and work on a single objective. Even 90 minutes of uninterrupted focus can produce better results than 4 scattered hours.

Slack [Status](https://www.google.com) indicators are surprisingly powerful for this. When teammates know I’m unavailable for a short period, interruptions drop significantly.

## Why Deep Work Matters

Deep work helps you:

- Learn complex skills faster  
- Produce higher-quality output  
- Reduce mental fatigue  
- Build confidence through visible progress  

> Shallow work feels busy. Deep work builds careers.

## Example: A Simple Focus Timer

Here’s a minimal *JavaScript* example of a focus timer:

~~~
function startFocusSession(minutes) {
  const duration = minutes * 60 * 1000;

  setTimeout(() => {
    console.log("Session complete. Take a short break.");
  }, duration);
}

startFocusSession(25);
~~~

## Final Thoughts

The goal isn’t to eliminate distractions completely — that’s unrealistic. Instead, create systems that protect your attention when it matters most. Over weeks and months, these small systems compound into meaningful growth.
`;

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
      <section className="max-w-2xl mx-auto mt-12 mb-12">
        <MarkDown>{string}</MarkDown>
      </section>
    </>
  );
}

export default List;
