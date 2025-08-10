import FAQs from "@/components/faqs";
import Features from "@/components/features";
import Body from "@/components/landinBody";
import Navbar from "@/components/navbar";
import ContactUs from "@/components/contact"
export default function Home() {
  
  return (
      <main>
        <Navbar/>
        <section id="home" className="h-screen">
             <Body/>
        </section>
        <section id="features" className="h-max">
             <Features/>   
        </section>
        <section id="faqs" className="h-screen">
          <FAQs/>
        </section>
        <section id="contact" className="h-screen">
          <ContactUs/>
        </section>
  
      </main>
  );
}
