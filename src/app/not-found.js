'use client'

import { Heading } from "@/components/Heading";
import { ArrowBack } from "@/components/Icons/ArrowBack";
import Image from "next/image";
import Link from "next/link";
import style from './error/error.module.css'
import banner from './error/404.png'

export default function NotFound() {
    return (
        <div className={style.container}>
            <Image src={banner} alt="Imagem do robô fazendo cara de triste porque a página não foi encontrada"/>
            <Heading>OPS! Página não encontrada. </Heading>
            <p className={style.text}>Você pode voltar ao feed e continuar buscando projetos incríveis!</p>
            <Link href="/">
                Voltar ao feed <ArrowBack color='#81FE88' />
            </Link>
        </div>
    )
}