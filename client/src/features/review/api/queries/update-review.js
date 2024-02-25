import laravelAxios from '@/lib/axios'
import { reviewKeys } from '../keys'
import { useMutation } from '@tanstack/react-query'
import queryClient from '@/lib/query-client'

export const useUpdateReview = (id, mediaType, mediaId) => {
    const mutationFn = async ({ content, rating }) => {
        try {
            const res = await laravelAxios.put(`api/reviews/${id}`, {
                content,
                rating,
            })
            return res.data
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries(
                reviewKeys.reviews(mediaType, mediaId),
            )
        },
    })
}
