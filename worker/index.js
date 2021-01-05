'use strict'

self.addEventListener('push', function (event) {
    const data = JSON.parse(event.data.text())
    event.waitUntil(
        registration.showNotification(data.title, {
            body: data.message,
            icon: '/icons/icon-192x192.png',
            data: data.data
        })
    )
})

self.addEventListener('notificationclick', function (event) {
    console.log("Notification clicked")
    event.notification.close()
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            if (clientList.length > 0) {
                let client = clientList[0]
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i]
                    }
                }
                return client.focus()
            }
            return clients.openWindow('/update')
        })
    )
})