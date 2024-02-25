import laravelAxios from '@/lib/axios'
import queryClient from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { reviewKeys } from '../keys'

export const useDeleteComment = (reviewId, commentId) => {
    const mutationFn = async () => {
        try {
            await laravelAxios.delete(`api/comments/${commentId}`)
        } catch (err) {
            console.log(err)
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries(reviewKeys.comments(reviewId))
        },
    })

    return { mutate, isLoading }
}
