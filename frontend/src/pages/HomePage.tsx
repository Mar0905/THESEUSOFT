import AboutSection from "@/components/AboutSection"
import ClientsSection from "@/components/ClientsSection"
import Footer from "@/components/Footer"
import { ContactSection, SupportSection } from "@/components/FormsSection"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import SolutionsSection from "@/components/SolutionsSection"
import WhatsAppWidget from "@/components/WhatsAppWidget"

export default function HomePage() {
  return <><Header/><main><Hero/><AboutSection/><SolutionsSection/><ClientsSection/><SupportSection/><ContactSection/></main><Footer/><WhatsAppWidget/></>
}
