'use client'

import { useEffect } from "react"

import { ArrowBack } from '@/components/icons/ArrowBack'
import Link from "next/link"
import Image from "next/image"
import { Heading } from "@/components/Heading"

import style from './error/error.module.css'
import banner from './error/500.png'

export default function Error(error) {
    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div className={style.container}>
            <Image src={banner} />
            <Heading>Opa! Ocorreu um erro.</Heading>
            <p className={style.text}>Não conseguimos carregar a página, volte para seguir navegando.</p>
            <Link href="/">
                Voltar ao feed <ArrowBack color='#81FE88' />
            </Link>
        </div>
    )
}