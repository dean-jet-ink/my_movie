import laravelAxios from '@/lib/axios'
import queryClient from '@/lib/query-client'
import { useMutation } from '@tanstack/react-query'
import { reviewKeys } from '../keys'

export const useDeleteReview = (id, mediaType, mediaId) => {
    const mutationFn = async () => {
        try {
            await laravelAxios.delete(`api/reviews/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    const { mutate, isLoading } = useMutation({
        mutationFn,
        onSuccess: () => {
            queryClient.invalidateQueries(
                reviewKeys.reviews(mediaType, mediaId),
            )
        },
    })

    return { mutate, isLoading }
}
