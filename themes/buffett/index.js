import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import BlogPostListPage from './components/BlogPostListPage'
import Hero from './components/Hero'
import Sidebar from './components/Sidebar'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态
const ThemeGlobalBuffett = createContext()
export const useBuffettGlobal = () => useContext(ThemeGlobalBuffett)

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, post, slotTop } = props
  const { onLoading } = useGlobal()
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()
  const searchModal = useRef(null)

  const headerSlot = !post && router.route === '/' ? <Hero {...props} /> : null

  return (
    <ThemeGlobalBuffett.Provider value={{ searchModal }}>
      <div id="theme-buffett" className={`${siteConfig('FONT_STYLE')} min-h-screen flex`}>
        <Style />
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed top-4 right-4 z-50 p-2 bg-navy text-white rounded-full lg:hidden shadow-lg"
        >
          {showSidebar ? '✕' : '☰'}
        </button>

        {/* Sidebar Navigation */}
        <div className={`fixed inset-y-0 left-0 z-40 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block transition-transform duration-300 ease-in-out`}>
           <Sidebar {...props} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 main min-h-screen overflow-x-hidden">
            <div className="relative z-10">
              {headerSlot}
              {slotTop}
              <div className="max-w-5xl mx-auto px-6 py-12">
                {children}
              </div>
            </div>

          {/* Footer */}
          <footer className="py-12 px-6 border-t border-gray-100 text-center text-xs text-gray-400 font-serif">
              <p>© {new Date().getFullYear()} {siteConfig('TITLE')}. Powered by NotionNext.</p>
          </footer>
        </main>

        {/* Search Modal */}
        {/* <AlgoliaSearchModal cRef={searchModal} {...props} /> */}
      </div>
    </ThemeGlobalBuffett.Provider>
  )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 文章列表
 */
const LayoutPostList = props => {
  return (
    <div className="fade-up">
      <BlogPostListPage {...props} />
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  return (
    <div className="article-wrapper">
       {lock && <div className="max-w-5xl mx-auto px-6 py-12 text-center font-serif text-gray-500">🔒 该文章已加密</div>}
       {!lock && post && (
         <article id="article-wrapper" className="notion">
            <h1 className="text-4xl font-serif font-black mb-6 leading-tight text-navy">{post.title}</h1>
            <div className="flex items-center gap-6 text-xs text-gray-400 mb-10 pb-6 border-b border-gray-100 font-serif">
                <span className="flex items-center gap-1">
                    <span className="opacity-50 uppercase">Published on</span> 
                    <span className="text-navy font-bold">{post.publishDate}</span>
                </span>
                {post.category && (
                    <span className="flex items-center gap-1">
                        <span className="opacity-50 uppercase">In</span> 
                        <span className="text-gold font-bold">{post.category}</span>
                    </span>
                )}
            </div>
            {post.blockMap ? <NotionPage post={post} /> : <div className="py-20 text-center text-gray-300">加载中...</div>}
         </article>
       )}
    </div>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  return (
    <div className="pt-8">
       <h2 className="text-2xl font-serif font-bold mb-8">
          {currentSearch ? `搜索结果: ${currentSearch}` : '搜索'}
       </h2>
       <LayoutPostList {...props} />
    </div>
  )
}

/**
 * 归档
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className="pt-8">
      <h2 className="text-3xl font-serif font-bold mb-12 text-navy border-l-4 border-gold pl-4">归档</h2>
      {Object.keys(archivePosts).map(archiveTitle => (
        <div key={archiveTitle} className="mb-12">
            <h3 className="text-xl font-serif font-bold mb-6 text-gold italic">{archiveTitle}</h3>
            <div className="grid gap-4">
                {archivePosts[archiveTitle].map(post => (
                    <div key={post.id} className="flex items-center gap-4 group">
                        <span className="text-xs text-gray-400 font-mono">{post.publishDate}</span>
                        <a href={`/${post.slug}`} className="text-gray-700 hover:text-gold transition-colors font-serif">
                            {post.title}
                        </a>
                    </div>
                ))}
            </div>
        </div>
      ))}
    </div>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-serif font-black text-gray-100">404</h1>
        <p className="text-xl font-serif italic text-gray-500 -mt-12">抱歉，您查找的智慧不在此处。</p>
        <a href="/" className="mt-8 px-8 py-3 bg-navy text-white font-serif hover:bg-gold transition-colors">返回首页</a>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div className="pt-8">
      <h2 className="text-3xl font-serif font-bold mb-12 text-navy">分类</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryOptions?.map(category => (
          <a key={category.name} href={`/category/${category.name}`} className="p-6 border border-gray-100 hover:border-gold hover:shadow-lg transition-all group">
            <h3 className="text-xl font-serif font-bold text-navy group-hover:text-gold">{category.name}</h3>
            <p className="text-sm text-gray-400 mt-2">{category.count} 篇文章</p>
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div className="pt-8">
      <h2 className="text-3xl font-serif font-bold mb-12 text-navy">标签</h2>
      <div className="flex flex-wrap gap-4">
        {tagOptions?.map(tag => (
          <a key={tag.name} href={`/tag/${tag.name}`} className="px-4 py-2 bg-gray-50 hover:bg-gold hover:text-white transition-all font-serif italic">
            # {tag.name} ({tag.count})
          </a>
        ))}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
