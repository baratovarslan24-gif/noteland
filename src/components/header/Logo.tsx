import Image from 'next/image'

type Props = {
  src: string
  alt: string
  width: number
  height: number
  classes: string | ''
}
function Logo({ src, alt, width, height, classes }: Props) {
  return <Image src={src} alt={alt} width={width} height={height} className={classes} priority />
}

export default Logo
