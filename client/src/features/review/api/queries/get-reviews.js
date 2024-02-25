import laravelAxios from '@/lib/axios'
import { reviewKeys } from '../keys'

export const useGetReviews = ({ mediaType, mediaId }) => {
    const queryKey = reviewKeys.reviews(mediaType, mediaId)

    const queryFn = async () => {
        try {
            const res = await laravelAxios.get(
                `api/reviews/${mediaType}/${mediaId}`,
            )
            return res.data
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return { queryKey, queryFn }
}
