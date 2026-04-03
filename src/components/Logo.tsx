import Image from 'next/image'

type LogoProps = {
  src: string
  alt: string
}

function Logo({ src, alt }: LogoProps) {
  return src ? (
    <Image src={src} alt={`${alt} | NoteLand`} width={80} height={80} />
  ) : (
    <span className="inline-block py-1 px-4 bg-slate-900 text-white">{alt}</span>
  )
}

export default Logo
