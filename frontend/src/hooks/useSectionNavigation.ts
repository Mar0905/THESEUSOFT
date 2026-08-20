import { useEffect, useState } from "react"

export function useSectionNavigation(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observers = sectionIds.flatMap((id) => {
      const element = document.getElementById(id)
      if (!element) return []
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id)
      }, { rootMargin: "-64px 0px -55% 0px" })
      observer.observe(element)
      return [observer]
    })
    return () => observers.forEach((observer) => observer.disconnect())
  }, [sectionIds])

  return { activeSection, isScrolled }
}
