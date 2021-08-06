import Head from 'next/head'
import styled, { css } from 'styled-components'

import { get as getAlbums } from '../../src/lib/albums'
import { get as getGalleries } from '../../src/lib/galleries'

import Link from '../../src/components/Link'

export async function getStaticProps({ params: { gallery } }) {
  const { albums } = await getAlbums(gallery)
  return {
    props: {
      gallery,
      albums,
    },
  }
}

export async function getStaticPaths() {
  const { galleries } = await getGalleries()
  // Define these galleries as allowed, otherwise 404
  const paths = galleries.map((gallery) => ({ params: { gallery } }))
  return {
    paths,
    fallback: false,
  }
}

const Album = styled.div`
  float: left;
  width: 185px;
  height: 170px;
  padding: 10px;
  background: peachpuff;
  ${({ odd }) => odd && css`
    background-color: linen;
  `}
`

const Gallery = ({ gallery, albums }) => {
  const albumGroup = albums.map((album, i) => (
    <Album
      key={album.name}
      odd={i % 2 === 0}
    >
      <Link href={`/gallery/${gallery}/albums`}><img src={album.thumbPath} alt={album.h2} /></Link>
    </Album>
  ))

  return (
    <div>
      <Head>
        <title>History App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{albumGroup}</div>
    </div>
  )
}

export default Gallery
