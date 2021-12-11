/**
 * 用一个数组来存储数据，给每一个数据项标记一个访问时间戳
 * 每次插入新数据项的时候，先把数组中存在的数据项的时间戳自增，并将新数据的时间戳设为0插入数组
 * 每次访问数组中的数据项的时候，将被访问的数据项的时间戳设0
 * 当数据空间满的时候，将时间戳最大的数据项淘汰
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.members = []
  }
}