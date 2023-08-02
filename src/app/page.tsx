import Image from 'next/image'

import FallbackPoster from '@/assets/movie-poster.png'
import Logo from '@/assets/logo.svg'

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2FlNDJkMmY1ODhlOWE0YzI0ZjM1OGU3ZGU0MzJmMSIsInN1YiI6IjY0MjkwZTg3NjA5NzUwMDA3NzBlNzQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LFhVr02zLRnpnG4k7fKu_iFypJ9E6myABVSFayeHCdI"

interface IMovie {
  id: number;
  title: string;
  release_date: string;
  runtime: string;
  vote_average: number;
  poster_path: string;
  overview: string;
}

async function getMovie(): Promise<IMovie> {
  const res = await fetch("https://api.themoviedb.org/3/movie/298618?language=pt-BR", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return res.json()
}

export default async function Home() {
  // const movie = await getMovie()
  let movie: any;
  const moviePoster = movie ? "https://image.tmdb.org/t/p/original" + movie.poster_path : FallbackPoster

  return (
    <div className="bg-zinc-800 text-zinc-100 px-16 py-12 min-h-screen flex flex-col">
      <header className="flex items-center justify-between z-10">
        <Image src={Logo} alt='Movie AI' />

        <button className="rounded bg-gradient-to-r from-purple-700 to-pink-700 text-sm font-medium leading-none flex items-center justify-center py-2 px-4 shadow-lg">Nova recomendação</button>
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
          <div className="flex flex-col justify-between">

            {/* Movie Title & Desc */}
            <div className="flex flex-col gap-2">
              <div className="flex items-cetner gap-4">
                <h1 className="text-xl font-semibold">{movie ? movie.title : "Movie name"}</h1>
                <span className="font-semibold text-lg text-yellow-500">{movie ? movie.vote_average : "5.0"}</span>
              </div>
              <p className="text-xs text-zinc-300 ml-1 max-w-sm">{movie ? movie.overview : "Movie description"}</p>
            </div>

            <a
              href='https://www.imdb.com/video/vi3600860953/?playlistId=tt15398776&ref_=ext_shr_lnk'
              target='_blank'
              rel='external noreferrer'
              className="h-10 w-[150px] flex items-center justify-center font-semibold font-mono uppercase border border-white bg-white/10 rounded-md"
            >Trailer</a>
          </div>
        </div>
      </main>
    </div>
  )
}
