import Image from 'next/image'
import { Star, Lightning, Share } from '@/assets/icons'

import Logo from '@/assets/logo.svg'

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2FlNDJkMmY1ODhlOWE0YzI0ZjM1OGU3ZGU0MzJmMSIsInN1YiI6IjY0MjkwZTg3NjA5NzUwMDA3NzBlNzQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFhVr02zLRnpnG4k7fKu_iFypJ9E6myABVSFayeHCdI'

interface IMovie {
  id: number
  title: string
  release_date: string
  runtime: string
  vote_average: number
  poster_path: string
  overview: string
}

async function getMovie(): Promise<IMovie> {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/298618?language=pt-BR',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return res.json()
}

export default async function Home() {
  const movie = await getMovie()
  const moviePoster = 'https://image.tmdb.org/t/p/original' + movie.poster_path

  return (
    <div className="bg-zinc-800 text-zinc-100 px-16 py-12 min-h-screen flex flex-col">
      <header className="flex items-center justify-between z-10">
        <Image src={Logo} alt="Movie AI" />

        <button className="rounded bg-gradient-to-r from-purple-700 to-pink-700 text-sm font-medium leading-none flex items-center gap-1 py-2 px-4 shadow-lg">
          <span>Nova recomendação</span>
          <Lightning
            weight="bold"
            size={32}
            className="bg-white/20 rounded-full p-2"
          />
        </button>
      </header>

      <main className="flex-1 flex items-center">
        {/* Movie Image Background */}
        <Image
          src={moviePoster}
          className="h-screen w-[500px] absolute top-0 left-0 blur-[150px]"
          alt="Movie Poster"
          width={200}
          height={300}
        />

        <div className="flex gap-4 z-10 w-fit">
          {/* Movie Poster */}
          <Image
            src={moviePoster}
            className="h-[40%] bg-zinc-500 rounded-lg"
            width={200}
            height={300}
            alt="Movie Poster"
          />

          {/* Movie Info */}
          <div className="flex flex-col justify-between w-96">
            {/* Movie Title & Desc */}
            <div className="flex flex-col gap-2">
              <div className="flex items-cetner justify-between">
                <h1 className="text-2xl font-semibold">{movie.title}</h1>
                <div className="font-semibold text-xl text-yellow-500 flex items-center gap-2">
                  <Star weight="fill" size={22} />
                  <span>{Math.round(movie.vote_average)}</span>
                </div>
              </div>
              <p className="text-sm text-zinc-300 ml-1">{movie.overview}</p>
            </div>

            <section className="flex items-center justify-between">
              <a
                href="https://www.imdb.com/video/vi3600860953/?playlistId=tt15398776&ref_=ext_shr_lnk"
                target="_blank"
                rel="external noreferrer"
                className="py-2 px-4 flex items-center justify-center font-semibold border border-white/20 shadow-md bg-white/10 rounded hover:bg-white/20 transition"
              >
                Assitir o trailer
              </a>

              <button
                className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition"
                title="Compartilhar"
                aria-label="Compartilhar"
              >
                <Share size={22} weight="bold" />
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
