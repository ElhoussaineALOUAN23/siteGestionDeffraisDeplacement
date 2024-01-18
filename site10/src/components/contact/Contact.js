import "./contact.css";
import { useForm, ValidationError } from '@formspree/react';
import Lottie from "lottie-react";
import doneAnimation from '../../animation/done.json';
import contact from '../../animation/contact.json';

const Contact = () => {
  const [state, handleSubmit] = useForm("xvojdwdn");

  return (
    <section className="contact-us">
      <h1 className="title">
        <span className="icon-envelope"> </span>
        Contact us
      </h1>
      <p className="sub-title">
        Contact us for more information and Get notified when I publish
        something new.
      </p>

      <div className="flex">
        <form onSubmit={handleSubmit} className="">
          <div className="flex">
            <label htmlFor="email">Email Address:</label>
            <input required type="email" name="email" id="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>

          <div className="flex" style={{ marginTop: "24px" }}>
            <label htmlFor="message">Your message:</label>
            <textarea required name="message" id="message"></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <div className="flex"> <button className="submit" type="submit" disabled={state.submitting}>Submit</button>
          {state.succeeded && (<Lottie loop={false } style={{height:30}}animationData={doneAnimation} />  )}</div>
         
        </form>
        <div className="animation"><Lottie  style={{height:300,marginLeft:120}}animationData={contact} /></div>
      </div>
    </section>
  );
};

export default Contact;