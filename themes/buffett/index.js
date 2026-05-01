import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BlogPostListPage from './components/BlogPostListPage'
import Hero from './components/Hero'
import Sidebar from './components/Sidebar'
import CONFIG from './config'
import { Style } from './style'

/**
 * 基础布局
 */
const LayoutBase = props => {
  const { children, post } = props
  const { onLoading } = useGlobal()
  const [showSidebar, setShowSidebar] = useState(false)
  const router = useRouter()

  const headerSlot = !post && router.route === '/' ? <Hero {...props} /> : null

  return (
    <div id="theme-buffett">
      <Style />

      {/* 移动端菜单按钮 */}
      <button 
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden fixed top-4 left-4 z-[200] bg-navy text-white p-2 rounded-md shadow-lg"
      >
        {showSidebar ? '✕' : '☰'}
      </button>

      {/* 侧边栏 */}
      <div className={`md:block ${showSidebar ? 'block' : 'hidden'}`}>
         <Sidebar {...props} />
      </div>

      {/* 主区 */}
      <main className="main">
        <div className="relative z-10">
          <Transition
            show={!onLoading}
            appear={true}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            unmount={false}
          >
            {headerSlot}
            {children}
          </Transition>
        </div>
      </main>
    </div>
  )
}

/**
 * 首页
 */
const LayoutIndex = props => {
  return <BlogPostListPage {...props} />
}

/**
 * 文章列表页
 */
const LayoutPostList = props => {
  return <BlogPostListPage {...props} />
}

/**
 * 文章详情页
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props

  return (
    <div className="article-wrapper">
       {post && (
         <article id="article-wrapper" className="notion">
            <h1 className="text-3xl font-serif font-black mb-4">{post.title}</h1>
            <div className="flex gap-4 text-xs text-gray-400 mb-8 pb-4 border-b border-gray-100">
                <span>📅 {post.publishDate}</span>
                {post.category && <span>📁 {post.category}</span>}
            </div>
            <NotionPage post={post} />
         </article>
       )}
    </div>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
    return <BlogPostListPage {...props} />
}

/**
 * 归档页
 */
const LayoutArchive = props => {
    return <BlogPostListPage {...props} />
}

/**
 * 404页
 */
const Layout404 = props => {
  return <div className="p-20 text-center font-serif text-2xl">404 - 找不到页面</div>
}

/**
 * 分类列表页
 */
const LayoutCategoryIndex = props => {
    return <BlogPostListPage {...props} />
}

/**
 * 标签列表页
 */
const LayoutTagIndex = props => {
    return <BlogPostListPage {...props} />
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
