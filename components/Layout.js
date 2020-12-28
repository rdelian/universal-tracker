import React from 'react';
import Head from 'next/head';
import { Header } from './Header'

export default function Layout({ children, title = 'Ajutorul Educatorului' }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

