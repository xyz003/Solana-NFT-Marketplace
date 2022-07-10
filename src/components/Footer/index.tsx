import { ReactComponent as DiscordLogo } from "../../assets/logo/discord.svg"
import { ReactComponent as TwitterLogo } from "../../assets/logo/twitter.svg"
import { DE_DISCORD, DE_TWITTER } from "../../utils/DeSocials"

import DE_LOGO from "../../assets/logo/de-full-dark.svg"
import { useCollections } from "../../contexts/collections"
import { Link } from "react-router-dom"
import SoloProfileContext from "../../contexts/solo-profile"
import { useContext } from "react"
import { formatToHyphen } from "../../utils"
import { CSVLink, CSVDownload } from "react-csv"

interface FooterLinkProps {
  href: string
  children: string
}

interface FooterTitleProps {
  children: string
}

const FooterLink = ({ href, children }: FooterLinkProps) => {
  const { isProfilePage, profileTheme } = useContext(SoloProfileContext)

  return (
    <Link
      to={href}
      className="mb-1 text-sm font-regular text-gray-400 hover:text-white transition 250 ease-in-out opacity-70 hover:opacity-100"
      style={{
        color:
          isProfilePage && profileTheme ? profileTheme.footerForeground : "",
      }}
    >
      {children}
    </Link>
  )
}

const FooterTitle = ({ children }: FooterTitleProps) => {
  const { isProfilePage, profileTheme } = useContext(SoloProfileContext)

  return (
    <h1
      className="text-sm font-bold mb-4"
      style={{
        color:
          isProfilePage && profileTheme ? profileTheme.footerForeground : "",
      }}
    >
      {children}
    </h1>
  )
}

// component in case there is no data from Collections context
const FooterLinksListPlaceholder = () => {
  return (
    <>
      <FooterLink href="/collections/abstratica">Abstratica</FooterLink>
      <FooterLink href="/collections/degenerate ape academy">
        Degenerate Ape Academy
      </FooterLink>
      <FooterLink href="/collections/rox">Rox</FooterLink>
      <FooterLink href="/collections/solana monkey business">
        Solana Monkey Business
      </FooterLink>
      <FooterLink href="/collections/solanadogenfts">SolanaDogeNFTs</FooterLink>
      <FooterLink href="/collections/solarians">Solarians</FooterLink>
      <FooterLink href="/collections/thugbirdz">Thugbirdz</FooterLink>
    </>
  )
}

export const Footer = () => {
  const { collections, topCollections } = useCollections()
  const { profileTheme, isProfilePage } = useContext(SoloProfileContext)

  const collectionsWithVolume = collections.filter(
    (collection) => !!collection.volumePast24h && collection.volumePast24h > 0
  )
  const trendingCollections = collectionsWithVolume
    .sort((collectionA, collectionB) => {
      return (collectionA.volumePast7days || 0) >
        (collectionB.volumePast7days || 0)
        ? 1
        : -1
    })
    .slice(0, 10)

  return (
    <div
      className="box-border p-10 gap-20 flex flex-wrap justify-start items-stretch relative bg-dark-footer xl:justify-center"
      style={{
        background:
          profileTheme && isProfilePage ? profileTheme.footerBackground : "",
      }}
    >
      <div className="max-w-max">
        <Link to="/">
          <img src={DE_LOGO} alt="Digital eyes logo" />
        </Link>
      </div>

      <div className="flex gap-20 flex-col flex-wrap justify-start md:flex-row">
        <div className="flex flex-col">
          <FooterTitle>Links</FooterTitle>
          <FooterLink href="/collections">Collections</FooterLink>
          <FooterLink href="/launchpad/featured">Launchpad</FooterLink>
          <FooterLink href="/faqs">FAQs</FooterLink>
          <a href="/blog" rel="noreferrer" className="mb-1 text-sm font-regular text-gray-400 hover:text-white transition 250 ease-in-out opacity-70 hover:opacity-100" style={{ color: isProfilePage && profileTheme ? profileTheme.footerForeground : "" }}>Blog</a>
          <a href="/guides" rel="noreferrer" className="mb-1 text-sm font-regular text-gray-400 hover:text-white transition 250 ease-in-out opacity-70 hover:opacity-100" style={{ color: isProfilePage && profileTheme ? profileTheme.footerForeground : "" }}>Guides</a>
          <a href="/creator-guides" rel="noreferrer" className="mb-1 text-sm font-regular text-gray-400 hover:text-white transition 250 ease-in-out opacity-70 hover:opacity-100" style={{ color: isProfilePage && profileTheme ? profileTheme.footerForeground : "" }}>Creator Guides</a>
          <FooterLink href="/wallet">Sell / Your Wallet</FooterLink>
        </div>

        <div className="flex flex-col">
          <FooterTitle>Top Collections</FooterTitle>
          {topCollections ? (
            topCollections.map((collection, index) => (
              <FooterLink
                href={`/collections/${formatToHyphen(collection.name)}`}
                key={index}
              >
                {collection.name}
              </FooterLink>
            ))
          ) : (
            <FooterLinksListPlaceholder />
          )}
        </div>

        <div className="flex flex-col">
          <FooterTitle>Trending Collections</FooterTitle>
          {trendingCollections ? (
            trendingCollections.map((collection, index) => (
              <FooterLink
                href={`/collections/${formatToHyphen(collection.name)}`}
                key={index}
              >
                {collection.name}
              </FooterLink>
            ))
          ) : (
            <FooterLinksListPlaceholder />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <a
            href={DE_TWITTER}
            target="_blank"
            rel="noreferrer"
            className="text-white flex items-center gap-3 group"
          >
            <TwitterLogo
              className="h-7 w-7 text-gray-300 group-hover:text-twitter-blue transition 250 ease-in-out"
              style={{
                color:
                  isProfilePage && profileTheme
                    ? profileTheme.footerForeground
                    : "",
              }}
            />
            <h1
              className="font-semibold text-sm text-gray-200 group-hover:text-white transition 250 ease-in-out"
              style={{
                color:
                  isProfilePage && profileTheme
                    ? profileTheme.footerForeground
                    : "",
              }}
            >
              DigitalEyesNFT on Twitter
            </h1>
          </a>
          <a
            href={DE_DISCORD}
            target="_blank"
            rel="noreferrer"
            className="text-white flex items-center gap-3 group"
          >
            <DiscordLogo
              className="h-7 w-7 text-gray-300 group-hover:text-discord-blue transition 250 ease-in-out"
              style={{
                color:
                  isProfilePage && profileTheme
                    ? profileTheme.footerForeground
                    : "",
              }}
            />
            <h1
              className="font-semibold text-sm text-gray-200 group-hover:text-white transition 250 ease-in-out"
              style={{
                color:
                  isProfilePage && profileTheme
                    ? profileTheme.footerForeground
                    : "",
              }}
            >
              DigitalEyes on Discord
            </h1>
          </a>
        </div>
      </div>
    </div>
  )
}
