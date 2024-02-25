import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )

        return NextResponse.json(res.data.results, { status: 200 })
    } catch (err) {
        console.log('エラーが発生しました', err)
        return NextResponse.json(
            { message: '予期せぬエラーが発生しました' },
            { status: 500 },
        )
    }
}
