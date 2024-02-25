import laravelAxios from '@/lib/axios'
import { reviewKeys } from '../keys'
import { useMutation } from '@tanstack/react-query'
import queryClient from '@/lib/query-client'

export const useUpdateComment = (reviewId, commentId) => {
    const mutationFn = async ({ content }) => {
        try {
            const res = await laravelAxios.put(`api/comments/${commentId}`, {
                content,
            })
            return res.data
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries(reviewKeys.comments(reviewId))
        },
    })
}
