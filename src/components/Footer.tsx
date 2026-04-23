import Logo from './header/Logo'
import Link from 'next/link'
import { FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import SocialMediaLink from './SocialMediaLink'

type Socials = {
  facebook?: string
  instagram?: string
  telegram?: string
  whatsapp?: string
}

type Props = {
  storeName: string
  logoUrl?: string
  socials?: Socials
}

export default function Footer({ storeName, logoUrl, socials }: Props) {
  return (
    <>
      <footer className="bg-cyan-200 py-8 md:hidden">
        <div className="flex flex-row items-center">
          <div className="max-w-7xl mx-auto px-4 flex flex-col gap-y-8 ">
            <Link href="/">
              <Logo
                src={logoUrl}
                alt={storeName}
                width={120}
                height={120}
                classes="object-contain"
              />
            </Link>

            {socials && (
              <div className="flex gap-4">
                {socials.facebook && <SocialMediaLink href={socials.facebook} icon={FaFacebook} />}

                {socials.instagram && (
                  <SocialMediaLink href={socials.instagram} icon={FaInstagram} />
                )}

                {socials.telegram && <SocialMediaLink href={socials.telegram} icon={FaTelegram} />}

                {socials.whatsapp && <SocialMediaLink href={socials.whatsapp} icon={FaWhatsapp} />}
              </div>
            )}
          </div>
          <div>
            <div className="flex flex-col gap-y-2 ">
              <Link className="hover:-translate-y-1 transition duration-300" href="/about">
                О нас
              </Link>{' '}
              <Link
                className="hover:-translate-y-1 transition duration-300"
                href="/delivery-policy"
              >
                Политика доставки
              </Link>{' '}
              <Link className="hover:-translate-y-1 transition duration-300" href="/return-policy">
                Политика возврата
              </Link>{' '}
              <Link className="hover:-translate-y-1 transition duration-300" href="/privacy-policy">
                Политика конфиденциальности
              </Link>{' '}
              <Link className="hover:-translate-y-1 transition duration-300" href="/terms-of-use">
                Условия использования
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <footer className="bg-cyan-200 py-8 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex  gap-y-8 flex-row justify-between items-center">
          <Link href="/">
            <Logo src={logoUrl} alt={storeName} width={120} height={120} classes="object-contain" />
          </Link>
          <div className="flex gap-y-4 flex-row gap-x-4 items-center">
            <Link className="hover:-translate-y-1 transition duration-300" href="/about">
              О нас
            </Link>{' '}
            <GoDotFill className="w-2 h-2 " />
            <Link className="hover:-translate-y-1 transition duration-300" href="/delivery-policy">
              Политика доставки
            </Link>{' '}
            <GoDotFill className="w-2 h-2 " />
            <Link className="hover:-translate-y-1 transition duration-300" href="/return-policy">
              Политика возврата
            </Link>{' '}
            <GoDotFill className="w-2 h-2 " />
            <Link className="hover:-translate-y-1 transition duration-300" href="/privacy-policy">
              Политика конфиденциальности
            </Link>{' '}
            <GoDotFill className="w-2 h-2 " />
            <Link className="hover:-translate-y-1 transition duration-300" href="/terms-of-use">
              Условия использования
            </Link>
          </div>
          {socials && (
            <div className="flex gap-4">
              {socials.facebook && <SocialMediaLink href={socials.facebook} icon={FaFacebook} />}

              {socials.instagram && <SocialMediaLink href={socials.instagram} icon={FaInstagram} />}

              {socials.telegram && <SocialMediaLink href={socials.telegram} icon={FaTelegram} />}

              {socials.whatsapp && <SocialMediaLink href={socials.whatsapp} icon={FaWhatsapp} />}
            </div>
          )}
        </div>
      </footer>
    </>
  )
}
