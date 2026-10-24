import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

async function expectContentToFit(page: Page, selector = 'body') {
  const issues = await page.locator(selector).evaluate((root) => {
    const problems: string[] = []
    const viewport = document.documentElement.clientWidth
    const excluded = '.project-visual, .stack-drawing, svg, .sr-only, .skip-link, [aria-hidden="true"]'

    for (const element of [root, ...root.querySelectorAll('*')]) {
      if (!(element instanceof HTMLElement) || element.closest(excluded)) continue
      if (!element.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) continue
      const box = element.getBoundingClientRect()
      if (!box.width || !box.height) continue
      const label = `${element.tagName.toLowerCase()}.${element.className}`
      if (box.left < -1 || box.right > viewport + 1) problems.push(`${label} extends beyond the viewport`)
      if (element.clientWidth && element.scrollWidth > element.clientWidth + 1) {
        problems.push(`${label} overflows by ${element.scrollWidth - element.clientWidth}px`)
      }
      const style = getComputedStyle(element)
      if (['hidden', 'clip'].includes(style.overflowY) && element.scrollHeight > element.clientHeight + 1) {
        problems.push(`${label} clips content vertically`)
      }
    }
    return problems
  })
  expect(issues).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    page.viewportSize()!.width,
  )
}

const viewports = [
  [256, 740],
  [280, 800],
  [320, 740],
  [360, 800],
  [390, 844],
  [412, 915],
  [480, 900],
  [568, 320],
  [640, 960],
  [641, 960],
  [667, 375],
  [768, 1024],
  [769, 1024],
  [820, 1180],
  [821, 1180],
  [834, 1194],
  [844, 390],
  [1024, 768],
  [1280, 900],
  [1440, 1000],
  [1920, 1080],
  [2560, 1440],
] as const

for (const [width, height] of viewports) {
  test(`content and case studies reflow at ${width} × ${height}`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expectContentToFit(page)

    if (width === 390 || width === 1440) {
      await page.screenshot({ path: testInfo.outputPath(`portfolio-${width}.png`), fullPage: true })
      await page.screenshot({ path: testInfo.outputPath(`hero-${width}.png`) })
    }

    await page.getByRole('button', { name: 'See all 11 projects' }).click()
    await expectContentToFit(page)
    for (const [id, name] of [
      ['rental', 'Rental platform'],
      ['wrapped', 'GitHub Wrapped'],
    ]) {
      await page.goto(`/#project/${id}`)
      await expect(page.getByRole('dialog').getByRole('heading', { name, exact: true })).toBeVisible()
      await expectContentToFit(page, 'dialog')
    }
  })
}

test.describe('touch screens', () => {
  test.use({ hasTouch: true, isMobile: true, reducedMotion: 'reduce' })

  for (const [width, height] of [
    [280, 740],
    [390, 844],
    [568, 256],
    [667, 320],
    [844, 390],
    [834, 1194],
  ]) {
    test(`navigation, tabs, and case studies remain reachable at ${width} × ${height}`, async ({ page }) => {
      await page.setViewportSize({ width, height })
      await page.goto('/')
      const menu = page.getByRole('button', { name: 'Open navigation' })
      const usesMenu = await menu.isVisible()
      const navigation = page.getByRole('navigation')
      if (usesMenu) {
        await menu.tap()
        const bounds = await navigation.boundingBox()
        expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(height)
      }
      const contactLink = navigation.getByRole('link', { name: 'Let’s talk' })
      await contactLink.scrollIntoViewIfNeeded()
      await contactLink.tap()
      await expect(page).toHaveURL(/#contact$/)
      if (usesMenu) await expect(navigation).not.toBeVisible()

      const smallTargets = await page.locator('a, button').evaluateAll((elements) =>
        elements.flatMap((element) => {
          if (!element.checkVisibility() || element.classList.contains('skip-link')) return []
          const box = element.getBoundingClientRect()
          return box.width < 43 || box.height < 43
            ? [
                `${element.getAttribute('aria-label') || element.textContent?.trim()}: ${box.width} × ${box.height}`,
              ]
            : []
        }),
      )
      expect(smallTargets).toEqual([])

      for (const name of ['Data', 'Application', 'Interface']) {
        const tab = page.getByRole('tab', { name: new RegExp(`${name}$`) })
        await tab.scrollIntoViewIfNeeded()
        await tab.tap()
        await expect(tab).toHaveAttribute('aria-selected', 'true')
        await expectContentToFit(page)
      }

      const rental = page.getByRole('button', { name: 'Read Rental platform case study' })
      await rental.scrollIntoViewIfNeeded()
      await rental.tap()
      const dialog = page.getByRole('dialog')
      await expect(dialog).toContainText('Private client project')
      await expect(dialog.locator('figcaption')).toContainText('placeholder content')
      await expect(dialog.getByRole('link')).toHaveCount(0)
      await dialog.locator('.case-footer').scrollIntoViewIfNeeded()
      const close = dialog.getByRole('button', { name: 'Close case study' })
      await expect(close).toBeInViewport()
      await close.tap()
      await expect(dialog).toHaveCount(0)
    })
  }
})

test('larger text reflows without clipping on phones, tablets, and desktops', async ({ page }) => {
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%'
    })
    await page.evaluate(() => document.fonts.ready)
    await expectContentToFit(page)
    await page.goto('/#project/rental')
    await expect(page.getByRole('dialog')).toBeVisible()
    await expectContentToFit(page, 'dialog')
  }
})

test('mobile navigation dismisses when leaving the header or rotating to a wide screen', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.getByRole('link', { name: 'View résumé' }).focus()
  await expect(page.getByRole('navigation')).not.toBeVisible()
  await page.getByRole('button', { name: 'Open navigation' }).click()
  await page.setViewportSize({ width: 844, height: 390 })
  await expect(page.getByRole('navigation')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Open navigation', includeHidden: true })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByRole('navigation')).not.toBeVisible()
})
