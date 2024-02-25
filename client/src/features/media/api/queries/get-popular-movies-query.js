import axios from 'axios'
import { mediaKeys } from '../keys'

export const useGetPopularMoviesQuery = () => {
    const queryKey = mediaKeys.populars()

    const queryFn = async () => {
        try {
            const res = await axios.get(
                'http://localhost:3000/get-popular-movies',
            )
            return res.data
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return { queryKey, queryFn }
}
