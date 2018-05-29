// a decorator that forces a class to implement the static functions of another
export function staticImplements<T>() {
    return (constructor: T) => {}
}