import fs from "fs"
import { __IS_DEV__, createDebugger } from "~/helpers"

const cacheDebug = createDebugger("CACHE", __IS_DEV__)

type Cache = Record<string, { time: number; data: string }>

export default class FileCache {
  private _cachePath: string
  private _cacheTine: number
  private _cache: Cache

  constructor(cachePath?: string, cacheTime?: number) {
    this._cachePath = cachePath || ".cache.remix"
    this._cacheTine = cacheTime ?? 1000 * 60 * 60 // 1 hour
    this._cache = this._getCacheFromFile()

    setInterval(() => {
      const now = Date.now()
      Object.entries(this._cache).forEach(([key, { time }]) => {
        if (now - time > this._cacheTine) this.delete(key)
      })
    }, 1000)
  }

  get(key: string): string {
    cacheDebug("Get:", key)
    return this._cache[key]?.data ?? ""
  }

  set(key: string, value: string): void {
    cacheDebug("Set:", key)
    this._cache[key] = { data: value, time: Date.now() }
    return this._setCacheToFile()
  }

  has(key: string): boolean {
    // cacheDebug("Check:", key)
    return this._cache.hasOwnProperty(key)
  }

  delete(key: string): void {
    cacheDebug("Delete:", key)
    delete this._cache[key]
    return this._setCacheToFile()
  }

  clear(): void {
    cacheDebug("Clear cache")
    this._cache = {}
    return this._deleteCacheFile()
  }

  getAll(): Cache {
    cacheDebug("Get cache")
    return this._cache
  }

  private _getCacheFromFile(): Cache {
    if (__IS_DEV__) return {}

    return fs.existsSync(this._cachePath)
      ? JSON.parse(fs.readFileSync(this._cachePath, "utf8"))
      : {}
  }

  private _setCacheToFile(): void {
    if (__IS_DEV__) return

    return fs.writeFileSync(this._cachePath, JSON.stringify(this._cache))
  }

  private _deleteCacheFile(): void {
    if (__IS_DEV__) return

    if (fs.existsSync(this._cachePath)) {
      return fs.rmSync(this._cachePath)
    }
  }
}
