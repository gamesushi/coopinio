import { siteConfig } from '@/lib/config'

const Hero = props => {
  const { siteInfo } = props
  return (
    <section className="hero-section fade-up">
      <div className="hero-text">
        <div className="flex items-center gap-2 mb-4 text-xs font-semibold tracking-widest uppercase text-gold">
            <div className="w-6 h-px bg-gold"></div>
            Knowledge Base
        </div>
        <h1 className="hero-title">
          {siteConfig('TITLE') || siteInfo?.title}
          <span className="gold ml-2">知识库</span>
        </h1>
        <p className="mt-4 text-gray-500 text-lg font-serif italic max-w-2xl leading-relaxed">
            {siteConfig('DESCRIPTION') || siteInfo?.description || '探索投资、阅读与认知的深度智慧。'}
        </p>
      </div>
    </section>
  )
}

export default Hero
