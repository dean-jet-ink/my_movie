const { default: axios } = require('axios')
const { mediaKeys } = require('../keys')

const useSearchMediaQuery = query => {
    const queryKey = mediaKeys.search(query)

    const queryFn = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/search-media?query=${query}`,
            )

            const results = res.data.results

            const validResults = results.filter(
                result =>
                    result.media_type === 'movie' || result.media_type === 'tv',
            )

            return validResults
        } catch (err) {
            console.log('エラーが発生しました', err)
        }
    }

    return { queryKey, queryFn }
}

export default useSearchMediaQuery
