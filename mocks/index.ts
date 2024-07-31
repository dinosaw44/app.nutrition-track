console.log("Mock")

if (typeof window !== 'undefined') {
    await import("./setup/browser").then(async ({ worker }) => {
        console.log("Mock worker")
        await worker.start()
    })
}
else {
    await import("./setup/node").then(({ server }) => {
        console.log("Mock server")
        server.listen()
    })
}

export {}