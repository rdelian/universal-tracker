import { useEffect, useState } from 'react'
import Head from 'next/head'
import Button from '@material-ui/core/Button';

const base64ToUint8Array = base64 => {
    const padding = '='.repeat((4 - (base64.length % 4)) % 4)
    const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

    const rawData = window.atob(b64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

export default function Subscribe() {
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [subscription, setSubscription] = useState(null)
    const [registration, setRegistration] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            // run only in browser
            navigator.serviceWorker.ready.then(reg => {
                reg.pushManager.getSubscription().then(sub => {
                    if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
                        setSubscription(sub)
                        setIsSubscribed(true)
                    }
                })
                setRegistration(reg)
            })
        }
    }, [])

    const subscribeButtonOnClick = async event => {
        event.preventDefault()
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
        })
        // TODO: you should call your API to save subscription data on server in order to send web push notification from server
        const temp = JSON.parse(
            JSON.stringify(sub)
        )
        fetch('/api/notification', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: { ...temp, user: 1 } // TODO: Get logged user.id
            })
        })
        setSubscription(sub)
        setIsSubscribed(true)
        console.log('web push subscribed!')
    }

    const unsubscribeButtonOnClick = async event => {
        event.preventDefault()
        console.log(subscription)
        await subscription.unsubscribe()
        // TODO: you should call your API to delete or invalidate subscription data on server
        const temp = JSON.parse(
            JSON.stringify(subscription)
        )
        fetch('/api/notification', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                subscription: { ...temp, user: 1 } // TODO: Get logged user.id
            })
        })
        setSubscription(null)
        setIsSubscribed(false)
        console.log('web push unsubscribed!')
    }

    return (
        <>
            <h1>Next.js + PWA = AWESOME!</h1>
            <Button variant="contained" onClick={subscribeButtonOnClick} disabled={isSubscribed}>
                Subscribe
            </Button>
            <Button variant="contained" onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
                Unsubscribe
            </Button>
        </>
    )
}