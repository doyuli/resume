export interface PageSplitOptions {
  pageMaxHeight?: number
}

export interface PageSplitReturn {
  height: number
  accTop: number
}

/**
 * 根据子元素高度动态分页，返回每页的高度数组
 * @param rootElement 根DOM元素
 * @param options 分页配置
 * @returns 分页高度数组（单位：px）
 */
export function calculatePageSplits(
  rootElement: HTMLElement,
  options: PageSplitOptions = {},
): PageSplitReturn[] {
  const {
    pageMaxHeight = 1082,
  } = options

  // 1. 获取所有子元素及其位置信息
  const children = Array.from(rootElement.children) as HTMLElement[]
  if (children.length === 0) {
    return [
      {
        height: rootElement.offsetHeight,
        accTop: 0,
      },
    ]
  }

  const rootTop = rootElement.getBoundingClientRect().top
  const pageHeights: PageSplitReturn[] = []
  let currentPageHeight = 0
  let accumulatedHeight = 0

  // 2. 遍历子元素计算分页
  children.forEach((child, index) => {
    const rect = child.getBoundingClientRect()
    const childBottomOffset = rect.bottom - rootTop - accumulatedHeight
    const maxHeight = pageMaxHeight

    // 当前页能否容纳该元素？
    if (childBottomOffset > maxHeight) {
      // 分页：记录当前页高度，重置累计值
      pageHeights.push({
        height: currentPageHeight,
        accTop: accumulatedHeight,
      })
      accumulatedHeight += currentPageHeight
      currentPageHeight = rect.height // 新页从当前元素开始
    }
    else {
      // 扩展当前页高度
      currentPageHeight = Math.max(currentPageHeight, childBottomOffset)
    }

    // 处理最后一个元素
    if (index === children.length - 1) {
      pageHeights.push({
        height: currentPageHeight,
        accTop: accumulatedHeight,
      })
    }
  })

  return pageHeights
}
