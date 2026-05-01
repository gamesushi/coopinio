import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import BLOG from '@/blog.config'
import { useRouter } from 'next/router'

const BlogPostListPage = props => {
  const { posts } = props
  const router = useRouter()

  if (!posts || posts.length === 0) {
    return <div className="p-12 text-center text-gray-400">暂无内容</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-12 pb-20">
      {posts.map(post => (
        <SmartLink
          key={post.id}
          href={`${BLOG.SUB_PATH}/${post.slug}`}
          className="group relative p-6 bg-white border border-[#E0D6C8] rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold-light overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          
          <div className="text-2xl mb-3">{post.pageIcon || '📄'}</div>
          
          <h3 className="font-serif text-lg font-bold text-[#1A2332] mb-2 leading-tight group-hover:text-gold transition-colors">
            {post.title}
          </h3>
          
          <p className="text-xs text-[#6B6560] line-clamp-2 leading-relaxed">
            {post.summary || '点击阅读全文...'}
          </p>

          <div className="absolute bottom-4 right-4 text-gray-300 group-hover:text-gold group-hover:translate-x-1 transition-all">
            →
          </div>
        </SmartLink>
      ))}
    </div>
  )
}

export default BlogPostListPage
