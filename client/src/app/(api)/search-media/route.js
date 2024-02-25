import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async req => {
    const query = req.nextUrl.searchParams.get('query')

    if (query === '') {
        return NextResponse.json(
            { message: '検索ワードを入力してください' },
            { status: 400 },
        )
    }

    try {
        const res = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${
                process.env.TMDB_API_KEY
            }&query=${encodeURIComponent(query)}&language=ja-JP`,
        )

        return NextResponse.json(res.data, { status: 200 })
    } catch (err) {
        console.log('エラーが発生しました', err)
        return NextResponse.json(
            { message: '予期せぬエラーが発生しました' },
            { status: 500 },
        )
    }
}
