import Container from '@/components/Container'
import { useGetPopularMoviesQuery } from '@/features/media/api'
import MediaSlider from '@/features/media/components/MediaSlider'
import SearchBar from '@/features/media/components/SearchBar'
import queryClient from '@/lib/query-client'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import 'swiper/css'

const Home = async () => {
    await queryClient.prefetchQuery(useGetPopularMoviesQuery())

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Container>
                        <div className="mb-10">
                            <SearchBar />
                        </div>
                        <MediaSlider mediaType="movie" />
                    </Container>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Home
