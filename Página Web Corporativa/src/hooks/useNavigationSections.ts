import { useEffect, useState } from "react"

/** Sincroniza la navegación anclada con el desplazamiento de la página pública. */
export function useNavigationSections(sectionIds: string[]) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("inicio")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id)
      if (!element) return null

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: "-64px 0px -55% 0px", threshold: 0 },
      )
      observer.observe(element)
      return observer
    })

    return () => observers.forEach((observer) => observer?.disconnect())
  }, [sectionIds])

  return { active, scrolled }
}
