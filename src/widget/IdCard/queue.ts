class Queue {
    private queue: any[] = []

    enqueue = (item: any) => {
        this.queue.push(item)
    }

    dequeue = () => {
        return this.queue.shift()
    }

    size = () => {
        return this.queue.length
    }

    isEmpty = () => {
        return !this.queue.length
    }

    clear = () => {
        this.queue = []
    }
}

export default new Queue()
