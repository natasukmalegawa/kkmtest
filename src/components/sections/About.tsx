import { Card } from '@/components/ui/Card'
import { AboutCard } from '@/types'

type AboutProps = {
  smallTitle?: string
  title: string
  subtitle: string
  cards: AboutCard[]
}

export function About({ smallTitle, title, subtitle, cards }: AboutProps) {
  return (
    <section id="about-section" className="py-20 md:py-24 bg-white dark:bg-apple-darker">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 px-4 sm:px-6">
          {smallTitle && (
            <p className="text-apple-blue dark:text-blue-400 text-sm font-medium mb-2 tracking-wide uppercase">
              {smallTitle}
            </p>
          )}
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            {title}
          </h2>
          <p className="text-apple-gray dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {cards.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-[24px] animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {cards.map((card, index) => (
              <Card 
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                variant="about"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
