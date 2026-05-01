import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'

const Logo = props => {
  const { siteInfo } = props
  return (
    <SmartLink href="/" className="logo">
      <img src="/buffett_logo.png" className="w-8 h-8 rounded-md shadow-md object-contain bg-navy" alt="Logo" />
      <span>{siteConfig('TITLE') || siteInfo?.title}</span>
    </SmartLink>
  )
}

export default Logo
