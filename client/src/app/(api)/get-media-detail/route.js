import axios from 'axios'
import { NextResponse } from 'next/server'

export const GET = async req => {
    try {
        const mediaType = req.nextUrl.searchParams.get('media_type')
        const mediaId = req.nextUrl.searchParams.get('media_id')

        const res = await axios.get(
            `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
        )

        let jaResponse = { ...res.data }

        if (jaResponse.overview === '') {
            const res = await axios.get(
                `https://api.themoviedb.org/3/${mediaType}/${mediaId}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
            )

            jaResponse.overview = res.data.overview
        }

        return NextResponse.json(jaResponse, { status: 200 })
    } catch (err) {
        console.log('エラーが発生しました', err)
        return NextResponse.json(
            { message: '予期せぬエラーが発生しました' },
            { status: 500 },
        )
    }
}
