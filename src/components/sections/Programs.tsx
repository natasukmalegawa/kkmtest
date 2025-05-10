import { Card } from '@/components/ui/Card'
import { Program } from '@/types'

type ProgramsProps = {
  smallTitle?: string
  title: string
  subtitle: string
  programs: Program[]
}

export function Programs({ smallTitle, title, subtitle, programs }: ProgramsProps) {
  return (
    <section className="py-20 md:py-24 bg-apple-light dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
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
        
        {programs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-80 bg-gray-100 dark:bg-gray-800 rounded-ios animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {programs.map((program, index) => (
              <Card 
                key={index}
                title={program.title}
                description={program.description}
                image={program.image}
                status={program.status}
                variant="program"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
