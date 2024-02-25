import laravelAxios from '@/lib/axios'
import { reviewKeys } from '../keys'
import { useQuery } from '@tanstack/react-query'

export const useGetReview = id => {
    const queryKey = reviewKeys.detail()

    const queryFn = async () => {
        try {
            const res = await laravelAxios.get(`api/reviews/${id}`)
            return res.data
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return useQuery({
        queryKey,
        queryFn,
    })
}
