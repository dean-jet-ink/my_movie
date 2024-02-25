'use client'

import Loading from '@/app/(app)/Loading'
import { useQuery } from '@tanstack/react-query'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import MediaCard from './MediaCard'
import { useGetPopularMoviesQuery } from '../api'

function MediaSlider({ mediaType }) {
    const { data: mediaList, isLoading } = useQuery(useGetPopularMoviesQuery())

    if (isLoading) <Loading />

    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                768: {
                    sliderPerView: 5,
                    spaceBetween: 20,
                },
            }}>
            {mediaList?.map(media => {
                return (
                    <SwiperSlide key={media.id}>
                        <MediaCard media={media} mediaType={mediaType} />
                    </SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default MediaSlider
