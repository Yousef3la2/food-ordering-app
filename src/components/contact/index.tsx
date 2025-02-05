import MainHeading from "@/components/main-heading";
import { Routes } from "@/constants/enums";

const Contact = () => {
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading subTitle={"Don't Hesitate"} title="Contact Us" />
        <div className="mt-8">
          <a
            className="text-4xl underline text-accent"
            href="tel:+201151715171"
          >
            +201151715171
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
