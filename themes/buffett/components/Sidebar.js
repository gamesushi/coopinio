import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import Logo from './Logo'
import { useGlobal } from '@/lib/global'

const Sidebar = props => {
  const { customMenu, categories } = props
  const { locale } = useGlobal()
  const router = useRouter()

  // 这里的菜单逻辑可以参考 hexo 主题
  let links = [
    { name: locale.COMMON.NAV_HOME, to: '/', icon: 'fas fa-home', show: true },
    { name: locale.COMMON.ARCHIVE, to: '/archive', icon: 'fas fa-archive', show: true },
    { name: locale.COMMON.CATEGORY, to: '/category', icon: 'fas fa-folder', show: true },
    { name: locale.COMMON.TAGS, to: '/tag', icon: 'fas fa-tags', show: true }
  ]

  if (customMenu) {
    links = links.concat(customMenu)
  }

  return (
    <aside id="sidebar" className="sidebar">
      <div className="sidebar-header">
        <Logo {...props} />
      </div>

      <div className="sidebar-nav">
        {links.map((link, index) => {
          if (!link.show) return null
          const selected = router.asPath === link.to
          return (
            <SmartLink
              key={index}
              href={link.to}
              className={`nav-link ${selected ? 'active' : ''}`}
            >
               {link.name}
            </SmartLink>
          )
        })}

        {/* 展现全部分类 */}
        {categories && (
            <div className="mt-4 px-4 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {locale.COMMON.CATEGORY}
            </div>
        )}
        {categories?.map(category => (
            <SmartLink
                key={category.name}
                href={`/category/${category.name}`}
                className={`nav-link ${router.query.category === category.name ? 'active' : ''}`}
            >
               📁 {category.name} ({category.count})
            </SmartLink>
        ))}
      </div>

      <div className="p-4 border-t border-white/5 text-[10px] text-gray-500">
          Powered by NotionNext
      </div>
    </aside>
  )
}

export default Sidebar
