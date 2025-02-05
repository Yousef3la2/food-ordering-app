import { Routes } from "@/constants/enums";
import MainHeading from "../main-heading";

function About() {
  return (
    <section className="section-gap" id={Routes.ABOUT}>
      <div className="container text-center">
        <MainHeading subTitle="Our Story" title="About Us" />
        <div className="text-accent max-w-lg mx-auto mt-4 flex flex-col gap-4 text-justify">
          <p>
            At Pizza Hut, we believe that every meal is an opportunity to bring
            people together. Since 1958, we have been serving delicious pizzas
            made with the finest ingredients, delivered with love and care. What
            started as a small pizza place in Kansas, USA, has grown into one of
            the world’s largest pizza chains, serving millions of customers
            worldwide every day.
          </p>
          <p>
            Our journey is all about innovation, quality, and commitment to
            creating memorable dining experiences for you. We blend tradition
            with modern flair, bringing you a wide variety of pizzas, pasta,
            sides, and desserts to satisfy every craving. Whether you’re
            ordering for a family night, a special celebration, or a quick lunch
            break, Pizza Hut is here to make every moment better.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
