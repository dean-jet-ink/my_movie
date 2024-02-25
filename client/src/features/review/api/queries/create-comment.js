import laravelAxios from '@/lib/axios'
import queryClient from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { reviewKeys } from '../keys'

export const useCreateComment = reviewId => {
    const mutationFn = async ({ content }) => {
        try {
            await laravelAxios.post('api/comments', {
                content,
                review_id: reviewId,
            })
        } catch (err) {
            console.log(err)
        }
    }

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries(reviewKeys.comments(reviewId))
        },
    })
}
